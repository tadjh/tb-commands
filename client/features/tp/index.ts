import { MAX_EXECUTION_TIME, SHOULD_IGNORE_WATER, STEP } from "./config";
import { Args, Vector3, Vector3Tuple } from "../../types";
import { debugPrint, isEmpty } from "../../utils";
import { parseArgs } from "./utils";
import { CURRENT_RESOURCE_NAME } from "../../config";

export async function tp(_source: number, args: Args | []) {
  if (isEmpty(args)) return;
  const nextCoords = parseArgs(args);
  await handleTeleport(nextCoords);
}

async function handleTeleport(coords: Vector3) {
  try {
    const safeCoords = await findSafeCoords(coords);
    await fadeOutAndMoveCamera(safeCoords);
    teleport(safeCoords);
  } catch (error) {
    debugPrint("Something went wrong during teleport...", error);
  }
}

async function findSafeCoords(coords: Vector3) {
  return new Promise<Vector3>((resolve, reject) => {
    let i = 0;
    const startTime = Date.now();
    const tick = setTick(() => {
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime > MAX_EXECUTION_TIME) {
        reject("Max execution time elapsed in findSafeCoords");
        return clearTick(tick);
      }

      const [hit, groundZ] = GetGroundZFor_3dCoord(
        coords.x,
        coords.y,
        coords.z + i,
        SHOULD_IGNORE_WATER
      );

      if (hit) {
        resolve({ x: coords.x, y: coords.y, z: groundZ });
        return clearTick(tick);
      }

      i += STEP;
      Wait(0);
    });
  });
}

async function fadeOutAndMoveCamera(coords: Vector3) {
  return new Promise((resolve, reject) => {
    DoScreenFadeOut(500);
    const startTime = Date.now();
    const tick = setTick(() => {
      if (IsScreenFadedOut()) {
        resolve(SetFocusArea(coords.x, coords.y, coords.z, 0.0, 0.0, 0.0));
        return clearTick(tick);
      }

      const elapsedTime = Date.now() - startTime;
      if (elapsedTime > MAX_EXECUTION_TIME) {
        reject("Max execution time elapsed in beforeTeleport");
        return clearTick(tick);
      }

      Wait(0);
    });
  });
}

const teleport = (coords: Vector3) => {
  SetEntityCoords(
    PlayerPedId(),
    coords.x,
    coords.y,
    coords.z,
    false,
    false,
    false,
    false
  );
  ClearFocus();
  if (IsScreenFadedOut()) {
    DoScreenFadeIn(500);
  }
  debugPrint(`Teleported to ${coords.x}, ${coords.y}, ${coords.z}.`);
};

export function goto(_source: number, args: Args) {
  if (!args[0]) {
    return TriggerEvent("chat:addMessage", {
      args: ["Please provide a target ID"],
    });
  }

  emitNet(`${CURRENT_RESOURCE_NAME}:goto`, args[0]);
}

export function summon(_source: number, args: Args) {
  if (!args[0]) {
    return TriggerEvent("chat:addMessage", {
      args: ["Please provide a target ID"],
    });
  }

  emitNet(`${CURRENT_RESOURCE_NAME}:summon`, args[0]);
}
