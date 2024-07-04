import React, { useEffect, useState } from 'react'
import "./dataTable1.css"
export default function DataTable1() {

    const [ data , setData ] = useState([]);
    const [ currentPage , setCurrentPage ] = useState(1);
    const [ itemsPerPage ] = useState(10);

  
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

      const lastIndexOfItem = currentPage * itemsPerPage;
      const firstIndexOfItem = lastIndexOfItem - itemsPerPage;
      const currentItems = data.slice( firstIndexOfItem , lastIndexOfItem );

      const paginate = (pageNumber) =>{
        setCurrentPage(pageNumber)
      }

  return (
    <div className='table-container'>
      <h2>Listed data from server</h2>
      <div className='table-actions'>
        <input className='search-input' type='text' placeholder='search...' value={""} onChange={""} />
        <section className='btns'>
          <button className='btn-add'>Add Row</button>
          <button className='btn-edit'>Edit Row</button>
          <button className='btn-delete'>Delete</button>
        </section>
      </div>
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
                  currentItems.map((e)=> (
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
      <div className='pagination'>
        <button className='pagination-button' onClick={ () => paginate(1) } disabled = {currentPage === 1 }>First</button>
        <button className='pagination-button' onClick={ () => paginate( currentPage - 1 )} disabled = { currentPage === 1 } >Previous</button>
        <span className='pagination-current-page'>{currentPage}</span>
        <button className='pagination-button' onClick={ () => paginate( currentPage + 1 ) } disabled = { currentPage === Math.ceil(data.length / itemsPerPage) }>Next</button>
        <button className='pagination-button' onClick={ () => paginate(Math.ceil( data.length / itemsPerPage ))} disabled = { currentPage === Math.ceil(data.length/itemsPerPage)}>Last</button>
      </div>

    </div>
  )
}
