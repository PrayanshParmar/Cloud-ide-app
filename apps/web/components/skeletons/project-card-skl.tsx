import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const ProjectCardSKL = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-4 ">
        <Card>
          <CardContent>
            <div className="flex flex-col gap-4 ">
              <div className="flex items-center justify-between w-full h-full pt-2">
                <div className="flex items-center  gap-2 ">
                  <Skeleton className="h-10 w-10" />
                  <div className="flex flex-col items-start justify-start gap-[6px] ">
                    <Skeleton className="w-[80px] h-4" />
                    <Skeleton className=" w-[100px] h-4 " />
                  </div>
                </div>

                <Skeleton className="w-10 h-10 rounded-md" />
              </div>
              <div>
                <Skeleton className="w-[206.1px] h-7 rounded-full" />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className="w-[110px] h-5" />
          </CardFooter>
        </Card>
        <Card>
          <CardContent>
            <div className=" flex flex-col gap-4 ">
              <div className=" flex items-center justify-between w-full h-full pt-2">
                <div className=" flex items-center  gap-2 ">
                  <Skeleton className=" h-10 w-10 " />
                  <div className=" flex flex-col items-start justify-start gap-[6px] ">
                    <Skeleton className="w-[80px]   h-4" />
                    <Skeleton className=" w-[100px] h-4 " />
                  </div>
                </div>

                <Skeleton className=" w-10 h-10 rounded-md" />
              </div>
              <div>
                <Skeleton className=" w-[206.1px] h-7 rounded-full " />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className=" w-[110px] h-5 " />
          </CardFooter>
        </Card>
        <Card>
          <CardContent>
            <div className=" flex flex-col gap-4 ">
              <div className=" flex items-center justify-between w-full h-full pt-2">
                <div className=" flex items-center  gap-2 ">
                  <Skeleton className=" h-10 w-10 " />
                  <div className=" flex flex-col items-start justify-start gap-[6px] ">
                    <Skeleton className="w-[80px]   h-4" />
                    <Skeleton className=" w-[100px] h-4 " />
                  </div>
                </div>

                <Skeleton className=" w-10 h-10 rounded-md" />
              </div>
              <div>
                <Skeleton className=" w-[206.1px] h-7 rounded-full " />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Skeleton className=" w-[110px] h-5 " />
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default ProjectCardSKL;
