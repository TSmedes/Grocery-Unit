import { useEffect, useState } from 'react'
import {supabase} from '../../utils/supabase'
import NewItem from '../components/NewItem'
import Item from '../components/Item'

// export async function getItems(session) {

// }

export default function Home({session, items}) {
    const [loading, setLoading] = useState(false)
    // const [items, setItems] = useState([])
    const [name, setName] = useState('')
    
    const [popupVisible, setPopupVisible] = useState(false)
    const [signOutPopupVisible, setSignOutPopupVisible] = useState(false)
    const [activeItem, setActiveItem] = useState(null)

    useEffect(()=>{
        setLoading(true)
        // getItems();
        getName();
        setLoading(false)
        console.log(items)
    }, [])

    // const getItemsCaller = async () => {
    //     setLoading(true)
    //     const { data, error } = await supabase
    //     .from('Item')
    //     .select('*')
    //     .eq('user', session.user.id)
    //     if (error) {
    //     alert(error.error_description || error.message)
    //     } else {
    //         setItems(data)
    //     }
    //     setLoading(false)
    // }

    const getName = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('username')
            .eq('id', session.user.id)
        if (error) {
            alert(error.error_description || error.message)
        } else {
            setName(data[0].username)
        }
    }

    const signOut = async () => {
        setLoading(true)
        const { error } = await supabase.auth.signOut()
        if (error) {
            alert(error.error_description || error.message)
        }
    }

    const closePopup = () => {
        setPopupVisible(false)
    }

  return (
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className='absolute top-0 left-0 m-2'>
            <button
                className=' text-red-500 px-3 py-1.5 font-semibold'
                onClick={()=>{setSignOutPopupVisible(true)}}
            >Sign Out</button>
        </div>
        {signOutPopupVisible && <div className="fixed flex justify-center items-center p-10 w- bg-gray-300 border-gray-900 border-2 rounded-md ">
            <div className='flex-col space-y-4'>
                <h1 className='font-semibold test-xl text-center'>Are you sure you want to sign out?</h1>
                <button className="w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={signOut}
                >Sign Out</button>
                <button className='w-full rounded-md bg-slate-500 mt-4 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    onClick={()=>{setSignOutPopupVisible(false)}}
                >Cancel</button>
            </div>
        </div>}
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <p class="mx-auto h-10 w-auto text-2xl font-bold text-center leading-9">Grocery Unit</p>
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Welcome, {name}!
        </h2>
      </div>
      <div className='my-10'>
        <button
            onClick={()=> {setPopupVisible(true)}}
            disabled={loading}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
            New Item
        </button>
      </div>
      {popupVisible ? <div className='fixed top-0 left-0 mx-[15vw] mt-20'>
            <div className="bg-white p-6 rounded border-black border-[1px] shadow-xl w-[70vw]">
                <h2 className="text-xl font-bold mb-4">Add New Product</h2>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target);
                    const newPrice = {
                        user: session.user.id,
                        name: formData.get('name'),
                    };
                    const { data, error } = await supabase
                        .from('item')
                        .insert([newPrice])
                        .select();
                    if (error) {
                        console.error(error);
                    } else {
                        items = [...items, ...data];
                        setPopupVisible(false);
                    }
                }}>
                    
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Product Name</label>
                        <input
                            type="text"
                            name="name"
                            className="mt-1 block w-full rounded-md bg-gray-100 border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
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
      
      <div className="item-list w-full p-6">
        {items.map((item, index) => (
            <div className='my-6'>
                <Item key={index} item={item} />
            </div>
            
        ))}
      </div>
        
    </div>
    
  )
}
