// Intention discovery — each intention maps to real product ids from
// src/data/products.js. Filtering the collection by an intention only shows
// products that actually exist in the catalogue.

const intentions = [
  {
    id: "protection",
    title: "Protection",
    description: "Grounding, safety and a steady, present anchor.",
    color: "#7a8592",
    soft: "#9ec7e3",
    productIds: ["black-tourmaline", "labradorite"],
  },
  {
    id: "love",
    title: "Love",
    description: "Tenderness, openness and gentle self-compassion.",
    color: "#d99a82",
    soft: "#d99a82",
    productIds: ["rose-quartz", "rose-quartz-necklace", "amethyst-bracelet"],
  },
  {
    id: "calm",
    title: "Calm",
    description: "Steadiness when the mind feels loud.",
    color: "#a9c5ae",
    soft: "#a9c5ae",
    productIds: ["amethyst", "selenite", "amethyst-bracelet"],
  },
  {
    id: "focus",
    title: "Focus",
    description: "Clarity and quiet, deliberate attention.",
    color: "#c6a96b",
    soft: "#e6c875",
    productIds: ["clear-quartz", "amethyst"],
  },
  {
    id: "confidence",
    title: "Confidence",
    description: "Stepping forward with clarity and presence.",
    color: "#d99a82",
    soft: "#d99a82",
    productIds: ["citrine", "rose-quartz", "rose-quartz-necklace"],
  },
  {
    id: "abundance",
    title: "Abundance",
    description: "Openness to growth, generosity and opportunity.",
    color: "#9ec7e3",
    soft: "#c6a96b",
    productIds: ["citrine", "green-aventurine"],
  },
  {
    id: "growth",
    title: "Growth",
    description: "Evolution, learning and fresh beginnings.",
    color: "#a9c5ae",
    soft: "#a9c5ae",
    productIds: ["green-aventurine", "clear-quartz"],
  },
  {
    id: "manifestation",
    title: "Manifestation",
    description: "Bringing intention into visible form.",
    color: "#c9bde0",
    soft: "#c9bde0",
    productIds: ["labradorite", "clear-quartz"],
  },
];

export default intentions;
