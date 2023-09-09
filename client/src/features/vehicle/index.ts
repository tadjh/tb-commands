import {
  DEFAULT_VEHICLE_PRESET,
  DEFAULT_SEAT,
  DEFAULT_VEHICLE,
} from "./config";
import { Model, UndefinedArgs, Vector3Tuple } from "../../types";
import { debugDATA, shouldRequestModel } from "./utils";
import { Options, SeatType } from "./types";
import { SpawnVehicle } from "./utils/natives";

function handleEmit(vehicle: number, preset?: string) {
  emit("SpawnVehicle", vehicle, preset);
  debugDATA(`emitting event "SpawnVehicle"`);
}

function setVehiclePreset(vehicle: number, preset?: string | number) {
  if (preset === undefined || preset === "undefined") return;

  if (typeof preset === "string") {
    preset = parseInt(preset);
    if (Number.isNaN(preset)) return;
  }

  SetVehicleColourCombination(vehicle, preset);
}

function handleOptions(
  ped: number,
  vehicle: number,
  options: Partial<Options>
) {
  setVehiclePreset(vehicle, options.preset);
  switch (options.SEAT_INTO_CAR) {
    case "walk":
      return TaskEnterVehicle(ped, vehicle, -1, DEFAULT_SEAT, 1.0, 1, 0);
    case "instant":
      return SetPedIntoVehicle(ped, vehicle, DEFAULT_SEAT);
    case "none":
    default:
      break;
  }
}

function cleanUp(model: Model, vehicle: number) {
  SetEntityAsNoLongerNeeded(vehicle);
  SetModelAsNoLongerNeeded(model);
}

function spawn(model: Model, options?: Partial<Options>) {
  const ped = PlayerPedId();
  const vehicle = CreateVehicle(
    model,
    ...(GetEntityCoords(ped, true) as Vector3Tuple),
    GetEntityHeading(ped),
    true,
    false
  );
  cleanUp(model, vehicle);
  handleEmit(
    vehicle,
    typeof options?.preset === "string" ? options?.preset : undefined
  );
  debugDATA(`spawned vehicle model "${model}".`);
  if (options) handleOptions(ped, vehicle, options);
  return vehicle;
}

function shouldThreadExpire(elapsedTime: number) {
  const MAX_EXECUTION_TIME = 5000;
  return elapsedTime > MAX_EXECUTION_TIME;
}

function handleSpawn(model: Model, options?: Partial<Options>) {
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

export function request(model: Model, options?: Partial<Options>) {
  if (!shouldRequestModel(model))
    throw new Error(`vehicle model "${model}" not found`);
  RequestModel(model);
  return handleSpawn(model, options);
}

export function requestDefault() {
  return request(DEFAULT_VEHICLE, {
    preset: DEFAULT_VEHICLE_PRESET,
    SEAT_INTO_CAR: "instant",
  });
}

function deleteVehicle(delay = 2000) {
  const ped = PlayerPedId();
  const vehicle = GetVehiclePedIsIn(ped, false);
  TaskLeaveVehicle(ped, vehicle, 1);
  const timeout: CitizenTimer = setTimeout(() => {
    SetEntityAsMissionEntity(vehicle, true, true);
    DeleteVehicle(vehicle);
    return clearTimeout(timeout);
  }, delay);
}

/**
 * Takes the given vehicle and loads it
 * @param _source The source (unused)
 * @param args The args
 * @returns void
 */
export async function vehicle(_source: number, args: UndefinedArgs<SeatType>) {
  const [arg0, arg1, arg2] = args;
  switch (arg0) {
    case "delete":
      return deleteVehicle();
    case "flip":
      const vehicle = GetVehiclePedIsIn(PlayerPedId(), true);
      return SetVehicleOnGroundProperly(vehicle);
    default:
      const model = arg0;
      try {
        await SpawnVehicle(model, {
          preset: arg1,
          SEAT_INTO_CAR: arg2 || "instant",
        });
      } catch (error) {
        debugDATA(error);
      }
      break;
  }
}
