const SendPacket = invoke('Packet/Send');

function skillsList(skills) {
    const packet = new SendPacket(0x5f);

    packet
        .writeD(utils.size(skills));

    skills.forEach((skill) => {
        packet
            .writeD(skill.fetchPassive())
            .writeD(skill.fetchLevel())
            .writeD(skill.fetchSelfId())
            .writeD(0x00)  // Reuse
            .writeC(0x00)  // Disabled
            .writeC(0x00); // Can Enchant
    });

    packet
        .writeD(0x00); // Last Learned Skill Id

    return packet.fetchBuffer();
}

module.exports = skillsList;
