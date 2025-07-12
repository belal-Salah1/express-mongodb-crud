const Course = require("../models/model.schema");
const {validationResult} = require('express-validator');
const httpStatusText = require('../utilites/statusCodeText');
const asyncWrapper = require('../middlewares/asyncWrapper');
const appError = require('../utilites/appError')

const getAllCourses = asyncWrapper( async (req, res) => {
  const query = req.query
  const limit = query.limit || 2;
  const page = query.page  || 1;
  const skip = (page - 1) * limit;
  
    // const courses = await Course.find({},{"__v":false }).limit(limit).skip(skip) ;
     const courses = await Course.find({},{"__v":false }) ;
    if (!courses) {
      res.status(404).json({status:httpStatusText.FAIL , data : {courses:null}});
    }
    res.status(200).json({status:httpStatusText.SUCCESS , data : {Courses : courses}});
  
}
)

const getSingleCourse = asyncWrapper(
async (req, res,next) => {
  
  const course = await Course.findById(req.params.id);
  if (!course) {
      const error = appError.create("course not found", 404 , httpStatusText.FAIL);
      return next(error)
    }
    return res.status(200).json({status:httpStatusText.SUCCESS , data : {Course : course}});
   
 
}
)

const addCourse = asyncWrapper( async(req, res , next) => {
  
    const NewCourse = await new Course(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = appError.create(errors.array(),400, httpStatusText.FAIL )
      return next(error)      
    }
    NewCourse.save();
    res.status(201).json({status:httpStatusText.SUCCESS , data : {Course : NewCourse}});
   
    
  
}
)

const updateCourse = asyncWrapper(async (req, res) => {
  
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({status:httpStatusText.SUCCESS , data : {Course : course}});
 
}
)

const deleteCourse = asyncWrapper(async (req, res) => {
  
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({status:httpStatusText.SUCCESS , data : {msg: "course deleted successfully" }});

}
)

module.exports = {
  getAllCourses,
  getSingleCourse,
  addCourse,
  updateCourse,
  deleteCourse,
};
