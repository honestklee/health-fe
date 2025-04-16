import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import axios from "axios";
import { IAccountType } from "./types/cookies";
import { ALL_ADMINS } from "./types/cookies";

interface RouteGuard {
  url: string;
  roles: IAccountType[] | null;
}

export const RoutesGuard: RouteGuard[] = [
  { url: "/admin", roles: [IAccountType.SuperAdmin, IAccountType.Admin] },
  { url: "/doctor", roles: [IAccountType.Doctor] },
  { url: "/patient", roles: [IAccountType.Patient] },
  { url: "/no-auth", roles: null },
];

function isMatchDynamicRoute(pattern: string, path: string): boolean {
  const patternParts = pattern.split('/');
  const pathParts = path.split('/');

  if (patternParts.length !== pathParts.length) {
    return false;
  }

  return patternParts.every((part, index) => {
    if (part.startsWith(':')) {
      return true;
    }
    return part === pathParts[index];
  });
}

export async function middleware(request: NextRequest) {
  const authCookies = request.cookies.get(process.env.LOGIN_TOKEN_NAME ?? "");
  const routeGuard = RoutesGuard.find((item) => isMatchDynamicRoute(item.url, request.nextUrl.pathname));
  const isShouldAuthed = Array.isArray(routeGuard?.roles) && routeGuard.roles.length > 0;

  if (isShouldAuthed) {
    try {
      const respMe = await axios({
        url: process.env.NEXT_PUBLIC_API_URL + "/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${authCookies?.value}`,
        },
      });

      const accountType = respMe.data.data.user.account_type;
      const isCanAccess = routeGuard?.roles!.includes(accountType);
      
      if (!isCanAccess) return NextResponse.redirect(new URL("/403", request.url));
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          return NextResponse.redirect(new URL("/401", request.url));
        }
      }
    }
  } else if (routeGuard === undefined) {
    return NextResponse.redirect(new URL(`/404?prev_url=${request.nextUrl.pathname.replaceAll("/", "_")}`, request.url));
  } else {
    if (authCookies && routeGuard?.roles !== null) {
      try {
        const respMe = await axios({
          url: process.env.NEXT_PUBLIC_API_URL + "/me",
          method: "GET",
          headers: {
            Authorization: `Bearer ${authCookies?.value}`,
          },
        });
  
        const accountType = respMe.data.data.user.account_type;
  
        if (ALL_ADMINS.includes(accountType)) {
          return NextResponse.redirect(new URL("/admin", request.url));
        } else if (accountType === IAccountType.Patient) {
          return NextResponse.redirect(new URL("/patient", request.url));
        } else if (accountType === IAccountType.Doctor) {
          return NextResponse.redirect(new URL("/doctor", request.url));
        } else {
          return NextResponse.redirect(new URL(`/403?prev_url=${request.nextUrl.pathname}`, request.url));
        }
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            return NextResponse.redirect(new URL("/401", request.url));
          }
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = { matcher: "/((?!.*\\.).*)" };
