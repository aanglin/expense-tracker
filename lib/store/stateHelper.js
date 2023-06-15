'use client'
import { createContext, useState, useEffect } from "react";
import {
    collection,
    addDoc,
    doc,
    deleteDoc,
    getDocs,
  } from "firebase/firestore";
  import { db } from "@/lib/firebase";


export const stateHelper = createContext({
    income: [],
    expenses: [],
    addIncomeItem: async () => {},
    removeIncomeItem: async () => {},
});

export default  function stateHelperProvider({children}) {
    const [income, setIncome] = useState([]);
    const [expenses, setExpenses] = useState([]);

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

    const values = { income, expenses, addIncomeItem, removeIncomeItem }

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

        const getExpenses = async () => {
            const collectionData = collection(db, "expenses");
            const querySnapshot = await getDocs(collectionData);
      
            const expensesData = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            //   createdAt: new Date(doc.data().createdAt.toMillis()),
            }));
            setExpenses(expensesData);
          }
          getIncome();
          getExpenses();
      }, []);
    return (
        <stateHelper.Provider value={values} >
            {children}
        </stateHelper.Provider>
    )
    };