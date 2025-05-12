export type AsinGroup = {
  id: number;
  group_name: string;
  asins: string[];
};
export type ActionType = "increment" | "decrement";

export type HandlerOptions = {
  type: ActionType;
  INC_DEC_VALUE: number;
  asins?: AsinGroup["asins"];
  isAll?: boolean;
};
