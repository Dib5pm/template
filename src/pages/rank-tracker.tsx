import { DashboardLayout } from "components/layouts/dashboard/dashboard";
import { ReactElement } from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

const RankTrackerPage = () => {
  return <p>RankTrackerPage</p>;
};

export default RankTrackerPage;

RankTrackerPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <SessionAuth>
      <DashboardLayout>{page}</DashboardLayout>
    </SessionAuth>
  );
};
