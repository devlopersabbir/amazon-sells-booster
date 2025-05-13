export const actionType = ["increment", "decrement"] as const;
export const taskTypeArray = ["all", "asins", "lowest-price"] as const;
export type AsinGroup = {
  id: number;
  group_name: string;
  asins: string[];
};
export type ActionType = (typeof actionType)[number];
export type TaskType = (typeof taskTypeArray)[number];

export type HandlerOptions = {
  type: ActionType;
  INC_DEC_VALUE: number;
  asins?: AsinGroup["asins"];
  taskType: TaskType;
};
