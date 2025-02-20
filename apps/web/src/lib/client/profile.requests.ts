import { ProfileResponse } from "@/types/api";
import { getRequest } from "./common";

async function me() {
  return getRequest<ProfileResponse>("/accounts/me");
}

export const profile = {
  me,
};
