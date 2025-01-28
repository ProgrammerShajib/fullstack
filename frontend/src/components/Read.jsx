import React, { useEffect, useState } from 'react'

const Read = () => {

  const [data, setData] = useState();
  const [error, setError] = useState("")

  async function getData() {
    const response = await fetch("http://localhost:5000")
    const result = await response.json();
    if (!response.ok) {
      console.error(result.error)
      setError(result.error)
    }

    if (response.ok) {
      setData(result)
    }
 
  }

  useEffect(()=>{
    getData();

  },[])
  console.log(data)

  return (
    <div className='container my-2'>
    <h2>All Data</h2>

    <div className='row'>
        <div className='col-3'>
            <div className='card'>
                <div className='card-body'>
                    <h5 className='card-title'>Card title</h5>
                    <p className='card-text'>Email</p>
                    <p className='card-text'>Age </p>
                    <a href="#" className='card-link'>Delete</a>
                    <a href="#" className='card-link'>Edit</a>
                </div>
            </div>

        </div>
    </div>
    </div>
  )
}

export default Read
