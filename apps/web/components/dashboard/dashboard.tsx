"use client";
import { User } from "@repo/prisma";
import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-model-store";

interface DashboardProps {
  user?: User;
}

const Dashboard = ({ user }: DashboardProps) => {
  const { onOpen } = useModal();
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Button onClick={() => onOpen("importProject", { user })} variant="green">
        Add project
      </Button>
    </div>
  );
};

export default Dashboard;
