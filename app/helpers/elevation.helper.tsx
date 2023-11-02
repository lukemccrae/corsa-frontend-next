export const equalizePercents = (
  milePoints: number[],
  min: number,
  max: number
) => {
  //make each point relative to the min / max as a percentage
  //and display that percentage with a number from 1-20
  let result = [];
  let avgIncrement = (max - min) / 20;

  for (const point of milePoints) {
    result.push(Math.round((point - min) / avgIncrement));
  }

  return result;
};
