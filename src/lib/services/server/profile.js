import { serverFetch } from "@/lib/api/server-api";

export const serverProfileService = {
    getMe: () => serverFetch("/user/v1/get-my-profile"),
};