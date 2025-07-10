const Course = require("../models/model.schema");
const {validationResult} = require('express-validator');
const httpStatusText = require('../utilites/statusCodeText');

const getAllCourses = async (req, res) => {
  const query = req.query
  const limit = query.limit || 2;
  const page = query.page  || 1;
  const skip = (page - 1) * limit;
  try {
    // const courses = await Course.find({},{"__v":false }).limit(limit).skip(skip) ;
     const courses = await Course.find({},{"__v":false }) ;
    if (!courses) {
      res.status(404).json({status:httpStatusText.FAIL , data : {courses:null}});
    }
    res.status(200).json({status:httpStatusText.SUCCESS , data : {Courses : courses}});
  } catch (err) {
    return res.status(400).json({status:httpStatusText.ERROR , message :err.message});
  }
};

const getSingleCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      res.status(400).json({status:httpStatusText.FAIL , data : {courses:null}});
    }
    res.status(200).json({status:httpStatusText.SUCCESS , data : {Course : course}});
  } catch (err) {
    return res.status(400).json({status:httpStatusText.ERROR , message :err.message});
  }
};

const addCourse = async (req, res) => {
  try {
    const NewCourse = await new Course(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({status:httpStatusText.FAIL , errors:errors.array()});
      return;
    }
    NewCourse.save();
    res.status(201).json({status:httpStatusText.SUCCESS , data : {Course : NewCourse}});
  } catch (err) {
    return res.status(400).json({status:httpStatusText.ERROR , message :err.message});
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({status:httpStatusText.SUCCESS , data : {Course : course}});
  } catch (err) {
    return res.status(400).json({status:httpStatusText.ERROR , message :err.message});
  }
};

const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({status:httpStatusText.SUCCESS , data : {msg: "course deleted successfully" }});
  } catch (err) {
    return res.status(400).json({status:httpStatusText.ERROR , message :err.message});
  }
};

module.exports = {
  getAllCourses,
  getSingleCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
