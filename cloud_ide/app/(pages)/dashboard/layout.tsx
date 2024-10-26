import React from "react";

const dashboardlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="h-screen flex items-center justify-center bg-zinc-900 text-white
    "
    >
      {children}
    </div>
  );
};

export default dashboardlayout;
