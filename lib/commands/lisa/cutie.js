"use strict";

const CUTIE_IDS = ["273221196001181697"];

const basicTask = require("./lib/basicTask");

module.exports = function (args, msg, app) {
    const onSucess = ["awwwwwwwwwww", ">w<", "/)w(\\"];
    const onFailure = ["You're not the one true cutie!"];
    const onDead = ["OwO whats this? a dead Lisa..."];
    const check = CUTIE_IDS.includes(msg.author.id);
    const modifier = {
        happiness: 50
    };

    return basicTask(
        msg,
        app,
        check,
        modifier,
        onSucess,
        onFailure,
        onDead
    );
};