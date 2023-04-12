class PacketReceive {
    constructor(buffer) {
        this.buffer = buffer;
        this.data   = utils.tuple();

        // Skip the Opcode Id
        this.offset = 1;
    }

    read(size) {
        switch (size) {
            case 1: this.data.push(this.buffer.readUInt8  (this.offset)); break;
            case 2: this.data.push(this.buffer.readInt16LE(this.offset)); break;
            case 4: this.data.push(this.buffer.readInt32LE(this.offset)); break;
        }

        this.offset += size;
        return this;
    }

    // Standard

    readC() {
        return this.read(1);
    }

    readH() {
        return this.read(2);
    }

    readD() {
        return this.read(4);
    }

    // Special

    readB(size) {
        this.data.push(
            this.buffer.slice(this.offset, this.offset + size)
        );

        this.offset += size;
        return this;
    }

    readS() {
        const index = this.buffer.indexOf(Buffer.alloc(2), this.offset) + 1;
        if (index > 0) {
            this.data.push(utils.stripNull(
                this.buffer.toString('ascii', this.offset, index)
            ));
            this.offset += index + 1;
        }
        return this;
    }
}

module.exports = PacketReceive;
