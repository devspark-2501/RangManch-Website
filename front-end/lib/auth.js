import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        return {
          id: "1",
          email: credentials.email,
          name: "Demo User",
        };
      },
    }),
  ],

  pages: {
    signIn: "/sign_in",
  },
});