import { Dispatch, SetStateAction } from "react";
import { AsinGroup } from "../../@types/index.js";
import { Edit, Tag, Trash2 } from "lucide-react";
import { useGroups } from "../../hooks/useGroups.js";
import { toast } from "sonner";
import { Props } from "./sidebar.js";

type DisplayProps = {
  groups: AsinGroup[];
  setSelectedGroup: Dispatch<SetStateAction<AsinGroup | null>>;
  setActiveMenuItem: Dispatch<SetStateAction<Props["activeMenuItem"]>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
  setGroupName: Dispatch<SetStateAction<string>>;
  setAsin: Dispatch<SetStateAction<string>>;
};
const DisplayGroup = ({
  groups,
  setSelectedGroup,
  setIsEditing,
  setGroupName,
  setAsin,
  setActiveMenuItem,
}: DisplayProps) => {
  const { deleteGroup } = useGroups();
  return (
    <div className="space-y-6">
      {!groups ? (
        <>
          <p className="text-gray-400">No groups yet. Add your first group!</p>
          <h1>hello</h1>
        </>
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
                    setActiveMenuItem("update");
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
                    setActiveMenuItem("groups");
                    toast.info("Group deleted!");
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
  );
};
export default DisplayGroup;
