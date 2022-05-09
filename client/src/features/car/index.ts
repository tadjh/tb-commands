import {
  DEFAULT_VEHICLE_PRESET,
  DEFAULT_SEAT,
  DEFAULT_VEHICLE,
} from "./config";
import { Model, UndefinedArgs, Vector3Tuple } from "../../types";
import { debugDATA, getArgs, isEmpty, shouldRequestModel } from "./utils";

function setVehiclePreset(vehicle: number, preset?: string | number) {
  if (preset === undefined) return;

  let color = -1;

  if (typeof preset === "string") {
    color = parseInt(preset);
    if (color === NaN) return;
  }

  if (typeof preset === "number") {
    color = preset;
  }

  SetVehicleColourCombination(vehicle, color);
}

/**
 * Creates the vehicle and release it from memory
 * @param model The name of the vehicle to be spawned
 */
function spawn(model: Model, preset?: string | number) {
  const ped = PlayerPedId();
  const pedCoords = GetEntityCoords(ped, true) as Vector3Tuple;
  const vehicle = CreateVehicle(
    model,
    ...pedCoords,
    GetEntityHeading(ped),
    true,
    false
  );
  SetPedIntoVehicle(ped, vehicle, DEFAULT_SEAT);
  SetEntityAsNoLongerNeeded(vehicle);
  SetModelAsNoLongerNeeded(model);
  debugDATA(`spawned vehicle model "${model}".`);
  setVehiclePreset(vehicle, preset);
}

function handleSpawn(model: Model, preset?: string | number) {
  const tick = setTick(() => {
    if (HasModelLoaded(model)) {
      spawn(model, preset);
      clearTick(tick);
    }
    Wait(500);
  });
}

/**
 * Loads the vehicle into memory
 * @param model The vehicle name
 * @returns void
 */
function request(model: Model, preset?: string | number) {
  if (!shouldRequestModel(model))
    return debugDATA(`vehicle model "${model}" not found`);
  RequestModel(model);
  handleSpawn(model, preset);
}

function requestDefault() {
  request(DEFAULT_VEHICLE, DEFAULT_VEHICLE_PRESET);
}

/**
 * Takes the given car and loads it
 * @param _source The source (unused)
 * @param args The args
 * @returns void
 */
export function car(_source: number, args: UndefinedArgs) {
  if (isEmpty(args)) return requestDefault();
  const [arg1, arg2] = getArgs(args);
  request(arg1, arg2);
}
