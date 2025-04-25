let api = "https://fakestoreapi.com/products?limit=10";
let main = document.querySelector("main");
let totalPrice = 0; // Initialize total price

fetch(api)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.json();
  })
  .then((data) => {
    data.forEach((item) => {
      let card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <h2 class="H2">${item.title}</h2>
        <p class="des">${item.description}</p>
        <p class="Cost">Price: $${item.price}</p>
        <button class="btn">Add to Cart</button>
      `;
      main.appendChild(card);

      // Add event listener to the button
      let button = card.querySelector(".btn");
      button.addEventListener("click", () => {
        totalPrice += item.price;
        alert(`Product added to cart! Total Price: $${totalPrice.toFixed(2)}`);

        // Update or create a total price display
        let totalDisplay = document.querySelector("#total-price");
        if (!totalDisplay) {
          totalDisplay = document.createElement("h2");
          totalDisplay.id = "total-price";
          main.appendChild(totalDisplay);
        }
        totalDisplay.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
      });
    });
  })
  .catch((error) => {
    console.error("Error:", error);
    main.innerHTML = `<p class="error">Failed to load products. Please try again later.</p>`;
  });