import { TriangleAlert } from "lucide-react";

const ProjectInternalError = () => {
  return (
    <div className="w-full h-full flex border border-red-800 p-3 gap-2 rounded-lg justify-center items-center">
      <TriangleAlert className="w-7 h-7 text-red-700" />
      <h3 className="text-2xl text-red-700">Someting went wrong!</h3>
    </div>
  );
};

export default ProjectInternalError;
