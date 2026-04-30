import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes.constants";

export default function Page() {
  redirect( ROUTES.MESSAGES.ROOT );
}
