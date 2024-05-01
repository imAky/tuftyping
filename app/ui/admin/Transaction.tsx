import { fetchTransactionDetails } from "@/app/lib/admin";
import TransactionButton from "./TransactionButton";
import Link from "next/link";

export default async function Transaction() {
  const transactionDetails: any = await fetchTransactionDetails();

  return (
    <div className="overflow-y-auto h-full  rounded-3xl drop-shadow-2xl">
      <table className="w-full border-collapse text-xl rounded-lg ">
        <thead className="text-left sticky top-0 ">
          <tr className="bg-emerald-800 text-slate-50 ">
            <th className="p-4 font-light text-2xl  tracking-wider ">#</th>
            <th className="p-4 font-light text-2xl tracking-wider ">users</th>
            <th className="p-4 font-light text-2xl  tracking-wider">prize</th>
            <th className="p-4 font-light text-2xl  tracking-wider">Date</th>
            <th className="p-4  font-light text-2xl tracking-wider">email</th>
            <th className="p-4  font-light text-2xl tracking-wider">+</th>
          </tr>
        </thead>
        <tbody className="text-left ">
          {transactionDetails.map((transaction: any, index: any) => (
            <tr
              key={index}
              className={` ${
                index % 2 === 0
                  ? "bg-emerald-500 text-slate-600 text-lg rounded-3xl"
                  : "bg-emerald-700 text-slate-300 text-lg"
              } py-4 w-full`}
            >
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2 hover:text-blue-500">
                <Link href={`/profile/${transaction.user.username}`}>
                  {transaction.user.username}
                </Link>
              </td>
              <td className="px-4 py-2">{transaction.prize}</td>
              <td className="px-4 py-2">{transaction.createdAt}</td>
              <td className="px-4 py-2">{transaction.user.email}</td>
              <td className="px-4  py-2">
                <TransactionButton
                  transactionId={transaction.transactionId}
                  userId={transaction.user.userId}
                  prize={transaction.prize}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
