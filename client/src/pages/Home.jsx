import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoSignOut } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import { signoutSuccess } from "../redux/user/user.slice";
import { setJobs } from "@/redux/jobs/job.slice";
import { JobCard } from "@/components/JobCard";
const Home = () => {
  const Navigate = useNavigate();
  const Dispatch = useDispatch();
  const [searchTerm, setsearchTerm] = useState("");
  const [searchedJobs, setsearchedJobs] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const { jobs } = useSelector((state) => state.job);
  const handleSignout = async () => {
    try {
      await axios.get("/api/auth/sign-out");
      Dispatch(signoutSuccess());
      Navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  };
  const fetchJobs = async () => {
    try {
      const response = await axios.get("/api/job/getjobs");
      const data = response.data;
      Dispatch(setJobs(data.jobs));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `/api/job/getjobs?searchTerm=${searchTerm}`
      );
      setsearchedJobs(response.data.jobs);
    } catch (error) {
      console.log(error);
    }
  };
  const handleReset = async () => {
    setsearchedJobs([]);
    setsearchTerm("");
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <nav className="w-full h-auto px-4 py-4 border-b-2 border-gray-300 items-center flex justify-between">
        <div className="h-[40px] rounded-full aspect-square overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1682686578615-39549501dd08?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="object-cover h-full w-full"
          ></img>
        </div>
        
        <div className="flex w-1/4 justify-end ">
          {currentUser ? (
            <h1 className="flex font-semibold gap-4">
              {currentUser.isAdmin && (
                <button onClick={() => Navigate("/ManageJobs")}>
                  ManageJobs
                </button>
              )}
              <p className=" px-4 flex items-center justify-center">
                Signout{" "}
                <GoSignOut
                  className="cursor-pointer w-[30px] inline-block"
                  onClick={handleSignout}
                />{" "}
              </p>
            </h1>
          ) : (
            <Button variant="outline" onClick={() => Navigate("/signup")}>
              Signup/Signin
            </Button>
          )}
        </div>
      </nav>

      <div className="w-3/4 h-[50vh] rounded-lg mt-8 relative mb-12 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className=" object-cover w-full h-full"></img>
      <div className="w-full  absolute bottom-4 flex items-center justify-center  pt-8 ">
        <div className="relative w-[300px] md:w-[600px] flex items-center">
          <input
            value={searchTerm}
            onChange={(e) => setsearchTerm(e.target.value)}
            className="h-[40px] w-full px-12 relative rounded-2xl  border-2  border-gray-200"
            placeholder="search jobs by title"
          ></input>
          <button
          onClick={handleSearch}
          className="text-black absolute left-2     h-[30px] flex items-center justify-center bg-green-400 w-[30px] p-2 rounded-full"
        >
          <CiSearch />
        </button>
        </div>

        <button
          onClick={handleReset}
          className="text-gray-500 bg-white border-2 border-gray-300 h-[40px] p-4 flex items-center rounded-3xl ml-2"
        >
          clear
        </button>
      </div>
      </div>
     

      <div className="w-3/4 min-h-[100vh]   flex flex-col items-center gap-4 pt-4 md:flex-row md:items-start">
        {searchedJobs.length > 0 &&
          searchedJobs.map((job, i) => <JobCard key={job._id} {...job} />)}
        {searchedJobs.length === 0 &&
          jobs.map((job, i) => <JobCard key={job._id} {...job} />)}
        {searchedJobs.length === 0 && jobs.length === 0 && (
          <h1 className=" text-gray-400 w-full text-center text-lg">
            we don't have any jobs right now. Admins might be adding one. Stay
            in touch!
          </h1>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Home;
