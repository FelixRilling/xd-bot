import { LisaTextService } from "../../lisa/service/LisaTextService";
import { LisaStateController } from "../../lisa/LisaStateController";
import { LisaDiscordClient } from "./LisaDiscordClient";
declare class LisaDiscordController {
    private readonly lisaStateController;
    private readonly lisaDiscordClient;
    private readonly lisaTextService;
    private static readonly logger;
    private static readonly PRESENCE_UPDATE_THROTTLE_TIMEOUT;
    private static readonly MESSAGE_HAPPINESS_MODIFIER;
    constructor(lisaStateController: LisaStateController, lisaDiscordClient: LisaDiscordClient, lisaTextService: LisaTextService);
    bindEvents(): void;
    private onMessage;
    private onStateChange;
}
export { LisaDiscordController };
//# sourceMappingURL=LisaDiscordController.d.ts.map