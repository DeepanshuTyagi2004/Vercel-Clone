const MAX_LEN = 5;
export const generate = () => {
  const subset = "1234567890abcdefghijklmnopqrstuvwxyz";
  let i = 0;
  let id = "";
  while (i < MAX_LEN) {
    id += subset[Math.floor(Math.random() * subset.length)];
    i++;
  }
  console.log(`id generate is ${id}`);
  return id;
};