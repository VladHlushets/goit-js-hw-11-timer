import './styles.css';

const getRefsById = selector => ({
  daysRef: document.querySelector(`${selector} span[data-value="days"]`),
  hoursRef: document.querySelector(`${selector} span[data-value="hours"]`),
  minsRef: document.querySelector(`${selector} span[data-value="mins"]`),
  secsRef: document.querySelector(`${selector} span[data-value="secs"]`),
});

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.intervalId = null;
  }

  count(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    if (time > 0) {
      const { daysRef, hoursRef, minsRef, secsRef } = getRefsById(
        this.selector,
      );
      daysRef.textContent = days;
      hoursRef.textContent = hours;
      minsRef.textContent = mins;
      secsRef.textContent = secs;
    } else clearInterval(this.intervalId);
  }

  timer() {
    let currentDate = Date.now();
    const deltaTime = this.targetDate - currentDate;
    this.count(deltaTime);
  }

  start() {
    this.timer();
    this.intervalId = setInterval(() => {
      this.timer();
    }, 1000);
  }

  pad = value => String(value).padStart(2, '0');
}

const myTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Sep 25, 2025'),
});

myTimer.start();
