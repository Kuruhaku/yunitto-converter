// TODO: Just add that monitor the user selected input this is much better rather scanning the whole dcoument. (This make it unique.)
// TODO: Make a history that store all the users convertion. (Make a button that track what the user wants to convert).
// TODO: Check out classlist for the active tab.

let saveUnit = [];
const fromUnit = document.querySelector("#from-unit");
const toUnit = document.querySelector("#to-unit");
const unitResult = document.querySelector("#unit-result");
const fromMenu = document.querySelector("#calForm");
const toMenu = document.querySelector("#toForm");
const menuButton = document.querySelectorAll(".menu-button");
const saveButton = document.querySelector("#save-button");
const showButton = document.querySelector("#show-button");

// Checking what tab is active
const buttonContainer = document.querySelector(".button-menu");
const activeBtn = buttonContainer.getElementsByClassName("menu-button");
for (let i = 0; i < activeBtn.length; i++) {
  activeBtn[i].addEventListener("click", function () {
    let current = document.getElementsByClassName("active");

    if (current.length > 0) {
      current[0].className = current[0].className.replace(" active", "");
    }

    this.className += " active";
  });
}

// Logic for calculation
let lengthUnits = [
  { name: "Meter", factor: 1 },
  { name: "Kilometer", factor: 1000 },
  { name: "Centimeter", factor: 0.01 },
  { name: "Milimeter", factor: 0.001 },
  { name: "Micrometer", factor: 0.000001 },
  { name: "Nanometer", factor: 0.000000001 },
  { name: "Mile", factor: 1609.344 },
  { name: "Yard", factor: 0.9144 },
  { name: "Foot", factor: 0.3048 },
  { name: "Inch", factor: 0.0254 },
  { name: "Light Year", factor: 9.46066e15 },
];

let temnpUnits = [
  { name: "Celsius", factor: 1 },
  { name: "Kelvin", factor: 273.15 },
  { name: "Fahrenheit", factor: 1 },
];

let areaUnits = [
  { name: "Square Meter", factor: 1 },
  { name: "Square Kilometer", factor: 1000000 },
  { name: "Square Centimeter", factor: 0.0001 },
  { name: "Square Milimeter", factor: 0.000001 },
  { name: "Square Micrometer", factor: 0.000000000001 },
  { name: "Hectare", factor: 10000 },
  { name: "Square Mile", factor: 2589990 },
  { name: "Square Yard", factor: 0.83612736 },
  { name: "Square Foot", factor: 0.09290304 },
  { name: "Square Inch", factor: 0.00064516 },
  { name: "Acre", factor: 4046.8564224 },
];

let volumeUnit = [
  { name: "Cubic Meter", factor: 1 },
  { name: "Cubic Kilometer", factor: 1000000000 },
  { name: "Cubic Centimeter", factor: 0.000001 },
  { name: "Cubic Milimeter", factor: 1.0e-9 },
  { name: "Liter", factor: 0.001 },
  { name: "Mililiter", factor: 0.000001 },
  { name: "US Gallon", factor: 0.00378541 },
  { name: "US Quart", factor: 0.0009463525 },
  { name: "US Pint", factor: 0.00047317625 },
  { name: "US Cup", factor: 0.000236588125 },
  { name: "US Fluid Ounce", factor: 0.000029573515625 },
  { name: "US Table Spoon", factor: 0.0000147867578125 },
  { name: "US Tea Spoon", factor: 4.9289192708333333333333333333333e-6 },
  { name: "Imperial Gallon", factor: 0.00454609 },
  { name: "Imperial Quart", factor: 0.0011365225 },
  { name: "Imperial Pint", factor: 0.00056826125 },
  { name: "Imperial Fluid Onunce", factor: 0.0000284130625 },
  { name: "Imperial Table Spoon", factor: 0.0000177581640625 },
  { name: "Imperial Tea Spoon", factor: 5.9193880208333333333333333333333e-6 },
  { name: "Cubic Mile", factor: 4.16818e9 },
  { name: "Cubic Yard", factor: 0.764554857984 },
  { name: "Cubic Foot", factor: 0.028316846592 },
  { name: "Cubic Inch", factor: 0.000016387064 },
];

let weightUnit = [
  { name: "Kilogram", factor: 1 },
  { name: "Gram", factor: 0.001 },
  { name: "Miligram", factor: 0.000001 },
  { name: "Metric Ton", factor: 1000 },
  { name: "Long Ton", factor: 1016.04608 },
  { name: "Short Ton", factor: 907.184 },
  { name: "Pound", factor: 453592 },
  { name: "Ounch", factor: 0.0283495 },
  { name: "Carrat", factor: 0.0002 },
  { name: "Atomic Mass Unit", factor: 1.6605401999104288e-27 },
];

