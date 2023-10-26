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
