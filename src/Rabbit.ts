import {Animal} from './Animal';
import {Location} from './Location';
import {Map} from './Map';
import {randomInt} from './functions';

export class Rabbit extends Animal {
  private static BREEDING_AGE: number = 5;
  private static MAX_AGE: number = 40;
  private static BREEDING_PROBABILITY: number = 0.12;

  public constructor(map: Map, location: Location, randomAge: boolean = false) {
    super(map, location);
    this.age = randomAge ? randomInt(Rabbit.MAX_AGE) : 0;

  }

  public act() {
    this.incrementAge();

    if (this.alive) {
      const newLocation: Location | null = this.map.getRandomFreeAdjacentLocation(this.location);
      newLocation ? this.location = newLocation : this.kill();
      this.tryToGiveBirth(this.map);
    }
  }

  private incrementAge() {
    this.age++;
    if (this.age > Rabbit.MAX_AGE) {
      this.kill();
    }
  }

  private tryToGiveBirth(map: Map) {
    if (this.age < Rabbit.BREEDING_AGE) {
      return;
    }

    const freeLocations: Location[] = map.getFreeAdjacentLocations(this.location);
    freeLocations.forEach(loc => {
      if (Math.random() < Rabbit.BREEDING_PROBABILITY) {
        map.addAnimal(new Rabbit(map, loc));
      }
    });
  }
}
