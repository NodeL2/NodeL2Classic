const PacketSend = invoke('Packet/Send');

function shortcutInit(shortcuts) {
    const packet = new PacketSend(0x45);

    packet
        .writeD(utils.size(shortcuts));

    shortcuts.forEach((shortcut) => {
        packet
            .writeD(shortcut.kind)
            .writeD(shortcut.slot)

        switch (shortcut.kind) {
            case 2: // Skill
                packet
                    .writeD(shortcut.id)
                    .writeH(shortcut.level)
                    .writeH(0x00)  // Sublevel
                    .writeD(0x00)  // Reuse
                    .writeC(0x00)  // ?
                    .writeD(0x01); // Creature
                break;

            case 3: // Action
                packet
                    .writeD(shortcut.id)
                    .writeD(0x01); // Creature
                break;
        }
    });

    return packet.fetchBuffer();
}

module.exports = shortcutInit;
