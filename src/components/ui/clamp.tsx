export const clamp = (min: number, max: number) => (v: number) =>
    v <= min ? min : v >= max ? max : v;
