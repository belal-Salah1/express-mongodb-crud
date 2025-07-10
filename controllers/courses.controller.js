const Course = require("../models/model.schema");
const {validationResult} = require('express-validator')

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    if (!courses) {
      res.status(400).json({ msg: "Can't fetch the courses" });
    }
    res.status(200).json(courses);
  } catch (err) {
    console.log(err);
  }
};

const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      res.status(400).json({ msg: "Can't find the course" });
    }
    res.status(200).json(course);
  } catch (err) {
    console.log(err);
  }
};

const addCourse = async (req, res) => {
  try {
    const NewCourse = await new Course(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    }
    NewCourse.save();
    res.status(201).json({ msg: "course created successfully" });
  } catch (err) {
    console.log(err);
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(course);
  } catch (err) {
    console.log(err);
  }
};

const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "course deleted successfully" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
