import { useContext } from "react";
import { stateHelper } from "@/lib/store/stateHelper";

import Modal from "@/components/Modal";
import { currencyFormatter } from "@/util/format";
import { FaRegTrashAlt } from "react-icons/fa";

export default function ViewExpenseModal({ show, onClose, expense }) {
    const { deleteExpenseItem, deleteExpenseCategory} = useContext(stateHelper);

    const deleteExpenseHandler = async () => {
        try {
            await deleteExpenseCategory(expense.id);
            onClose();
        } catch (error) {
            console.log(error.message);
        }
    }

    const deleteExpenseItemHandler = async (item) => {
        try {
            const updatedItems = expense.items.filter((i) => i.id !== item.id);

            const updatedExpense = {
                items: [...updatedItems],
                total: expense.total - item.amount,
            };
            await deleteExpenseItem(updatedExpense, expense.id);
        } catch (error) {
            console.log(error.message);
        }
    }
  return (
    <Modal showModal={show} onClose={onClose}>
        <div className="flex items-center justify-between">
            <h2 className="text-4xl">{expense.title}</h2>
            <button onClick={deleteExpenseHandler} className="btn btn-danger">Delete</button>
        </div>
        <div>
            <h3 className="my-4 text-2xl">Expense History</h3>
            {expense.items.map((item) => {
                return (
                    <div key={item.id}
                    className="flex items-center justify-between"
                    >
                        <small>
                            {item.createdAt.toMillis ? new Date(item.createdAt.toMillis()).toLocaleDateString() : item.createdAt.toLocaleDateString()}
                            </small>
                        <p className="flex items-center gap-2">
                            {currencyFormatter(item.amount)}
                            </p>
                        <button
                        onClick={
                            () => {
                                deleteExpenseItemHandler(item)
                            }
                        }
                        >
                            <FaRegTrashAlt  className="text-red-500" />
                        </button>
                    </div>
                )
            })}
        </div>
    </Modal>
  )
}
