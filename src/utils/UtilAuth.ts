import { IAccountType } from "@/types/cookies";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { CookiesValue } from "@/types/cookies";

export class UtilAuth {
  static parseJwtToken(jwtToken: string) {
    try {
      if (!jwtToken.startsWith("Bearer ")) {
        const newJwt = "Bearer " + jwtToken;
        return newJwt;
      } else {
        return jwtToken;
      }
    } catch (error) {
      return "";
    }
  }

  static setJwtToken(jwtToken: string) {
    setCookie(process.env.LOGIN_TOKEN_NAME!, jwtToken);
  }

  static getCookies() {
    return getCookie(process.env.LOGIN_TOKEN_NAME!); 
  }

  static getCookiesParsed() {
    const cookieValue = getCookie(process.env.LOGIN_TOKEN_NAME!);
    const cookies = typeof cookieValue === 'string' ? cookieValue : "{}";
    return JSON.parse(cookies) as CookiesValue;
  }

  static isAuthed() {
    return Boolean(this.getCookies());
  }

  static onLogout() {
    deleteCookie(process.env.LOGIN_TOKEN_NAME!);
    location.href = "/no-auth/login";
  }

  static getJwtToken() {
    try {
      const cookie = getCookie(process.env.LOGIN_TOKEN_NAME!);
      return cookie;
    } catch (error) {
      console.error("UtilAuth > getJwtToken > Error", error);
      return null;
    }
  }

  static getAuthToken() {
    try {
      const cookie = `Bearer ${getCookie(process.env.LOGIN_TOKEN_NAME!)}`;
      return cookie;
    } catch (error) {
      console.error("UtilAuth > getJwtToken > Error", error);
      return null;
    }
  }

  static redirectLoginByRole(role: IAccountType | undefined) {
    if (!role) {
      location.href = "/no-auth/login";
      return;
    }
    
    if (role === IAccountType.Doctor) {
      location.href = "/doctor";
    } else if ([IAccountType.SuperAdmin, IAccountType.Admin].includes(role)) {
      location.href = "/admin";
    } else if (role === IAccountType.Patient) {
      location.href = "/patient/profile";
    }
  }

  static redirectUrlByRole(role: IAccountType | undefined) {
    if (role == null) return "/no-auth/login";
    if (role === IAccountType.Doctor) return "/doctor";
    else if ([IAccountType.SuperAdmin, IAccountType.Admin].includes(role)) return "/admin";
    else if (role === IAccountType.Patient) return "/patient";
    else return "/no-auth/login";
  }
}
