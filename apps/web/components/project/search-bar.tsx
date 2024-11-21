"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { FaGithub } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";

interface SearchBarProps {
  data: {
    label: string;
    type: "project" | "workspace";
    data:
      | {
          icon?: React.ReactNode;
          name: string;
          id: string;
        }[]
      | undefined;
  }[];
}

const SearchBar = ({ data }: SearchBarProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState<string>(searchParams?.get("q") || "");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    const newParams = new URLSearchParams(searchParams?.toString());
    if (value) {
      newParams.set("q", value);
    } else {
      newParams.delete("q");
    }
    router.push(`?${newParams.toString()}`);
  };

  const onClick = ({
    id,
    type,
  }: {
    id: string;
    type: "project" | "workspace";
  }) => {
    console.log(id, type);
  };
  return (
    <>
      <div className="relative flex-1 w-auto">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-8"
          placeholder="Search Projects..."
          type="search"
          value={query}
          onChange={handleSearch}
        />
        <kbd className="pointer-events-none absolute right-2 top-2 hidden h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </div>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {data.map(({ label, type, data }) => {
            if (!data?.length) return null;

            return (
              <CommandGroup key={label} heading={label}>
                {data?.map(({ id, icon, name }) => {
                  return (
                    <CommandItem
                      key={id}
                      onSelect={() => onClick({ id, type })}
                      className="flex items-center cursor-pointer"
                    >
                      {icon}
                      {type === "project" && <FaGithub />}
                      <span>{name}</span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            );
          })}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default SearchBar;
