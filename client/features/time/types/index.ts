import { INVALID_HOURS, INVALID_MINUTES, INVALID_SECONDS } from "../config";
export { Args, Vector3Tuple } from "../../../types";

export type ErrorTypes =
  | typeof INVALID_HOURS
  | typeof INVALID_MINUTES
  | typeof INVALID_SECONDS;
