import {Map} from './Map';
import {Canvas} from './Canvas';
import {Simulator} from './Simulator';
import {Controls} from './Controls';

document.addEventListener('DOMContentLoaded', function () {
  const map: Map = new Map(100, 100);
  const canvas: Canvas = new Canvas();

  const simulator: Simulator = new Simulator(map, canvas);
  const controls: Controls = new Controls(simulator);

  simulator.reset();
});
