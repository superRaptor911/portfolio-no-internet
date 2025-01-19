export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
export const randInt = () => {
  return Math.ceil(Math.random() * 100000);
};
