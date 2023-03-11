export type Vector3Tuple = [number, number, number];

export type Args = string[] | [];

export type UndefinedArgs<T> =
  | [string | undefined, T | undefined, string | undefined]
  | [];

export type Model = string | number;
