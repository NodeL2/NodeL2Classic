class Schedule {
    start(func, ms) {
        if (this.exists()) { this.clear(); }
        this.timer = setTimeout(func, ms);
        this.end   = this.timer._idleTimeout / 1000;
    }

    exists() {
        return this.timer ? true : false;
    }

    completeness() {
        return this.elapsed() / this.end;
    }

    elapsed() {
        if (!this.timer) return -1;
        return process.uptime() - this.timer._idleStart / 1000;
    }

    left() {
        if (!this.timer) return -1;
        return (this.timer._idleStart + this.timer._idleTimeout) / 1000 - process.uptime();
    }

    clear() {
        if (!this.timer) return;
        clearTimeout(this.timer);
        delete this.timer;
        delete this.end;
    }
}

class Multiple {
    start(func, ms) {
        if (this.exists()) { this.clear(); }
        this.timer = setInterval(func, ms);
    }

    exists() {
        return this.timer ? true : false;
    }

    clear() {
        if (!this.timer) return;
        clearInterval(this.timer);
        delete this.timer;
    }
}

module.exports = {
    Schedule: Schedule, Multiple: Multiple
};