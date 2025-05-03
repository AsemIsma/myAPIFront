fetchData();

let allIng = [];
let combIng = [];

async function fetchData() {
  try {
    const response = await fetch("https://foodster-idg1.onrender.com/api/dishes");

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();

    let chsnDId = 0;

    // Display each dish
    data.forEach((dish, index) => {
      document.querySelector(".all-dishes").innerHTML += `
        <div class="cont-dish" id="dish${index}">
          <h2 class="name">${dish.dishName}</h2>
          <img class="img" src="${dish.dishImgSrc}">
          <p class="title">Ingredients:</p>
          <p>${dish.dishIngredients.map(el => el.join(' ')).join('<br>')}</p>
          <p class="title">Preparation steps:</p>
          <p>-${dish.dishPrepSteps.join('<br><br>-')}</p>
          <a class="src" href="${dish.source}">Source</a>
          <p>author: ${dish.author}</p>
        </div>
      `;
    });

    // Add event listeners to each dish
    data.forEach((dish, index) => {
      document.querySelector(`#dish${index}`).addEventListener("click", () => {
        chsnDId++;

        if (document.querySelector(`.choosen${chsnDId}`)) {
          document.querySelector(`.choosen${chsnDId} h2`).innerHTML = dish.dishName;
          document.querySelector(`.choosen${chsnDId} img`).src = dish.dishImgSrc;
          
          // Append ingredients
          allIng.push(dish.dishIngredients.map(el => el.join(' ')).join(' <br>'));
          combIng.push(dish.dishIngredients);
        } else {
          combIfSameIng();
          alert("Cart is full");
          console.log(allIng);
          console.log(combIng);
          
        }
      });
    });

  } catch (error) {
    console.error(error);
  }
}

function combIfSameIng() {
  let combinedIngredients = [];
  
  // Flatten ingredients array
  combIng.forEach(ingredients => {
    combinedIngredients = [...combinedIngredients, ...ingredients];
  });
  console.log(combinedIngredients);

  // Sum quantities
  const totals = {};

  combinedIngredients.forEach(([name, amount, unit]) => {
    const key = name.trim(); // remove trailing colon and spaces

    if (!totals[key]) {
      totals[key] = { amount: 0, unit };
    }

    totals[key].amount += amount;
  });

  // Display totals
  Object.entries(totals).forEach(([ingredient, { amount, unit }]) => {
    document.querySelector(".combIng").innerHTML += `${ingredient} ${amount} ${unit}<br>`;
  });
}