import { request, requestDefault } from "..";
import { Model } from "../../../types";
import { Options } from "../types";

export function SpawnVehicle(model?: Model, options?: Partial<Options>) {
  if (model === undefined || model === "undefined") return requestDefault();
  return request(model, options);
}
