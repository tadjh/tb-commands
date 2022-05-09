(()=>{"use strict";var e,t,r={275:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.MAX_EXECUTION=t.COMMAND_TIME=t.COMMAND_TP=t.COMMAND_RESPAWN=t.COMMAND_PED=t.COMMAND_COORDS=t.COMMAND_CAR=t.CURRENT_RESOURCE_NAME=void 0,t.CURRENT_RESOURCE_NAME=GetCurrentResourceName(),t.COMMAND_CAR="car",t.COMMAND_COORDS="coords",t.COMMAND_PED="ped",t.COMMAND_RESPAWN="respawn",t.COMMAND_TP="tp",t.COMMAND_TIME="time",t.MAX_EXECUTION=1e4},499:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DEFAULT_VEHICLE=t.DEFAULT_SEAT=void 0,t.DEFAULT_SEAT=-1,t.DEFAULT_VEHICLE="turismo2"},795:function(e,t,r){var o=this&&this.__spreadArray||function(e,t,r){if(r||2===arguments.length)for(var o,n=0,i=t.length;n<i;n++)!o&&n in t||(o||(o=Array.prototype.slice.call(t,0,n)),o[n]=t[n]);return e.concat(o||Array.prototype.slice.call(t))};Object.defineProperty(t,"__esModule",{value:!0}),t.car=void 0;var n=r(499),i=r(672);function a(e){if(!(0,i.shouldRequestModel)(e))return(0,i.debugDATA)('vehicle model "'.concat(e,'" not found'));RequestModel(e),function(e){var t=setTick((function(){HasModelLoaded(e)&&(function(e){var t=PlayerPedId(),r=GetEntityCoords(t,!0),a=CreateVehicle.apply(void 0,o(o([e],r,!1),[GetEntityHeading(t),!0,!1],!1));SetPedIntoVehicle(t,a,n.DEFAULT_SEAT),SetEntityAsNoLongerNeeded(a),SetModelAsNoLongerNeeded(e),(0,i.debugDATA)('spawned vehicle model "'.concat(e,'".'))}(e),clearTick(t)),Wait(500)}))}(e)}t.car=function(e,t){(0,i.isEmpty)(t)?a(n.DEFAULT_VEHICLE):a((0,i.getArg)(t))}},672:function(e,t,r){var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r),Object.defineProperty(e,o,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),n=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||o(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),t.shouldRequestModel=void 0,n(r(928),t),t.shouldRequestModel=function(e){return IsModelInCdimage(e)&&IsModelAVehicle(e)}},254:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.DEFAULT_COORDS_LABEL=void 0,t.DEFAULT_COORDS_LABEL="coords"},257:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.coords=void 0;var o=r(254),n=r(928);t.coords=function(e){var t=GetEntityCoords(PlayerPedId(),!0);(0,n.debugDATA)(o.DEFAULT_COORDS_LABEL,t)}},582:function(e,t,r){var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r),Object.defineProperty(e,o,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),n=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||o(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),n(r(795),t),n(r(257),t),n(r(164),t),n(r(933),t),n(r(792),t),n(r(942),t)},164:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ped=void 0;var o=r(949);Object.defineProperty(t,"ped",{enumerable:!0,get:function(){return o.ped}})},949:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.ped=void 0,t.ped=function(){for(var e,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return(e=globalThis.exports["immersive-ped"]).ped.apply(e,t)}},933:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.respawn=void 0,t.respawn=function(){globalThis.exports.spawnmanager.forceRespawn()}},7:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.INVALID_SECONDS=t.INVALID_MINUTES=t.INVALID_HOURS=t.TIME_ERROR_SECONDS_TEXT=t.TIME_ERROR_MINUTES_TEXT=t.TIME_ERROR_HOURS_TEXT=t.DEFAULT_TIME_OF_DAY=t.DEFAULT_HOUR_OF_DAY=void 0,t.DEFAULT_HOUR_OF_DAY=12,t.DEFAULT_TIME_OF_DAY=[t.DEFAULT_HOUR_OF_DAY,0,0],t.TIME_ERROR_HOURS_TEXT="Invalid number of hours.",t.TIME_ERROR_MINUTES_TEXT="Invalid number of minutes.",t.TIME_ERROR_SECONDS_TEXT="Invalid number of seconds.",t.INVALID_HOURS="INVALID_HOURS",t.INVALID_MINUTES="INVALID_MINUTES",t.INVALID_SECONDS="INVALID_SECONDS"},792:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.time=void 0;var o=r(7),n=r(928),i=r(988);function a(e,t,r){return e<0||e>23?(0,i.handleError)(o.INVALID_HOURS):t<0||t>59?(0,i.handleError)(o.INVALID_MINUTES):r<0||r>59?(0,i.handleError)(o.INVALID_SECONDS):(NetworkOverrideClockTime(e,t,r),void(0,n.debugDATA)("Time set to ".concat(e," hours, ").concat(t," minutes and ").concat(r," seconds.")))}t.time=function(e,t){if((0,n.isEmpty)(t))a.apply(void 0,o.DEFAULT_TIME_OF_DAY);else{var r=(0,i.parseArgs)(t);a.apply(void 0,r)}}},988:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.handleError=t.parseArgs=void 0;var o=r(7);t.parseArgs=function(e){var t,r=e[0],n=e[1],i=e[2],a=(t=r)?parseInt(t):o.DEFAULT_HOUR_OF_DAY,_=function(e){return e?parseInt(e):0}(n),c=function(e){return e?parseInt(e):0}(i);return[a,_,c]},t.handleError=function(e){switch(e){case o.INVALID_HOURS:return console.log(o.TIME_ERROR_HOURS_TEXT);case o.INVALID_MINUTES:return console.log(o.TIME_ERROR_MINUTES_TEXT);case o.INVALID_SECONDS:return console.log(o.TIME_ERROR_SECONDS_TEXT);default:throw new Error("invalid error type in time")}}},73:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.SHOULD_IGNORE_WATER=t.DEFAULT_COORDS=t.DEFAULT_GROUND_Z=t.STEP=t.MAX_EXECUTION=void 0;var o=r(275);Object.defineProperty(t,"MAX_EXECUTION",{enumerable:!0,get:function(){return o.MAX_EXECUTION}}),t.STEP=.5,t.DEFAULT_GROUND_Z=28,t.DEFAULT_COORDS=[0,0,t.DEFAULT_GROUND_Z],t.SHOULD_IGNORE_WATER=!0},942:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.tp=void 0;var o=r(73),n=r(928),i=r(751),a=function(e,t,r){_(e,t,r);var i=Date.now(),a=0,c=setTick((function(){if(Date.now()-i>o.MAX_EXECUTION)return clearTick(c);var _=GetGroundZFor_3dCoord(e,t,r+a,o.SHOULD_IGNORE_WATER),d=_[0],u=_[1];if(d)return function(e,t,r){SetEntityCoords(PlayerPedId(),e,t,r,!1,!1,!1,!1),ClearFocus(),(0,n.debugDATA)("Teleported to ".concat(e,", ").concat(t,", ").concat(r,"."))}(e,t,u),clearTick(c);a+=o.STEP,Wait(0)}))},_=function(e,t,r){SetFocusArea(e,t,r,0,0,0)};t.tp=function(e,t){if((0,n.isEmpty)(t))a.apply(void 0,o.DEFAULT_COORDS);else{var r=(0,i.parseArgs)(t);a.apply(void 0,r)}}},751:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.parseArgs=void 0;var o=r(73);function n(e,t){return void 0===t&&(t=0),e?parseFloat(e):t}t.parseArgs=function(e){var t=e[0],r=e[1],i=e[2];return[n(t),n(r),n(i,o.DEFAULT_GROUND_Z)]}},720:function(e,t,r){var o=this&&this.__spreadArray||function(e,t,r){if(r||2===arguments.length)for(var o,n=0,i=t.length;n<i;n++)!o&&n in t||(o||(o=Array.prototype.slice.call(t,0,n)),o[n]=t[n]);return e.concat(o||Array.prototype.slice.call(t))};Object.defineProperty(t,"__esModule",{value:!0}),t.debugDATA=t.debug=void 0;var n=r(275),i=r(928),a="".concat(n.CURRENT_RESOURCE_NAME,":debug"),_="set ".concat(a," 1"),c="set ".concat(a," 0");function d(){return!!GetConvarInt(a,0)}function u(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];console.log.apply(console,o(["".concat(n.CURRENT_RESOURCE_NAME.toUpperCase(),":")],e,!1))}function s(e){if(void 0!==e?e:!d())return ExecuteCommand(_),void u("debug on");ExecuteCommand(c),u("debug off")}function E(e,t){if((0,i.isEmpty)(t))return s();var r,o;r=(0,i.getArg)(t),function(e){return 0===e||1===e}(o=parseInt(r))&&s(Boolean(o))}t.debug=E,t.debugDATA=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];d()&&u.apply(void 0,e)},RegisterCommand(a,E,!1)},928:function(e,t,r){var o=this&&this.__createBinding||(Object.create?function(e,t,r,o){void 0===o&&(o=r),Object.defineProperty(e,o,{enumerable:!0,get:function(){return t[r]}})}:function(e,t,r,o){void 0===o&&(o=r),e[o]=t[r]}),n=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||o(t,e,r)};Object.defineProperty(t,"__esModule",{value:!0}),t.getArg=t.isEmpty=void 0,n(r(720),t),t.isEmpty=function(e){return Array.isArray(e)&&!e.length},t.getArg=function(e){return e[0]}}},o={};function n(e){var t=o[e];if(void 0!==t)return t.exports;var i=o[e]={exports:{}};return r[e].call(i.exports,i,i.exports,n),i.exports}e=n(275),t=n(582),RegisterCommand(e.COMMAND_COORDS,t.coords,!1),RegisterCommand(e.COMMAND_CAR,t.car,!1),RegisterCommand(e.COMMAND_PED,t.ped,!1),RegisterCommand(e.COMMAND_RESPAWN,t.respawn,!1),RegisterCommand(e.COMMAND_TIME,t.time,!1),RegisterCommand(e.COMMAND_TP,t.tp,!1),globalThis.exports("car",t.car),globalThis.exports("time",t.time),globalThis.exports("tp",t.tp)})();