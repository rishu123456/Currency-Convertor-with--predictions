import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const ExchangeRateChart = ({ fromCurrency, toCurrency }) => {
  const [chartData, setChartData] = useState(null);
  const API_KEY = "your_api_key"; // Replace with your CurrencyLayer API key

  useEffect(() => {
    const fetchHistoricalRates = async () => {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - 6); // Get 7 days of data

      const formatDate = (date) => date.toISOString().split("T")[0];
      const url = `https://api.exchangerate.host/timeframe?start_date=2025-04-10&end_date=2025-04-15&access_key=bca5167ce72617eab86787f79c4b2282`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        const labels = Object.keys(data.quotes);
        
          const rates = labels.map((date) => {
            const usdToFrom = data.quotes[date][`USD${fromCurrency}`];
            const usdToTo = data.quotes[date][`USD${toCurrency}`];

            if (fromCurrency === "USD") {
              return usdToTo ?? null;
            }
  
           else if (usdToFrom && usdToTo) {
              return usdToTo / usdToFrom;
            }
            return null; // gracefully handle missing values
          });

        
        // else {
        //   const rates = labels.map(date => data.rates[date][toCurrency]);

        // }
        
        setChartData({
          labels,
          datasets: [
            {
              label: `${fromCurrency} to ${toCurrency} (7-day trend)`,
              data: rates,
              fill: false,
              borderColor: "#6366f1",
              tension: 0.3,
            },
          ],
        });
      } else {
        console.error("Error fetching data:", data.error);
      }
    };

    fetchHistoricalRates();
  }, [fromCurrency, toCurrency]);

  if (!chartData) return <p>Loading chart...</p>;

  return <Line data={chartData} />;
};

export default ExchangeRateChart;
