import { Edit, Tag, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Sidebar, { Props } from "./_components/sidebar.js";
import { useGroups } from "../hooks/useGroups.js";
import { AsinGroup } from "../@types/index.js";

const Setting = () => {
  const { groups, addGroup, deleteGroup, updateGroup, fetchGroups } =
    useGroups();
  const [selectedGroup, setSelectedGroup] = useState<AsinGroup | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // State for form inputs
  const [groupName, setGroupName] = useState("");
  const [asin, setAsin] = useState("");
  const [activeMenuItem, setActiveMenuItem] =
    useState<Props["activeMenuItem"]>("groups"); // "groups" or "add"

  useEffect(() => {
    // fetch data from storage
    fetchGroups();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName.trim()) return;

    const newAsins = asin
      .split(",")
      .map((asi) => asi.trim())
      .filter((asi) => asi !== "");

    if (selectedGroup) {
      await updateGroup({
        group_name: groupName,
        asins: newAsins,
        id: selectedGroup.id,
      });
      setSelectedGroup(null);
      setActiveMenuItem("groups");
    } else {
      await addGroup({
        group_name: groupName,
        asins: newAsins,
      });
    }
    setGroupName("");
    setAsin("");
    setActiveMenuItem("groups");
  };

  if (!groups) return <h1>no data found!</h1>;
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 ">
      <Sidebar
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
      />
      {/* Main content */}
      <div className="flex-1 ml-0 md:ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-gray-100">
            {activeMenuItem === "groups"
              ? "Your Groups and Tags"
              : "Create a New Group"}
          </h1>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700">
            {activeMenuItem === "groups" && !selectedGroup ? (
              <div className="space-y-6 overflow-y-scroll h-auto scroll-smooth scroll-p-1.5">
                {!groups ? (
                  <p className="text-gray-400">
                    No groups yet. Add your first group!
                  </p>
                ) : (
                  groups &&
                  groups.map((group) => (
                    <div
                      key={group.id}
                      className="border-b border-gray-700 last:border-0 pb-4 last:pb-0"
                    >
                      <div className="flex justify-between w-full">
                        <h2 className="text-xl font-semibold text-gray-100">
                          {group.group_name} <b>({group.asins.length})</b>
                        </h2>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => {
                              setSelectedGroup(group);
                              setIsEditing(true);
                              setGroupName(group.group_name);
                              setAsin(group.asins.join(", "));
                            }}
                            className="p-1.5 bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                            title="Edit group"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={async () => {
                              if (!group.id) return;
                              await deleteGroup(group.id);
                            }}
                            className="p-1.5 bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                            title="Delete group"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {group.asins.map((asin, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 bg-gray-700 text-sm rounded-full"
                          >
                            <Tag size={14} className="mr-1 text-blue-400" />
                            {asin}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Setting;
