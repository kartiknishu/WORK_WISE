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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export function JobCard({ _id, title, location, company, description, image }) {
  const [ModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Dialog>
        <Card className="w-[350px] h-[200px]  flex flex-col ">
          <div className="w-full p-2 px-4 pt-4 h-1/3 flex justify-between">
            <div className="h-full aspect-square bg-gray-100 flex items-center justify-center rounded-full object-cover">
              {" "}
              <img
                src={image}
                className="h-1/2 aspect-square rounded-full object-cover"
              ></img>
            </div>
            <DialogTrigger asChild>
              <button
                onClick={() => setModalOpen(!ModalOpen)}
                className=" px-2 rounded-3xl  font-semibold h-full border-2 text-sm border-gray-100 cursor-pointer"
              >
                Apply Now
              </button>
            </DialogTrigger>
          </div>
          <div className="w-full p-2 h-1/3 ml-2">
            <h1 className="font-bold tracking-wider text-xl capitalize">
              {title}
            </h1>
            <div className="w-full flex items-center gap-2">
              <span className=" text-gray-900 font-medium tracking-wider capitalize ">
                {location}
              </span>
              <span className="text-[8px] ">⚪</span>
              <span className="font-medium text-gray-900 capitalize ">
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

        <DialogContent className="sm:max-w-[425px]  gap-14">
          <DialogHeader className="gap-8">
            <DialogTitle className="h-[85px] flex gap-4 items-center justify-center ">
              <img
                src={image}
                className="h-3/4 aspect-square rounded-none object-cover"
              ></img>
              <div className="w-3/4 h-full pt-4 flex flex-col gap-4 ">
                <div className="h-1/3 w-full">
                  <h1 className="font-bold w-full text-left tracking-wider text-xl capitalize">
                    {title}
                  </h1>
                </div>
                <div className="h-1/3 w-full flex items-center justify-start gap-2 ">
                  {" "}
                  <span className="font-medium text-gray-500 tracking-wider capitalize ">
                    {location}
                  </span>
                  <span className="text-[8px] ">⚪</span>
                  <span className="font-medium text-gray-500 capitalize ">
                    {company}
                  </span>
                </div>
              </div>
            </DialogTitle>
            <div className="w-full p-2 h-1/3 flex items-center justify-center">
              <span className=" rounded-3xl w-1/2 font-semibold bg-gray-200 h-full border-2 p-2 text-sm border-gray-100">
                {description}
              </span>
            </div>
          </DialogHeader>
          <div className="w-full flex justify-center">
            <button className="bg-gray-200 rounded-md p-2 w-1/2">
              Apply Now{" "}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
