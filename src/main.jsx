import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './routes/home'
import NotFound from './not-found'
import './index.css'
import App from './App'
import ItemView from './components/ItemView'
import {loader as itemLoader} from './App'
import {loader as itemViewLoader} from './components/ItemView'
import Price from './routes/Price'
import {loader as priceLoader} from './routes/Price'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    loader: itemLoader,
    // children: [
    //   {
    //     path: "home/:itemId",
    //     element: <ItemView />,
    //     loader: itemViewLoader
    //   }
    // ],
  },
  {
    path: '/home/:itemId',
    element: <ItemView />,
    errorElement: <NotFound />,
    loader: itemViewLoader
  },
  {
    path: '/home/price/:priceId',
    element: <Price />,
    errorElement: <NotFound />,
    loader: priceLoader
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </StrictMode>,
)
