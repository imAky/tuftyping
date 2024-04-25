import { fetchTransactionDetails } from "@/app/lib/admin";

export default async function Transaction() {
  const transactionDetails: any = await fetchTransactionDetails();
  console.log("transction", transactionDetails);

  return (
    <div className="text-black">
      <h1>Transaction Details</h1>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Prize</th>
            <th>Username</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {transactionDetails.map((transaction: any) => (
            <tr key={transaction._id}>
              <td>{transaction.userId._id}</td>
              <td>{transaction.prize}</td>
              <td>{transaction.userId.username}</td>
              <td>{transaction.userId.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
