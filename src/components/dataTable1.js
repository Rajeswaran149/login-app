import React, { useEffect, useState } from 'react'
import "./dataTable1.css"
export default function DataTable1() {

    const [ data , setData ] = useState([]);
    const [ currentPage , setCurrentPage ] = useState(1);
    const [ itemsPerPage ] = useState(10);
    const [ editMode , setEditMode ] = useState(false);
    const [ selectedRowData , setSelectedRowData ] = useState(null);
    const [ searchTerm , setSearchTearm ] = useState('');

  
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
      const handleSearch = (e) => {
        setSearchTearm(e.target.value.toLowerCase())
      }

     

      const handleEdit = (rowData) => {
          setSelectedRowData(rowData)
          setEditMode(true);
      }

      const handleUpdate = async(updatedRow) => {
        try {

          const response = await fetch(`http://makeup-api.herokuapp.com/api/v1/products/${updatedRow.id}` ,{
            method: 'PUT',
            headers: {
                'Content-Type' : 'application/json',
              },
            body: JSON.stringify(updatedRow)

          });

          if(!response.ok){
            throw new Error('Failed to update data')
          }
          const updatedData = data.map((item) => item.id === updatedRow.id ? updatedRow : item );
          setData(updatedData);
          setSelectedRowData(null);
          setEditMode(false)

        } catch (error) {
          console.error('Error updating data :' , error);
        }
      }

      const lastIndexOfItem = currentPage * itemsPerPage;
      const firstIndexOfItem = lastIndexOfItem - itemsPerPage;
      const currentItems = data.slice( firstIndexOfItem , lastIndexOfItem );

      const paginate = (pageNumber) =>{
        setCurrentPage(pageNumber)
        
      }


      const filteredData = currentItems.filter((e) => {
        const idString = e.id.toString();
        // console.log(idString);
        return (
          idString.includes(searchTerm) ||
          Object.values(e).some((val) => typeof val === 'string' && val.toLowerCase().includes(searchTerm) )
        )
    })

  return (
    <div className='table-container'>
      <h2>Listed data from server</h2>
      <div className='table-actions'>
        <input className='search-input' type='text' placeholder='search...' value={searchTerm} onChange={handleSearch} />
        <section className='btns'>
          {/* <button className='btn-delete'>Delete</button> */}
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
                  filteredData.map((e)=> (
                      <tr key={e.id}>
                        <td>{e.id}</td>
                        <td>{e.brand}</td>
                        <td>{e.name}</td>
                        <td>{e.category}</td>
                        <td>{e.description}</td>
                        <td className='btn-edit' onClick={()=> handleEdit(e)}>Edit</td>
                      </tr>
                  ))
              }
          </tbody>
      </table>

      {editMode && (
          <EditForm 
           selectedRow = {selectedRowData}
           handleUpdate = {handleUpdate}
           setEditMode = {setEditMode}
          />
           )
          }

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

function EditForm ({ selectedRow ,handleUpdate , setEditMode }){

  const [ editedData , setEditedData ] = useState(selectedRow ? {...selectedRow} : {})

  
  const handleChange = (e) => {
    const { name , value } = e.target;
    setEditedData( prevData => (
      {
        ...prevData , [name]:value,
      }
    )
      
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault();
   handleUpdate(editedData)
  }
  if(!selectedRow){
    return null;
  }

  return (
    <div className='edit-form-container-overlay'>
      <div className='edit-form-container'>
        <form onSubmit={handleSubmit}>
          <label>
            Id:
            <input  type='text' name='id' value={editedData.id || ''} readOnly/>
          </label>
          <label>
            Brand:
            <input type='text' name='brand' value={editedData.brand || ''} onChange={handleChange}/>
          </label>
          <label>
            Name:
            <input type='text' name='name' value={editedData.name || ''} onChange={handleChange}/>
          </label>
          <label>
            Category:
            <input type='text' name='category' value={editedData.category || ''} onChange={handleChange}/>
          </label>
          <label>
            Description:
            <input  type='text' name='description' value={editedData.description || ''} onChange={handleChange}/>
          </label>
          <div className='edit-form-buttons'>
            <button type='submit'>Update</button>
            <button onClick={()=> setEditMode(false)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  )
}