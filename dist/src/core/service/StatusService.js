"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusService = void 0;
const moment_1 = require("moment");
const logger_1 = require("../../logger");
const LisaState_1 = require("../LisaState");
const inversify_1 = require("inversify");
let StatusService = /** @class */ (() => {
    var StatusService_1;
    let StatusService = StatusService_1 = class StatusService {
        isAlive(state) {
            return state.death.time == null;
        }
        getLifetime(state) {
            const birth = state.life.time.getTime();
            if (!this.isAlive(state)) {
                const death = state.death.time.getTime();
                return moment_1.duration(death - birth);
            }
            const now = Date.now();
            return moment_1.duration(now - birth);
        }
        getTimeSinceDeath(state) {
            if (this.isAlive(state)) {
                return null;
            }
            const death = state.death.time.getTime();
            const now = Date.now();
            return moment_1.duration(death - now);
        }
        /**
         * Returns an relative index from 0 to 1 how well lisa is doing, where 1 is the best and 0 the worst.
         *
         * @return relative index.
         */
        calculateRelativeIndex(state) {
            let relativeWater = state.status.water / LisaState_1.WATER_INITIAL;
            if (relativeWater > 1) {
                relativeWater = 1;
            }
            const relativeHappiness = state.status.happiness / LisaState_1.HAPPINESS_INITIAL;
            const relativeIndex = relativeWater < relativeHappiness
                ? relativeWater
                : relativeHappiness;
            StatusService_1.logger.debug(`Calculated relative index ${relativeIndex.toFixed(2)} for water ${state.status.water} and happiness ${state.status.happiness}.`);
            return relativeIndex;
        }
    };
    StatusService.logger = logger_1.rootLogger.child({
        target: StatusService_1,
    });
    StatusService = StatusService_1 = __decorate([
        inversify_1.injectable()
    ], StatusService);
    return StatusService;
})();
exports.StatusService = StatusService;
//# sourceMappingURL=StatusService.js.map