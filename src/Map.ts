import {Location} from './Location';
import {Animal} from './Animal';
import {randomInt, randomRange} from './functions';

export class Map {
  public map: any[][] = [];
  public animals: Animal[] = [];

  public constructor(width: number, height: number) {
    this._width = width;
    this._height = height;
    this.reset();
  }

  private _width: number;

  public get width(): number {
    return this._width;
  }

  private _height: number;

  public get height(): number {
    return this._height;
  }

  public reset() {
    this.map = new Array(this.height).fill(null);
    this.map = this.map.map(() => new Array(this.width).fill(null));

    this.animals = [];
  }

  public getAnimalAt(location: Location): Animal | null {
    return this.map[location.y][location.x]
  }

  public updateAnimalLocation(animal: Animal, newLocation: Location) {
    if (this.map[newLocation.y][newLocation.x] != null) {
      throw new Error('trying to move to location that is already occupied');
    }

    this.map[animal.location.y][animal.location.x] = null;
    this.map[newLocation.y][newLocation.x] = animal;
  }

  public addAnimal(animal: Animal): void {
    this.map[animal.location.y][animal.location.x] = animal;
    this.animals.push(animal);
  }

  public removeAnimal(animal: Animal): void {
    this.map[animal.location.y][animal.location.x] = null;
  }

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

  public getRandomFreeLocation(): Location {
    const x = randomRange(0, this.width - 1);
    const y = randomRange(0, this.height - 1);
    const location: Location = {x, y};

    return !this.getAnimalAt(location) ? location : this.getRandomFreeLocation();
  }

  public getRandomFreeAdjacentLocation(location: Location): Location | null {
    const freeAdjacentLocations: Location[] = this.getFreeAdjacentLocations(location);
    return freeAdjacentLocations.length > 0 ? freeAdjacentLocations[randomInt(freeAdjacentLocations.length -1)] : null;
  }

  public getFreeAdjacentLocations(location: Location): Location[] {
    return this.getAdjacentLocations(location).filter(location => !this.getAnimalAt(location));
  }
}
