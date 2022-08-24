import {Animal} from './Animal';
import {Location} from './Location';
import {Map} from './Map';

/**
 * This class represents a rabbit
 */
export class Rabbit extends Animal {
  public constructor(map: Map, location: Location, randomAge: boolean = false) {
    super(map, location, randomAge);
  }

  /**
   * Rabbits are turquoise, everyone knows that.
   */
  get color(): string {
    return '#7ecfd0';
  }

  /**
   * Rabbits need to be at least this number of simulated steps old to be able to have offsprings.
   *
   * @protected
   */
  protected getBreedingAge(): number {
    return 5;
  }

  /**
   * Rabbits have this percentage of chance to produce an offspring.
   *
   * @protected
   */
  protected getBreedingProbability(): number {
    return 0.12;
  }

  /**
   * Rabbits will die once they are this number of simulated steps old.
   *
   * @protected
   */
  protected getMaxAge(): number {
    return 40;
  }

  /**
   * Rabbits can have up to this number of offsprings
   *
   * @protected
   */
  protected getMaxLitterSize(): number {
    return 4;
  }

  /**
   * Creates a new Rabbit
   *
   * @param map
   * @param location
   * @protected
   */
  protected createAnimal(map: Map, location: Location): Animal {
    return new Rabbit(map, location);
  }

  /**
   * Do all the things the rabbit does in a single simulated step.
   *
   * The rabbit its age is incremented and if the rabbit is still alive, it will try to give birth and try to
   * wander to a free adjacent location. If no location is found the rabbit will die.
   */
  public act() {
    // increase it's age
    this.incrementAge();

    // if it's still alive
    if (this.alive) {
      // try to give birth
      this.tryToGiveBirth(this.map);

      // wander to a random free adjacent location
      const newLocation: Location | null =
        this.map.getRandomFreeAdjacentLocation(this.location);
      // if we can't find a free location, die because of overpopulation
      newLocation ? (this.location = newLocation) : this.kill();
    }
  }
}
