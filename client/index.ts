import { coords } from "./features/coords";
import { respawn } from "./features/respawn";
// import { time } from "./features/time";
import { goto, summon, tp } from "./features/tp";

RegisterCommand("coords", coords, false);
RegisterCommand("respawn", respawn, false);
// RegisterCommand(COMMAND_TIME, time, false);
RegisterCommand("tp", tp, false);
RegisterCommand("goto", goto, false);
RegisterCommand("summon", summon, false);

// TODO Add Chat suggestions
