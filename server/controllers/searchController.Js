const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const axios = require('axios');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

puppeteer.use(StealthPlugin());

// AI search endpoint
exports.aiSearch = async (req, res) => {
  const { query } = req.body;

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch`);

    // Wait for images to load
    await page.waitForSelector('.mJxzWe');

    const results = await page.evaluate(() => {
      const images = document.querySelectorAll('.mJxzWe img');
      return Array.from(images).slice(0, 5).map(img => ({
        src: img.src,
        alt: img.alt
      }));
    });

    await browser.close();

    // Process and store results
    const processedResults = await Promise.all(results.map(async (result, i) => {
      if (!result.src) return null;

      try {
        // Download image
        const imageResponse = await axios.get(result.src, { responseType: 'arraybuffer' });

        // Optimize and save image
        const filename = `tool-${Date.now()}-${i}.jpg`;
        const outputPath = path.join(__dirname, '..', 'uploads', filename);

        await sharp(imageResponse.data)
          .resize(300, 400)
          .jpeg({ quality: 80 })
          .toFile(outputPath);

        return {
          imageUrl: `/api/uploads/${filename}`,
          sourceUrl: result.src,
          relevance: (results.length - i) / results.length
        };
      } catch (error) {
        console.error(`Error processing image ${i}:`, error.message);
        return null;
      }
    }));

    // Get tool info from first result
    const toolInfo = await getToolInfoFromSearch(query);

    res.json({
      results: processedResults.filter(r => r !== null),
      toolInfo
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Search failed' });
  }
};

// Extract tool info from search
async function getToolInfoFromSearch(query) {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(`https://www.google.com/search?q=${encodeURIComponent(query)}`);

    const result = await page.evaluate(() => {
      const title = document.querySelector('h3')?.innerText || "AI Tool";
      const description = document.querySelector('.VwiC3b')?.innerText || "AI Tool for " + query;
      const link = document.querySelector('a')?.href || "https://example.com";

      return {
        name: title.split('|')[0].trim(),
        description,
        url: link,
        category: determineCategory(query)
      };
    });

    await browser.close();
    return result;
  } catch (error) {
    console.error('Tool info extraction failed:', error);
    return {
      name: query,
      description: `AI Tool for ${query}`,
      url: `https://example.com/${query.toLowerCase().replace(/\s+/g, '-')}`,
      category: determineCategory(query)
    };
  }
}

// Determine category from query
function determineCategory(query) {
  const queryLower = query.toLowerCase();
  if (queryLower.includes('image')) return 'Image Generation';
  if (queryLower.includes('text') || queryLower.includes('language')) return 'Natural Language Processing';
  if (queryLower.includes('video')) return 'Video Editing';
  if (queryLower.includes