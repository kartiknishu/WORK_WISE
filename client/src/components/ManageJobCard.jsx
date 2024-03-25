import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { deleteJobSuccess, updateJobSuccess } from "@/redux/jobs/job.slice";

export function ManageJobCard({
  _id,
  userId,
  title,
  location,
  company,
  description,
  image,
}) {
  const [ModalOpen, setModalOpen] = useState(false);
  const Dispatch = useDispatch();
  const [newtitle, setnewtitle] = useState(title);
  const [newdescription, setnewdescription] = useState(description);
  const [newimage, setnewimage] = useState(image);
  const [newlocation, setnewlocation] = useState(location);
  const [newcompany, setnewcompany] = useState(company);

  const handledelete = async () => {
    try {
      const response = await axios.delete(
        `/api/job/deletejob/${_id}/${userId}`
      );
      Dispatch(deleteJobSuccess(_id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleupdate = async () => {

    try {
      const response = await axios.post(`/api/job/updatejob/${_id}/${userId}`, {
        company: newcompany,
        title: newtitle,
        description: newdescription,
        image: newimage,
        location: newlocation,
      });
      Dispatch(updateJobSuccess(response.data))
    } catch (error) {
      setnewtitle(title);
      setnewcompany(company);
      setnewdescription(description);
      setnewimage(image);
      setnewlocation(location);
      console.log(error);
    }
    setModalOpen(!ModalOpen);
  };
  const handlecancelupdate = () => {
    setModalOpen(!ModalOpen);
    setnewtitle(title);
    setnewcompany(company);
    setnewdescription(description);
    setnewimage(image);
    setnewlocation(location);
  };

  return (
    <>
      {ModalOpen ? (
        <div
          className={`bg-black w-screen h-screen z-20 flex items-center justify-center absolute top-0 left-0    gap-14`}
        >
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Update Job</CardTitle>
              <CardDescription>
                Fill in new details for the existing Job
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="title">Job title</Label>
                    <Input
                      id="title"
                      value={newtitle}
                      onChange={(e) => {
                        setnewtitle(e.target.value);
                      }}
                      placeholder="enter job title"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      value={newcompany}
                      onChange={(e) => {
                        setnewcompany(e.target.value);
                      }}
                      placeholder="enter company name"
                    />
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      new
                      value={newlocation}
                      onChange={(e) => {
                        setnewlocation(e.target.value);
                      }}
                      placeholder="Job location"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="description">Job description</Label>
                    <Input
                      id="description"
                      value={newdescription}
                      onChange={(e) => {
                        setnewdescription(e.target.value);
                      }}
                      placeholder="Job description"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="image">Image </Label>
                    <Input
                      id="image"
                      value={newimage}
                      onChange={(e) => {
                        setnewimage(e.target.value);
                      }}
                      placeholder="add hosted image link for your"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button type="submit" onClick={handleupdate}>
                Update Job
              </Button>
              <Button
                type="submit"
                variant="outline"
                onClick={handlecancelupdate}
              >
                cancel
              </Button>
            </CardFooter>
          </Card>
        </div>
      ) : (
        <Card className="w-[300px] relative h-[200px]  flex flex-col ">
          <div className="w-full p-2 px-4 pt-4 h-1/3 flex justify-between">
            <div className="h-full aspect-square bg-gray-100 flex items-center justify-center rounded-full object-cover">
              {" "}
              <img
                src={image}
                className="h-3/4 aspect-square rounded-full object-cover"
              ></img>
            </div>
            <button
              onClick={() => setModalOpen(!ModalOpen)}
              className=" px-2 rounded-3xl  font-semibold h-full border-2 text-sm border-gray-100 cursor-pointer"
            >
              update
            </button>
            <button
              className=" px-2 rounded-3xl  font-semibold h-full border-2 text-sm bord
                er-gray-100 cursor-pointer"
              onClick={handledelete}
            >
              delete
            </button>
          </div>
          <div className="w-full p-2 h-1/3 ml-2">
            <h1 className="font-bold tracking-wider text-xl capitalize">
              {title}
            </h1>
            <div className="w-full flex items-center gap-2">
              <span className="font-light text-gray-500 tracking-wider capitalize ">
                {location}
              </span>
              <span className="text-[8px] ">⚪</span>
              <span className="font-light text-gray-500 capitalize">
                {company}
              </span>
            </div>
          </div>
          <div className="w-full p-2 h-1/3">
            <span className=" rounded-3xl w-1/2 font-semibold bg-gray-200 h-full border-2 p-2 text-sm border-gray-100">
              {description}
            </span>
          </div>
        </Card>
      )}
    </>
  );
}
