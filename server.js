const express = require("express");

const app = express();
const PORT = 4000;

const RESOURCE_ID = "9ef84268-d588-465a-a308-a864a43d0070";
const API_KEY = "579b464db66ec23bdd0000014e7637c27261454244f98a4c22765395";

// Serve HTML, CSS, images
app.use(express.static("public"));

const requiredFruits = [
  "Mango",
  "Banana",
  "Apple",
  "Orange",
  "Grapes",
  "Guava",
  "Pineapple",
  "Pomegranate",
  "Papaya",
  "Water Melon"  
];

const requiredVegetables = [
  "Potato",
  "Tomato",
  "Onion",
  "Raddish",
  "Brinjal",
  "Cabbage",
  "Cauliflower",
  "Carrot",
  "Green Chilli",
  "Peas",
  "Capsicum",
  "Beetroot",
  "Pumpkin"
];


app.get("/api/fruits", async (req, res) => {
  try {
    const apiUrl = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${API_KEY}&format=json&limit=1000`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    const records = data.records || [];

    // 🔥 Filter only required fruits
    const filteredFruits = requiredFruits.map(fruit => {

      const match = records.find(item =>
        item.commodity &&
        item.commodity.toLowerCase().includes(fruit.toLowerCase())
      );

      if (match) {
        return {
          commodity: fruit,
          price: match.modal_price,
          state: match.state,
          market: match.market
        };
      } else {
        return {
          commodity: fruit,
          price: "Not Available"
        };
      }

    });

    // ✅ VERY IMPORTANT — Send response
    return res.json(filteredFruits);

  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.get("/api/vegetables", async (req, res) => {
  try {
    const apiUrl = `https://api.data.gov.in/resource/${RESOURCE_ID}?api-key=${API_KEY}&format=json&limit=1000`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    const records = data.records || [];

    // 🔥 Filter only required fruits
    const filteredVegetables = requiredVegetables.map(vegetable => {

      const match = records.find(item =>
        item.commodity &&
        item.commodity.toLowerCase().includes(vegetable.toLowerCase())
      );

      if (match) {
        return {
          commodity: vegetable,
          price: match.modal_price,
          state: match.state,
          market: match.market
        };
      } else {
        return {
          commodity: vegetable,
          price: "Not Available"
        };
      }

    });

    // ✅ VERY IMPORTANT — Send response
    return res.json(filteredVegetables);

  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Failed to fetch data" });
  }
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
