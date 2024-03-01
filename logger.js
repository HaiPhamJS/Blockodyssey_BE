// logger.js

function logger(req, res, next) {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log(`Response Body: `);

  next();
}

module.exports = logger;
