import {
  SessionAuth,
  useSessionContext,
} from "supertokens-auth-react/recipe/session";

import { Button } from "components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs";
import { ReactElement } from "react";
import { DashboardLayout } from "components/layouts/dashboard";

const Home = () => {
  const session = useSessionContext();

  async function fetchUserData() {
    const res = await fetch("http://localhost:8000/sessioninfo");
    if (res.status === 200) {
      const json = await res.json();
      alert(JSON.stringify(json));
    }
  }

  if (session.loading === true) {
    return null;
  }

  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-2">
        <div className="flex items-center justify-between space-y-2">
          <div className="space-y-0.5">
            <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">Manage your projects</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button>Download</Button>
          </div>
        </div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="reports" disabled>
              Reports
            </TabsTrigger>
            <TabsTrigger value="notifications" disabled>
              Notifications
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4"></TabsContent>
          <TabsContent value="analytics" className="space-y-4">
            <div>
              <div>Login successful</div>
              <div>
                <div>Your userID is:</div>
                <div>{session.userId}</div>
                <Button className="mt-3" onClick={fetchUserData}>
                  Call API
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <SessionAuth>
      <DashboardLayout>{page}</DashboardLayout>
    </SessionAuth>
  );
};

export default Home;
