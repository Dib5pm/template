import { DashboardLayout } from "components/layouts/dashboard";
import { ReactElement } from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

const settings = () => {
  return <div>settings</div>;
};

export default settings;

settings.getLayout = function getLayout(page: ReactElement) {
  return (
    <SessionAuth>
      <DashboardLayout>{page}</DashboardLayout>
    </SessionAuth>
  );
};
