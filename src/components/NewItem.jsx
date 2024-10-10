import React, { useState } from 'react';
import { supabase } from '../../utils/supabase';

const NewItem = ( { closePopup, session } ) => {
    const [itemName, setItemName] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        const { error } = await supabase
            .from('Item')
            .insert({ 
                name: itemName,
                user: session.user.id 
            });
        if (error) {
            alert(error.error_description || error.message);
        } else {
            setItemName('');
            closePopup();
        }
    };

    return (
        <div>
        {/* <div className="flex-col items-center  new-item-popup absolute p-6 bg-gray-300 border-2 border-gray-900 border-r-4 w-auto mr-20">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter item name"
                    value={itemName}
                    onChange={handleInputChange}
                />
                <button className="" type="submit">Add Item</button>
            </form>
        </div> */}
        <div className="fixed inset-0 flex items-center justify-center">

            <div className="flex-col items-center new-item-popup absolute py-[6vh] px-[15vw] bg-gray-300 border-2 border-gray-900 rounded-lg w-auto">
                <h2 className="text-2xl font-bold leading-9 text-center mb-10">Add New Item</h2>
                <form className="flex flex-col space-y-4" >
                    <input
                        className='px-3 py-1.5 text-sm rounded-md leading-6'
                        type="text"
                        placeholder="Enter item name"
                        value={itemName}
                        onChange={(e) => { setItemName(e.target.value)}}
                    />
                    <button className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={handleSubmit}>Add Item</button>
                </form>
                <button className="w-full rounded-md bg-slate-500 mt-4 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={closePopup}>Cancel</button>
            </div>
        </div>
        </div>
    );
};

export default NewItem;