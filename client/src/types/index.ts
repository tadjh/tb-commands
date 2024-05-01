export type Vector3 = { x: number; y: number; z: number };

export type Args = string[] | [];

export type UndefinedArgs<T> =
  | [string | undefined, string | undefined, T | undefined]
  | [];

export type Model = string | number;
