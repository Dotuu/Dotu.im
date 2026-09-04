const desc: string[] = [
  "Gores demon",
  "Giga chad",
  "Nerdddddd",
  "DDnet demon",
  "Loving husband",
  "A little fat",
  "ADHD",
];

const getRandom = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const Descriptor = (): string => {
  const num = getRandom(0, desc.length - 1);
  return desc[num];
};
