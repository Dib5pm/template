import { DashboardLayout } from "components/layouts/dashboard";
import { ReactElement } from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

import { Separator } from "components/ui/separator";
import SettingsLayout from "components/settings/layout/settingsLayout";
import { AccountForm } from "components/settings/account/account-form";

const SettingsProfilePage = () => {
  return (
    <SettingsLayout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            This is how others will see you on the site.
          </p>
        </div>
        <Separator />
        <AccountForm />
      </div>
    </SettingsLayout>
  );
};

export default SettingsProfilePage;

SettingsProfilePage.getLayout = function getLayout(page: ReactElement) {
  return (
    <SessionAuth>
      <DashboardLayout>{page}</DashboardLayout>
    </SessionAuth>
  );
};
