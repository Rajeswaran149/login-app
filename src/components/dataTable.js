import React, { useState } from 'react'
import './dataTable.css'

function DataTable() {

  const initialData = [
    {
      "ID": 1,
      "First Name": "John",
      "Last Name": "Doe",
      "Age": 28,
      "City": "New York",
      "Occupation": "Engineer"
    },
    {
      "ID": 2,
      "First Name": "Jane",
      "Last Name": "Smith",
      "Age": 35,
      "City": "Los Angeles",
      "Occupation": "Teacher"
    },
    {
      "ID": 3,
      "First Name": "Mike",
      "Last Name": "Brown",
      "Age": 22,
      "City": "Chicago",
      "Occupation": "Student"
    },
    {
      "ID": 4,
      "First Name": "Emily",
      "Last Name": "Davis",
      "Age": 30,
      "City": "San Francisco",
      "Occupation": "Doctor"
    },
    {
      "ID": 5,
      "First Name": "Sarah",
      "Last Name": "Johnson",
      "Age": 25,
      "City": "Miami",
      "Occupation": "Lawyer"
    },
    {
      "ID": 6,
      "First Name": "David",
      "Last Name": "Wilson",
      "Age": 40,
      "City": "Boston",
      "Occupation": "Accountant"
    }
  ];

  const [ searchTerm , setSearchTerm ] = useState('')
  const [ data , setData ] = useState(initialData)
  const [ selectedRow , setSelectedRow ] = useState(null)

  const handleSearch = ( (e) => {
      setSearchTerm(e.target.value.toLowerCase())
  })
  
  const handleRowClick = (row) => {
    setSelectedRow(row)
  }
    

      const addRow = () => {
        const newId = Math.max(...data.map((item) => item.ID)) + 1;
        const newRow = {
          "ID": newId,
          "First Name": "Ragul",
          "Last Name": "Praveen",
          "Age": 26,
          "City": "Thiruvannamalai",
          "Occupation": "software developer"
        }
        setData( [...data , newRow])
      }


      const deleteRow = () => {
        if(selectedRow){
          const updateData = data.filter((item) => item.ID != selectedRow.ID)
          setData(updateData)
          setSelectedRow(null);
        }
      }

    const filteredData = data.filter((row) => {
          const idString = row.ID.toString();

        return (
            idString.includes(searchTerm) || 
            Object.keys(row).some((key) =>
              typeof row[key] === 'string' && row[key].toLowerCase().includes(searchTerm))
        )
    });

  return (
    <div className='table-container'>
        <h2>Sample data table</h2>
        <div className=''>
            <input 
            className='search-input'
            type='text'
            placeholder='Search...'
            value={ searchTerm }
            onChange={ handleSearch }
            />
            <button className='btn-add' onClick={addRow}>Add Row</button>
            <button className='btn-delete' onClick={deleteRow} disabled= { !selectedRow }>Delete</button>
        </div>
        <table className='data-table'>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Age</th>
                    <th>City</th>
                    <th>Occupation</th>
                </tr>
            </thead>
            <tbody>
                {
                    filteredData.map((e) => (
                        <tr key={e.ID} onClick={ () => handleRowClick(e)} 
                        className={ selectedRow && selectedRow.ID === e.ID ? "selected" : "" }
                        >
                            <td>{e.ID}</td>
                            <td>{e["First Name"]}</td>
                            <td>{e["Last Name"]}</td>
                            <td>{e.Age}</td>
                            <td>{e.City}</td>
                            <td>{e.Occupation}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default DataTable