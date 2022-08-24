import {Animal} from './Animal';
import {Location} from './Location';
import {Map} from './Map';
import {Rabbit} from './Rabbit';
import {randomRange} from './functions';

/**
 * This class represents a fox
 */
export class Fox extends Animal {
  // A single eaten rabbit can sustain a fox for this many simulated steps
  private static RABBIT_FOOD_VALUE: number = 9;

  // A fox's stomach can hold this amount of food at maximum
  private static MAX_FOOD_LEVEL: number = Fox.RABBIT_FOOD_VALUE * 2;

  // represents the amount of food this fox has in it's stomach. It will decrease by 1 every step and kills the fox
  // when it reaches 0.
  private foodLevel: number;

  public constructor(map: Map, location: Location, randomAge: boolean = false) {
    super(map, location, randomAge);
    // set the fox its food level
    this.foodLevel = randomRange(
      Fox.RABBIT_FOOD_VALUE,
      Fox.RABBIT_FOOD_VALUE * 2
    );
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
  private incrementHunger() {
    // decrement the food level
    this.foodLevel--;
    // if the food level is 0 or lower
    if (this.foodLevel <= 0) {
      // kill the fox
      this.kill();
    }
  }

  /**
   * Do all the things the fox does in a single simulated step.
   *
   * The fox its hunger and age is incremented and if the fox is still alive, it will try to give birth and hunt
   * for food. If food is found the fox will move the corresponding location otherwise it will try to wander to
   * a free adjacent location. if the fox can't change location it will die.
   */
  public act() {
    // increase it's hunger
    this.incrementHunger();

    // increase it's age
    this.incrementAge();

    // if it's still alive
    if (this.alive) {
      // try to give birth
      this.tryToGiveBirth(this.map);

      // see if we can find something to eat and take it's place. Otherwise, wander to a random adjacent location
      const newLocation: Location | null =
        this.hunt(this.map) ||
        this.map.getRandomFreeAdjacentLocation(this.location);

      // if we can't find a free adjacent location, die because of overpopulation
      newLocation ? (this.location = newLocation) : this.kill();
    }
  }

  /**
   * Look at all the adjacent locations and see if there's an animal we can eat.
   * If we can; eat it, increase our foodlevel and take it's location.
   *
   * @param map
   * @private
   */
  private hunt(map: Map): Location | null {
    // find the adjacent locations
    const neighbours = map.getAdjacentLocations(this.location);
    // do something for each location
    for (const location of neighbours) {
      // get the animal at the location
      const animal = map.getActorAt(location);
      // if an animal is found and the animal is rabbit and alive
      if (animal != null && animal instanceof Rabbit && animal.alive) {
        // kill the animal
        animal.kill();
        // increase the fox its foodlevel
        this.foodLevel += Fox.RABBIT_FOOD_VALUE;
        // make sure the foodlevel cannot get above its maximum
        this.foodLevel = Math.min(this.foodLevel, Fox.MAX_FOOD_LEVEL);

        // return the location
        return location;
      }
    }

    // return null if no food is found
    return null;
  }
}
