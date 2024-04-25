import { options } from "@/app/api/auth/[...nextauth]/options";
import { fetchTransactionDetails } from "@/app/lib/admin";
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
    <div className="flex min-h-screen bg-slate-300">
      <div className="w-2/6 ">Transaction</div>
      <main>{children}</main>
    </div>
  );
}
