import {Map} from './Map';
import {Rabbit} from './Rabbit';
import {Fox} from './Fox';
import {Canvas} from './Canvas';
import {Stats} from './Stats';

/**
 * Simulator is the object in charge of running the entire simulation and displaying it on the screen.
 * It can reset the simulation, simulate a single step and updates the view components.
 */
export class Simulator {
  private static INITIAL_FOX_POPULATION = 100;
  private static INITIAL_RABBIT_POPULATION = 250;

  private map: Map;
  private canvas: Canvas;
  private stats: Stats;

  constructor(map: Map, canvas: Canvas, stats: Stats) {
    this.map = map;
    this.canvas = canvas;
    this.stats = stats
  }

  reset() {
    this.map.reset();
    this.canvas.resize(this.map);

    this.populate();
    this.canvas.draw(this.map);

    this.stats.reset(this.map);
  }

  populate() {
    for (let x = 0; x < Simulator.INITIAL_RABBIT_POPULATION; x++) {
      const location = this.map.getRandomFreeLocation()
      const rabbit = new Rabbit(this.map, location, true);
      this.map.addAnimal(rabbit);
    }

    for (let x = 0; x < Simulator.INITIAL_FOX_POPULATION; x++) {
      const location = this.map.getRandomFreeLocation()
      const fox = new Fox(this.map, location, true);
      this.map.addAnimal(fox);
    }
  }

  step() {
    this.map.animals.forEach(animal => animal.act());
    this.clearDeadAnimals();

    this.canvas.draw(this.map);
    this.stats.step(this.map);
  }

  private clearDeadAnimals() {
    for (const index in this.map.animals) {
      const animal = this.map.animals[index];
      if (!animal.alive) {
        delete this.map.animals[index];
        this.map.map[animal.location.y][animal.location.x] = null;
      }
    }
  }

}
