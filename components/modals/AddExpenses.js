import Modal from "@/components/Modal";
import { useState, useContext } from "react";
import { stateHelper } from "@/lib/store/stateHelper";
import { v4 as uuidv4 } from "uuid";

export default function AddExpenses({ show, onClose }) {
  const [expenseAmount, setExpenseAmount] = useState(" ");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { expenses } = useContext(stateHelper);

  const addExpenseHandler = async () => {
    const expense = expenses.find((e) => {
      return e.id === selectedCategory;
    });

    const newExpense = {
      color: expense.color,
      title: expense.title,
      total: expense.total + +expenseAmount,
      items: [
        ...expense.items,
        {
          amount: +expenseAmount,
          createdAt: new Date(),
          id: uuidv4(),
        },
      ],
    };

    console.log(newExpense);
    setExpenseAmount(" ");
    setSelectedCategory(null);
    onClose();
  };

  return (
    <Modal showModal={show} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <label htmlFor="amount">Enter Amount</label>
        <input
          type="number"
          // name="amount"
          // ref={amountRef}
          min={0.01}
          step={0.01}
          placeholder="Enter Expense Amount"
            value={expenseAmount}
          onChange={(e) => setExpenseAmount(e.target.value)}
        //   required
        />
      </div>
      {/* Expense Categories */}
      {expenseAmount > 0 && (
        <div className="flex flex-col gap-4 mt-6">
            <h3 className="text-xl capitalize">Select expense Category</h3>
          {expenses.map((expense) => {
            return (
              <button
                key={expense.id}
                onClick={() => {
                  setSelectedCategory(expense.id);
                }}
              >
                <div
                  style={{
                    boxShadow:
                      expense.id === selectedCategory ? "1px 1px 4px" : "none",
                  }}
                  className="flex items-center justify-between px-4 py-4 bg-gray-800  rounded-3xl"
                >
                  <div className="flex items-center gap-2">
                    {/* Colored Circle */}
                    <div
                      className="w-[25px] h-[25px] rounded-full"
                      style={{
                        backgroundColor: expense.color,
                      }}
                    />
                    {/* Expense Name */}
                    <h4 className="capitalize">{expense.title}</h4>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {expenseAmount > 0 && selectedCategory && (
        <div className="mt-6">
          <button className="btn btn-primary" onClick={addExpenseHandler}>
            Add Expense
          </button>
        </div>
      )}
    </Modal>
  );
}
