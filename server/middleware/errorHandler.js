const mongoErrorHandler = (err, req, res, next) => {
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ errors });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({
      error: `${field} already exists`,
    });
  }

  if (err.name === "CastError") {
    return res.status(400).json({
      error: "Invalid ID format",
    });
  }
  return res.status(500).json({ error: "Internal server error" });
};
module.exports = { mongoErrorHandler };
