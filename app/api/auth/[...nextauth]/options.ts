import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import ConnectDB from "@/app/lib/connection";
import User from "@/app/models/User";

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt", // Use JWT for session storage
    maxAge: 30 * 24 * 60 * 60, // Set session expiration to 30 days (optional)
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await ConnectDB();
      try {
        const existingUser = await User.findOne({ email: user.email });

        if (existingUser) {
          const { name: existIngName, email: existingEmail } = existingUser;
          const { name: newName, email: newEmail } = user;
          if (existIngName !== newName || existingEmail !== newEmail) {
            await User.updateOne(
              { email: user.email },
              { $set: { name: newName, email: newEmail } }
            );
          }
        } else {
          await User.create({
            name: user.name,
            email: user.email,
          });
        }
        return true;
      } catch (error) {
        console.error("Error while performing user operation", error);
        return false;
      }
    },

    async session({ session, user, token }) {
      // Return the session object as is
      return session;
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};
