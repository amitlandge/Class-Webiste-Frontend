import standard5th from "../assets/5th.jpg";
import standard6th from "../assets/6th.jpg";
import standard7th from "../assets/7th.jpg";
import standard8th from "../assets/8th.jpg";
import standard9th from "../assets/9th.jpg";
import standard10th from "../assets/10th.jpeg";

export const dummyImages = [
  {
    img: standard5th,
    title: "Trip",
    author: "@bkristastucchio",
    featured: true,
  },
  {
    img: standard6th,
    title: "Birthday",
    author: "@rollelflex_graphy726",
  },
  {
    img: standard10th,
    title: "Events",
    author: "@helloimnik",
  },
  {
    img: standard8th,
    title: "Coffee",
    author: "@nolanissac",
  },
  {
    img: standard7th,
    title: "Hats",
    author: "@hjrc33",
  },
  {
    img: standard5th,
    title: "Honey",
    author: "@arwinneil",
    featured: true,
  },
  {
    img: standard9th,
    title: "Cricket",
    author: "@tjdragotta",
  },
  {
    img: standard8th,
    title: "Chess",
    author: "@katie_wasserman",
  },
  {
    img: standard10th,
    title: "Mushrooms",
    author: "@silverdalex",
  },
  {
    img: standard7th,
    title: "Tomato basil",
    author: "@shelleypauls",
  },
  {
    img: standard5th,
    title: "Sea star",
    author: "@peterlaster",
  },
  {
    img: standard6th,
    title: "Bike",
    author: "@southside_customs",
  },
];
export function srcset(image, width, height, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}
