const historyList = document.querySelector(".history-list-container");
const ulUnitList = document.querySelector("#ul-unit-list");
const delAllButton = document.querySelector('#delete-all-button');

let myListHolder = [];
const getListHolder = JSON.parse(localStorage.getItem("saveUnit"));

if (getListHolder) {
  myListHolder = getListHolder;
  renderList(myListHolder);
}

function renderList(saveUnits) {
  let listHolder = "";

  for (let i = 0; i < saveUnits.length; i++) {
    listHolder += `
    <li>
      <div class="unit-list-container">
         <div class="unit-conversion-name">
            <p>${saveUnits[i]}</p>
          </div>

          <div class="unit-conversion-button">
            <button class="specific-delete" data-index="${i}"> X </button>
          </div>
      </div>
    </li>
    `;
  }

  ulUnitList.innerHTML = listHolder;

  const delSpeButton = document.querySelectorAll('.specific-delete');
  delSpeButton.forEach((button) => {
    button.addEventListener('click', deleteUnit);
  })
}

// Delete Specific Unit
function deleteUnit(unit) {
  let targetIndex = unit.target.dataset.index;
  myListHolder.splice(targetIndex, 1);
  localStorage.setItem("saveUnit", JSON.stringify(myListHolder));
  renderList(myListHolder)
}

// Delete All Unit
delAllButton.addEventListener("dblclick", function () {
  localStorage.clear();
  myListHolder = [];
  renderList(myListHolder);
})

