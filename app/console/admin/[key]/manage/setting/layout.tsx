import { options } from "@/app/api/auth/[...nextauth]/options";

import Transaction from "@/app/ui/admin/Transaction";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { key: string };
}>) {
  const session = await getServerSession(options);

  if (
    !session ||
    session.user?.email !== process.env.ADMIN_MAIL ||
    params.key !== process.env.ADMIN_KEY
  ) {
    redirect("/");
  }

  return (
    <div className="flex flex-col flex-wrap sm:flex-row min-h-screen bg-emerald-300">
      <div className="m-2">
        <Transaction />
      </div>
      <main className="flex-grow">{children}</main>
    </div>
  );
}
