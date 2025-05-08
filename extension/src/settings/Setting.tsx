import { useEffect, useState } from "react";
import Sidebar, { Props } from "./_components/sidebar.js";
import { useGroups } from "../hooks/useGroups.js";
import { AsinGroup } from "../@types/index.js";
import DisplayGroup from "./_components/display-group.js";
import { toast } from "sonner";
import CreatePrice from "./_components/create-price.js";
import CreateGroup from "./_components/create-group.js";
import Browser from "webextension-polyfill";

const Setting = () => {
  const { groups, addGroup, updateGroup, fetchGroups } = useGroups();
  const [selectedGroup, setSelectedGroup] = useState<AsinGroup | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [asin, setAsin] = useState("");
  const [groupName, setGroupName] = useState("");
  const [activeMenuItem, setActiveMenuItem] =
    useState<Props["activeMenuItem"]>("groups");

  useEffect(() => {
    // fetch data from storage
    (async () => {
      await fetchGroups();
    })();
  }, [activeMenuItem]);

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
              : activeMenuItem === "add"
              ? "Create a New Group"
              : activeMenuItem === "update"
              ? "Update Group Data"
              : ""}
          </h1>

          <div className="bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-700 max-h-[80vh] overflow-y-auto scroll-smooth">
            {activeMenuItem === "groups" && !groups.length ? (
              <div className="flex justify-center items-center w-full flex-col">
                <img
                  src={Browser.runtime.getURL("/icon/no-data.svg")}
                  alt="no data"
                  className="w-96"
                />
                <h1 className="text-3xl">No Group Created Yet</h1>
              </div>
            ) : null}

            {activeMenuItem === "groups" && !selectedGroup ? (
              <DisplayGroup
                groups={groups}
                setAsin={setAsin}
                setGroupName={setGroupName}
                setIsEditing={setIsEditing}
                setSelectedGroup={setSelectedGroup}
                setActiveMenuItem={setActiveMenuItem}
              />
            ) : activeMenuItem === "add" || activeMenuItem === "update" ? (
              <CreateGroup
                asin={asin}
                groupName={groupName}
                handleSubmit={handleSubmit}
                setGroupName={setGroupName}
                setAsin={setAsin}
                isEditing={isEditing}
              />
            ) : activeMenuItem === "price" ? (
              <CreatePrice setActiveMenuItem={setActiveMenuItem} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Setting;
