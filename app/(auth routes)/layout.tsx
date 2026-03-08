"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { checkSession } from "@/lib/api/serverApi";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      try {
        const response = await checkSession();
        if (response.status === 200 && response.data.success) {
          router.push("/notes");
        }
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, [router]);

  if (loading) {
    return <div>Перевірка сесії...</div>;
  }

  return <>{children}</>;
}
