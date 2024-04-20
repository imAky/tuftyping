import NextAuth from "next-auth/next";
import { options } from "./options";

export const handler = NextAuth(options) as never;

export { handler as GET, handler as POST };
