import { Args, Vector3Tuple } from "../../../types";
import { DEFAULT_GROUND_Z } from "../config";

function parseInput(input: string, fallback = 0.0) {
  return input ? parseFloat(input) : fallback;
}

export function parseArgs(args: Args): Vector3Tuple {
  const [inputX, inputY, inputZ] = args;
  const x = parseInput(inputX);
  const y = parseInput(inputY);
  const z = parseInput(inputZ, DEFAULT_GROUND_Z);
  return [x, y, z];
}
