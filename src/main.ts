import { isNil } from "lodash";
import { chevron } from "./chevron";
import { DiscordEventController } from "./clients/discord/controller/DiscordEventController";
import { DiscordClient } from "./clients/discord/DiscordClient";
import { LisaStateController } from "./lisa/controller/LisaStateController";
import { LisaStateStorageController } from "./lisa/controller/LisaStateStorageController";
import { LisaTickController } from "./lisa/controller/LisaTickController";
import { rootLogger } from "./logger";

const logger = rootLogger.child({ target: "main" });

const startLisaMainClient = async (): Promise<void> => {
    const lisaStateController = chevron.getInjectableInstance<
        LisaStateController
    >(LisaStateController);

    const lisaStorageController = chevron.getInjectableInstance<
        LisaStateStorageController
    >(LisaStateStorageController);
    if (await lisaStorageController.hasStoredState()) {
        logger.info("Found stored Lisa state, loading it.");
        lisaStateController.loadState(
            await lisaStorageController.loadStoredState()
        );
    } else {
        logger.info("No stored state found, skipping loading.");
    }
    lisaStorageController.bindStateChangeSubscription(
        lisaStateController.stateChangeSubject
    );

    const lisaTimer = chevron.getInjectableInstance<LisaTickController>(
        LisaTickController
    );
    lisaTimer.tickObservable.subscribe(
        ({ waterModifier, happinessModifier, byUser }) =>
            lisaStateController.modifyLisaStatus(
                waterModifier,
                happinessModifier,
                byUser
            )
    );
};
const startLisaDiscordClient = async (): Promise<void> => {
    chevron.registerInjectable(
        {
            commandPrefix: "$",
            owner: "128985967875850240",
        },
        { name: "discordOptions" }
    );

    const lisaDiscordClient = chevron.getInjectableInstance<DiscordClient>(
        DiscordClient
    );
    const discordToken = process.env.DISCORD_TOKEN;
    if (isNil(discordToken)) {
        throw new Error("No secret set.");
    }

    await lisaDiscordClient.login(discordToken);

    const lisaDiscordController = chevron.getInjectableInstance<
        DiscordEventController
    >(DiscordEventController);
    lisaDiscordController.bindListeners();
};

logger.info("Starting Lisa main client...");
startLisaMainClient()
    .then(() => logger.info("Started Lisa main client."))
    .catch((e) => console.error("Could not start Lisa main client.", e));

logger.info("Starting Lisa discord client...");
startLisaDiscordClient()
    .then(() => logger.info("Started Lisa discord client."))
    .catch((e) => console.error("Could not start Lisa discord client.", e));
