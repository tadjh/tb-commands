import {
  DEFAULT_VEHICLE_PRESET,
  DEFAULT_SEAT,
  DEFAULT_VEHICLE,
} from "./config";
import { Model, UndefinedArgs, Vector3Tuple } from "../../types";
import { debugDATA, getArgs, isTrue, shouldRequestModel } from "./utils";
import { Options } from "./types";
import { SpawnPlayerInCar } from "./utils/natives";

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

/**
 * Creates the vehicle and release it from memory
 * @param model The name of the vehicle to be spawned
 */
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
  if (options) handleOptions(ped, vehicle, options);
  debugDATA(`spawned vehicle model "${model}".`);
}

function handleSpawn(model: Model, options?: Options) {
  const tick = setTick(() => {
    if (HasModelLoaded(model)) {
      spawn(model, options);
      clearTick(tick);
    }
    Wait(500);
  });
}

export function request(model: Model, options?: Options) {
  if (!shouldRequestModel(model))
    return debugDATA(`vehicle model "${model}" not found`);
  RequestModel(model);
  handleSpawn(model, options);
}

export function requestDefault() {
  request(DEFAULT_VEHICLE, { preset: DEFAULT_VEHICLE_PRESET });
}

/**
 * Takes the given car and loads it
 * @param _source The source (unused)
 * @param args The args
 * @returns void
 */
export function car(_source: number, args: UndefinedArgs) {
  // if (isEmpty(args)) return requestDefault();
  const [model, preset, SEAT_INTO_CAR] = getArgs(args);
  SpawnPlayerInCar(model, { preset, SEAT_INTO_CAR });
}

export { SpawnPlayerInCar };
