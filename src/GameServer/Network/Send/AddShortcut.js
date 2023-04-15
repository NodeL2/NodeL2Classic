const PacketSend = invoke('Packet/Send');

function addShortcut(shortcut) {
    const packet = new PacketSend(0x44);

    packet
        .writeD(shortcut.kind)
        .writeD(shortcut.slot);

    switch (shortcut.kind) {
        case 2: // Skill
            packet
                .writeD(shortcut.id)
                .writeH(shortcut.level)
                .writeH(0x00)  // Sublevel
                .writeD(0x00)  // Reuse
                .writeC(0x00)  // ?
                .writeD(shortcut.creature);
            break;

        case 3: // Action
            packet
                .writeD(shortcut.id)
                .writeD(shortcut.creature);
            break;
    }

    return packet.fetchBuffer();
}

module.exports = addShortcut;
