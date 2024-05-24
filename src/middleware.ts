import authConfig from "@/auth.config";
import NextAuth from "next-auth";
const { auth } = NextAuth(authConfig);

import {
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT,
  apiAdminPrefix,
  apiWebhookPrefix,
} from "@/routes";
import { CurrentUserRole } from "./lib/current-user";

// @ts-ignore
export default auth(async (req) => {
  const { nextUrl } = req;
  const isLogIn = !!req.auth;

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAdminRoute = nextUrl.pathname.startsWith(apiAdminPrefix);
  const isApiWebhookRoute = nextUrl.pathname.startsWith(apiWebhookPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  //   User allow to login or register API access
  if (isApiAuthRoute) {
    return null;
  }
  //   User allow to go Stripe
  if (isApiWebhookRoute) {
    return null;
  }

  //   User allow to login or register page. If login redirect to default page
  if (isAuthRoute) {
    if (isLogIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }
  //   Allow Admin to the admin route. If login redirect to default page
  const userRole = await CurrentUserRole();
  if (isAdminRoute) {
    if (userRole !== "ADMIN") {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return null;
  }

  //   Logout user can't visit the spesific page
  if (!isLogIn && !isPublicRoute) {
    // User trying to visite procected route redirect to login after logit redirect the previous page
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    // The route
    return Response.redirect(
      new URL(`/signin?callbackUrl=${encodedCallbackUrl}`, nextUrl)
    );
  }
  return null;
});

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
