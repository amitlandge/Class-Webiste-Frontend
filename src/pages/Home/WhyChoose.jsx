const WhyChoose = () => {
  return (
    <div className="why-container">
      <h1
        style={{
          fontSize: "2rem",
          textAlign: "left",
        }}
      >
        Why Choose Us?
      </h1>
      <ol
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <li>Experienced teachers</li>
        <li>Small class sizes for personalized attention</li>
        <li>Interactive sessions with modern teaching methods</li>
        <li>Regular tests and assessments</li>
      </ol>
    </div>
  );
};

export default WhyChoose;
