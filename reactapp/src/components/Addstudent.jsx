import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Addstudent() {
  const navigate=useNavigate();
  const [firstName, setFirstName] = useState('');
  const [phoneNumber1, setPhoneNumber1] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');

  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [phoneNumber2, setPhoneNumber2] = useState('');
  const [age, setAge] = useState('');
  const [houseNo, setHouseNo] = useState('');
  const [streetName, setStreetName] = useState('');
  const [areaName, setAreaName] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [nationality, setNationality] = useState('');

  const handleLogout = () =>
  {
      fetch('https://8080-dabcfdceacfcabfdabddffdbddfadbecbaeee.project.examly.io/user/logout',
      {method: 'DELETE'})
      .then(res => res.json())
      .then(result => alert(result.value))
  }

  const addStudent = () => {
    
    if (!firstName ||  !phoneNumber1 || !lastName || !gender || !fatherName || !emailId || 
        !phoneNumber2 || !age || !houseNo || !streetName || !areaName || !state || !motherName ||
        !pincode || !nationality) {
      alert('Please fill in all the fields.');
      return;
    }

      const data = {
      firstName,
      phoneNumber1,
      lastName,
      gender,
      fatherName,
      motherName,
      emailId,
      phoneNumber2,
      age,
      houseNo,
      streetName,
      areaName,
      state,
      pincode,
      nationality,
    };
        fetch('https://8080-dabcfdceacfcabfdabddffdbddfadbecbaeee.project.examly.io/admin/addStudent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          alert('Student added successfully!');
          navigate('/Students');
        } else {
          alert('Failed to add student. Please try again.');
        }
      })
      .catch((error) => {
        alert('An error occurred while adding the student. Please try again.');
        console.error(error);
      });
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="userNavbar">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/Academy" id="adminAcademy">
                Academy
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Course" id="adminCourse">
                Course
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Students" id="adminStudents">
                Students
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link" id="logout" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <br /><br/>
      <h3 className="text-center mt-4">Add Student</h3>
      <div className="container mt-4">
        <div className="row mb-3">
          <div className="col-md-4">
            <div className="form-group">
              <input type="text" className="form-control" style={{ height: '40px' }}
               id="firstName" placeholder="Enter the first name" 
               value={firstName}
               onChange={(e)=>setFirstName(e.target.value)}
               required />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <input type="text" className="form-control" style={{ height: '40px' }} id="lastName" 
              placeholder="Enter the last name" 
               value={lastName}
               onChange={(e)=>setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <input type="text"  placeholder="enter male or female" className="form-control" id="male/female" 
              value={gender}
              onChange={(e)=>setGender(e.target.value)}
              />
        
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-4">
            <div className="form-group">
              <input type="text" className="form-control" style={{ height: '40px' }}  id="fatherName"
               placeholder="Enter father's name"
              value={fatherName}
              onChange={(e)=>setFatherName(e.target.value)} 
               />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
            
              <input type="text" className="form-control" style={{ height: '40px' }} id="phoneNumber1"
               placeholder="Enter phone number"
               value={phoneNumber1} 
               onChange={(e)=>setPhoneNumber1(e.target.value)}
              required/>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
             
              <input type="text" className="form-control" style={{ height: '40px' }} id="phoneNumber2" placeholder="Enter alternative phone number" 
               value={phoneNumber2}
               onChange={(e)=>setPhoneNumber2(e.target.value)}
              required
               />
            </div>
          </div>
        </div>
        <div className="row mb-3">
        <div className="col-md-4">
            <div className="form-group">
              <input type="text" className="form-control" style={{ height: '40px' }} id="motherName" 
              placeholder="Enter mother's name"
              value={motherName}
              onChange={(e)=>setMotherName(e.target.value)}
              required 
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <input type="text" className="form-control" style={{ height: '40px' }} id="emailId"
               placeholder="Enter email id" 
              value={emailId}
              onChange={(e)=>setEmailId(e.target.value)}
              required
                />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <input type="text" className="form-control" style={{ height: '40px' }} id="age" placeholder="Enter age"
                value={age}
                onChange={(e)=>setAge(e.target.value)}
              required 
               />
            </div>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-md-8">
            <div className="card border-primary">
              <div className="card-header">Address Information</div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="houseNo">House No</label>
                      <input type="text" className="form-control" style={{ height: '40px' }} id="houseNo" 
                      value={houseNo} onChange={(e)=>setHouseNo(e.target.value)}
                      required/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="streetName">Street</label>
                      <input type="text" className="form-control" style={{ height: '40px' }} id="streetName"
                      value={streetName}  onChange={(e)=>setStreetName(e.target.value)} />
                    </div>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="areaName">Area</label>
                      <input type="text" className="form-control" style={{ height: '40px' }} id="areaName" 
                      value={areaName}  onChange={(e)=>setAreaName(e.target.value)}/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="state">State</label>
                      <input type="text" className="form-control" style={{ height: '40px' }} id="state" 
                      value={state}  onChange={(e)=>setState(e.target.value)}/>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="pincode">Pincode</label>
                      <input type="text" className="form-control" style={{ height: '40px' }} id="pincode" 
                      value={pincode}  onChange={(e)=>setPincode(e.target.value)}/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="nationality">Nationality</label>
                      <input type="text" className="form-control" style={{ height: '40px' }} id="nationality"
                      value={nationality}  onChange={(e)=>setNationality(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="add-student-button">
              <Link to="/addStudent" className="btn btn-primary" id="addStudent" onClick={addStudent}>
                Add Student
              </Link>
            </div>
            <style>
              {`
               .body {
                background-color: #f8f4f7;
              }
            
              #userNavbar {
                background-color: rgb(43, 110, 57);
              }
            
              .navbar-brand {
                font-size: 40px;
                color: white;
              }
              
              #adminAcademy {
                font-size: 20px;
                font-weight:light;
                color: white;
              }
            
              #adminCourse {
                font-size: 20px;
                color: white;
              }
              #adminStudents {
                font-size: 25px;
                color: white;
              }
            
              #logout {
                font-size: 20px;
                color: white;
              }
              h3{
                color:white;
              }
            
              .add-student-button {
                position: fixed;
                bottom: 50px;
                right: 125px;
              }
              
              @media (max-width: 768px) {
                .add-student-button {
                  position: static;
                  margin-top: 20px;
                  text-align: center;
                }
              }
            
              body {
                background: #797979;
              }
            
              /* Adjust the form field alignment */
              .form-group:nth-child(2),
              .form-group:nth-child(3) {
                margin-bottom: 0;
              }
              `}
            </style>
          </div>
        </div>
      </div>
    </>
  );
}

export default Addstudent;
