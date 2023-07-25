import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

 

function Addcourse() {

  const [courseName, setCourseName] = useState('');

  const [courseDuration, setCourseDuration] = useState('');

  const [courseTiming, setCourseTiming] = useState('');

  const [studentsEnrolled, setStudentsEnrolled] = useState('');

  const [courseDescription, setCourseDescription] = useState('');

  const [instituteId, setInstituteId] = useState('');

 

  const navigate=useNavigate();

 

  const handleLogout = () =>

  {

      fetch('https://8080-dfacffdfabfdabddffdbddfadbecbaeee.project.examly.io/user/logout',

      {method: 'DELETE'})

      .then(res => res.json())

      .then(result => alert(result.value))

  }

 

  const handleAddCourse = () => {

   

    if (!instituteId || !courseName || !courseDuration || !courseTiming || !studentsEnrolled || !courseDescription) {

      alert('Please fill in all the fields.');

      return;

    }

 

   

      const data = {

      courseName,

      courseDuration,

      courseTiming,

      studentsEnrolled,

      courseDescription,

      instituteId

    };

   

    fetch('https://8080-dfacffdfabfdabddffdbddfadbecbaeee.project.examly.io/admin/addCourse', {

      method: 'POST',

      headers: {

        'Content-Type': 'application/json',

      },

      body: JSON.stringify(data),

    })

      .then((response) => response.json())

      .then((result) => {

        if (result.success) {

          alert('Course added successfully!');

          navigate('/Course');

        } else {

          alert('Failed to add course. Please try again.');

        }

      })

      .catch((error) => {

        alert('An error occurred while adding the course. Please try again.');

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

      <br /><br/><br/>

      <h3 className="text-center mt-4">Add Course</h3>

      <br/>

      <div className="container mt-5">

        <div className='row mb-3'>

        <div className='col-md-6'>

        <div className="form-group">

              <input type="text" className="form-control" style={{ height: '50px' }}

              placeholder="Enter the Institute Id"

              id="instituteId"

              value={instituteId}

              onChange={(e)=>setInstituteId(e.target.value)}

              required

              />

        </div>

        </div>

        </div>

        <div className="row mb-3">

          <div className="col-md-6">

            <div className="form-group">

              <input type="text" className="form-control" style={{ height: '50px' }}

              placeholder="Enter the course Name"

              id="courseName"

              value={courseName}

              onChange={(e)=>setCourseName(e.target.value)}

              required

              />

            </div>

            <br />

            <div className="form-group">

              <input type="text" className="form-control" style={{ height: '50px' }}

              placeholder="Enter the course duration"

              id="courseDuration"

              value={courseDuration}

              onChange={(e)=>setCourseDuration(e.target.value)}

              />

            </div>

            <br />

            <div className="form-group position-relative">

              <input

                type="text"

                className="form-control"

                style={{ height: '50px' }}

                placeholder="Enter the course timing"

                id="courseTiming"

                value={courseTiming}

                onChange={(e)=>setCourseTiming(e.target.value)}

              />

              <br/>

            </div>

          </div>

          <div className="col-md-6">

            <div className="form-group">

              <input

                type="text"

                className="form-control"

                style={{ height: '50px' }}

                placeholder="Enter the no of student enrolled in the course"

                id="courseEnrolled"

                value={studentsEnrolled}

                onChange={(e)=>setStudentsEnrolled(e.target.value)}

              />

            </div>

            <br />

            <div className="form-group">

              <textarea

                className="form-control"

                style={{ height: '120px' }}

                placeholder="Enter the course description"

                id="courseDescription"

                rows="4"

                value={courseDescription}

                onChange={(e)=>setCourseDescription(e.target.value)}

              ></textarea>

            </div>

          </div>

        </div>

        <div className="row">

          <div className="col-md-12">

            <div className="add-course-button">

              <Link to="/addCourse" className="btn btn-primary" id="addCourse" onClick={handleAddCourse}>

                Add Course

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

                color: white;

              }

 

              #adminCourse {

                font-size: 25px;

                color: white;

              }

              #adminStudents {

                font-size: 20px;

                color: white;

               

              }

 

              #logout {

                font-size: 20px;

                color: white;

              }

              h3{

                color:white;

              }

 

              .add-course-button {

                position: fixed;

                bottom: 140px;

                right: 125px;

              }

             

              @media (max-width: 768px) {

                .add-course-button {

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

 

export default Addcourse;