import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),

    CredentialsProvider({
      name: "credentials",

      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        try {
          await connectDB();

          const user = await User.findOne({
            email: credentials.email,
          });

          if (!user) {
            throw new Error("User not found");
          }

          const isPasswordCorrect =
            await bcrypt.compare(
              credentials.password,
              user.password
            );

          if (!isPasswordCorrect) {
            throw new Error("Invalid password");
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
          };
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],

  pages: {
    signIn: "/sign_in",
  },

  secret: process.env.AUTH_SECRET,

  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account.provider === "google") {
          await connectDB();

          const existingUser =
            await User.findOne({
              email: user.email,
            });

          if (!existingUser) {
            await User.create({
              name: user.name,
              email: user.email,
              password: "GOOGLE_AUTH_USER",
            });
          }
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    async session({ session }) {
      await connectDB();

      const dbUser = await User.findOne({
        email: session.user.email,
      });

      if (dbUser) {
        session.user.id =
          dbUser._id.toString();
      }

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
};