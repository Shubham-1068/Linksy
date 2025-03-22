import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const authOptions = NextAuth({
    providers:[
        GithubProvider({
            clientId: "Ov23liG2BayQcIjyVPO9",
            clientSecret: "838bd418d05dbcd34842b97e26df4eec4744290b"
        })
    ]
})


export {authOptions as GET, authOptions as POST}