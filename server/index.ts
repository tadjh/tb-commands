import { CURRENT_RESOURCE_NAME } from "./config";
import { Vector3Tuple } from "./types";

onNet(`${CURRENT_RESOURCE_NAME}:goto`, requestGoto);
function requestGoto(targetId: string) {
  const targetHandle = GetPlayerPed(targetId);

  if (!targetHandle) {
    return emitNet(
      "chat:addMessage",
      source,
      `Sorry, ${targetId} doesn't seem to exist.`
    );
  }

  const coords = GetEntityCoords(targetHandle) as Vector3Tuple;
  SetEntityCoords(source, ...coords, true, false, true, false);
}

onNet(`${CURRENT_RESOURCE_NAME}:summon`, requestSummon);
function requestSummon(targetId: string) {
  const targetHandle = GetPlayerPed(targetId);

  if (!targetHandle) {
    return emitNet(
      "chat:addMessage",
      source,
      `Sorry, ${targetId} doesn't seem to exist.`
    );
  }

  const sourceHandle = GetPlayerPed(String(source));
  const coords = GetEntityCoords(sourceHandle) as Vector3Tuple;
  SetEntityCoords(targetHandle, ...coords, true, false, true, false);
}
