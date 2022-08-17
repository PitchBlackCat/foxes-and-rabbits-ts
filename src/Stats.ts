import {Map} from './Map';
import {Rabbit} from './Rabbit';
import {Fox} from './Fox';

export class Stats {
  private stepCountElement: HTMLInputElement;
  private rabbitCountElement: HTMLInputElement;
  private foxCountElement: HTMLInputElement;

  constructor() {
    this.stepCountElement = document.getElementById('stepCount') as HTMLInputElement;
    this.rabbitCountElement = document.getElementById('rabbitCount') as HTMLInputElement;
    this.foxCountElement = document.getElementById('foxCount') as HTMLInputElement;
  }

  reset(map: Map) {
    this.stepCountElement.value = '0';
    this.updateAnimalCount(map);
  }

  step(map: Map) {
    this.stepCountElement.value = `${Number(this.stepCountElement.value) + 1}`;
    this.updateAnimalCount(map);
  }

  updateAnimalCount(map: Map) {
    this.rabbitCountElement.value = `${map.animals.filter(a => a instanceof Rabbit).length}`;
    this.foxCountElement.value = `${map.animals.filter(a => a instanceof Fox).length}`;
  }

}
