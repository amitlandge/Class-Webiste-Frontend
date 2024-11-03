const feesArray = [
  {
    course: "5th",
    fees: 2000,
  },
  {
    course: "6th",
    fees: 3000,
  },
  {
    course: "7th",
    fees: 4000,
  },
  {
    course: "8th",
    fees: 5000,
  },
  {
    course: "9th",
    fees: 6000,
  },
  {
    course: "10th",
    fees: 7000,
  },
];

const feesAmount = (course) => {
  let fees = 0;
  feesArray.forEach((item) => {
    if (item.course === course) {
      fees = item.fees;
    }
  });
  return fees;
};
export default feesAmount;
