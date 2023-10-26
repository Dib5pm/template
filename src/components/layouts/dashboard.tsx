import { Metadata } from "next";
import Image from "next/image";

import { Button } from "../ui/button";

import { ReactNode } from "react";
import { UserNav } from "../user.nav";
import { MainNav } from "../main-nav";
import TeamSwitcher from "../team-switcher";
import SessionReact from "supertokens-auth-react/recipe/session";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Example dashboard app built using the components.",
};

interface DashboardPageProps {
  children?: ReactNode;
}

export const DashboardLayout: React.FunctionComponent<DashboardPageProps> = ({
  children,
}) => {
  return (
    <>
      <div className="md:hidden">
        <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        />
      </div>
      <div className="hidden flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <TeamSwitcher />
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <Button>Download</Button>
            </div>
          </div>
          {children}
        </div>
      </div>
    </>
  );
};
