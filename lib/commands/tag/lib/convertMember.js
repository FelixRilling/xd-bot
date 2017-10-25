"use strict";

const toDatetime = require("ynajs/lib/types/toDatetime");
const toFullName = require("di-ngy/lib/util/toFullName");

/**
 * convert member
 *
 * @param {Member}
 * @returns {Object}
 */
module.exports = function (member) {
    const user = member.user;

    return {
        __default: toFullName(user),

        name: user.username,
        id: user.id,
        discriminator: user.discriminator,
        avatar: user.avatar,
        bot: user.bot,
        avatar_url: user.avatarURL,
        default_avatar: "<NYI>",
        default_avatar_url: user.defaultAvatarURL,
        mention: `<@${user.id}>`,
        created_at: toDatetime(user.createdTimestamp),
        display_name: member.displayName,
        voice: "<NYI>",
        joined_at: toDatetime(member.joinedTimestamp),
        roles: "<NYI>",
        status: user.presence.status,
        game: user.presence.game !== null ? user.presence.game.name : "None",
        server: member.guild.name,
        nick: member.nickname,
        colour: "<NYI>",
        color: "<NYI>",
        top_role: "<NYI>",
        server_permissions: "<NYI>"
    };
};