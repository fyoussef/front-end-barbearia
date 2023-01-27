import { parseCookies } from "nookies";

export function getClientToken(ctx?: any) {
  const { user_token: token } = parseCookies(ctx);

  return token;
}
