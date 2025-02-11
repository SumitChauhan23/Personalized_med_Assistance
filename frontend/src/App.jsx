import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home'
import Prediction from './components/Prediction';
import Chatbot from './components/Chatbot/Chatbot';
import Recommend from './components/Recommend/Recommend';


const appRouter= createBrowserRouter([
  {
    path: '/',
    element: <Home/>,
},

{
  path: '/Prediction',
  element: <Prediction/>,
},

{
  path:'/Recommend',
  element:<Recommend/>
},

{
  path:'/Chatbot',
  element:<Chatbot/>
}


])

function App() {

  return (
    <>
     <RouterProvider router={appRouter}/>
    </>
  )
}

export default App
