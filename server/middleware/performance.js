// server/middleware/performance.js
exports.trackPerformance = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} ${res.statusCode} ${duration}ms`);

    // Store metrics in DB or send to analytics
    trackRequest({
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration
    });
  });

  next();
};

// Track request in database
async function trackRequest(data) {
  await PerformanceLog.create(data);
}