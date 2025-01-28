import {
  ElectricityBillIcon,
  PayablesIcon,
  ReceiptsIcon,
  SalaryIcon,
  ServiceIcon,
} from "../icons";

const PayableAccounts = () => {
  return (
    <div className="col-span-2 row-span-4 rounded-3xl bg-[#F1F5FB] px-5 py-10">
      <div className="rounded-xl bg-[#f8faff] p-5 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900">Payable Accounts</h3>
        <p className="mt-1 text-sm text-gray-500">
          Keep your accounts up to date to avoid issues
        </p>

        <div className="mt-4">
          <div className="flex items-center justify-between text-sm font-semibold">
            <span className="text-gray-800">14 OUT OF 16</span>
          </div>
          <div className="w-full h-2 mt-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-gray-800 rounded-full"
              style={{ width: "87.5%" }}
            ></div>
          </div>
        </div>
      </div>
      <div className="py-5">
        <span className="text-xl font-bold">Receipts</span>
        <div className="flex flex-row items-center my-5">
          <span className="bg-white rounded-md">
            <ReceiptsIcon />
          </span>
          <div className="flex flex-col ml-5">
            <span className="text-xl font-semibold">$5,000.00</span>
            <span className="text-xl text-slate-500">Salary</span>
          </div>
        </div>
        <div className="flex flex-row items-center my-5">
          <span className="bg-white rounded-md">
            <SalaryIcon />
          </span>
          <div className="flex flex-col ml-5">
            <span className="text-xl font-semibold">$593.00</span>
            <span className="text-xl text-slate-500">Service</span>
          </div>
        </div>
        <div className="flex flex-row items-center my-5">
          <span className="bg-white rounded-md">
            <ServiceIcon />
          </span>
          <div className="flex flex-col ml-5">
            <span className="text-xl font-semibold">$3,030.98</span>
            <span className="text-xl text-slate-500">Rent or Mortgage</span>
          </div>
        </div>
      </div>
      <div className="border-b border-slate-400"></div>
      <div className="py-5">
        <span className="text-xl font-bold">Payables</span>
        <div className="flex flex-row items-center my-5">
          <span className="p-2 bg-white rounded-md">
            <PayablesIcon />
          </span>

          <div className="flex flex-col ml-5">
            <span className="text-xl font-semibold">$202.98</span>
            <span className="text-xl text-slate-500">Electricity Bill</span>
          </div>
        </div>
        <div className="flex flex-row items-center my-5">
          <span className="p-2 bg-white rounded-md">
            <ElectricityBillIcon />
          </span>

          <div className="flex flex-col ml-5">
            <span className="text-xl font-semibold">$3,030.98</span>
            <span className="text-xl text-slate-500">Rent or Mortgage</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayableAccounts;
