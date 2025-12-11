// Lightweight Zod validator wrapper
const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse({
      body: req.body,
      params: req.params,
      query: req.query,
    });
    // attach parsed data for controllers to use if they want
    req.validated = parsed;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validate;

