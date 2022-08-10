import {Map} from './Map';
import {Rabbit} from './Rabbit';
import {Fox} from './Fox';
import {Location} from './Location';

export class Canvas {

  private static TILE_SIZE_IN_PIXELS: number = 10;

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.getElementById('canvas')! as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
  }

  public draw(map: Map) {
    this.clear();
    this.drawTiles(map);
    this.drawGrid(map);
  }

  private clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawTiles(map: Map) {
    for (let y = 0; y < map.height; y++) {
      for (let x = 0; x < map.width; x++) {
        const content = map.map[y][x];
        if (content !== null) {
          if (content instanceof Rabbit) {
            this.drawTile(content.location, '#7ecfd0')
          } else if (content instanceof Fox) {
            this.drawTile(content.location, '#db6205')
          }
        }
      }
    }
  }

  private drawGrid(map: Map) {
    this.ctx.strokeStyle = '#000';

    for (let x of Array(map.width)) {
      this.ctx.moveTo(x * Canvas.TILE_SIZE_IN_PIXELS, 0);
      this.ctx.lineTo(x * Canvas.TILE_SIZE_IN_PIXELS, this.canvas.height);
    }

    for (let y of Array(map.height)) {
      this.ctx.moveTo(0, y * Canvas.TILE_SIZE_IN_PIXELS);
      this.ctx.lineTo(this.canvas.width, y * Canvas.TILE_SIZE_IN_PIXELS);
    }
  }

  private drawTile(location: Location, color: string = '#FFF') {
    this.ctx.fillStyle = color;

    this.ctx.fillRect(
      location.x * Canvas.TILE_SIZE_IN_PIXELS,
      location.y * Canvas.TILE_SIZE_IN_PIXELS,
      Canvas.TILE_SIZE_IN_PIXELS,
      Canvas.TILE_SIZE_IN_PIXELS
    );
  }

  public resize(map: Map) {
    this.canvas.width = map.width * Canvas.TILE_SIZE_IN_PIXELS;
    this.canvas.height = map.height * Canvas.TILE_SIZE_IN_PIXELS;
  }

}
