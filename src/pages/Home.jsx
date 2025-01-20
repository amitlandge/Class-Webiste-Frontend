import { Grid } from "@mui/material";
import Hero from "./Home/Hero";
import MainSection from "./Home/MainSection";
import Heading from "./Home/Heading";
import Introduction from "./Home/Introduction";
import Testimonial from "./Home/Testimonial";
import WhyChoose from "./Home/WhyChoose";
import CountSection from "./Home/CountSection";
import WhoWeAre from "./Home/WhoWeAre";

const Home = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Hero />
      </Grid>
      <Grid item xs={12} margin={"5% auto"}>
        <MainSection />
      </Grid>
      <Grid item xs={12} margin={"5% auto"}>
        <Heading />
      </Grid>
      <Grid item xs={12} marginBottom={"5%"}>
        <CountSection />
      </Grid>
      <Grid item xs={12} marginBottom={"2%"}>
        <WhoWeAre />
      </Grid>
      <Grid item xs={12} marginBottom={"5%"}>
        <Introduction />
      </Grid>

      <Grid item xs={12} marginBottom={"5%"}>
        <Testimonial />
      </Grid>
      <Grid item xs={12} marginBottom={"2%"}>
        <WhyChoose />
      </Grid>
      {/* <Grid item xs={12}>
        <Footer />
      </Grid> */}
    </Grid>
  );
};

export default Home;
