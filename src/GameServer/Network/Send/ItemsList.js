const PacketSend = invoke('Packet/Send');

function itemsList(items, popup = false) {
    const packet = new PacketSend(0x11);

    packet
        .writeH(popup)
        .writeH(utils.size(items));

    items.forEach((item) => {
        packet
            .writeC(0x00)  // Mask
            .writeD(item.fetchId())
            .writeD(item.fetchSelfId())
            .writeC(item.fetchEquipped() ? 0xff : 0x00)
            .writeQ(item.fetchAmount())
            .writeC(item.fetchClass2()) // 00-Weapon, 01-Armor, 02-Jewel, 03-Quest, 04-Adena, 05-Other
            .writeC(0x00)  // ?
            .writeH(item.fetchEquipped())
            .writeQ(item.fetchEquipped() ? 2 ** item.fetchSlot() : 0)
            .writeC(0x00)  // Enchant level
            .writeC(0x00)  // ?
            .writeD(0x00)  // Mana
            .writeD(0x00)  // Time
            .writeC(0x01); // Available
    });

    return packet.fetchBuffer();
}

module.exports = itemsList;
