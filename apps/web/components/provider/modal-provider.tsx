"use client";

import { useEffect, useState } from "react";
import { DeleteMessageModal } from "@/components/modals/delete-message-modal";
import { ImportProjectModal } from "@/components/modals/import-project-modal";
import { CreateProject } from "@/components/modals/create-project";

export const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <DeleteMessageModal></DeleteMessageModal>
      <ImportProjectModal></ImportProjectModal>
      <CreateProject></CreateProject>
    </>
  );
};
