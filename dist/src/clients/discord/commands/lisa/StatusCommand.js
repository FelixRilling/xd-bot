"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_commando_1 = require("discord.js-commando");
const chevron_1 = require("../../../../chevron");
const LisaDiscordCommandController_1 = require("../../LisaDiscordCommandController");
class StatusCommand extends discord_js_commando_1.Command {
    constructor(client) {
        super(client, {
            name: "status",
            aliases: [],
            group: "lisa",
            memberName: "status",
            description: "Shows the status of Lisa."
        });
        this.lisaDiscordCommandController = chevron_1.chevron.getInjectableInstance(LisaDiscordCommandController_1.LisaDiscordCommandController);
    }
    run(message) {
        return message.say(this.lisaDiscordCommandController.createStatusText());
    }
}
exports.StatusCommand = StatusCommand;
