import React, { useEffect, useState } from 'react'
import "./dataTable1"
export default function DataTable1() {

    const [ data , setData ] = useState([])

  
    useEffect (()=>{
      fetchData();
    },[])
      const fetchData = ( async () => {
           try {
            const response = await fetch("http://makeup-api.herokuapp.com/api/v1/products.json") 
              if(!response){
                console.log("network response was not ok");
              }
              const jsonData = await response.json()
              console.log(jsonData);
    
              const sortdata = jsonData.reverse()
              setData(sortdata)
              
            
           } catch (error) {
              console.error(error);
           }
      })


  return (
    <div className='table-container'>
    <h2>Listed data from server</h2>
    <table className='data-table'>
        <thead>
            <tr>
                <th>Id</th>
                <th>Brand</th>
                <th>Name</th>
                <th>Category</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map((e)=> (
                    <tr key={e.id}>
                       <td>{e.id}</td>
                       <td>{e.brand}</td>
                       <td>{e.name}</td>
                       <td>{e.category}</td>
                       <td>{e.description}</td>
                    </tr>
                ))
            }
        </tbody>
    </table>
    </div>
  )
}
