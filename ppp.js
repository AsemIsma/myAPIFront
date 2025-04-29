// fetch("https://foodster-idg1.onrender.com/api/dishes/2")
fetchData()

async function fetchData() {
  try {
    const response = await fetch("https://foodster-idg1.onrender.com/api/dishes");

    let dishId = [];
    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();

    console.log(data);

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
      dishId.push("dish" + i);
    }

    for (let i = 0; i < data.length; i++) {
      document.querySelector(`#dish${i}`).addEventListener("click", () => {
        const target = document.querySelector(`.choosen${i + 1} h2`);
          target.innerHTML = data[i].dishName;
          document.querySelector(`.choosen${i + 1} img`).src = data[i].dishImgSrc;
          console.log("something happen")
      });
    }

    console.log(dishId)
  }
  catch (error) {
    console.error(error);
  }
}