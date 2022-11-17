import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const providers = [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  }),
];

export const authOptions = {
  providers,
  secret: process.env.NEXTAUTH_SECRET,
};

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    providers,
  });
}
