const currencyFlags = {
    usd: "flags/us.png",
    cop: "flags/co.png",
    eur: "flags/eu.png",
    cny: "flags/cn.png"
};

document.getElementById("fromCurrency").addEventListener("change", function() {
    document.getElementById("fromImage").src = currencyFlags[this.value];
});

document.getElementById("toCurrency").addEventListener("change", function() {
    document.getElementById("toImage").src = currencyFlags[this.value];
});

document.getElementById("convertButton").addEventListener("click", function() {
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (isNaN(amount) || amount <= 0) {
        document.getElementById("result").textContent = "Por favor, ingrese un monto válido.";
        return;
    }

    const rates = {
        usd: { cop: 4000, eur: 0.91, cny: 6.5 },
        cop: { usd: 0.00025, eur: 0.00023, cny: 0.0016 },
        eur: { usd: 1.1, cop: 4300, cny: 7.1 },
        cny: { usd: 0.15, cop: 620, eur: 0.14 }
    };

    if (rates[fromCurrency] && rates[fromCurrency][toCurrency]) {
        const conversionRate = rates[fromCurrency][toCurrency];
        const convertedAmount = (amount * conversionRate).toLocaleString("es-CO", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });

        document.getElementById("result").innerHTML = `
            Resultado: ${convertedAmount} ${toCurrency.toUpperCase()}
            <img src="${currencyFlags[toCurrency]}" alt="Bandera" style="width: 40px; vertical-align: middle;">
        `;
    } else {
        document.getElementById("result").textContent = "Conversión no disponible.";
    }
});