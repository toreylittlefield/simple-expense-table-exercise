import "./styles.css";

export default function Start() {
  return (
    <div className="container">
      <h1>Expense Tracker - Start</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
      <div className="form-container">
        <form>
          <fieldset>
            <legend>Add / Edit Item</legend>
            <label>
              Name
              <input type="text" placeholder="name" />
            </label>
            <label>
              Amount
              <input type="text" placeholder="$100" />
            </label>
            <label>
              Category
              <input type="text" placeholder="food" />
            </label>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
