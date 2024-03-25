import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ManageJobCard } from "@/components/ManageJobCard";
import CreateJobForm from "@/components/CreateJobForm";
import { Button } from "@/components/ui/button";
const ManageJobs = () => {
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  const [AdminJobs, setAdminJobs] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const { jobs } = useSelector((state) => state.job);

  const fetchAdminJobs = async () => {
    try {
      setAdminJobs(jobs.filter((job) => job.userId === currentUser._id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAdminJobs();
  }, [jobs]);

  return (
    <div className="w-full md:flex-row  min-h-[100vh]  flex flex-col items-center justify-start">
      <div className="w-full h-[30px] md:absolute top-2 pl-10 mt-5">
        <Button variant="outline" onClick={()=>Navigate("/")}>Go Back</Button>
      </div>
      <CreateJobForm />
      <div className="w-full md:w-1/2 h-full pb-12 flex items-center justify-center flex-col gap-4">
        <h1 className="text-black text-3xl  ">Jobs created by you will appear here</h1>
        <div className="flex gap-4 flex-wrap items-center justify-center md:flex-row">
          {AdminJobs.length>0 ? (
            AdminJobs.map((job, i) => <ManageJobCard key={job._id} {...job} />)
          ) : (
            <h1 className="text-lg  text-gray-500">
              You don't have any jobs right now. Try adding one
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageJobs;
