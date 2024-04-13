import { NextAuthOptions, Session } from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import ConnectDB from "@/app/lib/connection";
import User from "@/app/models/User";
import connectDB from "@/app/lib/connection";

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
    async signIn({ user }) {
      await ConnectDB();
      try {
        const existingUser = await User.findOne({ email: user.email });

        if (existingUser) {
          const {
            name: existIngName,
            email: existingEmail,
            image: existingImage,
          } = existingUser;
          const { name: newName, email: newEmail, image: newImage } = user;
          if (
            existIngName !== newName ||
            existingEmail !== newEmail ||
            existingImage !== newImage
          ) {
            await User.updateOne(
              { email: user.email },
              { $set: { name: newName, email: newEmail, image: newImage } }
            );
          }
        } else {
          // Generate username based on the user's first name
          let firstName = "";
          if (user.name) {
            if (user.name.includes(" ")) {
              firstName = user.name.split(" ")[0].toLowerCase();
            } else {
              firstName = user.name.toLowerCase();
            }
          } else {
            firstName = "anonymous"; // Default value when user.name is undefined
          }

          let username = firstName;
          let count = firstName.length;

          while (await User.findOne({ username })) {
            username = firstName + count;
            count = count + firstName.length;
          }

          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            username,
          });
        }
        return true;
      } catch (error) {
        console.error("Error while performing user operation", error);
        return false;
      }
    },

    async session({ session }: { session: any }) {
      // Return the session object as is
      if (session.user) {
        const sessionUser = await User.findOne({ email: session.user.email });
        session.user.id = sessionUser._id;
        session.user.username = sessionUser.username;
      }

      return session;
    },
    async jwt({ token, account }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};
