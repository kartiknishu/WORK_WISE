import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { createJobSuccess } from "@/redux/jobs/job.slice";

const CreateJobForm = ({ fetchAdminJobs }) => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [image, setimage] = useState("");
  const [location, setlocation] = useState("");
  const [company, setcompany] = useState("");
  const Dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/job/create", {
        title,
        description,
        image,
        location,
        company,
      });
      Dispatch(createJobSuccess(response.data));
      setcompany("")
      settitle("")
      setdescription("")
      setimage("")
      setlocation("")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full md:w-1/2 mt-8 h-auto mb-4 flex justify-center items-center flex-col">
        <ToastContainer />
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle className="capitalize">Welcome {currentUser.username}</CardTitle>
            <CardDescription>Add a Job</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="title">Job title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => {
                      settitle(e.target.value);
                    }}
                    placeholder="enter job title"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    value={company}
                    onChange={(e) => {
                      setcompany(e.target.value);
                    }}
                    placeholder="enter company name"
                  />
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={location}
                    onChange={(e) => {
                      setlocation(e.target.value);
                    }}
                    placeholder="Job location"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Job description</Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => {
                      setdescription(e.target.value);
                    }}
                    placeholder="Job description"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="image">Image </Label>
                  <Input
                    id="image"
                    value={image}
                    onChange={(e) => {
                      setimage(e.target.value);
                    }}
                    placeholder="add hosted image link for your job"
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit" onClick={handleSubmit}>
              Add Job
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default CreateJobForm;
