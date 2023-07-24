import React, { useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

 

function Editacademy() {

  const { id } = useParams();

  const [institute, setInstitute] = useState(null);

  const navigate = useNavigate();

 

  const handleLogout = () =>

    {

        fetch('https://8080-baedadabfababfdabddffdbddfadbecbaeee.project.examly.io/user/logout',

        {method: 'DELETE'})

        .then(res => res.json())

        .then(result => alert(result.value))

    }

 

    useEffect(() => {

    fetch(`https://8080-baedadabfababfdabddffdbddfadbecbaeee.project.examly.io/admin/GetInstitute/${id}`)

      .then((response) => response.json())

      .then((data) => {

        if (data.success) {

          setInstitute(data.institute);

        } else {

          console.error(data.message);

        }

      })

      .catch((error) => {

        console.error('Error:', error);

      });

  }, [id]);

 

  const handleUpdate = () => {

    const updatedInstitute = {

      instituteName: document.getElementById('editAcademyName').value,

      mobile: document.getElementById('editContactNumber').value,

      photoFileName: document.getElementById('editImageUrl').value,

      email: document.getElementById('editEmailId').value,

      instituteAddress: document.getElementById('editAcademyLocation').value,

      instituteDescription: document.getElementById('editAcademyDescription').value,

    };

 

    // Validate if all fields are filled

    const isFormValid = Object.values(updatedInstitute).every((value) => value.trim() !== '');

    if (!isFormValid) {

      alert('Please fill in all the fields.');

      return;

    }

 

    fetch(`https://8080-baedadabfababfdabddffdbddfadbecbaeee.project.examly.io/admin/editInstitute/${id}`, {

      method: 'PUT',

      headers: {

        'Content-Type': 'application/json',

      },

      body: JSON.stringify(updatedInstitute),

    })

      .then((response) => response.json())

      .then((data) => {

        alert('Institute updated successfully:', data);

        navigate('/Academy');

      })

      .catch((error) => {

        console.error('Error:', error);

      });

  };

 

 

  if (!institute) {

    return <div>Loading...</div>;

  }

 

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

      <br />

      <br />

      <br />

      <h3 className="text-center mt-4">Edit Academy</h3>

      <br />

      <div className="container mt-4">

        <div className="row mb-3">

          <div className="col-md-6">

            <div className="form-group">

              <input

                type="text"

                className="form-control"

                placeholder="Enter academy name"

                id="editAcademyName"

                value={institute.instituteName}

                onChange={(e) =>

                  setInstitute((prev) => ({

                    ...prev,

                    instituteName: e.target.value,

                  }))

                }

              />

            </div>

            <br />

            <div className="form-group">

              <input

                type="text"

                className="form-control"

                placeholder="Enter contact number"

                id="editContactNumber"

                value={institute.mobile}

                onChange={(e) =>

                  setInstitute((prev) => ({

                    ...prev,

                    mobile: e.target.value,

                  }))

                }

              />

            </div>

            <br />

          </div>

          <div className="col-md-6">

            <div className="form-group">

              <input

                type="text"

                className="form-control"

                placeholder="Enter the academy Image URL"

                id="editImageUrl"

                value={institute.photoFileName}

                onChange={(e) =>

                  setInstitute((prev) => ({

                    ...prev,

                    photoFileName: e.target.value,

                  }))

                }

              />

            </div>

            <br />

            <div className="form-group">

              <input

                type="email"

                className="form-control"

                placeholder="Enter the academic email"

                id="editEmailId"

                value={institute.email}

                onChange={(e) =>

                  setInstitute((prev) => ({

                    ...prev,

                    email: e.target.value,

                  }))

                }

              />

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

                id="editAcademyLocation"

                value={institute.instituteAddress}

                onChange={(e) =>

                  setInstitute((prev) => ({

                    ...prev,

                    instituteAddress: e.target.value,

                  }))

                }

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

                id="editAcademyDescription"

                rows="3"

                value={institute.instituteDescription}

                onChange={(e) =>

                  setInstitute((prev) => ({

                    ...prev,

                    instituteDescription: e.target.value,

                  }))

                }

              ></textarea>

            </div>

          </div>

        </div>

        <div className="row">

          <div className="col-md-12">

            <div className="edit-academy-button">

              <button onClick={handleUpdate} className="btn btn-primary" id="updateAcademy">

                Update Academy

              </button>

            </div>

          </div>

        </div>

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

        .edit-academy-button {

          position: fixed;

          bottom: 140px;

          right: 125px;

        }

       

        @media (max-width: 768px) {

          .edit-academy-button {

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

    </>

  );

}

 

export default Editacademy;