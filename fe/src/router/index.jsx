import React, { lazy, Suspense } from "react";

import { useRouter } from "../context/router";

import {useAPI} from "../api"

import routerStyles from "./styles/router.module.css";

import { matchPath, routeMap } from "./utils";

const NotFound = lazy(() => import("../system/not_found"))

import Loader from "../components/loader";

export default function Router() {
  const { currentPath } = useRouter();
  
  const matchedRoute = routeMap.find((r) => matchPath({path: currentPath, routePath: r.path}) !== null);

  const params = matchedRoute ? matchPath({path: currentPath, routePath: matchedRoute.path}) : {};

  const RouteComponent = matchedRoute ? matchedRoute.component : null;

  const {data, loading, error} = useAPI({initialUrl: matchedRoute?.fetchTarget })

  if (loading) return <div className={routerStyles?.loading}><div className={routerStyles?.message}>{`Loading ${matchedRoute?.title} from data...`}</div></div>;
  if (error) return <div className={routerStyles?.error}><div className={routerStyles?.message}>{`Error loading ${matchedRoute?.title} from data`}</div></div>;

  return (
    <main className={routerStyles.wrapper}>
      <div className={routerStyles.container}>
      <Suspense fallback={<Loader type={"circular"} additionalClassName={routerStyles?.loader}/>}>
          {RouteComponent ? (
            <RouteComponent params={params} data={data?.data} />
          ) : (
            <NotFound/>
          )}
        </Suspense>
      </div>
    </main>
  );
}
