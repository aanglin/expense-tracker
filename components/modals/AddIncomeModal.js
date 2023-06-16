import { useRef, useContext } from "react";
import { currencyFormatter } from "@/util/format";

import { stateHelper } from "@/lib/store/stateHelper";
import { authContext } from "@/lib/store/auth-context";
import { toast } from "react-toastify";

import { FaRegTrashAlt } from "react-icons/fa";
import Modal from "@/components/Modal";

export default function AddIncomeModal({ show, onClose }) {
  const amountRef = useRef();
  const descriptionRef = useRef();
  const { income, addIncomeItem, removeIncomeItem } = useContext(stateHelper);

  const { user } = useContext(authContext);

  // Handle Add Income
  const handleAddIncome = async (e) => {
    e.preventDefault();
    const newIncome = {
      amount: +amountRef.current.value,
      description: descriptionRef.current.value,
      createdAt: new Date(),
      uid: user.uid,
    };
    try {
      await addIncomeItem(newIncome);
      descriptionRef.current.value = "";
      amountRef.current.value = "";
      toast.success("Income Added");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  // Handle Delete Entry
  const deleteEntryHandler = async (incomeId) => {
    try {
      await removeIncomeItem(incomeId);
      toast.success("Income Deleted");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <Modal showModal={show} onClose={onClose}>
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
                <small className="text-xs">{i.createdAt.toLocaleDateString()}</small>
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
  );
}
