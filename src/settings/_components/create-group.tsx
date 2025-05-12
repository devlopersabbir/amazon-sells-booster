import { Dispatch, FormEvent, SetStateAction } from "react";

type CreateGroupProps = {
  handleSubmit: (e: FormEvent) => Promise<void>;
  setGroupName: Dispatch<SetStateAction<string>>;
  groupName: string;
  setAsin: Dispatch<SetStateAction<string>>;
  asin: string;
  isEditing?: boolean;
};

const CreateGroup = ({
  handleSubmit,
  setAsin,
  setGroupName,
  groupName,
  asin,
  isEditing,
}: CreateGroupProps) => {
  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="groupNameMain"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Group Name
          </label>
          <input
            type="text"
            id="groupNameMain"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100"
            placeholder="Enter group name"
            required
          />
        </div>

        <div>
          <label
            htmlFor="tagsMain"
            className="block text-sm font-medium text-gray-300 mb-2"
          >
            Asin (comma separated)
          </label>
          <textarea
            id="asin"
            value={asin}
            onChange={(e) => setAsin(e.target.value)}
            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 min-h-[100px] resize-y"
            placeholder="B001BIXKLQ, B07GTQF7L2, B005CUMHFE"
          />
          <p className="mt-1 text-sm text-gray-400">
            Separate multiple asin with commas
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-200"
        >
          {isEditing ? "Update" : "Create"} Group
        </button>
      </form>
    </div>
  );
};
export default CreateGroup;
