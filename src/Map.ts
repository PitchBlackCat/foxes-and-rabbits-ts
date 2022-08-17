import {Location} from './Location';
import {Actor} from './Actor';
import {randomInt, randomRange} from './functions';

/**
 * Map is a class that has a 2-dimensional array representing the world in which our creatures live.
 * Each field on the map can hold one and only one animal.
 *
 * It has a couple of utility methods to find the fields surrounding a given field.
 */
export class Map {

  // A 2-dimensional array representing the world
  public map: any[][] = [];

  // A seperate array that keeps a list of all actors, because looping through the entire map is quite a performance hit.
  public actors: Actor[] = [];

  public constructor(width: number, height: number) {
    this._width = width;
    this._height = height;
    this.reset();
  }

  private _width: number;

  /**
   * Returns the width of the map
   */
  public get width(): number {
    return this._width;
  }

  private _height: number;

  /**
   * Returns the height of the map
   */
  public get height(): number {
    return this._height;
  }

  /**
   * Reset the map and animals list, so we can start fresh!
   */
  public reset() {
    this.map = new Array(this.height).fill(null);
    this.map = this.map.map(() => new Array(this.width).fill(null));

    this.actors = [];
  }

  /**
   * Returns the animal that occupies the given location, or null if no animal is occupying it.
   * @param location
   */
  public getActorAt(location: Location): Actor | null {
    return this.map[location.y][location.x]
  }

  /**
   * Animals keep their own location, this method updates the map, so they occupy that location on the actual map.
   * @param actor
   * @param newLocation
   */
  public updateActorLocation(actor: Actor, newLocation: Location) {
    if (this.map[newLocation.y][newLocation.x] != null) {
      throw new Error('trying to move to location that is already occupied');
    }

    this.map[actor.location.y][actor.location.x] = null;
    this.map[newLocation.y][newLocation.x] = actor;
  }

  /**
   * Adds a new animal to the map.
   * @param actor
   */
  public addActor(actor: Actor): void {
    this.map[actor.location.y][actor.location.x] = actor;
    this.actors.push(actor);
  }

  /**
   * Removes an animal from the map
   * @param actor
   */
  public removeActor(actor: Actor): void {
    this.map[actor.location.y][actor.location.x] = null;
  }

  /**
   * Returns a list of locations that are north, east, south and west of the given location.
   * Takes the boundaries of the map into account.
   *
   * @param location
   */
  public getAdjacentLocations(location: Location): Location[] {
    const locations: Location[] = []

    switch (location.x) {
      case 0: {
        locations.push({x: location.x + 1, y: location.y} as Location)
        break;
      }
      case this.width - 1: {
        locations.push({x: location.x - 1, y: location.y} as Location)
        break;
      }
      default: {
        locations.push({x: location.x + 1, y: location.y} as Location)
        locations.push({x: location.x - 1, y: location.y} as Location)
      }
    }

    switch (location.y) {
      case 0: {
        locations.push({x: location.x, y: location.y + 1} as Location)
        break;
      }
      case this.height - 1: {
        locations.push({x: location.x, y: location.y - 1} as Location)
        break;
      }
      default: {
        locations.push({x: location.x, y: location.y + 1} as Location)
        locations.push({x: location.x, y: location.y - 1} as Location)
      }
    }

    return locations;
  }

  /**
   * Returns a random location that is not occupied by anything.
   */
  public getRandomFreeLocation(): Location {
    const x = randomRange(0, this.width - 1);
    const y = randomRange(0, this.height - 1);
    const location: Location = {x, y};

    return !this.getActorAt(location) ? location : this.getRandomFreeLocation();
  }

  /**
   * Returns a random location that is not occupied by anything and adjacent to the given location
   */
  public getRandomFreeAdjacentLocation(location: Location): Location | null {
    const freeAdjacentLocations: Location[] = this.getFreeAdjacentLocations(location);
    return freeAdjacentLocations.length > 0 ? freeAdjacentLocations[randomInt(freeAdjacentLocations.length -1)] : null;
  }


  /**
   * Returns all location that are not occupied by anything and adjacent to the given location
   */
  public getFreeAdjacentLocations(location: Location): Location[] {
    return this.getAdjacentLocations(location).filter(location => !this.getActorAt(location));
  }
}
