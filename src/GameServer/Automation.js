const ServerResponse = invoke('GameServer/Network/Send');
const Chronos        = invoke('GameServer/Chronos');
const SpeckMath      = invoke('GameServer/SpeckMath');

class Automation {
    constructor() {
        this.timer = { // TODO: Move this into actual GameServer timer
            once   : new Chronos.Schedule(),
            repeat : new Chronos.Multiple(),
        };

        this.ticksPerSecond = 10;
    }

    destructor(creature) {
        this.abortAll(creature);
    }

    scheduleMovement(session, kind, src, dst, radius, callback) {
        const from = new SpeckMath.Point3D(
            src.fetchLocX(),
            src.fetchLocY(),
            src.fetchLocZ(),
        );

        const to = new SpeckMath.Point3D(
            dst.locX ?? dst.fetchLocX(),
            dst.locY ?? dst.fetchLocY(),
            dst.locZ ?? dst.fetchLocZ(),
        );

        if (['movement'].includes(kind)) {
            session.dataSend(
                ServerResponse.moveToLocation(src.fetchId(), { from: from.toCoords(), to: to.toCoords() })
            );
        }
        else {
            session.dataSend(
                ServerResponse.moveToPawn(src, dst, radius)
            );
        }

        // Calculate duration
        src.state.setTowards(kind);
        const ticks = this.ticksToMove(from, to, radius, src.fetchRunSpd());

        // Arrived
        this.timer.once.start(() => {
            this.abortAll(src);
            callback();

        }, ticks);

        // Report
        this.timer.repeat.start(() => {
            this.fetchDistanceRatio((ratio) => {
                src.setLocXYZ(from.midPoint(to, ratio).toCoords());
            });

        }, 100);
    }

    ticksToMove(from, to, radius, speed) {
        const distance = from.distance(to) - radius;
        const duration = 1 + ((this.ticksPerSecond * distance) / speed);
        return (1000 / this.ticksPerSecond) * duration;
    }

    fetchDistanceRatio(callback) {
        if (this.timer.once.exists()) {
            callback(this.timer.once.completeness());
        }
    }

    abortAll(creature) {
        creature.state.setTowards(false);
        this.timer.once  .clear();
        this.timer.repeat.clear();
    }
}

module.exports = Automation;
