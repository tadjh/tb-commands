import { handleRequest, requestDefault } from "..";
import { Model } from "../types";

export function SetPedModel(model?: Model, shouldEmit = true) {
  if (model === undefined || model === "undefined") return requestDefault();
  return handleRequest(model, shouldEmit);
}
