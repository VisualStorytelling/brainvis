/* todo: move to core?
   Use this file to register annotators, e.g. function that determine
   if annotations can be anchored, and how to transform between
   coordinates systems
 */
export const registry: Annotator<any>[] = [];

interface Coords {
  x: number;
  y: number;
}

interface AnnotatedCoords {
  [label: string]: any;
  name: string;
}

export class Annotator<T extends AnnotatedCoords> {
  public name: string;

  // false if anchor is not accepted for current x,y
  public fromScreenCoordinates: (coords: Coords) => T | false;

  public toScreenCoordinates: (T) => Coords;

  public constructor(init?: Partial<Annotator<T>>) {
    Object.assign(this, init);
  }
}

export const registerAnnotator = (annotator: Annotator<any>) => {
  registry.push(annotator);
};

export const fromScreenCoordinates = (coords: Coords) => {
  for (const annotator of registry) {
    const annotatedCoords = annotator.fromScreenCoordinates(coords);
    if (annotatedCoords) {
      return annotatedCoords;
    }
  }
};

export const toScreenCoordinates = (coords: AnnotatedCoords) => {
  for (const annotator of registry) {
    if (annotator.name === coords.name) {
      return annotator.toScreenCoordinates(coords);
    }
  }
};

registerAnnotator(new Annotator({
  name: 'dummyAnnotator',
  fromScreenCoordinates: (coords: Coords) => ({...coords, name: 'dummyAnnotator'}),
  toScreenCoordinates: ({x, y}: AnnotatedCoords) => ({x, y})
}));
