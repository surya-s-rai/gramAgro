document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/high-demand-crops")
    .then(res => res.json())
    .then(data => {
      console.log("DATA RECEIVED:", data);

      const container = document.getElementById("crop-container");

      if (!container) {
        console.error("crop-container not found");
        return;
      }

      container.innerHTML = ""; // clear old content

      data.forEach(crop => {
        const card = document.createElement("div");
        card.className = "crop-card";

        card.innerHTML = `
  <h3>${crop.commodity}</h3>
  <ul>
    <li><strong>Market:</strong> ${crop.market}</li>
    <li><strong>State:</strong> ${crop.state}</li>
    <li><strong>Price:</strong> ₹${crop.modal_price} / quintal</li>
  </ul>
`;


        container.appendChild(card);
      });
    })
    .catch(err => console.error("FETCH ERROR:", err));
});