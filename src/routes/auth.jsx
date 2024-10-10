import { useState } from 'react'
import {supabase} from '../../utils/supabase'

export default function Auth({setName}) {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        const { data, error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) {
        alert(error.error_description || error.message)
        } else {
        alert('Login successful')
        }
        console.log(data)
        setLoading(false)
    }

    const handleSignUp = async (e) => {
        e.preventDefault()
        setLoading(true)
        const { data, error } = await supabase.auth.signUp({ email, password })
        if (error) {
        alert(error.error_description || error.message)
        console.log(error)
        } else {
            await handleProfile(data.user)
            setName(true)
        }
        setLoading(false)
    }

    const handleProfile = async (user) => {
        const { data, error } = await supabase
            .from('profiles')
            .update({email: email})
            .eq('id', user.id)
        if (error) {
            alert(error.error_description || error.message)
        } else {
            console.log(data)
        }
    }

  return (
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <p class="mx-auto h-10 w-auto text-2xl font-bold text-center leading-9">Grocery Unit</p>
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex-col jusitfy-items-center">
          <form class="space-y-6">
            <div>
              <label htmlFor="email" class="blockk text-sm fint-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input 
                  type="email"
                  id='email'
                  name="email"
                  required
                  onChange={(e)=>{setEmail(e.target.value)}}
                  autoComplete="email"
                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  onChange={(e)=>{setPassword(e.target.value);}}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            

            <div>
              <button
                onClick={handleLogin}
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          <div>
              <button
                onClick={handleSignUp}
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-indigo-600 mt-10 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign up
              </button>
            </div>
        </div>
        
      </div>
    </div>
    
  )
}
