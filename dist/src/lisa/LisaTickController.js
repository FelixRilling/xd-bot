"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var LisaTickController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const chevronjs_1 = require("chevronjs");
const rxjs_1 = require("rxjs");
const chevron_1 = require("../chevron");
const logger_1 = require("../logger");
const LisaStateController_1 = require("./LisaStateController");
let LisaTickController = LisaTickController_1 = class LisaTickController {
    constructor(lisaStateController) {
        this.lisaStateController = lisaStateController;
        this.timer = null;
    }
    start() {
        rxjs_1.interval(LisaTickController_1.TIMEOUT).subscribe(() => this.tick());
        LisaTickController_1.logger.info(`Started Lisa timer with an interval of ${LisaTickController_1.TIMEOUT}.`);
    }
    tick() {
        LisaTickController_1.logger.debug("Performing tick.");
        this.lisaStateController.modifyLisaStatus(LisaTickController_1.WATER_MODIFIER, LisaTickController_1.HAPPINESS_MODIFIER, LisaTickController_1.USER_TICK);
    }
};
LisaTickController.logger = logger_1.rootLogger.child({
    target: LisaTickController_1
});
LisaTickController.TIMEOUT = 60000;
LisaTickController.WATER_MODIFIER = -0.5;
LisaTickController.HAPPINESS_MODIFIER = -0.75;
LisaTickController.USER_TICK = "Time";
LisaTickController = LisaTickController_1 = __decorate([
    chevronjs_1.Injectable(chevron_1.chevron, {
        dependencies: [LisaStateController_1.LisaStateController]
    }),
    __metadata("design:paramtypes", [LisaStateController_1.LisaStateController])
], LisaTickController);
exports.LisaTickController = LisaTickController;
