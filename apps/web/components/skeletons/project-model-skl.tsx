import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

const ProjectModalSKL = () => {
  return (
    <>
      <ScrollArea className="h-64 ">
        <div className="w-full h-fit p-3 flex flex-row items-center justify-between border">
          <div className="flex items-center gap-2">
            <Skeleton className=" w-[156px] h-6" />
          </div>
          <Skeleton className=" w-[75.68px] h-10" />
        </div>
        <div className="w-full h-fit p-3 flex flex-row items-center justify-between border">
          <div className="flex items-center gap-2">
            <Skeleton className=" w-[156px] h-6" />
          </div>
          <Skeleton className=" w-[75.68px] h-10" />
        </div>
        <div className="w-full h-fit p-3 flex flex-row items-center justify-between border">
          <div className="flex items-center gap-2">
            <Skeleton className=" w-[156px] h-6" />
          </div>
          <Skeleton className=" w-[75.68px] h-10" />
        </div>
        <div className="w-full h-fit p-3 flex flex-row items-center justify-between border">
          <div className="flex items-center gap-2">
            <Skeleton className=" w-[156px] h-6" />
          </div>
          <Skeleton className=" w-[75.68px] h-10" />
        </div>
      </ScrollArea>
    </>
  );
};

export default ProjectModalSKL;
