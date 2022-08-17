import {
  DEFAULT_VEHICLE_PRESET,
  DEFAULT_SEAT,
  DEFAULT_VEHICLE,
} from "./config";
import { Model, UndefinedArgs, Vector3Tuple } from "../../types";
import { debugDATA, getArgs, isTrue, shouldRequestModel } from "./utils";
import { Options } from "./types";
import { SpawnPlayerInVehicle } from "./utils/natives";

function handleEmit(vehicle: number) {
  emit("SpawnPlayerInVehicle", vehicle);
  debugDATA(`emitting event "SpawnPlayerInVehicle"`);
}

function setVehiclePreset(vehicle: number, preset?: string | number) {
  if (preset === undefined || preset === "undefined") return;

  if (typeof preset === "string") {
    const parsedPreset = parseInt(preset);
    if (parsedPreset === NaN) return;
    return SetVehicleColourCombination(vehicle, parsedPreset);
  }

  SetVehicleColourCombination(vehicle, preset);
}

function handleOptions(ped: number, vehicle: number, options: Options) {
  setVehiclePreset(vehicle, options.preset);
  if (isTrue(options.SEAT_INTO_CAR))
    SetPedIntoVehicle(ped, vehicle, DEFAULT_SEAT);
}

function cleanUp(model: Model, vehicle: number) {
  SetEntityAsNoLongerNeeded(vehicle);
  SetModelAsNoLongerNeeded(model);
}

function spawn(model: Model, options?: Options) {
  const ped = PlayerPedId();
  const pedCoords = GetEntityCoords(ped, true) as Vector3Tuple;
  const vehicle = CreateVehicle(
    model,
    ...pedCoords,
    GetEntityHeading(ped),
    true,
    false
  );
  cleanUp(model, vehicle);
  handleEmit(vehicle);
  debugDATA(`spawned vehicle model "${model}".`);
  if (options) handleOptions(ped, vehicle, options);
  return vehicle;
}

function shouldThreadExpire(elapsedTime: number) {
  const MAX_EXECUTION_TIME = 5000;
  return elapsedTime > MAX_EXECUTION_TIME;
}

function handleSpawn(model: Model, options?: Options) {
  return new Promise<number>(function (resolve, reject) {
    const startTime = Date.now();
    const tick = setTick(() => {
      if (HasModelLoaded(model)) {
        resolve(spawn(model, options));
        return clearTick(tick);
      }
      const elapsedTime = Date.now() - startTime;
      if (shouldThreadExpire(elapsedTime)) {
        reject(`Max execution time elapsed in handleSpawn`);
        return clearTick(tick);
      }
    });
  });
}

export function request(model: Model, options?: Options) {
  if (!shouldRequestModel(model))
    throw new Error(`vehicle model "${model}" not found`);
  RequestModel(model);
  return handleSpawn(model, options);
}

export function requestDefault() {
  return request(DEFAULT_VEHICLE, { preset: DEFAULT_VEHICLE_PRESET });
}

/**
 * Takes the given vehicle and loads it
 * @param _source The source (unused)
 * @param args The args
 * @returns void
 */
export async function vehicle(_source: number, args: UndefinedArgs) {
  const [model, preset, SEAT_INTO_CAR] = getArgs(args);
  try {
    await SpawnPlayerInVehicle(model, { preset, SEAT_INTO_CAR });
  } catch (error) {
    debugDATA(error);
  }
}

export { SpawnPlayerInVehicle };
