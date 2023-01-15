let ulEL = document.querySelector("ul");
let inputEL = document.querySelector("input");
let btnEL = document.querySelector("button");
h1el.innerHTML = `Try to text some country`;
btnEL.addEventListener("click", () => {
  let inputValue = inputEL.value;
  getData(`https://restcountries.com/v3.1/name/${inputValue}`)
    .then((data) => {
      ulEL.classList.remove("hidden");

      let {
        names,
        capital,
        population,
        currencies,
        region,
        img,
        commonLanguage,
      } = {
        names: data[0].name.common,
        capital: data[0].capital ? data[0].capital[0] : "No capital",
        population: data[0].population,
        currencies: Object.values(data[0].currencies)[0],
        region: data[0].region,
        img: data[0].flags.svg,
        commonLanguage: Object.values(data[0].languages),
      };
      addItem(
        capital,
        population,
        currencies,
        region,
        commonLanguage,
        img,
        names
      );
    })
    .catch((err) => {
      h1el.classList.remove("hidden");
      h1el.innerHTML = `${err}`;
    });
});

function addItem(
  capital,
  population,
  currencies,
  region,
  commonLanguage,
  img,
  names
) {
  console.log(commonLanguage);
  let x = addLanguage(commonLanguage);
  ulEL.innerHTML = `
    <li>
            <div class="img">
              <img src="${img}" alt="" />
            </div>
            <h1>${names}</h1>
            <div>
              <p><b>Capital</b> : <span>${capital}</span></p>
              <p><b>Continent</b> : <span>${region}</span></p>
              <p><b>Population</b> : <span>${population}</span></p>
              <p><b>Currency</b> : <span>${currencies.name} - ${currencies.symbol}</span></p>
              <p><b>Common language</b> : <span>${x}</span></p>
            </div>
          </li>
    `;
}
function addLanguage(array) {
  let result = ``;
  array.forEach((element, i) => {
    if (i == 0) {
      result += `${element}`;
    } else {
      result += `, ${element}`;
    }
  });
  return result;
}
