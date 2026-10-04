import { geoPath, geoProjection } from "d3-geo";
import { feature, mesh } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import type { FeatureCollection } from "geojson";
import countries from "world-atlas/countries-110m.json";

/**
 * Builds the world map as static SVG path data at build/render time (server only),
 * so the browser receives plain SVG and no map library.
 */

const WIDTH = 1000;
const NORTH = 83;
const SOUTH = -56;
const ANTARCTICA = "010";

// Miller cylindrical: matches the proportions of the Figma map art.
const miller = (lambda: number, phi: number): [number, number] => [
  lambda,
  1.25 * Math.log(Math.tan(Math.PI / 4 + 0.4 * phi)),
];

const projection = geoProjection(miller)
  .scale(WIDTH / (2 * Math.PI))
  .translate([WIDTH / 2, 0])
  .precision(0.5);

// Shift so that NORTH sits at y = 0.
const top = projection([0, NORTH])![1];
projection.translate([WIDTH / 2, -top]);
const HEIGHT = Math.round(projection([0, SOUTH])![1]);

export type WorldMap = {
  width: number;
  height: number;
  land: string;
  borders: string;
};

let cached: WorldMap | null = null;

export function getWorldMap(): WorldMap {
  if (cached) return cached;
  const topo = countries as unknown as Topology<{ countries: GeometryCollection }>;
  const all = feature(topo, topo.objects.countries) as unknown as FeatureCollection;
  const land: FeatureCollection = {
    type: "FeatureCollection",
    features: all.features.filter((f) => f.id !== ANTARCTICA),
  };
  const path = geoPath(projection).digits(1);
  cached = {
    width: WIDTH,
    height: HEIGHT,
    land: path(land) ?? "",
    borders: path(mesh(topo, topo.objects.countries, (a, b) => a !== b)) ?? "",
  };
  return cached;
}

/** [lon, lat] → position in % of the map box. */
export function projectToPercent([lon, lat]: [number, number]) {
  const [x, y] = projection([lon, lat])!;
  return { x: (x / WIDTH) * 100, y: (y / HEIGHT) * 100 };
}
