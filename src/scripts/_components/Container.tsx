import { useState } from "react";
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  Settings,
  Tag,
} from "lucide-react";
import { Button } from "../../components/ui/button.js";
import { Checkbox } from "../../components/ui/checkbox.js";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../../components/ui/drawer.js";
import {
  ActionType,
  AsinGroup,
  TaskType,
  taskTypeArray,
} from "../../@types/index.js";
import { handleKatInputUpdate } from "../index.js";
import Browser from "webextension-polyfill";
import { useAppSettings } from "../../hooks/useAppSettings.js";
import { toast } from "sonner";

const Container = () => {
  const { groups, price } = useAppSettings();
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState<ActionType>("increment");
  const [selectedGroups, setSelectedGroups] = useState<AsinGroup[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  const [taskType, setTaskType] = useState<TaskType>("Selected ASINs");

  const handleConfirm = () => {
    if (!price) return toast.error("No price found!");
    const arr: AsinGroup["asins"] | [] =
      selectedGroups && selectedGroups.flatMap((group) => group.asins);

    if (taskType === "Selected ASINs" && !arr.length)
      return toast.error("Select any group");
    handleKatInputUpdate({
      type: actionType,
      INC_DEC_VALUE: Number(price),
      taskType,
      asins: arr || [],
    });
    toast.info(`Action type (${actionType}) and task type (${taskType})`);
    setOpen(false);
  };
  return (
    <div className="flex gap-2">
      <Button
        variant="default"
        onClick={() => {
          setActionType("increment");
          setOpen(true);
        }}
        className="flex items-center gap-1 bg-[#3f4a59] cursor-pointer"
      >
        <ArrowUpNarrowWide className="h-4 w-4" />
        Increment
      </Button>

      <Button
        variant="default"
        onClick={() => {
          setActionType("decrement");
          setOpen(true);
        }}
        className="flex items-center gap-1 bg-[#3f4a59] cursor-pointer"
      >
        <ArrowDownWideNarrow className="h-4 w-4" />
        Decrement
      </Button>

      <Button
        variant="link"
        onClick={() => {
          Browser.runtime.sendMessage({ action: "open-options" });
        }}
        className="flex items-center cursor-pointer"
      >
        <Settings className="h-6 w-6" />
      </Button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent
          className="dark bg-gray-950 text-gray-200"
          aria-description="group selection"
          aria-describedby={"group selection"}
        >
          <DrawerHeader>
            <DrawerTitle>
              {actionType === "increment" ? "Increment" : "Decrement"} Items
            </DrawerTitle>
            <DrawerDescription>
              You can increment and decrement your price from here...
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 py-2 max-h-[60vh] overflow-y-auto">
            <div className="w-full justify-end items-end">
              <div className="flex flex-row space-x-2 mb-2 justify-end items-end">
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 w-auto p-2.5"
                  onChange={(e) => setTaskType(e.target.value as TaskType)}
                  defaultValue={taskType}
                >
                  {taskTypeArray.map((task, index) => (
                    <option
                      value={task}
                      key={index}
                      className="bg-gray-900 text-white"
                    >
                      {task}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {groups && (
              <div className="mb-4 border border-gray-700 rounded-lg p-3 bg-gray-900 flex justify-between items-center">
                <div className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id="select-all-groups"
                    checked={allSelected}
                    disabled={taskType === "All ASINs"}
                    onCheckedChange={(checked: boolean) => {
                      setAllSelected(checked);
                      setSelectedGroups(checked ? [...groups] : []);
                    }}
                  />
                  <label
                    htmlFor="select-all-groups"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Select All Groups
                  </label>
                </div>
              </div>
            )}

            {groups &&
              groups.map((group) => (
                <div
                  key={group.id}
                  className="mb-4 border border-gray-700 rounded-lg p-3 bg-gray-900"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id={`group-${group.id}`}
                      disabled={taskType === "All ASINs"}
                      checked={selectedGroups.some(
                        (selectedGroup) => selectedGroup.id === group.id
                      )}
                      onCheckedChange={(checked: boolean) => {
                        setSelectedGroups((prev) => {
                          let updatedGroups: AsinGroup[];
                          if (checked) {
                            if (!prev.some((g) => g.id === group.id)) {
                              updatedGroups = [...prev, group];
                            } else {
                              updatedGroups = prev;
                            }
                          } else {
                            updatedGroups = prev.filter(
                              (g) => g.id !== group.id
                            );
                          }

                          setAllSelected(
                            updatedGroups.length === groups.length
                          );
                          return updatedGroups;
                        });
                      }}
                    />
                    <label
                      htmlFor={`group-${group.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {group.group_name} <b>({group.asins.length})</b>
                    </label>
                  </div>

                  <div className="ml-6 space-y-2">
                    {group.asins.map((asin, index: number) => (
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
              ))}
          </div>

          <DrawerFooter className="flex flex-row justify-between">
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
            <Button
              onClick={() => {
                handleConfirm();
              }}
            >
              Confirm{" "}
              {actionType === "increment" ? (
                <ArrowUpNarrowWide className="ml-1 h-4 w-4" />
              ) : (
                <ArrowDownWideNarrow className="ml-1 h-4 w-4" />
              )}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default Container;
