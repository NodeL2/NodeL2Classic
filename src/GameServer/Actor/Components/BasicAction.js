const ServerResponse = invoke('GameServer/Network/Send');

function basicAction(data) {
    switch (data.actionId) {
        case 0x00: // Sit/Stand
            this.state.setAnimated(true);
            this.state.setSeated(!this.state.fetchSeated());
            this.session.dataSend(ServerResponse.sitAndStand(this));

            setTimeout(() => {
                this.state.setAnimated(false);
            }, 2500);
            break;
    
        case 0x01: // Walk/Run
            this.state.setWalkin(!this.state.fetchWalkin());
            this.session.dataSend(ServerResponse.walkAndRun(this.fetchId(), this.state.fetchWalkin() ? 0 : 1));
            break;
    
        case 0x0c: // Greet
            emote(this, 0x02);
            break;
    
        case 0x0d: // Win
            emote(this, 0x03);
            break;
    
        case 0x0e: // Advance
            emote(this, 0x04);
            break;
    
        case 0x18: // Yes
            emote(this, 0x06);
            break;
    
        case 0x19: // No
            emote(this, 0x05);
            break;
    
        case 0x1a: // Bow
            emote(this, 0x07);
            break;
    
        case 0x1d: // Unaware
            emote(this, 0x08);
            break;
    
        case 0x1e: // Social Wait
            emote(this, 0x09);
            break;
    
        case 0x1f: // :)
            emote(this, 0x0a);
            break;
    
        case 0x21: // Applaud
            emote(this, 0x0b);
            break;
    
        case 0x22: // Dance
            emote(this, 0x0c);
            break;
    
        case 0x23: // Sorrow
            emote(this, 0x0d);
            break;
    
        case 0x28: // Recommend without selection
            break;
    
        default:
            utils.infoWarn('GameServer', 'unknown basic action 0x%s', utils.toHex(data.actionId));
            break;
    }
}

function emote(actor, id) {
    actor.session.dataSend(ServerResponse.socialAction(actor.fetchId(), id));
}

module.exports = basicAction;
