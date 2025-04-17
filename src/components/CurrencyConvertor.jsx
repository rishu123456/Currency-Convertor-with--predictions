import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import Dropdown from "../dropdown";
import LiveCurrencyTable from "./LiveCurrencyTable";
import ExchangeRateChart from "./ExchangeRateChart";


const CurrencyConvertor = () => {
    const [currecncy, setCurrencies] = useState([]);
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState("AED");
    const [toCurrency, setToCurrency] = useState("AFN");
    const [convertedAmount, setConvertedAmount] = useState();
    const { isLoading, error, data } = useFetch("https://v6.exchangerate-api.com/v6/4700003a1c884224399840a1/latest/USD")
    useEffect(() => {
        if (data?.conversion_rates) {
            setCurrencies(data.conversion_rates);
            console.log("conversion", data.conversion_rates);
        }
    }, [data]);

    const conversion = () => {
        const rate1 = currecncy[fromCurrency];
        const rate2 = currecncy[toCurrency];
        if (rate1 && rate2) {
            const finalResult = (rate2 / rate1) * amount;
            setConvertedAmount(finalResult.toFixed(3));
        }


    }



    return <div className="min-w-1xl flex flex-col content-start mx-auto my-10 p-5 rounded-lg shadow-md">
        <h1 className="mb-5 text-2xl font-semibold text-gray-500">
            CurrencyConvertor
        </h1>
        <div>
            <Dropdown currecncy={currecncy} title="From" currency={fromCurrency} setCurrency={setFromCurrency} />
            <Dropdown currecncy={currecncy} title="To" currency={toCurrency} setCurrency={setToCurrency} />

        </div>
        <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full text-sm font-medium p-2 border border-gray-500 rounded-md" />
        </div>
        <div className="flex justify-end mt-6">
            <button onClick={conversion} className="bg-indigo-400 hover:bg-indigo-600 p-1 border border-gray-500 rounded-md" >Convert</button>

        </div>
        <div className=" mt-4 text-lg font-medium text-right text-green-500">
            converted amount is {convertedAmount}

        </div>
        <div>
        <ExchangeRateChart fromCurrency={fromCurrency} toCurrency={toCurrency} />
        <LiveCurrencyTable fromCurrency={fromCurrency} />

        </div>
    </div>
}
export default CurrencyConvertor;