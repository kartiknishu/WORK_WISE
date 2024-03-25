import Job from "../models/job.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {

  if (!req.user.isAdmin) {
    return next(errorHandler(403, "You are not allowed to create a job"));
  }
  if (!req.body.title || !req.body.description) {
    return next(errorHandler(400, "Please provide all required fields"));
  }

  const newJob = new Job({
    ...req.body,
    userId: req.user.id,
  });
  try {
    const savedJob = await newJob.save();
    res.status(201).json(savedJob);
  } catch (error) {
    next(error);
  }
};

export const getJobs = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;

    const jobs = await Job.find({
      ...(req.query.userId && { userId: req.query.userId }),

      ...(req.query.jobId && { _id: req.query.jobId }),
      ...(req.query.location && {
        location: { $regex: req.query.location, $options: "i" },
      }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: "i" } },
          { description: { $regex: req.query.searchTerm, $options: "i" } },
        ],
      }),
    })
      .sort()
      .skip(startIndex)
      .limit(limit);

    res.status(200).json({
      jobs,
    });
  } catch (error) {
    next(error);
  }
};

export const updateJob = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to update this job"));
  }
  if (!req.body.title || !req.body.description || !req.body.location) {
    return next(errorHandler(400, "Please provide all fields"));
  }

  try {
    const job = await Job.findById(req.params.jobId);

    const updatedjob = await Job.findByIdAndUpdate(
      req.params.jobId,
      {
        $set: {
          location: req.body.location,

          title: req.body.title,
          description: req.body.description,

          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedjob);
  } catch (error) {
    next(error);
  }
};

export const deleteJob = async (req, res, next) => {
  console.log();
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, "You are not allowed to delete this Job"));
  }
  try {
    await Job.findByIdAndDelete(req.params.jobId);
    res.status(200).json("The Job has been deleted");
  } catch (error) {
    next(error);
  }
};
