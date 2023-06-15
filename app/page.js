"use client";
import { useEffect, useState, useRef } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FaRegTrashAlt } from "react-icons/fa";

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
  const [income, setIncome] = useState([]);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const amountRef = useRef();
  const descriptionRef = useRef();
  console.log(income);

  // Handle Add Income
  const handleAddIncome = async (e) => {
    e.preventDefault();
    const newIncome = {
      amount: amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
    };
    const collectionData = collection(db, "income");
    try {
      const docSnap = await addDoc(collectionData, newIncome);
      setIncome((prevState) => {
        return [
          ...prevState,
          {
            id: docSnap.id,
            ...newIncome,
          },
        ];
      });
      descriptionRef.current.value = "";
      amountRef.current.value = "";
    } catch (error) {
      console.log(error);
    }
  };

  // Handle Delete Entry
  const deleteEntryHandler = async (incomeId) => {
    const deleteRef = doc(db, "income", incomeId);
    try {
      await deleteDoc(deleteRef);
      setIncome((prevState) => {
        return prevState.filter((i) => i.id !== incomeId);
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const getIncome = async () => {
      const collectionData = collection(db, "income");
      const querySnapshot = await getDocs(collectionData);

      const incomeData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: new Date(doc.data().createdAt.toMillis()),
      }));
      setIncome(incomeData);
    };
    getIncome();
  }, []);

  return (
    <>
      {/* Add Income Modal */}
      <Modal showModal={showIncomeModal} onClose={setShowIncomeModal}>
        <form onSubmit={handleAddIncome} className="flex flex-col  gap-4 ">
          <div className="input-group">
            <label htmlFor="amount">Income Amount</label>
            <input
              type="number"
              name="amount"
              ref={amountRef}
              min={0.01}
              step={0.01}
              placeholder="Enter Income Amount"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description</label>
            <input
              className="capitalize"
              name="description"
              ref={descriptionRef}
              type="text"
              placeholder="Enter Income Description"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Entry
          </button>
        </form>
        <div className="flex flex-col gap-4 mt-6">
          <h3 className="text-2xl font-bold">Income History</h3>
          {income.map((i) => {
            return (
              <div key={i.id} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{i.description}</p>
                  <small className="text-xs">{i.createdAt.toISOString()}</small>
                </div>
                <p className="flex items-center gap-2">
                  {currencyFormatter(i.amount)}
                  <button
                    onClick={() => {
                      deleteEntryHandler(i.id);
                    }}
                  >
                    <FaRegTrashAlt className="text-red-500" />
                  </button>
                </p>
              </div>
            );
          })}
        </div>
      </Modal>
      <main className="container max-w-2xl px-6 mx-auto">
        <section className="py-3">
          <small className="text-md">My Balance</small>
          <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
        </section>
        <section className="flex items-center gap-2 py-3">
          <button className="btn btn-primary">+ Expenses</button>
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
