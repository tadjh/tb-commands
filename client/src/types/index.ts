export type Vector3Tuple = [number, number, number];

export type Args = string[] | [];

export type UndefinedArgs<T> =
  | [string | undefined, string | undefined, T | undefined]
  | [];

export type Model = string | number;
