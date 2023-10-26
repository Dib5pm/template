import SessionReact from "supertokens-auth-react/recipe/session";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

import { Button } from "components/ui/button";
import DashboardPage from "components/dashboard";

interface ILink {
  name: string;
  onClick: () => void;
  icon: string;
}

function ProtectedPage() {
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
    <DashboardPage>
      <div>
        <div>Login successful</div>
        <div>
          <div>Your userID is:</div>
          <div>{session.userId}</div>
          <Button onClick={fetchUserData}>Call API</Button>
        </div>
      </div>
    </DashboardPage>
  );
}

export default function Home() {
  return (
    <SessionReact.SessionAuth>
      <ProtectedPage />
    </SessionReact.SessionAuth>
  );
}
