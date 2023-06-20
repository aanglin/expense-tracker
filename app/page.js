"use client";
import { useState, useContext, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { authContext } from "@/lib/store/auth-context";

import { currencyFormatter } from "@/util/format";
import ExpenseCategoryItems from "@/components/ExpenseCategoryItems";
import AddIncomeModal from "@/components/modals/AddIncomeModal";
import AddExpensesModal from "@/components/modals/AddExpenses";
import SignIn from "@/components/SignIn";
import { stateHelper } from "@/lib/store/stateHelper";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Home() {
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [balance, setBalance] = useState(0);
  const { expenses, income } = useContext(stateHelper);
  const { user } = useContext(authContext);


  useEffect(() => {
    const newBalance =
      income.reduce((total, e) => {
        return total + e.amount;
      }, 0) -
      expenses.reduce((total, i) => {
        return total + i.total;
      }, 0);
    setBalance(newBalance);
  }, [expenses, income]);

  if (!user) {
    return <SignIn />;
  }

  return (
    <>
      {/* Add Income Modal */}
      <AddIncomeModal show={showIncomeModal} onClose={setShowIncomeModal} />
      {/* Add Expenses Modal */}
      <AddExpensesModal show={showExpenseModal} onClose={setShowExpenseModal} />
      <main className="container max-w-2xl px-6 mx-auto">
        <section className="py-3">
          <small className="text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(balance)}</h2>
        </section>
        <section className="flex items-center gap-2 py-3">
          <button
            onClick={() => {
              setShowExpenseModal(true);
            }}
            className="btn btn-primary"
          >
            + Expenses
          </button>
          <button
            onClick={() => {
              setShowIncomeModal(true);
            }}
            className="btn btn-primary"
          >
            + Income
          </button>
        </section>
        {/* Expense Section */}
        <section className="py-6">
          <h1 className="text-2xl">My Expenses</h1>
          <div className="flex flex-col gap-4 mt-6">
            {expenses.map((expense) => {
              return (
                <ExpenseCategoryItems key={expense.id} expense={expense} />
              );
            })}
          </div>
        </section>
        {/* Chart Section */}
        <section className="py-6">
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto py-3 ">
            <Pie
              data={{
                labels: expenses.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: expenses.map((expense) => expense.total),
                    backgroundColor: expenses.map((expense) => expense.color),
                    borderColor: expenses.map((expense) => expense.color),
                    borderWidth: 1,
                  },
                ],
              }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
