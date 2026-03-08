import { redirect } from "next/navigation";
import { checkSession } from "@/lib/api/serverApi";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await checkSession();

  if (isAuth) {
    redirect("/notes");
  }

  return <>{children}</>;
}
