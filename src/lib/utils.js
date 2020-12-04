export const shorten = (str, length = 50, suffix = "...") =>
  `${str.slice(0, length)}${str.length - 1 > length ? suffix : ""}`;

export const pol2car = (a, r) => {
  return {
    x: Math.cos((a - 90) * (Math.PI / 180)) * r,
    y: Math.sin((a - 90) * (Math.PI / 180)) * r,
  };
};

export const car2pol = (x, y) => {
  return {
    a: Math.atan2(y, x) * (180 / Math.PI),
    r: Math.sqrt(x * x + y * y),
  };
};

export const scale = (value, start1, stop1, start2, stop2) => {
  return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};
