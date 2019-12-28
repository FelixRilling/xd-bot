"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const chevron_1 = require("./chevron");
const LisaDiscordClient_1 = require("./clients/discord/LisaDiscordClient");
const LisaDiscordEventController_1 = require("./clients/discord/LisaDiscordEventController");
const LisaStateController_1 = require("./lisa/LisaStateController");
const LisaStorageController_1 = require("./lisa/LisaStorageController");
const LisaTickController_1 = require("./lisa/LisaTickController");
const LisaStorageService_1 = require("./lisa/service/LisaStorageService");
const logger_1 = require("./logger");
const mode_1 = require("./mode");
const logger = logger_1.rootLogger.child({ target: "main" });
const startLisaMainClient = async () => {
    const lisaStateController = chevron_1.chevron.getInjectableInstance(LisaStateController_1.LisaStateController);
    const lisaStorageService = chevron_1.chevron.getInjectableInstance(LisaStorageService_1.LisaStorageService);
    const lisaStorageController = chevron_1.chevron.getInjectableInstance(LisaStorageController_1.LisaStorageController);
    const lisaTimer = chevron_1.chevron.getInjectableInstance(LisaTickController_1.LisaTickController);
    if (await lisaStorageService.hasStoredState()) {
        logger.info("Found stored Lisa state, loading it.");
        lisaStateController.load(await lisaStorageService.loadStoredState());
    }
    else {
        logger.info("No stored state found, skipping loading.");
    }
    lisaStorageController.bindListeners();
    lisaTimer.start();
};
const startLisaDiscordClient = async () => {
    const lisaDiscordClient = chevron_1.chevron.getInjectableInstance(LisaDiscordClient_1.LisaDiscordClient);
    const lisaDiscordController = chevron_1.chevron.getInjectableInstance(LisaDiscordEventController_1.LisaDiscordEventController);
    const discordToken = mode_1.isProductionMode()
        ? process.env.DISCORD_TOKEN
        : process.env.DISCORD_TOKEN_TEST;
    if (lodash_1.isNil(discordToken)) {
        throw new Error("No token set.");
    }
    lisaDiscordClient.init({
        commandPrefix: "$",
        owner: "128985967875850240"
    });
    await lisaDiscordClient.login(discordToken);
    lisaDiscordController.bindListeners();
};
logger.info("Starting Lisa main client...");
startLisaMainClient()
    .then(() => logger.info("Started Lisa main client."))
    .catch(e => console.error("Could not start Lisa main client.", e));
logger.info("Starting Lisa discord client...");
startLisaDiscordClient()
    .then(() => logger.info("Started Lisa discord client."))
    .catch(e => console.error("Could not start Lisa discord client.", e));
