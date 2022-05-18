import { hasAllProperties } from "./hasAllProperties";

export const isArrayOf = <T>(obj: any, props: (keyof T)[]): obj is T[] => {
  if (!Array.isArray(obj)) {
    return false;
  }
  return obj.every((ele) => hasAllProperties(ele, props));
};
