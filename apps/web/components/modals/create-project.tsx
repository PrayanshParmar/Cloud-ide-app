"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  Box,
  CuboidIcon as Cube,
  Search,
  Server,
} from "lucide-react";
import { useModal } from "@/hooks/use-model-store";
import Image from "next/image";

interface Template {
  id: string;
  name: string;
  platform: string;
  icon: JSX.Element;
  popularity: string;
  type: ("browser" | "server")[];
}

const templates: Template[] = [
  {
    id: "react-ts",
    name: "React (TS)",
    platform: "CodeSandbox",
    icon: (
      <Image
        src="/placeholder.svg?height=40&width=40"
        alt="React logo"
        className="h-10 w-10"
      />
    ),
    popularity: "779.6k",
    type: ["browser"],
  },
  {
    id: "javascript",
    name: "JavaScript",
    platform: "CodeSandbox",
    icon: (
      <Image
        src="/placeholder.svg?height=40&width=40"
        alt="JavaScript logo"
        className="h-10 w-10"
      />
    ),
    popularity: "19.0k",
    type: ["browser", "server"],
  },
  {
    id: "html-css",
    name: "HTML + CSS",
    platform: "CodeSandbox",
    icon: (
      <Image
        src="/placeholder.svg?height=40&width=40"
        alt="HTML logo"
        className="h-10 w-10"
      />
    ),
    popularity: "23.4k",
    type: ["browser"],
  },
  {
    id: "nextjs",
    name: "Next.js",
    platform: "CodeSandbox",
    icon: (
      <Image
        src="/placeholder.svg?height=40&width=40"
        alt="Next.js logo"
        className="h-10 w-10"
      />
    ),
    popularity: "88.3k",
    type: ["browser", "server"],
  },
];

export function CreateProject() {
  const { isOpen, onClose, type } = useModal();
  // const { user } = data;
  const isModelOpen = isOpen && type === "createProject";

  const [step, setStep] = useState<"select" | "configure">("select");
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [filter, setFilter] = useState("popular");

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template);
    setStep("configure");
  };

  const handleBack = () => {
    setStep("select");
    setSelectedTemplate(null);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isModelOpen} onOpenChange={handleClose}>
      {/* <Button onClick={() => setOpen(true)}>Create New</Button> */}
      <DialogContent className="sm:max-w-[800px] bg-zinc-950 text-white">
        {step === "select" ? (
          <>
            <DialogHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <DialogTitle>Create</DialogTitle>
                {/* <Button
                  size="icon"
                  variant="ghost"
                  className="text-zinc-400 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button> */}
              </div>
              <div className="flex items-center justify-between">
                <Tabs
                  value={filter}
                  onValueChange={setFilter}
                  className="w-full"
                >
                  <TabsList className="bg-zinc-900">
                    <TabsTrigger
                      value="popular"
                      className="data-[state=active]:bg-violet-600"
                    >
                      Popular
                    </TabsTrigger>
                    <TabsTrigger
                      value="browser"
                      className="data-[state=active]:bg-violet-600"
                    >
                      <Box className="mr-2 h-4 w-4" />
                      Browser
                    </TabsTrigger>
                    <TabsTrigger
                      value="server"
                      className="data-[state=active]:bg-violet-600"
                    >
                      <Server className="mr-2 h-4 w-4" />
                      Server
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-400" />
                  <Input
                    placeholder="Search templates"
                    className="pl-8 bg-zinc-900 border-zinc-800"
                  />
                </div>
              </div>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {templates
                .filter((t) =>
                  filter === "popular"
                    ? true
                    : t.type.includes(filter as "browser" | "server")
                )
                .map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateSelect(template)}
                    className="flex items-start gap-4 p-4 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-left"
                  >
                    {template.icon}
                    <div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-zinc-400">
                        {template.platform}
                      </p>
                      <p className="text-sm text-zinc-500 mt-2">
                        {template.popularity} starts
                      </p>
                    </div>
                  </button>
                ))}
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  className="text-zinc-400 hover:text-white"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                {/* <Button
                  size="icon"
                  variant="ghost"
                  className="text-zinc-400 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button> */}
              </div>
            </DialogHeader>
            <div className="space-y-6 mt-6">
              <div className="flex items-start gap-4">
                {selectedTemplate?.icon}
                <div>
                  <h2 className="text-lg font-semibold">
                    {selectedTemplate?.name}
                  </h2>
                  <p className="text-sm text-zinc-400">
                    {selectedTemplate?.platform}
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    placeholder="my-awesome-project"
                    className="bg-zinc-900 border-zinc-800"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Visibility</label>
                    <Select>
                      <SelectTrigger className="bg-zinc-900 border-zinc-800">
                        <SelectValue placeholder="Select visibility" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="private">Private</SelectItem>
                        <SelectItem value="public">Public</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Folder</label>
                    <Select>
                      <SelectTrigger className="bg-zinc-900 border-zinc-800">
                        <SelectValue placeholder="Select folder" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="drafts">Drafts</SelectItem>
                        <SelectItem value="projects">Projects</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Runtime</label>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2 p-4 rounded-lg border border-violet-600 bg-zinc-900">
                      <div className="flex items-center gap-2">
                        <Cube className="h-5 w-5" />
                        <span className="font-medium">Sandbox</span>
                      </div>
                      <p className="text-sm text-zinc-400">
                        Ideal for prototyping and sharing code snippets. Runs on
                        the browser.
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 p-4 rounded-lg border border-zinc-800 bg-zinc-900">
                      <div className="flex items-center gap-2">
                        <Server className="h-5 w-5" />
                        <span className="font-medium">Devbox</span>
                      </div>
                      <p className="text-sm text-zinc-400">
                        Ideal for any type of project, language or size. Runs on
                        a server.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-6">
              <Select defaultValue="default">
                <SelectTrigger className="w-[180px] bg-zinc-900 border-zinc-800">
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">prayanshparmar</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={handleClose}>
                  Cancel
                </Button>
                <Button className="bg-[#A2FF66] text-black hover:bg-[#92E65C]">
                  Create Sandbox
                </Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
