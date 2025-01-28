import { ArrowDownWallet, ArrowTopWallet } from "../icons";

const Wallet = () => {
  return (
    <div className="col-span-2 row-span-1 rounded-3xl bg-[#F1F5FB] px-5 py-5 flex flex-col place-content-center">
      <div className="flex flex-col">
        <span className="mb-4 text-xl font-bold text-slate-500">Wallet</span>
        <span className="text-5xl font-extrabold">$4,523.98</span>
        <div className="flex flex-row justify-between py-4">
          <div className="flex flex-row items-center">
            <span className="bg-green-200 rounded-md">
              <ArrowTopWallet />
            </span>
            <div className="flex flex-col ml-4">
              <span className="font-bold">$3,030.98</span>
              <span>Income</span>
            </div>
          </div>

          <div className="flex flex-row items-center">
            <span className="bg-red-200 rounded-md">
              <ArrowDownWallet />
            </span>
            <div className="flex flex-col ml-4">
              <span className="font-bold">$223.98</span>
              <span>Expenses</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
