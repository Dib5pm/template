import { DashboardLayout } from "components/layouts/dashboard/dashboard";
import { ReactElement } from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

import { Separator } from "components/ui/separator";
import { ProfileForm } from "components/settings/profile-form";
import SettingsLayout from "components/layouts/settings/settingsLayout";

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
        <ProfileForm />
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
