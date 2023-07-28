import { useState } from "react";
import "./styles.css";

// Replace the placeholder data with the actual expenses data.
const initialState = [
  { id: 1, name: "Expense 1", amount: 50, category: "Food" },
  { id: 2, name: "Expense 2", amount: 100, category: "Transportation" }
  // Add more expenses as needed.
];

const initialSortedState = {
  name: "asc",
  category: "asc",
  amount: "asc"
};

export default function Finish() {
  const [expenses, setExpenses] = useState(initialState);
  const [name, setName] = useState("");
  const [cat, setCat] = useState("");
  const [id, setId] = useState(undefined);
  const [amount, setAmount] = useState(undefined);
  const [mode, setMode] = useState("add"); // add or edit
  const [sortedColumns, setSortedColumns] = useState(initialSortedState);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name || !cat || !amount) {
      console.error("must have a name, cat, and amount");
    } else {
      if (mode === "add") {
        handleAddItem();
      }
      if (mode === "edit") {
        handleUpdateItem();
      }
      resetState();
    }
  };

  const resetState = () => {
    setCat("");
    setAmount(undefined);
    setName("");
    setId(undefined);
    setMode("add");
  };

  const handleAddItem = () => {
    setExpenses((prev) => [
      ...prev,
      {
        amount: amount,
        category: cat,
        id: prev.length + 1,
        name: name
      }
    ]);
  };

  const handleUpdateItem = () => {
    setExpenses((prev) =>
      prev.map((expenseItem) => {
        if (expenseItem.id === id) {
          return {
            ...expenseItem,
            category: cat,
            name: name,
            amount: amount
          };
        } else {
          return expenseItem;
        }
      })
    );
  };

  const handleClickRow = (indexOfItem) => {
    const expenseItem = expenses[indexOfItem];
    console.info("edit", expenseItem);
    setCat(expenseItem.category);
    setName(expenseItem.name);
    setAmount(parseInt(expenseItem.amount));
    setId(expenseItem.id);
    setMode("edit");
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAmountChange = (e) => {
    setAmount(e.target.value ? parseInt(e.target.value) : undefined);
  };
  const handleCatChange = (e) => {
    setCat(e.target.value);
  };

  const sortByColumn = (propertyName) => {
    const isSortAsc = sortedColumns[propertyName] === "asc";
    setSortedColumns({
      ...sortedColumns,
      [propertyName]: isSortAsc ? "dsc" : "asc"
    });
    setExpenses((prev) =>
      prev
        .map((x) => x)
        .sort((a, b) => {
          const compareX = isSortAsc ? b : a;
          const compareY = compareX === a ? b : a;
          if (typeof a[propertyName] === "string") {
            return compareX[propertyName]
              .toLowerCase()
              .localeCompare(compareY[propertyName].toLowerCase());
          } else if (typeof a[propertyName] === "number") {
            return compareX[propertyName] - compareY[propertyName];
          }
        })
    );
  };

  const handleColumnClick = (columnName) => {
    console.info("handleColumnClick sort by: ", columnName);
    const propertyName = columnName.toLowerCase();
    if (propertyName in expenses[0]) {
      sortByColumn(propertyName);
    }
  };

  return (
    <div className="container">
      <h1>Expense Tracker - Finish</h1>
      <table>
        <thead>
          <tr>
            <th onClick={() => handleColumnClick("name")}>Name</th>
            <th onClick={() => handleColumnClick("amount")}>Amount</th>
            <th onClick={() => handleColumnClick("category")}>Category</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={expense.id} onClick={() => handleClickRow(index)}>
              <td>{expense.name}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Add / Edit Item</legend>
            <label>
              Name
              <input
                onChange={handleNameChange}
                type="text"
                placeholder="name"
                value={name}
              />
            </label>
            <label>
              Amount
              <input
                onChange={handleAmountChange}
                type="number"
                placeholder="100"
                value={amount ?? ""}
              />
            </label>
            <label>
              Category
              <input
                onChange={handleCatChange}
                type="text"
                placeholder="food"
                value={cat}
              />
            </label>
            <button>{mode === "add" ? "Add" : "Update"}</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
