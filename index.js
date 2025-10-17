var prodactNameElement = document.getElementById("prodactname");
var prodactPriceElement = document.getElementById("prodactprice");
var prodactSelectElement = document.getElementById("prodactSelect");
var prodactDiscription = document.getElementById("prodactdiscription");
var prodactImageElement = document.getElementById("prodactimage");
var defultoptine = document.getElementById("resetSelect");
var prodactcol = document.getElementById("prodactcol");

// Array to store products
var prodactArray = [];

// Add product function
function prodact() {
  var prodactElement = {
    prodactName: prodactNameElement.value,
    prodactPrice: prodactPriceElement.value,
    prodactSelect: prodactSelectElement.value,
    prodactDiscription: prodactDiscription.value,
    prodactImage: prodactImageElement.files.length > 0 ? URL.createObjectURL(prodactImageElement.files[0]) : "",
  };

  prodactArray.push(prodactElement);
  resetAllProdact();
  display(prodactArray);
  localStorage.setItem("prodactList", JSON.stringify(prodactArray));
}

function resetAllProdact() {
  prodactNameElement.value = "";
  prodactPriceElement.value = "";
  prodactDiscription.value = "";
  prodactImageElement.value = "";
  defultoptine.selected = true;
}

function display(targetLists) {
  var elementstr = ``;
  for (var i = 0; i < targetLists.length; i++) {
    elementstr += `
      <div class="col">
        <div class="item my-3 border shadow-sm p-3">
          <img class="w-100 object-fit-contain mb-2" src="${targetLists[i].prodactImage}" alt="product">
          <h3 class="fs-5">${targetLists[i].prodactName}</h3>
          <p class="text-muted">${targetLists[i].prodactDiscription}</p>
          <p><span class="fw-semibold">Category:</span> ${targetLists[i].prodactSelect}</p>
          <div class="d-flex justify-content-between">
            <p class="fw-semibold">${targetLists[i].prodactPrice} EGP</p>
            <div>
              <i onclick="deleteElement(${i})" class="fa-solid fa-trash text-danger fs-5"></i>
              <i class="fa-solid fa-pen-to-square text-success fs-5"></i>
            </div>
          </div>
        </div>
      </div>`;
  }
  prodactcol.innerHTML = elementstr;
}

if (localStorage.getItem("prodactList")) {
  prodactArray = JSON.parse(localStorage.getItem("prodactList"));
  display(prodactArray);
}

function deleteElement(deleteIndex) {
  prodactArray.splice(deleteIndex, 1);
  localStorage.setItem("prodactList", JSON.stringify(prodactArray));
  display(prodactArray);
}

function SearchForProdactName(searchName) {
  var filterProdactList = [];

  for (var i = 0; i < prodactArray.length; i++) {
    if (prodactArray[i].prodactName.toLowerCase().includes(searchName.toLowerCase())) {
      filterProdactList.push(prodactArray[i]);
    }
  }
  display(filterProdactList);
}
