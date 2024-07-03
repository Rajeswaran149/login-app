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
  const [ editMode , setEditMode] = useState(false)
  const [ editedRow , setEditedRow ] = useState(null)

  const handleSearch = ( (e) => {
      setSearchTerm(e.target.value.toLowerCase())
  })
  
  const handleRowClick = (row) => {
    setSelectedRow(row)
    setEditedRow({...row})
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
        if(selectedRow || editMode){
          const updateData = data.filter((item) => item.ID !== selectedRow.ID)
          setData(updateData)
          setSelectedRow(null);
        } 
      }
   const cancelEdit = () => {
       setEditedRow(null);
       setEditMode(false);
   }

    const handleInputChange = (e) => {
      const { name , value } = e.target;
      setEditedRow( prevEditedRow => ({...prevEditedRow , [name]:value}));
    }  
   const saveChanges = () => {
    const updatedData = data.map( (item) => (
      item.ID === editedRow.ID ? editedRow : item
    ))
    setData(updatedData);
    setEditedRow(null);
    setSelectedRow(null);
    setEditMode(false);
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
        <div className='table-actions'>
            <input 
            className='search-input'
            type='text'
            placeholder='Search...'
            value={ searchTerm }
            onChange={ handleSearch }
            />
            <section className='btns'>
              <button className='btn-add' onClick={addRow} disabled = {selectedRow}>Add Row</button>
              <button className='btn-edit' onClick={ editMode ? saveChanges : () => setEditMode(true)} disabled= { !selectedRow }>
                  {editMode ? "Save Changes" : "Edit Row"}
                </button>
              <button className='btn-delete' onClick={deleteRow} disabled= { !selectedRow || editMode }>Delete</button>
              {editMode && (
                <button className='btn-cancel' onClick={cancelEdit}>Cancel</button>
              )}
            </section>
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
                            <td>{ editMode && selectedRow.ID === e.ID ? (
                                    <input
                                    type='text'
                                    name='First Name'
                                    value={editedRow['First Name']}
                                    onChange={handleInputChange}
                                    />
                                  ) :( e["First Name"])}</td>

                            <td>{ editMode && selectedRow.ID === e.ID ? (
                                <input 
                                type='text'
                                name='Last Name'
                                value={editedRow['Last Name']}
                                onChange={handleInputChange}
                                />
                              ) : (e["Last Name"])}
                            </td>
                            <td>{ editMode && selectedRow.ID === e.ID ? (
                            
                                <input
                                type='text'
                                name='Age'
                                value={editedRow.Age}
                                onChange={handleInputChange}
                                />
                              ) : ( e.Age )
                            } </td>
                            <td>{ editMode &&  editedRow.ID === e.ID ? (
                                <input
                                type='text'
                                name='City'
                                value={editedRow.City}
                                onChange={handleInputChange}
                                />
                                ) : ( e.City)}
                            </td>
                            <td>{ editMode && editedRow.ID === e.ID ? (
                                <input
                                type='text'
                                name='Occupation'
                                value={editedRow.Occupation}
                                onChange={handleInputChange}
                                />
                                ) : (e.Occupation)}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
  )
}

export default DataTable