import { Args, Vector3 } from "../../../types";
import { DEFAULT_COORDS } from "../config";

export function parseArgs([x, y, z]: Args): Vector3 {
  return {
    x: x ? parseFloat(x) : DEFAULT_COORDS.x,
    y: y ? parseFloat(y) : DEFAULT_COORDS.y,
    z: z ? parseFloat(z) : DEFAULT_COORDS.z,
  };
}
