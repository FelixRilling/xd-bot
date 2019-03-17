import { resolvedArgumentMap } from "cli-ngy/types/argument/resolvedArgumentMap";
import { toFullName } from "di-ngy/src/util/toFullName";
import { commandFn } from "di-ngy/types/command/commandFn";
import { IDingyCommand } from "di-ngy/types/command/IDingyCommand";
import { Message } from "discord.js";
import { lisaChevron } from "../../di";
import { LisaController } from "./lib/LisaController";

// noinspection SpellCheckingInspection
const HIGH_QUALITY_JOKES = [
    "Why do trees have so many friends? They branch out.",
    "A photographer was great at botany because he knew photo synthesis.",
    "When the plums dry on your tree, it's time to prune.",
    "The tree that was creating energy was turned into a power-plant.",
    "My fear of roses is a thorny issue. I'm not sure what it stems from, but it seems likely I'll be stuck with it.",
    "The raisin wined about how he couldn't achieve grapeness.",
    "I can't find my rutabaga. I hope it will turnip.",
    "When I bought some fruit trees the nursery owner gave me some insects to help with pollination." +
        " They were free bees.",
    "The research assistant couldn't experiment with plants because he hadn't botany.",
    "The farmer was surprised when his pumpkin won a blue ribbon at the State Fair. He shouted, 'Oh, my gourd.'",
    "After winter, the trees are relieved.",
    "Mr. Mushroom could never understand why he wasn't looked on as a real fun guy.",
    "What do you call a sour orange that was late to school? Tarty!",
    "When the Nomadic tree senses danger it packs up its trunk and leaves.",
    "If we canteloup lettuce marry!",
    "What kind of tree grows on your hand? A palm tree.",
    "After a cold winter, will deciduous trees be releaved?",
    "I saw something similar to moss the other day, but I didn't know what to lichen it to.",
    "In some conifer forests, you can't cedar wood for the trees."
];

const jokeFn: commandFn = (
    args: resolvedArgumentMap,
    argsAll: string[],
    msg: Message
) => {
    const lisaController: LisaController = lisaChevron.get(LisaController);
    const goodJoke = Math.random() > 0.5;
    // noinspection SpellCheckingInspection
    return lisaController.performAction(
        toFullName(msg.author),
        0,
        goodJoke ? 15 : -15,
        HIGH_QUALITY_JOKES,
        ["Dead plants can't listen to your jokes (probably)."]
    );
};

const joke: IDingyCommand = {
    fn: jokeFn,
    args: [],
    alias: ["pun"],
    data: {
        hidden: false,
        usableInDMs: false,
        powerRequired: 0,
        help: "Tell Lisa a joke."
    }
};

export { joke };
