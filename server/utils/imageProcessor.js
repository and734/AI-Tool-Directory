const axios = require('axios');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Process image from URL
async function processImage(url, toolName) {
  try {
    // Download image
    const imageResponse = await axios.get(url, { responseType: 'arraybuffer' });

    // Generate filename
    const safeName = toolName.replace(/[^\w]/g, '-');
    const filename = `${safeName}-${Date.now()}.jpg`;
    const outputPath = path.join(__dirname, '..', 'uploads', filename);

    // Optimize and save
    await sharp(imageResponse.data)
      .resize(300, 400)
      .jpeg({ quality: 80 })
      .toFile(outputPath);

    return `/uploads/${filename}`;
  } catch (error) {
    console.error('Image processing failed:', error.message);
    return null;
  }
}

// Extract favicon from domain
function getFaviconUrl(url) {
  try {
    const domain = new URL(url).hostname.replace(/^www\./, '');
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
  } catch {
    return 'https://www.google.com/s2/favicons?domain=example.com&sz=64';
  }
}

module.exports = {
  processImage,
  getFaviconUrl
};