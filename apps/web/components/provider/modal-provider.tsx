"use client";

import { useEffect, useState } from "react";
import { DeleteMessageModal } from "../modals/delete-message-modal";
import { AddProjectModal } from "../modals/add-project-modal";

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
      <AddProjectModal></AddProjectModal>
    </>
  );
};
