import { Link, useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import React, { useEffect, useState } from 'react';

import { useAuthenticationAdmin } from './UseAuthentication';

function Editcourse() {
  useAuthenticationAdmin();
  const { id } = useParams();

  const [course, setCourse] = useState(null);

  const navigate=useNavigate();

 

  const handleLogout = () =>

    {

        fetch('https://8080-aaccecedbccaaccabfdabddffdbddfaaceaebbbdfbba.project.examly.io/user/logout',

        {method: 'DELETE'})

        .then(res => res.json())

        .then(result => {alert(result.value)
          localStorage.clear();            
        })

    }

 

  useEffect(() => {

    fetch(`https://8080-aaccecedbccaaccabfdabddffdbddfaaceaebbbdfbba.project.examly.io/admin/GetCourse/${id}`)

      .then((response) => response.json())

      .then((data) => {

        if(data.success) {

          setCourse(data.course);

        }else{

          console.error(data.message);

        }

      })

      .catch((error) => {

        console.error('Error:', error);

      });

  }, [id]);

 

  const handleUpdate = () => {

    const updatedCourse = {

      courseName: document.getElementById('editCourseName').value,

      courseDuration: document.getElementById('editCourseDuration').value,

      courseTiming: document.getElementById('editCourseTiming').value,

      studentsEnrolled: document.getElementById('editCourseEnrolled').value,

      courseDescription: document.getElementById('editCourseDescription').value,

      instituteId : document.getElementById('editInstituteId').value,

    };

 

    const isFormValid = Object.values(updatedCourse).every((value) => value.trim() !== '');

    if (!isFormValid) {

      alert('Please fill in all the fields.');

      return;

    }

 

    fetch(`https://8080-aaccecedbccaaccabfdabddffdbddfaaceaebbbdfbba.project.examly.io/admin/editCourse/${id}`, {

      method: 'PUT',

      headers: {

        'Content-Type': 'application/json',

      },

      body: JSON.stringify(updatedCourse),

    })

      .then((response) => response.json())

      .then((data) => {

        alert('Course updated successfully:', data);

        navigate('/Course');

      })

      .catch((error) => {

        console.error('Error:', error);

      });

  };

 

  if (!course) {

    return <div>Loading...</div>;

  }

  return (

    <>

      <nav className="navbar navbar-expand-lg navbar-light" id="userNavbar">

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

      <h3 className="text-center mt-4">Edit Course</h3><br/>

      <div className="container mt-5">

      <div className="row mb-3">

        <div className="col-md-6">

          <div className="form-group">

              <input type="text" className="form-control" style={{ height: '50px' }}

              placeholder="Enter the Institute Id"

              id="editInstituteId"

              value={course.instituteId}

              onChange={(e) =>

                setCourse((prev) => ({

                  ...prev,

                  instituteId: e.target.value,

                }))

              }

              />

            </div>

          </div>

        </div>

        <div className="row mb-3">

          <div className="col-md-6">

            <div className="form-group">

              <input type="text" className="form-control" style={{ height: '50px' }}

              placeholder="Enter the course Name"

               id="editCourseName"

               value={course.courseName}

               onChange={(e) =>

                setCourse((prev) => ({

                  ...prev,

                  courseName: e.target.value,

                }))

              }

                />

               

            </div>

            <br />

            <div className="form-group">

              <input type="text" className="form-control" style={{ height: '50px' }}

              placeholder="Enter the course duration"

               id="editCourseDuration"

               value={course.courseDuration}

               onChange={(e) =>

                  setCourse((prev) => ({

                    ...prev,

                    courseDuration: e.target.value,

                  }))

                } />

            </div>

            <br />

            <div className="form-group position-relative">

              <input

                type="text"

                className="form-control"

                style={{ height: '50px' }}

                placeholder="Enter the course timing"

                id="editCourseTiming"

                value={course.courseTiming}

                onChange={(e) =>

                  setCourse((prev) => ({

                    ...prev,

                    courseTiming: e.target.value,

                  }))

                }

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

                id="editCourseEnrolled"

                value={course.studentsEnrolled}

                onChange={(e) =>

                  setCourse((prev) => ({

                    ...prev,

                    studentsEnrolled: e.target.value,

                  }))

                }

              />

            </div>

            <br />

            <div className="form-group">

              <textarea

                className="form-control"

                style={{ height: '120px' }}

                placeholder="Enter the course description"

                id="editCourseDescription"

                rows="4"

                value={course.courseDescription}

                onChange={(e) =>

                  setCourse((prev) => ({

                    ...prev,

                    courseDescription: e.target.value,

                  }))

                }

              ></textarea>

            </div>

          </div>

        </div>

        <div className="row">

          <div className="col-md-12">

            <div className="edit-course-button">

            <button className="btn btn-primary" id="updateCourse" onClick={handleUpdate}>

  Update Course

</button>

 

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

                font-weight:normal;

              }

 

              #adminCourse {

                font-size:25px;

                color: white;

               

              }

              #adminStudents {

                font-size: 20px;

                color: white;

                font-weight:normal;

              }

 

              #logout {

                font-size: 20px;

                color: white;

              }

              h3{

                color:white;

              }

 

              .edit-course-button {

                position: fixed;

                bottom: 100px;

                right: 125px;

              }

             

              @media (max-width: 768px) {

                /* Adjust the button position for smaller screens */

                .edit-course-button {

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

 

export default Editcourse;