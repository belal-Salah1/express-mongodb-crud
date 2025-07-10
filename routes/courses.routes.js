const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/courses.controller");
const { validationSchema } = require("../validations/courses.validation");

router.route("/")
  .get( coursesController.getAllCourses)
  .post(validationSchema(),coursesController.addCourse);


  router.route("/:id")
  .get( coursesController.getSingleCourse)
  .patch(coursesController.updateCourse)
  .delete( coursesController.deleteCourse)

module.exports = router;
