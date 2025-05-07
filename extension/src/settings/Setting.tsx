import { Edit, Tag, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Sidebar, { Props } from "./_components/sidebar.js";
import { useGroups } from "../hooks/useGroups.js";
import { AsinGroup } from "../@types/index.js";
import DisplayGroup from "./_components/display-group.js";
import { toast } from "sonner";
import CreatePrice from "./_components/create-price.js";

const Setting = () => {
  const { groups, addGroup, updateGroup, fetchGroups } = useGroups();
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
      toast.success("Group update successfully");
    } else {
      await addGroup({
        group_name: groupName,
        asins: newAsins,
      });
      toast.success("New Group Added");
    }
    setGroupName("");
    setAsin("");
    setActiveMenuItem("groups");
  };

  if (!groups) return <h1>no data found!</h1>;
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 fixed w-full">
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

          <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 max-h-[80vh] overflow-y-auto scroll-smooth">
            {activeMenuItem === "groups" && !selectedGroup ? (
              <DisplayGroup
                groups={groups}
                setAsin={setAsin}
                setGroupName={setGroupName}
                setIsEditing={setIsEditing}
                setSelectedGroup={setSelectedGroup}
              />
            ) : activeMenuItem === "add" ? (
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
            ) : (
              <CreatePrice setActiveMenuItem={setActiveMenuItem} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Setting;
