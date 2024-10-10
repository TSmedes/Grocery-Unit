import React, { useState, useEffect } from 'react';
import { getPrice } from '../components/Items';
import { useLoaderData } from 'react-router-dom';
import { supabase } from '../../utils/supabase';

export async function loader({params}) {
    const data = await getPrice(params.priceId)
    return data;
}

const Price = () => {
    const price = useLoaderData();
    const [name, setName] = useState('');
    const [unitPrice, setUnitPrice] = useState(price[0]?.unit_price);
    const [unit, setUnit] = useState(price[0]?.unit);
    const [totalPrice, setTotalPrice] = useState(price[0]?.unit_price);
    const [amountPurchased, setAmountPurchased] = useState(1);
    const [store, setStore] = useState(price[0]?.store);
    const [inputType, setInputType] = useState('unit');

    useEffect(()=>{
        getProduct();
    }, [])

    const getProduct = async () => {
        const { data, error } = await supabase
            .from('item')
            .select('name')
            .eq('id', price[0]?.item)
        if (error) {
            alert(error.error_description || error.message)
        } else {
            setName(data[0]?.name)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
                    const formData = new FormData(e.target);
                    if (inputType == 'unit') {
                        setTotalPrice(unitPrice);
                        setAmountPurchased(1);
                    } else {
                        setUnitPrice(totalPrice / amountPurchased);
                        setTotalPrice(unitPrice);
                        setAmountPurchased(1);
                    }
                    const newPrice = {
                        unit_price: (inputType == 'unit' ? unitPrice : totalPrice / amountPurchased),
                        unit: unit,
                        store: store,
                    };
                    const { data, error } = await supabase
                        .from('item_entry')
                        .update([newPrice])
                        .eq('id', price[0]?.id)
                        .select();
                    if (error) {
                        console.error(error);
                    } else {
                        console.log(data)
                    }
    };

    return (
        <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <p class="mx-auto h-10 w-auto text-2xl font-bold text-center leading-9">{name}</p>
            </div>
            <div className='my-6'>
                <button
                    onClick={ async () => {
                        const { data, error } = await supabase
                            .from('item_entry')
                            .delete()
                            .eq('id', price[0]?.id)
                            .select();

                        if (error) {
                            alert(error.error_description || error.message);
                        } else {
                            window.location.href = `../${price[0]?.item}`;
                        }
                    }}
                    className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Delete Price
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Input Type</label>
                    <select
                        name="inputType"
                        required
                        onChange={(e) => {
                            setInputType(e.target.value)

                        }}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="unit">Unit Price</option>
                        <option value="total">Total Price</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Unit Price <br/>(only if Unit Price selected)</label>
                    <input
                        type="number"
                        name="unitPrice"
                        step="0.01"
                        value={unitPrice}
                        onChange={(e)=> {
                            setUnitPrice(e.target.value)}
                        }
                        className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Total Price <br/>(only if Total Price selected)</label>
                    <input
                        type="number"
                        name="totalPrice"
                        step="0.01"
                        value={totalPrice}
                        onChange={(e)=> {
                            setTotalPrice(e.target.value)}
                        }
                        className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Amount Purchased <br/>(only if Total Price selected)</label>
                    <input
                        type="number"
                        name="amountPurchased"
                        step="0.01"
                        value={amountPurchased}
                        onChange={(e)=> {
                            setAmountPurchased(e.target.value)}
                        }
                        className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Store</label>
                    <input
                        type="text"
                        name="store"
                        value={store}
                        onChange={(e)=> {
                            setStore(e.target.value)}
                        }
                        className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Unit</label>
                    <select
                        required
                        name="unit"
                        onChange={(e)=> {
                            setUnit(e.target.value)
                        }}
                        className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="lb" selected={unit == "lb"}>lb</option>
                        <option value="oz" selected={unit == "oz"}>oz</option>
                        <option value="g" selected={unit == "g"}>g</option>
                        <option value="kg" selected={unit == "kg"}>kg</option>
                        <option value="gal" selected={unit == "gal"}>gal</option>
                        <option value="bottle" selected={unit == "bottle"}>bottle</option>
                        <option value="box" selected={unit == "box"}>box</option>
                        <option value="dozen" selected={unit == "dozen"}>dozen</option>
                        <option value="dozen" selected={unit == "unit"}>unit</option>
                        <option value="other" selected={unit == "other"}>other</option>


                    </select>

                </div>

                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => window.location.href = `../${price[0]?.item}`}
                        className="mr-2 inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Save
                    </button>
                </div>

            </form>
        </div>
    );
};

export default Price;