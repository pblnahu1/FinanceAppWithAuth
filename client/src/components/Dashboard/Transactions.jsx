import { ArrowDown } from "../icons";

const Transactions = () => {
  return (
    <div className="col-span-2 row-span-3 rounded-3xl bg-[#F1F5FB] px-5 py-10">
      <div>
        <span className="text-3xl font-extrabold">Transactions</span>
      </div>
      <div className="flex flex-row items-center justify-between py-4 my-4 border-b border-slate-400">
        <div>
          <span className="bg-red-200 rounded-md">
            <ArrowDown />
          </span>
        </div>
        <span className="font-semibold">Shopping</span>
        <span className="font-bold text-gray-500">Nov 25</span>
        <span className="font-semibold">R$300</span>
      </div>
      <div className="flex flex-row items-center justify-between py-4 my-4 border-b border-slate-400">
        <div>
          <span className="bg-red-200 rounded-md">
            <ArrowDown />
          </span>
        </div>
        <span className="font-semibold">Shopping</span>
        <span className="font-bold text-gray-500">Nov 25</span>
        <span className="font-semibold">R$300</span>
      </div>
      <div className="flex flex-row items-center justify-between py-4 my-4 border-b border-slate-400">
        <div>
          <span className="bg-red-200 rounded-md">
            <ArrowDown />
          </span>
        </div>
        <span className="font-semibold">Shopping</span>
        <span className="font-bold text-gray-500">Nov 25</span>
        <span className="font-semibold">R$300</span>
      </div>
      <div className="flex flex-row items-center justify-between py-4 my-4 border-b border-slate-400">
        <div>
          <span className="bg-red-200 rounded-md">
            <ArrowDown />
          </span>
        </div>
        <span className="font-semibold">Shopping</span>
        <span className="font-bold text-gray-500">Nov 25</span>
        <span className="font-semibold">R$300</span>
      </div>
      <div className="flex flex-row items-center justify-between py-4 my-4 border-b border-slate-400">
        <div>
          <span className="bg-red-200 rounded-md">
            <ArrowDown />
          </span>
        </div>
        <span className="font-semibold">Shopping</span>
        <span className="font-bold text-gray-500">Nov 25</span>
        <span className="font-semibold">R$300</span>
      </div>
    </div>
  );
};

export default Transactions;
