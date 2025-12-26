import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { FROM_EMAIL, resend } from "@lib/resend";
import { getResetPasswordEmailHtml } from "../email/reset_password_email";
import { prisma } from "@lib/prisma-client";
import {admin} from "better-auth/plugins"

export const auth = betterAuth({
  plugins: [admin()],
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [
    "http://localhost:3000", // your frontend URL
  ],
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, token, url }) => {
      try {
        const emailHtml = getResetPasswordEmailHtml(user.email, url);
        // Send the email using Resend
        const { data, error } = await resend.emails.send({
          from: FROM_EMAIL,
          to: user.email,
          subject: "Reset Your Password",
          html: emailHtml,
        });

        if (error) {
          throw new Error("Failed to send reset password email");
        }
        // In development, also log the URL for easy testing
        if (process.env.NODE_ENV === "development") {
          console.log("Reset URL (dev only):", url);
        }
      } catch (error) {
        throw error;
      }
    },
  },
  /* ,
    socialProviders:{
        google:{
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,   
        }
    } */
});
