const feesAmount = (grade) => {
  let fees;
  if (grade === 5) {
    fees = 2000;
  } else if (grade === 6) {
    fees = 3000;
  } else if (grade === 7) {
    fees = 4000;
  } else if (grade === 8) {
    fees = 5000;
  } else if (grade === 9) {
    fees = 6000;
  } else if (grade === 10) {
    fees = 7000;
  }
  return fees;
};
export default feesAmount;
