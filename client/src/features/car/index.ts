import { DEFAULT_SEAT, DEFAULT_VEHICLE } from "./config";
import { Args, Model, Vector3Tuple } from "../../types";
import { debugDATA, getArg, isEmpty, shouldRequestModel } from "./utils";

/**
 * Creates the vehicle and release it from memory
 * @param model The name of the vehicle to be spawned
 */
function spawn(model: Model) {
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
}

function handleSpawn(model: Model) {
  const tick = setTick(() => {
    if (HasModelLoaded(model)) {
      spawn(model);
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
function request(model: Model) {
  if (!shouldRequestModel(model))
    return debugDATA(`vehicle model "${model}" not found`);
  RequestModel(model);
  handleSpawn(model);
}

function requestDefault() {
  request(DEFAULT_VEHICLE);
}

/**
 * Takes the given car and loads it
 * @param _source The source (unused)
 * @param args The args
 * @returns void
 */
export function car(_source: number, args: Args) {
  if (isEmpty(args)) return requestDefault();
  const arg = getArg(args);
  request(arg);
}
