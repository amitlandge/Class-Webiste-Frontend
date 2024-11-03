import CountUp from "react-countup";

function Count(prop) {
  const studentCount = prop.count;
  const duration = prop?.duration || 3;
  return (
    <CountUp
      end={studentCount}
      duration={duration} // Animation duration in seconds
      separator="," // Adds comma separators to large numbers
      style={{
        fontSize: "4rem",
      }}
      suffix="+"
    />
  );
}

export default Count;
