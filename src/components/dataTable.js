import React from 'react'
import './dataTable.css'

function DataTable({ data }) {

    const jsonData = [
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


  return (
    <div className='table-container'>
        <h2>Sample data table</h2>
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
                    jsonData.map((e) => (
                        <tr key={e.ID}>
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