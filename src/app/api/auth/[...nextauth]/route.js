import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import CredentialsProvider from "next-auth/providers/credentials";
import Email from "next-auth/providers/email";
import { headers } from "next/headers";


export const authOptions = {
  pages: {
    signIn: "/login",
  },
  callbacks :{
    async jwt({token,user,account}){
      console.log('data is here',account)

      return{...token,...user,...account}
    },
    async session ({session,token}) {

      return {...session,...token}

    }

  },
  providers: [
    GoogleProvider({
      clientId:process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    CredentialsProvider(
      
      { async authorize(credentials, req) {

        const datavalue ={

          body: JSON.stringify({
            email:credentials?.email,
            password:credentials?.password

          }),

          headers: {
            'content-type':'application/json'
          },

          method:'POST'
          
        }
       const res = await fetch('https://exam.elevateegy.com/api/v1/auth/signin',datavalue )
      

       const user = await res.json()

       if(user?.user?.email === credentials?.email) return user;

       return null;

    } ,

    credentials:{
      email:{type : 'email' },
      password:{type:'password'}     

    }
  
  }),

  ],
};


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };







