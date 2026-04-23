import { FriendStatus } from "@prisma/client";

export const STATUS_FRIENDS_REQ: { [key in FriendStatus]: FriendStatus } = {
  PENDING: "PENDING",
  ACCEPTED: "ACCEPTED",
  BLOCKED: "BLOCKED",
};
