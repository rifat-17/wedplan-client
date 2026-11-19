import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("wedplan");

export const auth = betterAuth({
    emailAndPassword: {
        enabled: true,
        minPasswordLength: 6,
        maxPasswordLength: 128,
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        },
    },

    user: {
        modelName: "users",

        additionalFields: {
            role: {
                type: ["CUSTOMER", "VENDOR", "ADMIN"],
                required: false,
                defaultValue: "CUSTOMER",
                input: true,
            },

            isBlocked: {
                type: "boolean",
                required: false,
                defaultValue: false,
                input: false,
            },

            subscriptionPlan: {
                type: ["FREE", "PREMIUM"],
                required: false,
                defaultValue: "FREE",
                input: false,
            },

            businessName: {
                type: "string",
                required: false,
                input: false,
            },
        },
    },

    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            if (ctx.path === "/sign-up/email") {
                const password = ctx.body?.password;
                const role = ctx.body?.role;

                if (
                    typeof password !== "string" ||
                    password.length < 6 ||
                    !/[A-Z]/.test(password) ||
                    !/[a-z]/.test(password)
                ) {
                    throw new APIError("BAD_REQUEST", {
                        message:
                            "Password must contain at least 6 characters, including uppercase and lowercase letters.",
                    });
                }

                if (
                    role !== undefined &&
                    role !== "CUSTOMER" &&
                    role !== "VENDOR"
                ) {
                    throw new APIError("BAD_REQUEST", {
                        message: "Invalid account role.",
                    });
                }

                return;
            }

            // Do not allow role changes through other Better Auth endpoints.
            if (ctx.body?.role !== undefined) {
                throw new APIError("FORBIDDEN", {
                    message: "You cannot change your account role.",
                });
            }
        }),
    },

    plugins: [jwt()],
    session: {
        cookieCache: {
            enabled: true,
            strategy: 'jwt',
            maxAge: 7 * 24 * 60 * 60
        }
    },

    database: mongodbAdapter(db, {
        client,
    }),
});