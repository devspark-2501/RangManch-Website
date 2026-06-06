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

          if (
            user.password ===
            "GOOGLE_AUTH_USER"
          ) {
            throw new Error(
              "Please login using Google"
            );
          }

          const isPasswordCorrect =
            await bcrypt.compare(
              credentials.password,
              user.password
            );

          if (!isPasswordCorrect) {
            throw new Error(
              "Invalid password"
            );
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
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
        if (
          account.provider === "google"
        ) {
          await connectDB();

          const existingUser =
            await User.findOne({
              email: user.email,
            });

          if (!existingUser) {
            await User.create({
              name: user.name,
              email: user.email,
              password:
                "GOOGLE_AUTH_USER",

              role:
                user.email ===
                "rangmanchexhibition@gmail.com"
                  ? "admin"
                  : "user",
            });
          }
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    async jwt({ token }) {
      try {
        await connectDB();

        const dbUser =
          await User.findOne({
            email: token.email,
          });

        if (dbUser) {
          token.id =
            dbUser._id.toString();

          token.role =
            dbUser.role;
        }

        return token;
      } catch (error) {
        console.error(error);
        return token;
      }
    },

    async session({
      session,
      token,
    }) {
      if (session?.user) {
        session.user.id =
          token.id;

        session.user.role =
          token.role;
      }

      return session;
    },
  },

  session: {
    strategy: "jwt",
  },
};