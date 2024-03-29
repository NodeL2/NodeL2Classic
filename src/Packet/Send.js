class PacketSend {
    constructor(opcode) {
        this.buffer = Buffer.from([opcode]);
    }

    append(data) {
        this.buffer = Buffer.concat([this.buffer, data]);
    }

    write(value, size) {
        const data = Buffer.alloc(size);

        switch (size) {
            case 1.0: data.writeUInt8   (value); break;
            case 2.0: data.writeInt16LE (value); break;
            case 4.0: data.writeInt32LE (value); break;
            case 4.1: data.writeFloatLE (value); break;
            case 8.0: data.writeDoubleLE(value); break;
        }

        this.append(data);
        return this;
    }

    // Standard

    writeC(value) {
        return this.write(value, 1.0);
    }

    writeH(value) {
        return this.write(value, 2.0);
    }

    writeD(value) {
        return this.write(value, 4.0);
    }

    writeE(value) {
        return this.write(value, 4.1);
    }

    writeQ(value) {
        return this.write(value, 4.0).write(0, 4.0);
    }

    writeF(value) {
        return this.write(value, 8.0);
    }

    // Special

    writeB(buffer) {
        this.append(Buffer.from(buffer));
        return this;
    }

    writeS(text) {
        this.append(Buffer.from(text, 'ucs2'));
        this.append(Buffer.alloc(2));
        return this;
    }

    writeT(text) {
        this.write(utils.size(text), 2);
        this.append(Buffer.from(text, 'ucs2'));
        return this;
    }

    // End

    fetchBuffer(checksum = true) {
        const size = utils.size(this.buffer);
        this.append(Buffer.alloc((Math.ceil(size / 4) * 4) - size));

        if (checksum) {
            this.append(Buffer.alloc(8 - (utils.size(this.buffer) % 8)));
        }
        return this.buffer;
    }
}

module.exports = PacketSend;
