import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useGroups } from "../../hooks/useGroups.js";
import { toast } from "sonner";
import { Props } from "./sidebar.js";

type PriceProps = {
  setActiveMenuItem: Dispatch<SetStateAction<Props["activeMenuItem"]>>;
};
const CreatePrice = ({ setActiveMenuItem }: PriceProps) => {
  const [price, setPrice] = useState("");
  const { fetchPrice, updatePrice } = useGroups();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (price) {
      await updatePrice(price);
      toast.success("Price update successfully");
      return setActiveMenuItem("groups");
    }
  };

  useEffect(() => {
    (async () => {
      const price = await fetchPrice();
      console.log("price: ", price);
      if (price) setPrice(`${price}`);
    })();
  }, []);
  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Price of increment & dicrement
          </label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
            placeholder="0.1"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-200"
        >
          Update Price
        </button>
      </form>
    </div>
  );
};
export default CreatePrice;
