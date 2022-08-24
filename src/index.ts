import {Map} from './Map';
import {Canvas} from './Canvas';
import {Simulator} from './Simulator';
import {Controls} from './Controls';
import {Stats} from './Stats';

document.addEventListener('DOMContentLoaded', function () {
  const map: Map = new Map(100, 100);
  const canvas: Canvas = new Canvas();
  const stats: Stats = new Stats();

  const simulator: Simulator = new Simulator(map, canvas, stats);
  const controls: Controls = new Controls(simulator);

  simulator.reset();
});
