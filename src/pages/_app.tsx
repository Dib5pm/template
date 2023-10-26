import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
import SuperTokensReact, {
  SuperTokensWrapper,
  redirectToAuth,
} from "supertokens-auth-react";
import * as SuperTokensConfig from "../config/frontendConfig";
import Session, { SessionAuth } from "supertokens-auth-react/recipe/session";
import "../styles/global.css";
import { NextPage } from "next";

if (typeof window !== "undefined") {
  SuperTokensReact.init(SuperTokensConfig.frontendConfig());
}

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp: React.FC<AppPropsWithLayout> = ({
  Component,
  pageProps,
  router: { route },
}) => {
  useEffect(() => {
    async function doRefresh() {
      if (pageProps.fromSupertokens === "needs-refresh") {
        if (await Session.attemptRefreshingSession()) {
          location.reload();
        } else {
          // user has been logged out
          redirectToAuth();
        }
      }
    }
    doRefresh();
  }, [pageProps.fromSupertokens]);
  if (pageProps.fromSupertokens === "needs-refresh") {
    return null;
  }

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SuperTokensWrapper>
      {getLayout(<Component {...pageProps} />)}
    </SuperTokensWrapper>
  );
};

export default MyApp;
