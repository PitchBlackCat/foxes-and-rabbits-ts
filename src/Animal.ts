import {Location} from './Location';
import {Map} from './Map';

export abstract class Animal {
  protected map: Map;

  protected constructor(map: Map, location: Location) {
    this._location = location;
    this.map = map;
  }

  protected _alive: boolean = true;

  get alive(): boolean {
    return this._alive;
  }

  public _location: Location

   get location(): Location {
    return this._location;
  }

  set location(newLocation: Location) {
    this.map.updateAnimalLocation(this, newLocation)
    this._location = newLocation;
  }

  public kill() {
    this._alive = false;
    this.map.removeAnimal(this);
  }

  protected age: number = 0;

  public abstract act(): void;
}
