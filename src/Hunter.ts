import {Actor} from './Actor';
import {Drawable} from './Drawable';
import {Location} from "./Location";
import {Map} from "./Map";
import {Fox} from "./Fox";
import {randomItem} from './functions';

/**
 * The hunter tries to protect it's fluffy buns. He hunts foxes down with a grudge.
 */
export class Hunter implements Actor, Drawable {
    // Hunters can be from any corner of the world, and come in many different skintones.
    private static SKINTONES: string[] = ['#FFCC99', '#BF9973', '#80664D', '#403326', '#E6B88A'];

    private map: Map;

    private _location: Location;

    private _color: string;

    constructor(map: Map, location: Location) {
        this.map = map;
        this._location = location;

        // pick a random skintone for this hunter.
        this._color = randomItem(Hunter.SKINTONES);
    }

    /**
     * Hunters are the pinacle of evolution and can not be killed nor die.
     */
    get alive(): boolean {
        return true;
    }

  /**
   * Returns the current location of the hunter.
   */
  get location(): Location {
    return this._location;
  }

  /**
   * Returns the color of this hunter, to be drawn on the canvas
   */
  get color(): string {
      return this._color;
  }

  /**
   * Updates the location of the hunter and also updates the map.
   *
   * @param newLocation
   */
  set location(newLocation: Location) {
    // update the animal's location on the map
    this.map.updateActorLocation(this, newLocation)
    // update the animal's location
    this._location = newLocation;
  }

  public act() {
      // see if we can find a fox to eat; Otherwise, wander to a random adjacent location
      const newLocation: Location | null = this.hunt(this.map) || this.map.getRandomFreeAdjacentLocation(this.location);

      // if we can't find a free adjacent location, stand still (If we keep absolutly still, the foxes won't be able to see us!)
      this.location = newLocation ? newLocation : this.location;
    }

  /**
   * Look at all the adjacent locations and see if there's a fox we can shoot.
   * If we can; shoot it and take it's location.
   *
   * @param map
   * @private
   */
  private hunt(map: Map): Location | null
  {
    // find the adjacent locations
    const neighbours = map.getAdjacentLocations(this.location);
    // do something for each location
    for (const location of neighbours) {
      // get the animal at the location
      const animal = map.getActorAt(location);
      // if an animal is found and the animal is rabbit and alive
      if (animal != null && animal instanceof Fox && animal.alive) {
        animal.kill();
        return location;
      }
    }

    return null;
  }
}
