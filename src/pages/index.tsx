import Head from "next/head";
import SessionReact from "supertokens-auth-react/recipe/session";
import SuperTokensReact from "supertokens-auth-react";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { signOut } from "supertokens-auth-react/recipe/thirdparty";

import { recipeDetails } from "../config/frontendConfig";
import { Button } from "components/ui/button";

interface ILink {
  name: string;
  onClick: () => void;
  icon: string;
}

function ProtectedPage() {
  const session = useSessionContext();

  async function onLogout() {
    await signOut();
    window.location.href = "/";
  }

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

  function openLink(url: string) {
    window.open(url, "_blank");
  }

  const links: ILink[] = [
    {
      name: "Blogs",
      onClick: () => openLink("https://supertokens.com/blog"),
      icon: "",
    },
    {
      name: "Guides",
      onClick: () => openLink(recipeDetails.docsLink),
      icon: "",
    },
  ];

  return (
    <div>
      <Head>
        <title>SuperTokens 💫</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <div>Login successful</div>
        <div>
          <div>Your userID is:</div>
          <div>{session.userId}</div>
          <Button onClick={fetchUserData}>Call API</Button>
        </div>
        <Button onClick={onLogout}>log out</Button>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <SessionReact.SessionAuth>
      <ProtectedPage />
    </SessionReact.SessionAuth>
  );
}
