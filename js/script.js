function showInfo() {
    const formContainer = document.getElementById("calculator");
    const infoContainer = document.getElementById("info");

    if (infoContainer.style.display !== "none") {
        formContainer.style.display = "block";
        infoContainer.style.display = "none";
        document.getElementById("home").innerHTML = "Experiment Home";
    } else {
        formContainer.style.display = "none";
        infoContainer.style.display = "block";
        document.getElementById("home").innerHTML = "Go to Calculator";
    }
}

function clearForm() {
    const formElements = document.querySelectorAll("form input");
    formElements.forEach((element) => {
        if (element.type !== "button") {
            element.value = "";
            element.style = "";
        }
    });
}
let temperatureUnit = "K";

function setTemperatureUnit(unit) {
    temperatureUnit = unit;
    experiment();
}

function experiment() {
    const getValue = (id) => parseFloat(document.getElementById(id).value);
    const setValueAndColor = (id, value) => {
        const element = document.getElementById(id);
        element.value = value.toFixed(2);
        element.style.color = "red";
    };

    const b1 = getValue("b1");
    const b2 = getValue("b2");
    const p1 = getValue("p1");
    const p2 = getValue("p2");
    let k1 = getValue("k1");
    let k2 = getValue("k2");

    if (temperatureUnit === "C") {
        k1 += 273.15; // Celsius to Kelvin
        k2 += 273.15;
    } else if (temperatureUnit === "F") {
        k1 = (k1 - 32) * (5 / 9) + 273.15; // Fahrenheit to Kelvin
        k2 = (k2 - 32) * (5 / 9) + 273.15;
    }

    let resultTemperature = 0;
    if (isNaN(b1)) setValueAndColor("b1", (b2 * p2 * k1) / (p1 * k2));
    else if (isNaN(p1)) setValueAndColor("p1", (b2 * p2 * k1) / (b1 * k2));
    else if (isNaN(b2)) setValueAndColor("b2", (b1 * p1 * k2) / (p2 * k1));
    else if (isNaN(p2)) setValueAndColor("p2", (b1 * p1 * k2) / (b2 * k1));
    else if (isNaN(k1)) {
        resultTemperature = (b1 * p1 * k2) / (b2 * p2);
    } else if (isNaN(k2)) {
        resultTemperature = (b2 * p2 * k1) / (b1 * p1);
    }

    if (temperatureUnit === "C") {
        resultTemperature -= 273.15; // Kelvin to Celsius
    } else if (temperatureUnit === "F") {
        resultTemperature = ((resultTemperature - 273.15) * 9) / 5 + 32; // Kelvin to Fahrenheit
    }
    if (isNaN(k1)) setValueAndColor("k1", resultTemperature);
    else if (isNaN(k2)) setValueAndColor("k2", resultTemperature);
}