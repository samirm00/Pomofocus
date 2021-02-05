"use strict";

export class Timer {
    timer = {
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15,
        longBreakInterval: 4,
        sessions: 0,
        interval:0,
      };
  
      getRemainingTime(endTime) {
        const currentTime = Date.parse(new Date());
        const difference = endTime - currentTime;
      
        const total = Number.parseInt(difference / 1000, 10);
        const minutes = Number.parseInt((total / 60) % 60, 10);
        const seconds = Number.parseInt(total % 60, 10);
      
        return {
          total,
          minutes,
          seconds,
        };
      }
  
      startTimer() {
        let { total } = this.timer.remainingTime;
        const endTime = Date.parse(new Date()) + total * 1000;
      
        if (this.timer.mode === 'pomodoro') this.timer.sessions++;
      
        document.getElementById('js-btn').dataset.action = 'stop';
        document.getElementById('js-btn').textContent = 'stop';
        document.getElementById('js-btn').classList.add('active');
      
        this.timer.interval = setInterval(() => {
          this.timer.remainingTime = this.getRemainingTime(endTime);
          this.updateClock();
      
          total = this.timer.remainingTime.total;
          if (total <= 0) {
            clearInterval(this.timer.interval);
      
            switch (instance.timer.mode) {
              case 'pomodoro':
                if (this.timer.sessions % this.timer.longBreakInterval === 0) {
                  this.switchMode('longBreak');
                } else {
                  this.switchMode('shortBreak');
                }
                break;
              default:
                this.switchMode('pomodoro');
            }
      
            if (Notification.permission === 'granted') {
              const text =
                this.timer.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!';
              new Notification(text);
            }
      
            document.querySelector(`[data-sound="${this.timer.mode}"]`).play();
      
            this.startTimer();
          }
        }, 1000);
      }
  
      stopTimer() {
  
        clearInterval(this.timer.interval);
      
        document.getElementById('js-btn').dataset.action = 'start';
        document.getElementById('js-btn').textContent = 'start';
        document.getElementById('js-btn').classList.remove('active');
      }
  
      updateClock() {
        const { remainingTime } = this.timer;
        const minutes = `${remainingTime.minutes}`.padStart(2, '0');
        const seconds = `${remainingTime.seconds}`.padStart(2, '0');
      
        const min = document.getElementById('js-minutes');
        const sec = document.getElementById('js-seconds');
        min.textContent = minutes;
        sec.textContent = seconds;
      
        const text =
          this.timer.mode === 'pomodoro' ? 'Get back to work!' : 'Take a break!';
        document.title = `${minutes}:${seconds} — ${text}`;
      
        const progress = document.getElementById('js-progress');
        progress.value = this.timer[this.timer.mode] * 60 - this.timer.remainingTime.total;
      }
  
      switchMode(mode) {
        this.timer.mode = mode;
        this.timer.remainingTime = {
          total: this.timer[mode] * 60,
          minutes: this.timer[mode],
          seconds: 0,
        };
      
        document
          .querySelectorAll('button[data-mode]')
          .forEach(e => e.classList.remove('active'));
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
        document.body.style.backgroundColor = `var(--${mode})`;
        document
          .getElementById('js-progress')
          .setAttribute('max', this.timer.remainingTime.total);
      
        this.updateClock();
      }   
     
  }

