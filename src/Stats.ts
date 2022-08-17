import {Map} from './Map';
import {Rabbit} from './Rabbit';
import {Fox} from './Fox';

/**
 * Stats is in charge of displaying some numbers on the screen.
 * It keeps track of how many steps have been simulated, as well as the current population of animals.
 */
export class Stats {
  private stepCountElement: HTMLInputElement;
  private rabbitCountElement: HTMLInputElement;
  private foxCountElement: HTMLInputElement;

  constructor() {
    // find the html elements that we are going to use to display the stats in.
    this.stepCountElement = document.getElementById('stepCount') as HTMLInputElement;
    this.rabbitCountElement = document.getElementById('rabbitCount') as HTMLInputElement;
    this.foxCountElement = document.getElementById('foxCount') as HTMLInputElement;
  }

  reset(map: Map) {
    // reset the step and population counters
    this.stepCountElement.value = '0';
    this.updateAnimalCount(map);
  }

  step(map: Map) {
    // update the step and population counters
    this.stepCountElement.value = `${Number(this.stepCountElement.value) + 1}`;
    this.updateAnimalCount(map);
  }

  updateAnimalCount(map: Map) {
    // update the population counters
    this.rabbitCountElement.value = `${map.actors.filter(a => a instanceof Rabbit).length}`;
    this.foxCountElement.value = `${map.actors.filter(a => a instanceof Fox).length}`;
  }

}
