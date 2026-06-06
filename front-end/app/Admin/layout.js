import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";

import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}) {
  const session =
    await getServerSession(
      authOptions
    );

  if (!session) {
    redirect("/sign_in");
  }

  if (
    session.user.email !==
    "rangmanchexhibition@gmail.com"
  ) {
    redirect("/");
  }

  return children;
}