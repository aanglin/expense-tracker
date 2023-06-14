import ExpenseCategoryItems from "@/components/ExpenseCategoryItems";
import { currencyFormatter } from "@/util/format";

export default function Home() {
  const DummyData = [
    {
      id: 1,
      title: "Food",
      color: "red",
      amount: 200,
    },
    {
      id: 2,
      title: "Transportation",
      color: "blue",
      amount: 500,
    },
    {
      id: 3,
      title: "Housing",
      color: "green",
      amount: 1200,
    },
    {
      id: 4,
      title: "Clothing",
      color: "yellow",
      amount: 300,
    },
  ];
  return (
    <main className="container max-w-2xl px-6 mx-auto">
      <section className="py-3">
        <small className="text-md">My Balance</small>
        <h2 className="text-4xl font-bold">{currencyFormatter(100000)}</h2>
      </section>
      <section className="flex items-center gap-2 py-3">
        <button className="btn btn-primary">+ Expenses</button>
        <button className="btn btn-primary">+ Income</button>
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
                amount={expense.amount}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
