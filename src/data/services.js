// Services (experiences) catalogue — replace values with real database data
// when the API is connected. Each maps to /images/services/{slug}.webp.
//
// Services carry an intimate, reflective, experiential visual language —
// distinct from products, but unmistakably AstroVetro.

const services = [
  {
    id: "tarot-reading",
    name: "Tarot Reading",
    duration: "35 minutes",
    format: "Online",
    price: 555,
    description:
      "A focused reading centred around the questions, decisions and reflections occupying your mind.",
    image: "/images/services/tarot-reading.webp",
    poster: "/images/services/tarot-reading.jpg",
    color: "#c9bde0",
    featured: true,
  },
  {
    id: "personal-guidance",
    name: "Personal Guidance",
    duration: "50 minutes",
    format: "Online",
    price: 899,
    description:
      "A thoughtful one-to-one session for the season of life you are moving through right now.",
    image: "/images/services/personal-guidance.webp",
    poster: "/images/services/personal-guidance.jpg",
    color: "#a9c5ae",
    featured: false,
  },
  {
    id: "intuitive-reading",
    name: "Intuitive Reading",
    duration: "30 minutes",
    format: "Online",
    price: 499,
    description:
      "An open, intuitive reading for clarity when you are not sure what to ask.",
    image: "/images/services/intuitive-reading.webp",
    poster: "/images/services/intuitive-reading.jpg",
    color: "#9ec7e3",
    featured: false,
  },
  {
    id: "relationship-reading",
    name: "Relationship Reading",
    duration: "45 minutes",
    format: "Online",
    price: 799,
    description:
      "A gentle, grounded reading for the connections — romantic, personal or otherwise — in your life.",
    image: "/images/services/relationship-reading.webp",
    poster: "/images/services/relationship-reading.jpg",
    color: "#d99a82",
    featured: false,
  },
];

export default services;
