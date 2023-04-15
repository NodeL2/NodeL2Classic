const ServerResponse = invoke('GameServer/Network/Send');

function sitAndStand(session, actor, data) {
    actor.state.setAnimated(true);
    actor.state.setSeated(!actor.state.fetchSeated());
    session.dataSend(ServerResponse.sitAndStand(actor), actor);

    setTimeout(() => {
        actor.state.setAnimated(false);
    }, 2500);
}

function walkAndRun(session, actor) {
    actor.state.setWalkin(!actor.state.fetchWalkin());
    session.dataSend(ServerResponse.walkAndRun(actor.fetchId(), actor.state.fetchWalkin() ? 0 : 1), actor);
}

function emote(session, actor, id) {
    session.dataSend(ServerResponse.socialAction(actor.fetchId(), id));
}

function basicAction(session, actor, data) {
    switch (data.actionId) {
        case 0x00: // Sit/Stand
            sitAndStand(session, actor, data);
            break;
    
        case 0x01: // Walk/Run
            walkAndRun(session, actor);
            break;
    
        case 0x0c: // Greet
            emote(session, actor, 0x02);
            break;
    
        case 0x0d: // Win
            emote(session, actor, 0x03);
            break;
    
        case 0x0e: // Advance
            emote(session, actor, 0x04);
            break;
    
        case 0x18: // Yes
            emote(session, actor, 0x06);
            break;
    
        case 0x19: // No
            emote(session, actor, 0x05);
            break;
    
        case 0x1a: // Bow
            emote(session, actor, 0x07);
            break;
    
        case 0x1d: // Unaware
            emote(session, actor, 0x08);
            break;
    
        case 0x1e: // Social Wait
            emote(session, actor, 0x09);
            break;
    
        case 0x1f: // :)
            emote(session, actor, 0x0a);
            break;
    
        case 0x21: // Applaud
            emote(session, actor, 0x0b);
            break;
    
        case 0x22: // Dance
            emote(session, actor, 0x0c);
            break;
    
        case 0x23: // Sorrow
            emote(session, actor, 0x0d);
            break;
    
        case 0x28: // Recommend without selection
            break;
    
        default:
            utils.infoWarn('GameServer', 'unknown basic action 0x%s', utils.toHex(data.actionId));
            break;
    }
}

module.exports = basicAction;
