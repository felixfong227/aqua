import type { Method, RegexRoute, StaticRoute, Route } from "../aqua.ts";

export function parseRequestPath(url: string) {
  return url.replace(/(\?(.*))|(\#(.*))/, "");
}

export function findRouteWithMatchingURLParameters(
  requestedPath: string,
  routes: { [path: string]: Route },
  method: Method,
): Route | undefined {
  return routes[
    Object.keys(routes).find((path: string) => {
      if (!path.includes(":")) return false;
      const route: Route = routes[path];

      return route.method === method &&
        requestedPath.replace(route.urlParameterRegex as RegExp, "")
            .length === 0;
    }) || ""
  ];
}

export function findMatchingRegexRoute(
  requestedPath: string,
  regexRoutes: RegexRoute[],
  method: Method,
): RegexRoute | undefined {
  return regexRoutes.find((route: RegexRoute) => {
    return route.method === method &&
      requestedPath.replace(route.path, "").length === 0;
  });
}

export function findMatchingStaticRoute(
  requestedPath: string,
  staticRoutes: StaticRoute[],
): StaticRoute | undefined {
  return staticRoutes.find((staticRoute) =>
    requestedPath.startsWith(staticRoute.path)
  );
}
