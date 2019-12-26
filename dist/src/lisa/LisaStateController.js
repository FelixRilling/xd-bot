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
var LisaStateController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const chevronjs_1 = require("chevronjs");
const lodash_1 = require("lodash");
const moment_1 = require("moment");
const rxjs_1 = require("rxjs");
const chevron_1 = require("../chevron");
const logger_1 = require("../logger");
const LisaState_1 = require("./LisaState");
const LisaStatusService_1 = require("./service/LisaStatusService");
const createNewLisaState = (createdByUser, bestLifetime = moment_1.duration(0)) => {
    return {
        bestLifetime,
        status: {
            water: LisaState_1.WATER_INITIAL,
            happiness: LisaState_1.HAPPINESS_INITIAL
        },
        life: {
            time: new Date(),
            byUser: createdByUser
        },
        death: {
            time: null,
            byUser: null,
            cause: null
        }
    };
};
let LisaStateController = LisaStateController_1 = class LisaStateController {
    constructor(lisaStatusService) {
        this.lisaStatusService = lisaStatusService;
        this.state = createNewLisaState(LisaState_1.USER_SYSTEM);
        this.stateChangeSubject = new rxjs_1.Subject();
    }
    /**
     * Gets a copy of the state to process e.g. when creating text for the current status.
     *
     * @return copy of the current state.
     */
    getStateCopy() {
        return lodash_1.cloneDeep(this.state);
    }
    /**
     * Only used for loading persisted data, do not use for regular state changes.
     *
     * @param state State to load.
     */
    load(state) {
        this.state = state;
        this.stateChanged();
    }
    replantLisa(byUser = LisaState_1.USER_SYSTEM) {
        LisaStateController_1.logger.debug(`'${byUser}' replanted lisa.`);
        this.performReplant(byUser);
        this.stateChanged();
    }
    killLisa(cause, byUser = LisaState_1.USER_SYSTEM) {
        LisaStateController_1.logger.debug(`'${byUser}' killed lisa by ${cause}.`);
        this.performKill(byUser, cause);
        this.stateChanged();
    }
    modifyLisaStatus(waterModifier, happinessModifier, byUser = LisaState_1.USER_SYSTEM) {
        LisaStateController_1.logger.debug(`'${byUser}' modified status; water modifier ${waterModifier}, happiness modifier ${happinessModifier}.`);
        this.performModifyStatus(waterModifier, happinessModifier, byUser);
        this.stateChanged();
    }
    performReplant(byUser) {
        this.state = createNewLisaState(byUser, this.state.bestLifetime);
    }
    performKill(byUser, cause) {
        this.state.death = { time: new Date(), byUser, cause };
        if (!this.lisaStatusService.isAlive(this.getStateCopy())) {
            this.updateHighScoreIfRequired();
        }
    }
    performModifyStatus(waterModifier, happinessModifier, byUser) {
        this.state.status.water += waterModifier;
        this.state.status.happiness += happinessModifier;
        if (this.lisaStatusService.isAlive(this.getStateCopy())) {
            // Check changed stats
            this.checkStats(byUser);
        }
    }
    checkStats(byUser) {
        if (this.state.status.water > LisaState_1.WATER_MAX) {
            LisaStateController_1.logger.debug(`Water level ${this.state.status.water} is above limit of ${LisaState_1.WATER_MAX} -> ${LisaState_1.LisaDeathCause.DROWNING}.`);
            this.killLisa(LisaState_1.LisaDeathCause.DROWNING, byUser);
        }
        else if (this.state.status.water < LisaState_1.WATER_MIN) {
            LisaStateController_1.logger.debug(`Water level ${this.state.status.water} is below limit of ${LisaState_1.WATER_MIN} -> ${LisaState_1.LisaDeathCause.DEHYDRATION}.`);
            this.killLisa(LisaState_1.LisaDeathCause.DEHYDRATION, byUser);
        }
        if (this.state.status.happiness > LisaState_1.HAPPINESS_MAX) {
            LisaStateController_1.logger.debug(`Happiness level ${this.state.status.happiness} is above limit of ${LisaState_1.HAPPINESS_MAX} -> reducing to limit.`);
            this.state.status.happiness = LisaState_1.HAPPINESS_MAX;
        }
        else if (this.state.status.happiness < LisaState_1.HAPPINESS_MIN) {
            LisaStateController_1.logger.debug(`Happiness level ${this.state.status.happiness} is below limit of ${LisaState_1.HAPPINESS_MIN} -> ${LisaState_1.LisaDeathCause.SADNESS}.`);
            this.killLisa(LisaState_1.LisaDeathCause.SADNESS, byUser);
        }
    }
    updateHighScoreIfRequired() {
        const lifetime = this.lisaStatusService.getLifetime(this.getStateCopy());
        if (lifetime > this.state.bestLifetime) {
            LisaStateController_1.logger.debug(`Increasing high score from ${this.state.bestLifetime} to ${lifetime}.`);
            this.state.bestLifetime = lifetime;
        }
    }
    stateChanged() {
        LisaStateController_1.logger.silly("Lisa state changed.");
        this.stateChangeSubject.next();
    }
};
LisaStateController.logger = logger_1.rootLogger.child({
    target: LisaStateController_1
});
LisaStateController = LisaStateController_1 = __decorate([
    chevronjs_1.Injectable(chevron_1.chevron, {
        bootstrapping: chevronjs_1.DefaultBootstrappings.CLASS,
        dependencies: [LisaStatusService_1.LisaStatusService]
    }),
    __metadata("design:paramtypes", [LisaStatusService_1.LisaStatusService])
], LisaStateController);
exports.LisaStateController = LisaStateController;
