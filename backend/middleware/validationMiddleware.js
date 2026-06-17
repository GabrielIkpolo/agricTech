import { body, validationResult } from 'express-validator';

export const validate = (validations) => {
  return async (req, res, next) => {
    await Promise.all(
      validations.map(validation => validation.run(req))
    );

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

    return res.status(422).json({
      errors: extractedErrors
    });
  };
};

export const authValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').escape(),
  body('email').isEmail().withMessage('Please provide a valid email').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('role').isIn(['FARMER', 'BUYER', 'DRIVER', 'AGENT']).withMessage('Invalid role'),
  body('phoneNumber').optional().isMobilePhone().withMessage('Invalid phone number'),
];

export const productValidation = [
  body('name').trim().notEmpty().withMessage('Product name is required').escape(),
  body('quantity').isNumeric().withMessage('Quantity must be a number').custom(val => val > 0),
  body('price').isNumeric().withMessage('Price must be a number').custom(val => val > 0),
  body('unit').trim().notEmpty().withMessage('Unit (kg, bag, etc) is required').escape(),
  body('category').isIn(['Grains', 'Tubers', 'Vegetables', 'Fruits']).withMessage('Invalid category'),
  body('location').trim().notEmpty().withMessage('Location is required').escape(),
];

export const orderValidation = [
  body('productId').isMongoId().withMessage('Invalid product ID'),
  body('quantity').isNumeric().withMessage('Quantity must be a number').custom(val => val > 0),
];
