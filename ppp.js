// fetch("https://foodster-idg1.onrender.com/api/dishes/2")
fetchData()

async function fetchData() {
  try {
    const response = await fetch("https://foodster-idg1.onrender.com/api/dishes");

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();

    let chsnDId = 0;

    for (let i = 0; i < data.length; i++) {
      document.querySelector(".all-dishes").innerHTML += `
      <div class="cont-dish" id="dish${i}">
      <h2 class="name">${data[i].dishName}</h2>
      <img class="img" src="${data[i].dishImgSrc}">
      <p class="title">Ingredients:</p>
      <p>${data[i].dishIngredients.map(el => el.join(' ')).join('<br>')}</p>
      <p class="title">Preparation steps:</p>
      <p>-${data[i].dishPrepSteps.join('<br><br>-')}</p>
      <a class="src" href="${data[i].source}">Source</a>
      <p>author: ${data[i].author}</p>
      </div>
      `;
    }

    for (let i = 0; i < data.length; i++) {
      document.querySelector(`#dish${i}`).addEventListener("click", () => {
        chsnDId = chsnDId + 1;
        if (document.querySelector(`.choosen${chsnDId}`)) {
          document.querySelector(`.choosen${chsnDId} h2`).innerHTML = data[i].dishName;
          document.querySelector(`.choosen${chsnDId} img`).src = data[i].dishImgSrc;
          return chsnDId
        } else {
          alert("Cart is full");
        }
        });
      };
    }
  
  catch (error) {
    console.error(error);
  }
}