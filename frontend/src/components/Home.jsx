import React from 'react'
import Navbar from './shared/Navbar'
import Landing from './shared/Landing'
import About from './shared/About'
import Contact from './shared/Contact'
import Chatbot from './Chatbot/Chatbot'
import Footer from './shared/Footer'

function Home() {
  return (
     <>
    <Navbar />
     <Landing />
     <About />
     <Contact/>
     <Chatbot/>
     <Footer />
     </>
  )
}

export default Home