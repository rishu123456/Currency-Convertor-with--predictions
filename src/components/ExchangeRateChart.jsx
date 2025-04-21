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
 
  useEffect(() => {
    const fetchHistoricalRates = async () => {
      
      const formatDate = (date) => date.toISOString().split("T")[0];
      const url = `https://api.exchangerate.host/timeframe?start_date=2025-04-11&end_date=2025-04-17&access_key=f3285d2c3d13e77ac2de3b1997ec4345`;

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
            return null;
          });
        
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
