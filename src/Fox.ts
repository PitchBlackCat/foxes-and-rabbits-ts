import {Animal} from './Animal';
import {Location} from './Location';
import {Map} from './Map';
import {Rabbit} from './Rabbit';
import {randomInt, randomRange} from './functions';

export class Fox extends Animal {
  private static BREEDING_AGE: number = 15;
  private static MAX_AGE: number = 150;
  private static BREEDING_PROBABILITY: number = 0.04;
  private static MAX_LITTER_SIZE: number = 2;
  private static RABBIT_FOOD_VALUE: number = 9;
  private static MAX_FOOD_VALUE: number = Fox.RABBIT_FOOD_VALUE * 2;

  private foodLevel: number;

  public constructor(map: Map, location: Location, randomAge: boolean = false) {
    super(map, location);
      this.age = randomAge ? randomInt(Fox.MAX_AGE) : 0;
      this.foodLevel = randomRange(Fox.RABBIT_FOOD_VALUE, Fox.RABBIT_FOOD_VALUE * 2);
  }

  public act() {
    this.incrementHunger();
    this.incrementAge();

    if (this.alive) {
      const newLocation: Location | null = this.hunt(this.map) || this.map.getRandomFreeAdjacentLocation(this.location);
      newLocation ? this.location = newLocation : this.kill();
      this.tryToGiveBirth(this.map);
    }
  }

  private incrementAge() {
    this.age++;
    if (this.age > Fox.MAX_AGE) {
      this.kill();
    }
  }

  private incrementHunger()
  {
    this.foodLevel--;
    if(this.foodLevel <= 0) {
      this.kill();
    }
  }

  private tryToGiveBirth(map: Map) {
    if (this.age < Fox.BREEDING_AGE) {
      return;
    }

    const freeLocations: Location[] = map.getFreeAdjacentLocations(this.location);
    let litterCounter = 0;
    freeLocations.forEach(loc => {
      if (litterCounter < Fox.MAX_LITTER_SIZE && Math.random() < Fox.BREEDING_PROBABILITY) {
        litterCounter++;
        map.addAnimal(new Fox(map, loc));
      }
    });
  }

  private hunt(map: Map): Location | null
  {
    const neighbours = map.getAdjacentLocations(this.location);
    for (const location of neighbours) {
      const animal = map.getAnimalAt(location);
      if (animal != null && animal instanceof Rabbit && animal.alive) {
        animal.kill();
        this.foodLevel += Fox.RABBIT_FOOD_VALUE;
        this.foodLevel = Math.min(this.foodLevel, Fox.MAX_FOOD_VALUE)

        return location;
      }
    }

    return null;
  }
}
