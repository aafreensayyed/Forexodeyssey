import { Fragment, useState } from 'react'
import Navbar from '../components/navbar'
import SignUp from '../components/signup'
import Slider from '../components/slider'
import Brokers from'../components/Broker'
export default function Home() {

  return (
      <div>
        <Navbar />
          <Slider/>
          <Brokers/>
      </div>
  )
}