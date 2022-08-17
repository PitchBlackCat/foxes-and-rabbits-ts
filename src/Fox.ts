import {Animal} from './Animal';
import {Location} from './Location';
import {Map} from './Map';
import {Rabbit} from './Rabbit';
import {randomRange} from './functions';

/**
 * This class represents a fox
 */
export class Fox extends Animal {
  private static BREEDING_AGE: number = 15;
  private static MAX_AGE: number = 150;
  private static BREEDING_PROBABILITY: number = 0.04;
  private static MAX_LITTER_SIZE: number = 2;
  private static RABBIT_FOOD_VALUE: number = 9;
  private static MAX_FOOD_VALUE: number = Fox.RABBIT_FOOD_VALUE * 2;

  private foodLevel: number;

  public constructor(map: Map, location: Location, randomAge: boolean = false) {
    super(map, location, randomAge);
    // set the fox its food level
    this.foodLevel = randomRange(Fox.RABBIT_FOOD_VALUE, Fox.RABBIT_FOOD_VALUE * 2);
  }

  /**
   * Foxes are orange, just like their favourite fruit.
   */
  get color(): string {
    return '#db6205';
  }

   /**
   * Foxes need to be at least this number of simulated steps old to be able to have offsprings.
   *
   * @protected
   */
  protected getBreedingAge(): number {
    return 15;
  }

   /**
   * Foxes have this percentage of chance to produce an offspring.
   *
   * @protected
   */
  protected getBreedingProbability(): number {
    return 0.04;
  }

  /**
   * Foxes will die once they are this number of simulated steps old.
   *
   * @protected
   */
  protected getMaxAge(): number {
    return 150;
  }

  /**
   * Foxes can have up to this number of offsprings
   *
   * @protected
   */
  protected getMaxLitterSize(): number {
    return 2;
  }

  /**
   * Creates a new fox
   *
   * @param map
   * @param location
   * @protected
   */
  protected createAnimal(map: Map, location: Location): Animal {
    return new Fox(map, location);
  }

  /**
   * Become hungrier. If our foodlevel reaches 0, die.
   * @private
   */
  private incrementHunger()
  {
    // decrement the food level
    this.foodLevel--;
    // if the food level is 0 or lower
    if(this.foodLevel <= 0) {
      // kill the fox
      this.kill();
    }
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
    // find the adjacent locations
    const neighbours = map.getAdjacentLocations(this.location);
    // do something for each location
    for (const location of neighbours) {
      // get the animal at the location
      const animal = map.getAnimalAt(location);
      // if an animal is found and the animal is rabbit and alive
      if (animal != null && animal instanceof Rabbit && animal.alive) {
        // kill the animal
        animal.kill();
        // increase the fox its foodlevel
        this.foodLevel += Fox.RABBIT_FOOD_VALUE;
        this.foodLevel = Math.min(this.foodLevel, Fox.MAX_FOOD_VALUE)

        return location;
      }
    }

    // return null if no food is found
    return null;
  }
}
