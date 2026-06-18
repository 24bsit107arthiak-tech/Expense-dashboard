import { useState } from "react";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("Expense");

  const addTransaction = () => {
    if (!amount || !category) {
      alert("Please fill all fields");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      amount: Number(amount),
      category,
      type,
    };

    setTransactions([...transactions, newTransaction]);
    setAmount("");
    setCategory("");
  };

  const deleteTransaction = (id) => {
    setTransactions(
      transactions.filter((item) => item.id !== id)
    );
  };

  const income = transactions
    .filter((item) => item.type === "Income")
    .reduce((sum, item) => sum + item.amount, 0);

  const expense = transactions
    .filter((item) => item.type === "Expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = income - expense;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Daily Expense Analytics Dashboard</h1>

      <h2>Balance: ₹{balance}</h2>

      <p>Total Income: ₹{income}</p>
      <p>Total Expense: ₹{expense}</p>

      <hr />

      <h2>Add Transaction</h2>

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br /><br />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option>Income</option>
        <option>Expense</option>
      </select>

      <br /><br />

      <button onClick={addTransaction}>
        Add Transaction
      </button>

      <hr />

      <h2>Transaction History</h2>

      {transactions.length === 0 ? (
        <p>No transactions added.</p>
      ) : (
        <ul>
          {transactions.map((item) => (
            <li key={item.id}>
              {item.category} - ₹{item.amount} - {item.type}

              <button
                style={{ marginLeft: "10px" }}
                onClick={() => deleteTransaction(item.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;