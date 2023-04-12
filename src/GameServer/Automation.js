const ServerResponse = invoke('GameServer/Network/Send');
const Timer          = invoke('GameServer/Timer');
const SpeckMath      = invoke('GameServer/SpeckMath');

class Automation {
    constructor() {
        this.timer = { // TODO: Move this into actual GameServer timer
            pickup: Timer.init()
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

    schedulePickup(session, src, dst, callback) {
        const from = {
            locX: src.fetchLocX(),
            locY: src.fetchLocY(),
            locZ: src.fetchLocZ(),
        };

        const to = {
            locX: dst.fetchLocX(),
            locY: dst.fetchLocY(),
            locZ: dst.fetchLocZ(),
        };

        // Execute each time, or else creature is stuck
        session.dataSend(ServerResponse.moveToLocation(src.fetchId(), { from: from, to: to }), src);

        // Calculate duration
        src.state.setTowards('pickup');
        const ticks = this.ticksToMove(
            from.locX, from.locY, from.locZ, to.locX, to.locY, to.locZ, 0, src.fetchRunSpd()
        );

        // Arrived
        Timer.start(this.timer.pickup, () => {
            src.state.setTowards(false);
            callback();

        }, ticks);
    }

    fetchDistanceRatio() {
        if (Timer.exists(this.timer.pickup)) {
            return Timer.completeness(this.timer.pickup);
        }
        return false;
    }

    abortAll(creature) {
        creature.state.setTowards(false);
        Timer.clear(this.timer.pickup);
    }
}

module.exports = Automation;
