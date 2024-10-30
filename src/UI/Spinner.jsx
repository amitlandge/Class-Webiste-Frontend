import { PropagateLoader } from "react-spinners";

const Spinner = () => {
  return (
    <PropagateLoader
      color={"rgb(69,65,65)"}
      loading={true}
      cssOverride={true}
      size={15}
      aria-label="Loading Spinner"
      data-testid="loader"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    />
  );
};

export default Spinner;
