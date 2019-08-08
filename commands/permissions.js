

function hasMediumPermissions(guild, user){
    let member = guild.member(user);

    return member && (member.highestRole.hasPermission('MANAGE_MESSAGES') || member.hasPermission('MANAGE_MESSAGES') || hasAllPermissions(guild, user));

  }

function hasAllPermissions(guild, user){

    let member = guild.member(user);

    return member && (member.highestRole.hasPermission('ADMINISTRATOR') || member.hasPermission('ADMINISTRATOR'));
}


module.exports = { hasMediumPermissions, hasAllPermissions }
