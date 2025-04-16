import React from 'react'

const Dropdown = ({
    currecncy,
    currency,
    setCurrency,
    title

}

) => {

    return (
        <div>
            <label className=' block text-sm font-medium text-gray-500 mb-2' htmlFor={title}>{title}</label>
            <div>
                <select value={currency} onChange={(e) => setCurrency(e.target.value)} className='w-full p-2 border mb-2 border-gray-500 rounded-md shadow-sm'>
                    {Object.entries(currecncy).map(([curr, rate]) => (
                        <option value={curr} key={curr}>
                            {curr}

                        </option>
                    ))}
                </select>
            </div>

        </div>
    )
}

export default Dropdown
