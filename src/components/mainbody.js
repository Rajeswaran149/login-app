import React from 'react';
import './mainbody.css';
import DataTable from './dataTable';

function Mainbody() {

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
    <div className='main-body'>
        {/* <h2>Main Content Area</h2>
        <p>this is where the main content</p> */}

        <DataTable data={jsonData} />
    </div>
  )
}

export default Mainbody