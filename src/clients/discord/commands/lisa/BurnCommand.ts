import { Message } from "discord.js";
import { Command, CommandoClient, CommandoMessage } from "discord.js-commando";
import { chevron } from "../../../../chevron";
import { LisaDeathCause } from "../../../../lisa/LisaState";
import { LisaDiscordCommandController } from "../../controller/LisaDiscordCommandController";

class BurnCommand extends Command {
    private readonly lisaDiscordCommandController: LisaDiscordCommandController;

    constructor(client: CommandoClient) {
        super(client, {
            name: "burn",
            aliases: ["fire", "killitwithfire"],
            group: "lisa",
            memberName: "burn",
            description: "Burn Lisa (you monster)."
        });
        this.lisaDiscordCommandController = chevron.getInjectableInstance(
            LisaDiscordCommandController
        );
    }

    run(message: CommandoMessage): Promise<Message | Message[]> {
        return message.say(
            this.lisaDiscordCommandController.performKill(
                message.author,
                LisaDeathCause.FIRE,
                null,
                [
                    "_You hear muffled plant-screams as you set Lisa on fire_",
                    "_Lisa looks at you, judging your actions._",
                    "AAAAAAAAAAAAAAAAAAAAAAAAAAAA"
                ],
                ["Lisa is already dead!"]
            )
        );
    }
}

export { BurnCommand };
