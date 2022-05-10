import { request, requestDefault } from "..";
import { Model } from "../../../types";
import { Options } from "../types";

export function SpawnPlayerInCar(model?: Model, options?: Options) {
  if (model === undefined || model === "undefined") return requestDefault();
  request(model, options);
}
