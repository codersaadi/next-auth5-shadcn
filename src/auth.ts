import {  NextAuthResult } from "next-auth";
import { nextAuth } from "./modules/auth/auth";
export const { handlers, signIn, signOut, auth } : NextAuthResult = nextAuth 