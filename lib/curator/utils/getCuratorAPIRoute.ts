import { curatorAPIKey, curatorBaseAPIRoute } from "../../constants";
import { CuratorFunctions } from "../../types";

export const curatorAPIRouteBuilder = (path: string) => {
  return `${curatorBaseAPIRoute}${path}?api_key=${curatorAPIKey}`;
};

export const getCuratorAPIRoute = (
  fn: CuratorFunctions,
  custom?: {
    method: string;
    path: string;
  }
) => {
  if (custom) {
    return {
      method: custom.method,
      route: curatorAPIRouteBuilder(custom.path),
    };
  }

  switch (fn) {
    case "create-source": {
      return {
        route: curatorAPIRouteBuilder("/sources"),
        method: "POST",
      };
    }
    case "fetch-source": {
      return {
        route: curatorAPIRouteBuilder("/sources"),
        method: "GET",
      };
    }
    case "fetch-feeds": {
      return {
        route: curatorAPIRouteBuilder("/feeds"),
        method: "GET",
      };
    }

    default: {
      return {
        route: "",
        method: "",
      };
    }
  }
};
