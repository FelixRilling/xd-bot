"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LisaStorageService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const chevronjs_1 = require("chevronjs");
const fs_extra_1 = require("fs-extra");
const lodash_1 = require("lodash");
const moment_1 = require("moment");
const chevron_1 = require("../../chevron");
let LisaStorageService = LisaStorageService_1 = class LisaStorageService {
    async hasStoredState() {
        return fs_extra_1.pathExists(LisaStorageService_1.STORAGE_PATH);
    }
    async loadStoredState() {
        const storedState = await fs_extra_1.readJSON(LisaStorageService_1.STORAGE_PATH);
        return this.fromJson(storedState);
    }
    async storeState(state) {
        const jsonLisaState = this.toJson(state);
        return await fs_extra_1.writeJSON(LisaStorageService_1.STORAGE_PATH, jsonLisaState);
    }
    fromJson(jsonState) {
        const state = lodash_1.cloneDeep(jsonState);
        if (state.life.time != null) {
            state.life.time = new Date(state.life.time);
        }
        if (state.death.time != null) {
            state.death.time = new Date(state.death.time);
        }
        state.bestLifetime = moment_1.duration(state.bestLifetime);
        return state;
    }
    toJson(state) {
        const storedState = lodash_1.cloneDeep(state);
        if (storedState.life.time != null) {
            storedState.life.time = storedState.life.time.getTime();
        }
        if (storedState.death.time != null) {
            storedState.death.time = storedState.death.time.getTime();
        }
        storedState.bestLifetime = state.bestLifetime.asMilliseconds();
        return storedState;
    }
};
LisaStorageService.STORAGE_PATH = "data/lisaState.json";
LisaStorageService = LisaStorageService_1 = __decorate([
    chevronjs_1.Injectable(chevron_1.chevron, { bootstrapping: chevronjs_1.DefaultBootstrappings.CLASS })
], LisaStorageService);
exports.LisaStorageService = LisaStorageService;