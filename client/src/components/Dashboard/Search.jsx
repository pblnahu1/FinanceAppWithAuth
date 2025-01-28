import { IconSearch } from "../icons";

const Search = () => {
  return (
    <label className="input bg-[#F1F5FB] rounded-3xl flex items-center md:w-0 lg:w-[50%] lg:ml-0 h-10">
      <IconSearch />
      <input type="text" className="grow" placeholder="Search" />
    </label>
  );
};

export default Search;
