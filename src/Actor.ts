import {Location} from "./Location";

export interface Actor {
  location: Location;
  readonly alive: boolean;

  /**
   * Do all the things this actor does in a single simulated step.
   */
  act(): void;
}
