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
} from "../../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../../ui/command";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Label } from "../../ui/label";

import { Input } from "../../ui/input";
import axios from "axios";
import { IOrganization } from "types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import { useEffect, useState } from "react";
import { useToast } from "../../ui/use-toast";
import { getApiDomain } from "@/config/configSettings";
import { getFormattedDate } from "logic/getFormattedDate";

interface TeamSwitcherProps
  extends React.ComponentPropsWithoutRef<typeof PopoverTrigger> {
  className?: string;
}

const TeamSwitcher: React.FC<TeamSwitcherProps> = ({
  className,
}): JSX.Element => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [showNewTeamDialog, setShowNewTeamDialog] = useState(false);
  const [teams, setTeams] = useState<IOrganization[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState<IOrganization | null>(null);
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(getApiDomain() + "/teams/get_teams");
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

  async function handleContinueClick() {
    try {
      const response = await axios.post(getApiDomain() + "/teams/create_team", {
        team_name: teamName,
      });

      const currentDate = new Date();
      getFormattedDate(currentDate);
      setShowNewTeamDialog(false);
      toast({
        title: `Added team ${response.data.name}`,
        description: `${getFormattedDate(currentDate)}`,
      });
    } catch (error) {
      console.error("An error occurred while creating the team:", error);
    }
  }

  return (
    <>
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
                  <CommandInput placeholder="Type a command or search..." />
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
                <Input
                  id="name"
                  placeholder="Acme Inc."
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewTeamDialog(false)}
            >
              Cancel
            </Button>
            <Button type="submit" onClick={handleContinueClick}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TeamSwitcher;
