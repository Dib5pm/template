import { DashboardLayout } from "components/layouts/dashboard/dashboard";
import { ReactElement } from "react";
import { SessionAuth } from "supertokens-auth-react/recipe/session";

import { Separator } from "components/ui/separator";
import { ProfileForm } from "components/settings/profile-form";
import SettingsLayout from "components/layouts/settings/settingsLayout";
import { OrganizationForm } from "components/settings/organizations/oranization-form";

const SettingsProfilePage = () => {
  return (
    <SettingsLayout>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Organization</h3>
          <p className="text-sm text-muted-foreground">
            On this page you can select a different organization to view the
            teams of that organization
          </p>
        </div>
        <Separator />
        <OrganizationForm />
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
