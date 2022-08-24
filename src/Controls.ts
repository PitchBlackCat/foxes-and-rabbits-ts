import {Simulator} from './Simulator';

/**
 * Controls is the bridge beteen the html buttons and the simulator.
 * it keeps track of all the html button elements, and adds eventlisteners that will trigger certain functionality.
 */
export class Controls {
  // The FPS of the simulation
  private static FPS = 10;

  // If we start an interval, we need to save the handle so we can cancel it again.
  private intervalHandle: any;

  // the simulator that we try to control
  private simulator: Simulator;

  constructor(simulator: Simulator) {
    this.simulator = simulator;
    this.bindButtons();
  }

  /**
   * Find all the button elements and add event listeners to them, so stuff can happen when we click them
   */
  bindButtons() {
    const startBtn = document.getElementById('start') as HTMLButtonElement;
    const stopBtn = document.getElementById('stop') as HTMLButtonElement;
    const resetBtn = document.getElementById('reset') as HTMLButtonElement;

    startBtn.addEventListener('click', () => this.start());
    stopBtn.addEventListener('click', () => this.stop());
    resetBtn.addEventListener('click', () => this.reset());
  }

  /**
   * Start the simulation. It will call the step method of the simulator FPS times per second.
   */
  start() {
    if (this.intervalHandle) {
      return;
    }

    this.intervalHandle = setInterval(() => {
      this.simulator.step();
    }, 1000 / Controls.FPS);
  }

  /**
   * Stop the simulation.
   */
  stop() {
    // Check if the simulation is running in the first place; we can't stop what isn't running.
    if (!this.intervalHandle) {
      return;
    }

    clearInterval(this.intervalHandle);
    this.intervalHandle = null;
  }

  /**
   * Reset the simulation.
   */
  reset() {
    this.simulator.reset();
  }
}
