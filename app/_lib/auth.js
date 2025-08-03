import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { getGuest, registerGuest } from "./data-service";

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
} = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  secret: process.env.NEXT_AUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      // Register user in MongoDB via backend if not exists
      try {
        await registerGuest({
          fullName: user.name,
          email: user.email,
          image: user.image,
        });
      } catch (err) {
        // If user already exists, continue
        if (err.message === "Email already registered") {
          return true;
        }
        // Otherwise, block sign in
        return false;
      }
      return true;
    },
    authorized: ({ auth, request }) => {
      return !!auth?.user;
    },
    async session({ session }){
      const guest = await getGuest(session.user.email);
      session.user = { ...session.user, ...guest };
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
});
