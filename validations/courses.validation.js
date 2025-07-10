
const { body } = require("express-validator");

const validationSchema = ()=>{
    return  [
        body("title")
          .notEmpty()
          .withMessage("title is required")
          .isLength({ min: 3 })
          .withMessage("length at least must be 3 chars"),
        body("price")
          .notEmpty()
          .withMessage("price is required")
          .isNumeric({ min: 1, max: 4 })
          .withMessage("length at least must be 1 digits and max 4 digits"),
      ]
}

module.exports = {validationSchema}