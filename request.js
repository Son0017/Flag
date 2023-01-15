let h1el = document.querySelector(".h1");
let getData = function (resurse) {
  let request = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    request.addEventListener("readystatechange", () => {
      if (request.readyState == 4 && request.status == 200) {
        h1el.classList.add("hidden");
        let data = JSON.parse(request.responseText);
        resolve(data);
      } else if (request.readyState == 4) {
        reject("try correct one!!!");
      } else {
        h1el.innerHTML = `Loader . . .`;
      }
    });
    request.open("GET", resurse);
    // console.log(request)
    request.send();
  });
};
