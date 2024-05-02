import { CURRENT_RESOURCE_NAME } from "./config";
import { Vector3Tuple } from "./types";

onNet(`${CURRENT_RESOURCE_NAME}:gotoRequest`, (targetId: string) => {
  const targetEntity = GetPlayerPed(targetId);

  if (!targetEntity) {
    return emitNet(
      "chat:addMessage",
      source,
      `Sorry, ${targetId} doesn't seem to exist.`
    );
  }

  const coords = GetEntityCoords(targetEntity) as Vector3Tuple;
  SetEntityCoords(source, ...coords, true, false, true, false);
});

onNet(`${CURRENT_RESOURCE_NAME}:summonRequest`, (targetId: string) => {
  const targetEntity = GetPlayerPed(targetId);

  if (!targetEntity) {
    return emitNet(
      "chat:addMessage",
      source,
      `Sorry, ${targetId} doesn't seem to exist.`
    );
  }

  const sourceEntity = GetPlayerPed(String(source));
  const coords = GetEntityCoords(sourceEntity) as Vector3Tuple;
  SetEntityCoords(targetEntity, ...coords, true, false, true, false);
});