let timeUnit = [
  { name: "Second", factor: 1 },
  { name: "Milisecond", factor: 0.001 },
  { name: "Microsecond", factor: 0.000001 },
  { name: "Nanosecond", factor: 0.000000001 },
  { name: "Picosecond", factor: 0.000000000001 },
  { name: "Minute", factor: 60 },
  { name: "Hour", factor: 3600 },
  { name: "Day", factor: 86400 },
  { name: "Week", factor: 604800 },
  { name: "Month", factor: 2629800 },
  { name: "Year", factor: 31557600 },
];

// TODO: In the future try to learn regex and apply it here.
// This monitor user selected text in an active tab.
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.scripting.executeScript(
    {
      target: { tabId: tabs[0].id },
      func: () => window.getSelection().toString(),
    },
    (results) => {
      if (results && results[0] && results[0].result) {
        fromUnit.value = results[0].result;
      }
    }
  );
});

// Listen to user unit input: (Inside the Applicaiton)
let currentUnitArray = lengthUnits;
fromUnit.addEventListener("input", function () {
  calculate(fromUnit.value, fromMenu.value, toMenu.value, currentUnitArray);
});

fromMenu.addEventListener("change", function () {
  calculate(fromUnit.value, fromMenu.value, toMenu.value, currentUnitArray);
});

toMenu.addEventListener("change", function () {
  calculate(fromUnit.value, fromMenu.value, toMenu.value, currentUnitArray);
});

menuButton.forEach((button) => {
  button.addEventListener("click", function (unit) {
    // Chcek which value the user has pick.
    let dataType = unit.target.dataset.type;

    switch (dataType) {
      case "Length":
        renderUnit(lengthUnits);
        currentUnitArray = lengthUnits;
        break;
      case "Temperature":
        renderUnit(temnpUnits);
        currentUnitArray = temnpUnits;
        break;
      case "Area":
        renderUnit(areaUnits);
        currentUnitArray = areaUnits;
        break;
      case "Volume":
        renderUnit(volumeUnit);
        currentUnitArray = volumeUnit;
        break;
      case "Weight":
        renderUnit(weightUnit);
        currentUnitArray = weightUnit;
        break;
      case "Time":
        renderUnit(timeUnit);
        currentUnitArray = timeUnit;
        break;
    }
  });
});

function renderUnit(units) {
  // Render all the html base on the active / chosen tab.
  listOption = "";
  for (let i = 0; i < units.length; i++) {
    listOption += `
    <option id="from-option" value="${i}">${units[i].name}</option>
    `;
  }
  fromMenu.innerHTML = listOption;
  toMenu.innerHTML = listOption;
}

// Need to know which array need to get.
// Need also know which is the active tab. (Need to exclude temperature for different formula)
// Formula for unit convertion {from input value * from source / target unit}
// if the unitArray is temperature use this for different formula. else use the default.
let resultText = "";
function calculate(unitInput, fromChoice, toChoice, unitArray) {
  const value = parseFloat(unitInput);
  let calFromUnit = unitArray[fromChoice].factor;
  let calToUnit = unitArray[toChoice].factor;

  if (unitArray === temnpUnits) {
    let celsius;
    switch (parseInt(fromChoice)) {
      case 0:
        celsius = value;
        break;
      case 1:
        celsius = value - 273.15;
        break;
      case 2:
        celsius = ((value - 32) * 5) / 9;
        break;
    }

    switch (parseInt(toChoice)) {
      case 0:
        result = celsius;
        break;
      case 1:
        result = celsius + 273.15;
        break;
      case 2:
        result = (celsius * 9) / 5 + 32;
        break;
    }
  } else {
    result = (value * calFromUnit) / calToUnit;
  }

  // TODO: SHOW HOW DOES IT COMPUTE.
  resultText = `${unitInput} ${unitArray[fromChoice].name} = ${result} ${unitArray[toChoice].name}`;
  unitResult.textContent = `Result: ${resultText}`;
  toUnit.value = result;
}

// Save Button Funtionality:
saveButton.addEventListener("click", function () {
  // This avoid overriding new Unit when clicking save button during a new session.
  if ((fromUnit.value == "" || fromUnit.value == " ")) {
    alert("Please Enter a value in FROM: Unit");
  } else if (!localStorage.getItem("saveUnit")) {
    saveUnit.push(resultText);
    localStorage.setItem("saveUnit", JSON.stringify(saveUnit));
    alert("The Unit Conversion has been saved");
  } else {
    let oldUnit = JSON.parse(localStorage.getItem("saveUnit"));
    oldUnit.push(resultText);
    localStorage.setItem("saveUnit", JSON.stringify(oldUnit));
    console.log(oldUnit);
  }
});