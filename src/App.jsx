import { useEffect, useState } from 'react'
import { useLoaderData, Outlet } from 'react-router-dom'
import {supabase} from '../utils/supabase'
import Home from './routes/home'
import Auth from './routes/auth'
import getItems from './components/Items'


export async function loader() {
  const items = await getItems();
  return {items}
}

export default function App() {
  const {items} = useLoaderData()

  const [session, setSession] = useState(null)
  const [setName, setSetName] = useState(false)
  const [userName, setuserName] = useState('')

  useEffect(()=>{
    // console.log('setting up supabase')
    supabaseSetup()
  }, [])

  async function supabaseSetup() {
    const { data, error } = await supabase
      .auth
      .getSession()
    if (error) {
      // console.log('error getting session')
      console.error(error)
    } else {
      setSession(data?.session)
      // console.log('session: ', data.session)
    }
    // console.log('got session')
    supabase
      .auth
      .onAuthStateChange((event, session) => {
        setSession(session)
      })
  }

  return(
    <div>
      {!session ? <Auth setName={setSetName}/> : <Home  session={session} items={items} />}
      <div id="ItemView-section" className='absolute m-8'>
        <Outlet />
      </div>
      {setName && 
        <div className='fixed inset-0 flex items-center justify-center w-screen h-screen'>
          <div className='flex flex-col flex-nowrap items-center space-y-2 new-item-popup absolute py-10 px-12 bg-gray-300 border-2 border-gray-900 rounded-lg w-fit h-fit'>
            <h1 className='text-center text-xl font-semibold'>Signup Successful!</h1>
            <p className='text-center text-l mb-4'>What is your name?</p>
            <input 
              className='px-3 py-1.5 text-sm rounded-md leading-6'
              type="text" 
              placeholder="Name"
              onChange={(e)=>{
                setuserName(e.target.value)
              }}
            />
            <button 
              className='"w-full rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              onClick={async ()=>{
                console.log(userName)
                await supabase
                  .from('profiles')
                  .update({username: userName})
                  .eq('id', session.user.id)
                setSetName(false)
              }}
            >
              Submit
            </button>
          </div>
        </div>
        
      }
    </div>
    
  )
}
