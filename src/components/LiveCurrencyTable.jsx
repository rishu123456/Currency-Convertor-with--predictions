import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import useFetch from "../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { setExchangeRates } from "../store/exchnageRateSlice";

const CURRENCY_CODES = ["AED", "EUR", "INR", "JPY", "GBP", "CAD", "AUD", "CNY", "CHF", "NZD", "ZAR"];

const LiveCurrencyTable = ({ fromCurrency }) => {
  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();  
  const storedRates = useSelector((state) => state.exchangeRates.data); 
  const { isLoading, data, error } = useFetch(
    "https://api.exchangerate.host/live?access_key=9a28dee72935a60a9dd0236089898b8d"
  );

  useEffect(() => {
    if (navigator.onLine) {
      if (data?.success) {
        dispatch(setExchangeRates({ data }));
        const quotes = data.quotes;
        const usdToBase = fromCurrency === "USD" ? 1 : quotes[`USD${fromCurrency}`];

        const updatedRows = CURRENCY_CODES.map((code, index) => ({
          id: index,
          currency: code,
          rate: (quotes[`USD${code}`] / usdToBase).toFixed(4),
        }));

        setRows(updatedRows);
      }
    } else {
      console.warn("Offline mode active. Using last known rates.");
      if (storedRates?.success) {
        const quotes = storedRates.quotes;
        const usdToBase = fromCurrency === "USD" ? 1 : quotes[`USD${fromCurrency}`];

        const updatedRows = CURRENCY_CODES.map((code, index) => ({
          id: index,
          currency: code,
          rate: (quotes[`USD${code}`] / usdToBase).toFixed(4),
        }));

        setRows(updatedRows);
      }
    }
  }, [data, fromCurrency, storedRates, dispatch]);

  const columns = [
    { field: "currency", headerName: "Currency", flex: 1 },
    { field: "rate", headerName: `1 ${fromCurrency} =`, flex: 1 },
  ];

  return (
    <Box sx={{ height: 500, width: "100%", p: 2 }}>
      <Typography variant="h6" mb={2}>
        Live Exchange Rates (Base: {fromCurrency})
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={10}
        loading={isLoading}
        disableSelectionOnClick
      />
    </Box>
  );
};

export default LiveCurrencyTable;
