const ServerResponse = invoke('GameServer/Network/Send');
const Chronos        = invoke('GameServer/Chronos');
const SpeckMath      = invoke('GameServer/SpeckMath');

class Automation {
    constructor() {
        this.timer = { // TODO: Move this into actual GameServer timer
            once   : Chronos.Schedule.init(),
            repeat : Chronos.Multiple.init(),
        };

        this.ticksPerSecond = 10;
    }

    destructor(creature) {
        this.abortAll(creature);
    }

    ticksToMove(srcX, srcY, srcZ, dstX, dstY, dstZ, radius, speed) {
        const distance = new SpeckMath.Point3D(srcX, srcY, srcZ).distance(new SpeckMath.Point3D(dstX, dstY, dstZ)) - radius;
        const duration = 1 + ((this.ticksPerSecond * distance) / speed);
        return (1000 / this.ticksPerSecond) * duration;
    }

    scheduleMovement(session, src, dst, callback) {
        src.state.setTowards('movement');

        const from = {
            locX: src.fetchLocX(),
            locY: src.fetchLocY(),
            locZ: src.fetchLocZ(),
        };

        const to = {
            locX: dst.locX,
            locY: dst.locY,
            locZ: dst.locZ,
        };

        // Execute each time, or else creature is stuck
        session.dataSend(ServerResponse.moveToLocation(src.fetchId(), { from: from, to: to }), src);

        // Calculate duration
        const ticks = this.ticksToMove(
            from.locX, from.locY, from.locZ, to.locX, to.locY, to.locZ, 0, src.fetchRunSpd()
        );

        // Arrived
        Chronos.Schedule.start(this.timer.once, () => {
            this.abortAll(src);
            callback();

        }, ticks);

        // Report
        Chronos.Multiple.start(this.timer.repeat, () => {
            src.setLocXYZ(new SpeckMath.Point3D(from.locX, from.locY, from.locZ).midPoint(new SpeckMath.Point3D(to.locX, to.locY, to.locZ), this.fetchDistanceRatio()).toCoords());

        }, 100);
    }

    fetchDistanceRatio() {
        if (Chronos.Schedule.exists(this.timer.once)) {
            return Chronos.Schedule.completeness(this.timer.once);
        }
        return false;
    }

    abortAll(creature) {
        creature.state.setTowards(false);
        Chronos.Schedule.clear(this.timer.once);
        Chronos.Multiple.clear(this.timer.repeat);
    }
}

module.exports = Automation;
