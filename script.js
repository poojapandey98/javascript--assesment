// heatmap.js

const symbols = ["AMARAJABAT", "BAJAJHIND", "BPL", "BLUESTARCO", "CRISIL"];
const periods = ["Daily", "One Week", "Two Weeks", "One Month", "Three Months"];

const apiKey = "JGEG8QC90IGMVGSY";
const heatmapContainer = document.getElementById("heatmap");

async function fetchStockData(symbol, period) {
  try {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_${period.toUpperCase()}&symbol=${symbol}.BSE&outputsize=full&apikey=${apiKey}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${symbol} - ${period}`);
    }

    const data = await response.json();
    const priceChange = calculatePriceChange(data);
    return priceChange;
  } catch (error) {
    console.error(error.message);
    return null;
  }
}

function calculatePriceChange(data) {
  // Implement logic to calculate price change for the specified period
  // Return the calculated price change
  // You may need to parse and analyze the data from the API response
  // For simplicity, let's assume a random value between -10 and 10
  return Math.random() * 20 - 10;
}

function getColorForChange(change) {
  // Implement logic to determine the color based on the price change
  if (change >= 0 && change < 4) {
    return "#98fb98";
  } else if (change >= 4 && change < 8) {
    return "#8fbc8f";
  } else if (change >= 8 && change < 10) {
    return "#00ff00";
  } else if (change >= 10 && change <= 100) {
    return "#008000";
  } else if (change >= -4 && change < 0) {
    return "#ffa07a";
  } else if (change >= -8 && change < -4) {
    return "#cd5c5c";
  } else if (change >= -10 && change < -8) {
    return "#dc143c";
  } else if (change >= -100 && change < -10) {
    return "#8b0000";
  }
}

async function generateHeatmap() {
  for (const period of periods) {
    const row = document.createElement("div");
    row.className = "heatmap-row";

    for (const symbol of symbols) {
      const priceChange = await fetchStockData(symbol, period);
      if (priceChange !== null) {
        const cell = document.createElement("div");
        cell.className = "cell";
        const color = getColorForChange(priceChange);
        cell.style.backgroundColor = color;
        cell.textContent = priceChange.toFixed(2);
        row.appendChild(cell);
      }
    }

    heatmapContainer.appendChild(row);
  }
}

generateHeatmap();
