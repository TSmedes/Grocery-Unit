import React, {useEffect} from 'react';
import { useLoaderData } from 'react-router-dom';
import {getItem} from './Items';
import { supabase } from '../../utils/supabase';
import Price from './Price';


export async function loader({params}) {
    const data = await getItem(params.itemId)
    return data;
}

const ItemView = () => {
    const item = useLoaderData();
    const [prices, setPrices] = React.useState([]);
    const [popupVisible, setPopupVisible] = React.useState(false);

    useEffect(()=>{
        console.log(item);
        getPrices();
    }, [])
    

    async function getPrices() {
        const {data, error} = await supabase
            .from('item_entry')
            .select('*')
            .eq('item', item[0].id)
            .order('unit_price', {ascending: true});
        if (error) {
            console.error(error)
        } else {
            setPrices(data)
            
        }
    }

    return (
        <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className='absolute top-0 left-0 m-2'>
                <button
                    className=' text-red-500 px-3 py-1.5 font-semibold'
                    onClick={()=>{window.location.href = '../'}}
                >Home</button>
            </div>
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                <p class="mx-auto h-10 w-auto text-2xl font-bold text-center leading-9">{item[0]?.name}</p>
            </div>
            <div className='my-10'>
                <button
                    onClick={()=> {setPopupVisible(true)}}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    New Price
                </button>
            </div>
        {popupVisible ? <div className='fixed top-0 left-0 mx-[10vw] mt-10'>
            <div className="bg-white p-6 rounded border-black border-[1px] shadow-xl w-[80vw]">
                <h2 className="text-xl font-bold mb-4">Add New Price</h2>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const newPrice = {
                        item: item[0].id,
                        unit_price: (formData.get('inputType') == 'unit' ? formData.get('unitPrice') : (formData.get('totalPrice') / formData.get('amountPurchased'))),
                        unit: formData.get('unit'),
                        store: formData.get('store'),
                    };
                    const { data, error } = await supabase
                        .from('item_entry')
                        .insert([newPrice])
                        .select()
                        .order('unit_price', {ascending: true});
                    if (error) {
                        console.error(error);
                    } else {
                        setPrices([...prices, ...data]);
                        setPopupVisible(false);
                    }
                }}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Input Type</label>
                        <select
                            name="inputType"
                            required
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
                            className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Total Price <br/>(only if Total Price selected)</label>
                        <input
                            type="number"
                            name="totalPrice"
                            step="0.01"
                            className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Amount Purchased <br/>(only if Total Price selected)</label>
                        <input
                            type="number"
                            name="amountPurchased"
                            step="0.01"
                            className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Store</label>
                        <input
                            type="text"
                            name="store"
                            className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Unit</label>
                        <select
                            required
                            name="unit"
                            className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="lb">lb</option>
                            <option value="oz">oz</option>
                            <option value="g">g</option>
                            <option value="kg">kg</option>
                            <option value="gal">gal</option>
                            <option value="bottle">bottle</option>
                            <option value="box">box</option>
                            <option value="dozen">dozen</option>
                            <option value="dozen">unit</option>
                            <option value="other">other</option>


                        </select>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={() => setPopupVisible(false)}
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
        </div> : null}
        {/* <div className=''>
            {popupVisible && <NewItem closePopup={closePopup} session={session} />}
        </div> */}
        <div className="item-list w-full p-6">
            {prices.map((price, index) => (
                <div className='my-6'>
                    <Price key={index} item={price} name={item[0]?.name} />
                </div>
                
            ))}
        </div>
       
            
    </div>
    );
};

export default ItemView;