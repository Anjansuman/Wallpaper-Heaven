import GoogleProvider from "next-auth/providers/google";

import NextAuth from "next-auth";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: "adf",
            clientSecret: "das"
        }),
    ]
});

export { handler as GET, handler as POST };