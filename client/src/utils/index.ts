import { Args, UndefinedArgs } from "../types";
export * from "./debug";

export function isEmpty<T extends unknown>(arr: T[]) {
  return Array.isArray(arr) && !arr.length;
}

export function getArg(args: Args) {
  const [arg1] = args;
  return arg1;
}

export function getArgs(args: UndefinedArgs): UndefinedArgs {
  const [arg1, arg2, arg3] = args;
  return [arg1, arg2, arg3];
}
