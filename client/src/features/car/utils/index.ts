import { Model } from "../../../types";
export * from "../../../utils";

export function shouldRequestModel(model: Model) {
  return IsModelInCdimage(model) && IsModelAVehicle(model);
}

export function isTrue(bool?: string | boolean) {
  return bool === true || bool === "true" || bool === undefined;
}

export function isUndefined(undef?: string | number) {
  return undef === undefined || undef === "undefined";
}
