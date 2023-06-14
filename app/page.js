"use client";
import { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import { currencyFormatter } from "@/util/format";
import ExpenseCategoryItems from "@/components/ExpenseCategoryItems";
import Modal from "@/components/Modal";

ChartJS.register(ArcElement, Tooltip, Legend);

const DummyData = [
  {
    id: 1,
    title: "Food",
    color: "red",
    total: 200,
  },
  {
    id: 2,
    title: "Transportation",
    color: "blue",
    total: 500,
  },
  {
    id: 3,
    title: "Housing",
    color: "green",
    total: 1400,
  },
  {
    id: 4,
    title: "Clothing",
    color: "yellow",
    total: 300,
  },
];

export default function Home() {
  const [showIncomeModal, setShowIncomeModal] = useState(false);

  return (
    <>
      {/* Add Income Modal */}
      <Modal showModal={showIncomeModal} onClose={setShowIncomeModal}>
        <form className="flex flex-col  gap-4 ">
          <div className="input-group">
            <label htmlFor="amount">Income Amount</label>
            <input
              type="number"
              name="amount"
              min={0.01}
              step={0.01}
              placeholder="Enter Income Amount"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description</label>
            <input
              name="description"
              type="text"
              placeholder="Enter Income Description"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Entry</button>
        </form>
      </Modal>
      <main className="container max-w-2xl px-6 mx-auto">
        <section className="py-3">
          <small className="text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
        </section>
        <section className="flex items-center gap-2 py-3">
          <button onClick={() => {}} className="btn btn-primary">
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
            {DummyData.map((expense) => {
              return (
                <ExpenseCategoryItems
                  key={expense.id}
                  color={expense.color}
                  title={expense.title}
                  total={expense.total}
                />
              );
            })}
          </div>
        </section>
        {/* Chart Section */}
        <section className="py-6">
          <h3 className="text-2xl">Stats</h3>
          <div className="w-1/2 mx-auto py-2">
            <Doughnut
              data={{
                labels: DummyData.map((expense) => expense.title),
                datasets: [
                  {
                    label: "Expenses",
                    data: DummyData.map((expense) => expense.total),
                    backgroundColor: DummyData.map((expense) => expense.color),
                    borderColor: DummyData.map((expense) => expense.color),
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
