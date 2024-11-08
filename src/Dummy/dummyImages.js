export const dummyImages = [
  {
    img: "https://res.cloudinary.com/dow92cdi4/image/upload/v1730174957/images/trjhxmlzwreqm9te0rhd.jpg",
    title: "Trip",
    author: "@bkristastucchio",
    featured: true,
  },
  {
    img: "https://res.cloudinary.com/dow92cdi4/image/upload/v1731101105/images/rwfbhkeknwbg1rgetd0p.jpg",
    title: "Birthday",
    author: "@rollelflex_graphy726",
  },
  {
    img: "https://res.cloudinary.com/dow92cdi4/image/upload/v1731101258/images/o4hubczdunuhluytjkrj.jpg",
    title: "Events",
    author: "@helloimnik",
  },
  {
    img: "https://res.cloudinary.com/dow92cdi4/image/upload/v1731101230/images/lszoy6ohsceu9donhd2j.jpg",
    title: "Coffee",
    author: "@nolanissac",
  },
  {
    img: "https://res.cloudinary.com/dow92cdi4/image/upload/v1731101216/images/xpj1e9m9udbycrkdogcd.jpg",
    title: "Hats",
    author: "@hjrc33",
  },
  {
    img: "https://res.cloudinary.com/dow92cdi4/image/upload/v1730174957/images/trjhxmlzwreqm9te0rhd.jpg",
    title: "Honey",
    author: "@arwinneil",
    featured: true,
  },
  {
    img: "https://res.cloudinary.com/dow92cdi4/image/upload/v1730124782/images/xjjq4p8qu8lfcwohxdwm.jpg",
    title: "Cricket",
    author: "@tjdragotta",
  },
  {
    img: "https://res.cloudinary.com/dow92cdi4/image/upload/v1730121452/images/r6kg0pnzlxq2eyaxnisb.jpg",
    title: "Chess",
    author: "@katie_wasserman",
  },
  {
    img: "https://res.cloudinary.com/dow92cdi4/image/upload/v1730174957/images/trjhxmlzwreqm9te0rhd.jpg",
    title: "Mushrooms",
    author: "@silverdalex",
  },
  {
    img: "https://res.cloudinary.com/dow92cdi4/image/upload/v1730174957/images/trjhxmlzwreqm9te0rhd.jpg",
    title: "Tomato basil",
    author: "@shelleypauls",
  },
  {
    img: "https://res.cloudinary.com/dow92cdi4/image/upload/v1731101216/images/xpj1e9m9udbycrkdogcd.jpg",
    title: "Sea star",
    author: "@peterlaster",
  },
  {
    img: "https://res.cloudinary.com/dow92cdi4/image/upload/v1731101258/images/o4hubczdunuhluytjkrj.jpg",
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
