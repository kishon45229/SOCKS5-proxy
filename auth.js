import { USER } from "./config.js";

export function handleAuth(username, password) {
  return username === USER.username && password === USER.password;
}
