import GoogleProvider from "next-auth/providers/google";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  pages: {
    signIn: "/sign_in",
  },

  secret: process.env.AUTH_SECRET,

  callbacks: {
    async signIn({ user }) {
      try {
        await connectDB();

        const existingUser = await User.findOne({
          email: user.email,
        });

        if (!existingUser) {
          await User.create({
            name: user.name,
            email: user.email,

            // Google users don't have password
            password: "GOOGLE_AUTH_USER",
          });
        }

        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },

    async session({ session }) {
      try {
        await connectDB();

        const dbUser = await User.findOne({
          email: session.user.email,
        });

        if (dbUser) {
          session.user.id = dbUser._id.toString();
        }

        return session;
      } catch (error) {
        console.error(error);
        return session;
      }
    },
  },
};