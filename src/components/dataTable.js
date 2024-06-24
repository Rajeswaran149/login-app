import React from 'react'
import './dataTable.css'

function DataTable({ data }) {
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
                    data.map((e) => (
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