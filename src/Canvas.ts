import {Map} from './Map';
import {Location} from './Location';

/**
 * Canvas is in charge of drawing the map on the canvas element in index.html
 */
export class Canvas {
  private static TILE_SIZE_IN_PIXELS: number = 5;

  // A reference to the html canvas element
  private canvas: HTMLCanvasElement;

  // A reference to the Canvas rendering context; the thing that we use to actually draw stuff on the canvas.
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.getElementById('canvas')! as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
  }

  /**
   * Draws the entire map and all of it's components
   * @param map
   */
  public draw(map: Map) {
    this.clear();
    this.drawTiles(map);
  }

  /**
   * Clears the entire canvas
   * @private
   */
  private clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draw all the colored tiles, representing the animals in our simulation
   * @param map
   * @private
   */
  private drawTiles(map: Map) {
    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        const content = map.map[y][x];
        if (content !== null) {
          this.drawTile(content.location, content.color);
        }
      }
    }
  }

  /**
   * Draw a single colored tile at the given location
   * @param location
   * @param color
   * @private
   */
  private drawTile(location: Location, color: string = '#FFF') {
    this.ctx.fillStyle = color;

    this.ctx.fillRect(
      location.x * Canvas.TILE_SIZE_IN_PIXELS,
      location.y * Canvas.TILE_SIZE_IN_PIXELS,
      Canvas.TILE_SIZE_IN_PIXELS,
      Canvas.TILE_SIZE_IN_PIXELS
    );
  }

  /**
   * Resizes the html canvas element, so it has the same dimensions as the map that we want to draw.
   * @param map
   */
  public resize(map: Map) {
    this.canvas.width = map.width * Canvas.TILE_SIZE_IN_PIXELS;
    this.canvas.height = map.height * Canvas.TILE_SIZE_IN_PIXELS;
  }
}
