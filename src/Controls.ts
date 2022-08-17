import {Simulator} from './Simulator';

export class Controls {
  private static FPS = 20;

  private intervalHandle: any;
  private simulator: Simulator;

  constructor(simulator: Simulator) {
    this.simulator = simulator;
    this.bindButtons();
  }

  bindButtons() {
    const startBtn = document.getElementById('start') as HTMLButtonElement;
    const stopBtn = document.getElementById('stop') as HTMLButtonElement;
    const resetBtn = document.getElementById('reset') as HTMLButtonElement;

    startBtn.addEventListener('click', () => this.start());
    stopBtn.addEventListener('click', () => this.stop());
    resetBtn.addEventListener('click', () => this.reset());
  }

  start() {
    if (this.intervalHandle) {
      return;
    }

    this.intervalHandle = setInterval(() => {
      this.simulator.step();
    }, 1000 / Controls.FPS);
  }

  stop() {
    if (!this.intervalHandle) {
      return;
    }
    
    clearInterval(this.intervalHandle);
    this.intervalHandle = null;
  }

  reset() {
    this.simulator.reset();
  }

}
