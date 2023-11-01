import ThirdPartyReact from "supertokens-auth-react/recipe/thirdparty";
import { ThirdPartyPreBuiltUI } from "supertokens-auth-react/recipe/thirdparty/prebuiltui";
import SessionReact from "supertokens-auth-react/recipe/session";
import { appInfo } from "./appInfo";
import Router from "next/router";

export let frontendConfig = () => {
  return {
    appInfo,
    // recipeList contains all the modules that you want to
    // use from SuperTokens. See the full list here: https://supertokens.com/docs/guides
    recipeList: [
      ThirdPartyReact.init({
        signInAndUpFeature: {
          termsOfServiceLink: "https://example.com/terms-of-service",
          privacyPolicyLink: "https://example.com/privacy-policy",
          style: `
                    [data-supertokens="superTokensBranding"] {
                        display: none;
                    }
                    [data-supertokens~=container] {
                        font-family: Inter, sans-serif;
                    }
                    [data-supertokens="providerButtonText"] {
                      font-family: Inter, sans-serif;
                    }
                    [data-supertokens="row"] {
                      padding-bottom: 50px;
                    }
                    [data-supertokens~="headerTitle"] {
                      letter-spacing: -0.42px;
                      font-size: 20px;
                    }
                    [data-supertokens~="privacyPolicyAndTermsAndConditions"] {
                      margin-top: 20px;
                      font-size: 12px;
                    }
                    [data-supertokens~="privacyPolicyAndTermsAndConditions"] a {
                      font-size: 12px;
                    }
                `,
          providers: [ThirdPartyReact.Google.init()],
        },
      }),
      SessionReact.init(),
    ],
    // this is so that the SDK uses the next router for navigation
    windowHandler: (oI: any) => {
      return {
        ...oI,
        location: {
          ...oI.location,
          setHref: (href: string) => {
            Router.push(href);
          },
        },
      };
    },
  };
};

export const recipeDetails = {
  docsLink: "https://supertokens.com/docs/thirdparty/introduction",
};

export const PreBuiltUIList = [ThirdPartyPreBuiltUI];
