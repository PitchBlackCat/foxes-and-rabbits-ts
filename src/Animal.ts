import {Location} from './Location';
import {Map} from './Map';
import {randomInt} from './functions';
import {Drawable} from './Drawable';
import {Actor} from './Actor';

/**
 * This class represents the base for all animals.
 */
export abstract class Animal implements Actor, Drawable {
  protected map: Map;

  protected constructor(
      map: Map,
      location: Location,
      randomAge: boolean = false
  ) {
    this._location = location;
    this.map = map;
    // set the animals age
    this.age = randomAge ? randomInt(this.getMaxAge()) : 0;
  }

  private _alive: boolean = true;

  /**
   * Returns whether the animal is still breathing.
   */
  get alive(): boolean {
    return this._alive;
  }

  private _location: Location

  /**
   * Returns the current location of the animal.
   */
  get location(): Location {
    return this._location;
  }

  /**
   * Returns the color of this animal, to be drawn on the canvas
   */
  abstract get color(): string;

  /**
   * Updates the location of the animal and also updates the map.
   *
   * @param newLocation
   */
  set location(newLocation: Location) {
    // update the animal's location on the map
    this.map.updateActorLocation(this, newLocation)
    // update the animal's location
    this._location = newLocation;
  }

  protected age: number = 0;

  /**
   * Become older. If the animal gets older than it's max age allows, die.
   *
   * @protected
   */
  protected incrementAge() {
    // increment age
    this.age++;
    // if the animal has reached his max age
    if (this.age > this.getMaxAge()) {
      // kill the animal
      this.kill();
    }
  }

  /**
   * Tries to produce offsprings if the animal has reached its breeding age.
   *
   * If the animal has reached it's breeding age, it will find all free adjacent locations and has a chance to produce
   * up to it's maxLitterSize amount of offsprings. All new offsprings are added to the map.
   *
   * @param map
   * @protected
   */
  protected tryToGiveBirth(map: Map) {
    // return if the animal has not reached its breeding age
    if (this.age < this.getBreedingAge()) {
      return;
    }

    // find all free adjacent locations
    const freeLocations: Location[] = map.getFreeAdjacentLocations(this.location);
    // current litter counter
    let litterCounter = 0;
    // do something for each free adjacent location
    freeLocations.forEach(location => {
      // if the max liter size is not reached and the animal breeds based on its probability
      if (litterCounter < this.getMaxLitterSize() && Math.random() < this.getBreedingProbability()) {
        // increment the litter counter
        litterCounter++;
        // add a new animal to the map
        map.addActor(this.createAnimal(map, location));
      }
    });
  }

  /**
   * Kill this animal and remove it from the map.
   */
  public kill() {
    // set the animal's alive flag to false
    this._alive = false;
    // remove the animal from the map
    this.map.removeActor(this);
  }

  /**
   * This animal will die once they are this number of simulated steps old.
   * @protected
   */
  protected abstract getMaxAge(): number;

  /**
   * This animal need to be at least this number of simulated steps old to be able to have offsprings.
   * @protected
   */
  protected abstract getBreedingAge(): number;

   /**
   * This animal has this percentage of chance to produce an offspring.
   * @protected
   */
  protected abstract getBreedingProbability(): number;

  /**
   * This animal can have up to this number of offsprings
   * @protected
   */
  protected abstract getMaxLitterSize(): number;

  /**
   * Creates a new animal of this type
   * @param map
   * @param location
   * @protected
   */
  protected abstract createAnimal(map: Map, location: Location): Animal;

  /**
   * Do all the things this animal does in a single simulated step.
   */
  public abstract act(): void;
}
