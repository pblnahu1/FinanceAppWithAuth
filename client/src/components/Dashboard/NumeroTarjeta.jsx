import { MastercardIcon } from "../icons";

const NumeroTarjeta = () => {
  return (
    <div className="col-span-2 row-span-1 rounded-3xl bg-[#CDDEFB] px-5 py-10 flex flex-col justify-between border-blue-800 border">
      <div className="">
        <span className="text-lg font-bold">4328 4388 4161 8183</span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span>Pablo Torrez</span>
          <span>12/31</span>
        </div>
        <div>
          <MastercardIcon />
        </div>
      </div>
    </div>
  );
};

export default NumeroTarjeta;
