import { Container } from "inversify";
import { StateRepository } from "./core/state/StateRepository";
import { TYPES } from "./types";
import { StatusService } from "./core/status/StatusService";
import { StatusTextService } from "./core/status/StatusTextService";
import { StateController } from "./core/state/StateController";
import type { CommandoClientOptions } from "discord.js-commando";
import { DiscordCommandController } from "./clients/discord/DiscordCommandController";
import { DISCORD_CLIENT_CONFIG } from "./config";
import { TickController } from "./core/time/TickController";
import { DiscordService } from "./clients/discord/DiscordService";
import { DiscordClient } from "./clients/discord/DiscordClient";
import { DiscordEventController } from "./clients/discord/DiscordEventController";
import { PersistenceProvider } from "./core/PersistenceProvider";
import { StateStorageController } from "./core/state/StateStorageController";

export const container = new Container();

container
    .bind<PersistenceProvider>(TYPES.PersistenceProvider)
    .to(PersistenceProvider)
    .inSingletonScope();

container.bind<StateRepository>(TYPES.StateRepository).to(StateRepository);

container.bind<StatusService>(TYPES.StatusService).to(StatusService);
container
    .bind<StatusTextService>(TYPES.StatusTextService)
    .to(StatusTextService);

container
    .bind<StateController>(TYPES.StateController)
    .to(StateController)
    .inSingletonScope();
container
    .bind<TickController>(TYPES.TickController)
    .to(TickController)
    .inSingletonScope();
container
    .bind<StateStorageController>(TYPES.StorageController)
    .to(StateStorageController)
    .inSingletonScope();

container.bind<DiscordService>(TYPES.DiscordService).to(DiscordService);

container
    .bind<DiscordCommandController>(TYPES.DiscordCommandController)
    .to(DiscordCommandController)
    .inSingletonScope();
container
    .bind<DiscordEventController>(TYPES.DiscordEventController)
    .to(DiscordEventController)
    .inSingletonScope();
container
    .bind<DiscordClient>(TYPES.DiscordClient)
    .to(DiscordClient)
    .inSingletonScope();

container
    .bind<CommandoClientOptions>(TYPES.DiscordConfig)
    .toConstantValue(DISCORD_CLIENT_CONFIG);
