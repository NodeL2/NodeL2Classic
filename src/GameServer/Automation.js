const ServerResponse = invoke('GameServer/Network/Send');
const Timer          = invoke('GameServer/Timer');
const SpeckMath      = invoke('GameServer/SpeckMath');

class Automation {
    constructor() {
        this.timer = { // TODO: Move this into actual GameServer timer
            movement: Timer.init(), interval: undefined
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

        const start = new SpeckMath.Point3D(from.locX, from.locY, from.locZ);
        const end   = new SpeckMath.Point3D(to.locX, to.locY, to.locZ);

        // Execute each time, or else creature is stuck
        session.dataSend(ServerResponse.moveToLocation(src.fetchId(), { from: from, to: to }), src);

        // Calculate duration
        src.state.setTowards('movement');
        const ticks = this.ticksToMove(
            from.locX, from.locY, from.locZ, to.locX, to.locY, to.locZ, 0, src.fetchRunSpd()
        );

        clearInterval(this.timer.interval);
        this.timer.interval = setInterval(() => {
            src.setLocXYZ(start.midPoint(end, this.fetchDistanceRatio() * 1.0).toCoords());
        }, 100);

        // Arrived
        Timer.start(this.timer.movement, () => {
            clearInterval(this.timer.interval);
            src.state.setTowards(false);
            callback();

        }, ticks);
    }

    fetchDistanceRatio() {
        if (Timer.exists(this.timer.movement)) {
            return Timer.completeness(this.timer.movement);
        }
        return false;
    }

    abortAll(creature) {
        creature.state.setTowards(false);
        clearInterval(this.timer.interval);
        Timer.clear(this.timer.movement);
    }
}

module.exports = Automation;
