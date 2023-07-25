
import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';

import { FaTrash, FaPencilAlt } from 'react-icons/fa';

function Admincourse() {

  const [courses, setCourses] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');

 

  const handleLogout = () =>

    {

        fetch('https://8080-dfffaaaaabccbabfdabddffdbddfadbecbaeee.project.examly.io/user/logout',

        {method: 'DELETE'})

        .then(res => res.json())

        .then(result => alert(result.value))

    }

 

  useEffect(() => {

    fetch('https://8080-dfffaaaaabccbabfdabddffdbddfadbecbaeee.project.examly.io/admin/viewCourse')

      .then((response) => response.json())

      .then((data) => {

        if (data.success) {

          setCourses(data.courses);

        } else {

          console.error(data.message);

        }

      })

      .catch((error) => {

        console.error('Error:', error);

      });

  }, []);

 

  const handleDelete = (courseId) => {

    fetch(`https://8080-dfffaaaaabccbabfdabddffdbddfadbecbaeee.project.examly.io/admin/deleteCourse/${courseId}`, {

      method: 'DELETE',

    })

      .then((response) => response.json())

      .then((data) => {

        // Update course

        alert('Course deleted successfully:', data);

        window.location.reload();

      })

      .catch((error) => {

        console.error('Error:', error);

      });

  };

  const searchCourse = (event) => {

    event.preventDefault();

    const filteredData = courses.filter((item) =>

      item.courseName.toLowerCase().includes(searchQuery.toLowerCase())

    );

    setCourses(filteredData);

    if (filteredData.length === 0) {

      alert('No results found.');

      window.location.reload();

    }

  };

  return (

    <div>

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

      </nav><br/><br/><br/>

 

      <div className="search-bar">

        <input type="text" className="form-control form-control-sm" placeholder="Type here to search courses"

        value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}/>

        <button className="btn btn-primary btn-sm" id="searchCourse" onClick={searchCourse}>

          Search

        </button>

      </div>




<br/>

      <div className="container">

        {courses.map((course) => (

          <div className="card mb-3" key={course.courseId}>

            <div className="card-body">

              <div className="row">

               

                <div className="col-md-10">

                  <div className="row">

                    <div className="col-md-6">

                      <div className="course-info">

                        <label>Course Name:</label>

                        <span>{course.courseName}</span>

                      </div>

                      <div className="course-info">

                        <label>Course Duration:</label>

                        <span>{course.courseDuration}</span>

                      </div>

                      <div className="course-info">

                        <label>Course Timing:</label>

                        <span>{course.courseTiming}</span>

                      </div>

                    </div>

                    <div className="col-md-6">

                      <div className="course-info">

                        <label>Enrolled:</label>

                        <span>{course.studentsEnrolled}</span>

                      </div>

                      <div className="course-info">

                        <label>Description:</label>

                        <span>{course.courseDescription}</span>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div className="card-actions">

              <button className="btn" onClick={() => handleDelete(course.courseId)}>

                <FaTrash />

              </button>

              <Link to={`/editCourse/${course.courseId}`} className="btn">

                <FaPencilAlt />

              </Link>

            </div>

          </div>

        ))}

      </div>

 

      <div className="add-course-button">

        <Link

          to="/addCourse"

          className="btn btn-primary btn-lg d-block d-lg-inline-block"

          id="addCourse"

        >

          Add Course

        </Link>

      </div>

 

      <style>

        {`

        .card{

          max-width:1050px;

        }

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

        body {

          background: #797979;

        }

        .search-bar {

          display: flex;

          align-items: center;

          justify-content: center;

          margin-top: 20px;

        }

        .search-bar input {

         width:220px;

         margin-right:10px;

        }

        .card {

          border: 1px solid #ddd;

          border-radius: 4px;

          margin-bottom: 20px;

          position: relative;

        }

        .card-body {

          padding: 20px;

        }

        .card-actions {

          position: absolute;

          bottom: 10px;

          right: 10px;

        }

        .card-actions button {

          background-color: transparent;

          border: none;

          outline: none;

          cursor: pointer;

        }

        .course-info {

          margin-bottom: 10px;

        }

        .course-info label {

          font-weight: bold;

          margin-right: 5px;

        }

        .add-course-button {

          position: fixed;

          bottom: 40px;

          right: 40px;

        }

        `}

      </style>

    </div>

  );

}

 

export default Admincourse;