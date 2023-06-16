"use client";
import { createContext, useState, useEffect, useContext } from "react";
import { authContext } from "@/lib/store/auth-context";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export const stateHelper = createContext({
  income: [],
  expenses: [],
  addIncomeItem: async () => {},
  removeIncomeItem: async () => {},
  addExpenseItem: async () => {},
  addCategory: async () => {},
  deleteExpenseItem: async () => {},
  deleteExpenseCategory: async () => {},
});

export default function stateHelperProvider({ children }) {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const { user } = useContext(authContext);

  const addCategory = async (category) => {
    try {
      const collectionRef = collection(db, "expenses");
      const docRef = await addDoc(collectionRef, {
        uid: user.uid,
        ...category,
        items: [],
      });
      setExpenses((prevExpenses) => {
        return [
          ...prevExpenses,
          {
            id: docRef.id,
            uid: user.uid,
            items: [],
            ...category,
          },
        ];
      });
    } catch (error) {
      throw error;
    }
  };

  const addExpenseItem = async (expenseCategoryId, newExpense) => {
    const docRef = doc(db, "expenses", expenseCategoryId);
    try {
      await updateDoc(docRef, { ...newExpense });
      setExpenses((prevState) => {
        const updatedExpenses = [...prevState];
        const expenseIndex = updatedExpenses.findIndex((expense) => {
          return expense.id === expenseCategoryId;
        });
        updatedExpenses[expenseIndex] = {
          id: expenseCategoryId,
          ...newExpense,
        };
        return updatedExpenses;
      });
    } catch (error) {
      throw error;
    }
  };

  const deleteExpenseItem = async (updatedExpense, expenseCategoryId) => {
    try {
      const docRef = doc(db, "expenses", expenseCategoryId);
      await updateDoc(docRef, { ...updatedExpense });
      setExpenses((prevExpenses) => {
        const updatedExpenses = [...prevExpenses];
        const expenseIndex = updatedExpenses.findIndex(
          (expense) => expense.id === expenseCategoryId
        );
        updatedExpenses[expenseIndex].items = [...updatedExpense.items];
        updatedExpenses[expenseIndex].total = updatedExpense.total;
        return updatedExpenses;
      });
    } catch (error) {
      throw error;
    }
  };

  const deleteExpenseCategory = async (expenseCategoryId) => {
    try {
      const docRef = doc(db, "expenses", expenseCategoryId);
      await deleteDoc(docRef);
      setExpenses((prevExpenses) => {
        const updatedExpenses = prevExpenses.filter(
          (expense) => expense.id !== expenseCategoryId
        );
        return [...updatedExpenses];
      });
    } catch (error) {
      throw error;
    }
  };

  const addIncomeItem = async (newIncome) => {
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
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const removeIncomeItem = async (incomeId) => {
    const deleteRef = doc(db, "income", incomeId);
    try {
      await deleteDoc(deleteRef);
      setIncome((prevState) => {
        return prevState.filter((i) => i.id !== incomeId);
      });
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const values = {
    income,
    expenses,
    addIncomeItem,
    removeIncomeItem,
    addExpenseItem,
    addCategory,
    deleteExpenseItem,
    deleteExpenseCategory,
  };

  useEffect(() => {
    if (!user) return;
    const getIncome = async () => {
      const collectionData = collection(db, "income");
      const q = query(collectionData, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      const incomeData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: new Date(doc.data().createdAt.toMillis()),
      }));
      setIncome(incomeData);
    };

    const getExpenses = async () => {
      const collectionData = collection(db, "expenses");
      const q = query(collectionData, where("uid", "==", user.uid));
      const querySnapshot = await getDocs(q);

      const expensesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        //   createdAt: new Date(doc.data().createdAt.toMillis()),
      }));
      setExpenses(expensesData);
    };
    getIncome();
    getExpenses();
  }, [user]);
  return <stateHelper.Provider value={values}>{children}</stateHelper.Provider>;
}
