import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {

        // temporary demo auth

        if (
          credentials.email &&
          credentials.password
        ) {
          return {
            id: "1",
            name: "Vendor",
            email: credentials.email,
          };
        }

        return null;
      },
    }),
  ],

  pages: {
    signIn: "/sign_in",
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.AUTH_SECRET,
});