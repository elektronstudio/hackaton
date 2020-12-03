export const shorten = (str, length = 50, suffix = "...") =>
  `${str.slice(0, length)}${str.length - 1 > length ? suffix : ""}`;

export const circlexy = (angle = 0, radius = 10) => {
  return [
    Math.cos((angle - 90) * (Math.PI / 180)) * radius,
    Math.sin((angle - 90) * (Math.PI / 180)) * radius,
  ];
};

export const scale = (value, start1, stop1, start2, stop2) => {
  return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
};
