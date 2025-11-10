// ...existing code...
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

const ajv = new Ajv({ allErrors: true, removeAdditional: true });
addFormats(ajv);

const validateSchema = (schema, source = 'body') => {
  const validate = ajv.compile(schema);
  return (req, res, next) => {
    const data = source === 'params' ? req.params : req.body;
    if (!validate(data)) {
      return res.status(400).json({
        errors: validate.errors.map(e => ({
            path: e.instancePath || e.schemaPath,
            message: e.message
        }))
      });
    }
    next();
  };
};

module.exports = validateSchema;
// ...existing code...