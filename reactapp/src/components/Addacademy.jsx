import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { useAuthenticationAdmin } from './UseAuthentication';
import AcademyCourseVal from './Validations';

 

function Addacademy() {

  useAuthenticationAdmin();
  const [instituteName, setAcademyName] = useState('');

  const [mobile, setContactNumber] = useState('');

  const [photoFileName, setImageUrl] = useState('');

  const [email, setEmailId] = useState('');

  const [instituteAddress, setAcademyLocation] = useState('');

  const [instituteDescription, setAcademyDescription] = useState('');

  const [error,setError]=useState('');

  const navigate=useNavigate();

 

  const handleLogout = () =>

    {

        fetch('https://8080-ffbaaaeececadacafaabfdabddffdbddfadbecbaeee.project.examly.io/user/logout',

        {method: 'DELETE'})

        .then(res => res.json())

        .then(result => {alert(result.value)
            localStorage.clear();            
        })
    }

 

  const handleAddAcademy = () => {

   

    if (!instituteName || !mobile || !photoFileName || !email || !instituteAddress || !instituteDescription) {

      alert('Please fill in all the fields.');

      return;

    }
    // Prepare data for the API req

    const data = {

      instituteName,

      mobile,

      photoFileName,

      email,

      instituteAddress,

      instituteDescription,

    };

   
    setError(AcademyCourseVal({"email":email,"mobile":mobile}))
    if(error.email === "" && error.mobile === "" ){

    // Send the data to the API

    fetch('https://8080-ffbaaaeececadacafaabfdabddffdbddfadbecbaeee.project.examly.io/admin/addInstitute', {

      method: 'POST',

      headers: {

        'Content-Type': 'application/json',

      },

      body: JSON.stringify(data),

    })

      .then((response) => response.json())

      .then((result) => {

        if (result.success) {

          alert('Academy added successfully!');

          navigate('/Academy');

        } else {

          alert('Failed to add academy. Please try again.');

        }

      })

      .catch((error) => {

        alert('An error occurred while adding the academy. Please try again.');

        console.error(error);

      });
    }

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

      <br /><br /><br />

      <h3 className="text-center mt-4">Add Academy</h3>

      <br />

 

      <div className="container mt-4">

        <div className="row mb-3">

          <div className="col-md-6">

            <div className="form-group">

              <input

                type="text"

                className="form-control"

                placeholder="Enter academy name"

                id="academyName"

                value={instituteName}

                onChange={(e) => setAcademyName(e.target.value)}

                required

              />

            </div>

            <br />

            <div className="form-group">

              <input

                type="text"

                className="form-control"

                placeholder="Enter contact number"

                id="contactNumber"

                value={mobile}

                onChange={(e) => setContactNumber(e.target.value)}

                required

              />
              {error.mobile && <span className='text-danger'>{error.mobile}</span>}

            </div>

            <br />

          </div>

          <div className="col-md-6">

            <div className="form-group">

              <input

                type="text"

                className="form-control"

                placeholder="Enter the academy Image URL"

                id="imageUrl"

                value={photoFileName}

                onChange={(e) => setImageUrl(e.target.value)}

                required

              />

            </div>

            <br />

            <div className="form-group">

              <input

                type="email"

                className="form-control"

                placeholder="Enter the academic email"

                id="emailId"

                value={email}

                onChange={(e) => setEmailId(e.target.value)}

                required

              />
              {error.email && <span className='text-danger'>{error.email}</span>}
            </div>

          </div>

        </div>

        <div className="row mb-3">

          <div className="col-md-6">

            <div className="form-group position-relative">

              <input

                type="text"

                className="form-control"

                placeholder="Enter the academy Location"

                id="academyLocation"

                value={instituteAddress}

                onChange={(e) => setAcademyLocation(e.target.value)}

                required

              />

              <span className="location-logo">&#x1F4CD;</span>

              <br />

            </div>

          </div>

          <div className="col-md-6">

            <div className="form-group">

              <textarea

                className="form-control"

                placeholder="Enter the academy description"

                id="academyDescription"

                value={instituteDescription}

                onChange={(e) => setAcademyDescription(e.target.value)}

                rows="3"

                required

              ></textarea>

            </div>

          </div>

        </div>

        <div className="row">

          <div className="col-md-12">

            <div className="add-academy-button">

              <button

                className="btn btn-primary"

                id="addAcademy"

                onClick={handleAddAcademy}

              >

                Add Academy

              </button>

            </div>

            <style>

              {`

              .body{

                background-color: #f8f4f7;

            }

            #userNavbar {

                background-color: rgb(43,110,57);

            }

           

            .navbar-brand{

                font-size: 40px;

                color: white;

            }

            #adminAcademy {

              font-size: 25px;

              color: white;

             

            }

            #adminCourse {

              font-size: 20px;

              color: white;

            }

            #adminStudents {

                font-size: 20px;

                color: white;

            }

            #logout{

                font-size: 20px;

                color: white;

            }

              .add-academy-button {

                position: fixed;

                bottom: 140px;

                right: 125px;

              }

             

              @media (max-width: 768px) {

                .add-academy-button {

                  position: static;

                  margin-top: 20px;

                  text-align: center;

                }

              }

               body

               {

                   background:#797979;

               }

               .location-logo {

                position: absolute;

                right: 10px;

                top: 31%;

                transform: translateY(-50%);

                font-size: 20px;

              }

              h3 {

                color:white;

              }

           

            `}

            </style>

          </div>

        </div>

      </div>

    </>

  );

}

 

export default Addacademy; 