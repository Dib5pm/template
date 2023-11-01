import * as React from "react";
import {
  CaretSortIcon,
  ReloadIcon,
  PlusCircledIcon,
  CheckIcon,
} from "@radix-ui/react-icons";

import { cn } from "lib/utils";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import axios from "axios";
import { IOrganization } from "types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface TeamSwitcherProps extends PopoverTriggerProps {}

export default function TeamSwitcher({ className }: TeamSwitcherProps) {
  const [open, setOpen] = React.useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = React.useState(false);
  const [teams, setTeams] = React.useState<IOrganization[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedTeam, setSelectedTeam] = React.useState<IOrganization | null>(
    null
  );

  React.useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:8000/teams/");
        setTeams(response.data);
        setSelectedTeam(response.data[0]);
      } catch (error) {
        console.error("An error occurred while fetching the teams:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  return (
    <Dialog open={showNewTeamDialog} onOpenChange={setShowNewTeamDialog}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a team"
            className={cn("w-[200px] justify-between", className)}
          >
            {selectedTeam ? (
              <>
                <Avatar className="mr-2 h-5 w-5">
                  <AvatarImage
                    src={`https://avatar.vercel.sh/${selectedTeam.id}.png`}
                    alt={selectedTeam.name}
                  />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="truncate ...">{selectedTeam.name}</div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{selectedTeam.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </>
            ) : (
              "Select a team"
            )}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          {loading ? (
            <Button disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Command>
              <CommandList>
                <CommandInput placeholder="Search team..." />
                {teams.length === 0 && (
                  <CommandEmpty>No team found.</CommandEmpty>
                )}
                {teams.map((team) => (
                  <CommandItem
                    key={team.id}
                    onSelect={() => {
                      setSelectedTeam(team);
                      setOpen(false);
                    }}
                    className="text-sm"
                  >
                    <Avatar className="mr-2 h-5 w-5">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/${team.id}.png`}
                        alt={team.name}
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <div className="truncate ...">{team.name}</div>
                    <CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedTeam && selectedTeam.id === team.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandList>
              <CommandSeparator />
              <CommandList>
                <CommandGroup>
                  <DialogTrigger asChild>
                    <CommandItem
                      onSelect={() => {
                        setOpen(false);
                        setShowNewTeamDialog(true);
                      }}
                    >
                      <PlusCircledIcon className="mr-2 h-5 w-5" />
                      Create Team
                    </CommandItem>
                  </DialogTrigger>
                </CommandGroup>
              </CommandList>
            </Command>
          )}
        </PopoverContent>
      </Popover>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create team</DialogTitle>
          <DialogDescription>
            Add a new team to manage products and customers.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="space-y-4 py-2 pb-4">
            <div className="space-y-2">
              <Label htmlFor="name">Team name</Label>
              <Input id="name" placeholder="Acme Inc." />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowNewTeamDialog(false)}>
            Cancel
          </Button>
          <Button type="submit">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
