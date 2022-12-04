import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App1.css'
export default function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    axios.get("http://localhost:8080/api")
      .then((response) => setData(response.data));

  }, [])

  return (
    <div className='App'>
      <div className='logo'>
        <h1>HODLINFO.<span>com</span></h1>
        <h5>Powered By Fintreet </h5>
      </div>
      <div className='row'>
        <div className='hash'>#</div>
        <div className='name'>Name</div>
        <div className='Last'>Last</div>
        <div className='buy'>Buy/Sell Price</div>
        <div className='volume'>volume</div>
        <div className='base'>base_unit</div>
      </div>
      {
        data.map((value, index) => {
          <div className='row1' key={index}>

            <div className='hash'>{data.id}</div>
            <div className='name'>{data.name}</div>
            <div className='Last'>{data.last}</div>
            <div className='buy'>{data.buy}</div>
            <div className='volume'>{data.volume}</div>
            <div className='base'>{data.base}</div>
          </div>
        })
      }

    </div>





  )
}
