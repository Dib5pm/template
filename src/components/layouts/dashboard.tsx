import { Metadata } from "next";

import { Button } from "../ui/button";

import { ReactNode } from "react";
import { UserNav } from "../user.nav";
import { MainNav } from "../main-nav";
import TeamSwitcher from "../team-switcher";

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
        {children}
      </div>
    </>
  );
};
