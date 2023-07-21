import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation} from 'react-router-dom';
import { Button, Col, Form } from "react-bootstrap";
import './userAcademy.css'

function Courses() {
  const [courses, setCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [login, setLogin] = useState(false);
  const location=useLocation();
  const handleLogout = () =>
  {
    fetch('https://8080-aaccecedbccaaccabfdabddffdbddfadbecbaeee.project.examly.io/user/logout',
    {method: 'DELETE'})
    .then(res => res.json())
    .then(result => alert(result.value))
  }

    const handleSearch = (event) => {
        event.preventDefault();
        const filteredData = courses.filter((item) =>
        item.courseName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setCourses(courses);
        if (filteredData.length === 0) {
        alert('No results found.');
        window.location.reload();
        }
    };

  useEffect(() => {
    const id=location.state.id;
    fetch('https://8080-aaccecedbccaaccabfdabddffdbddfadbecbaeee.project.examly.io/user/viewStatus?id='+id)
      .then((response) => response.json())
      .then((data) => {
          setCourses(data.value);
          if(data.login)
          {
            setLogin(true);
          }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light" id="userNavbar">
                <Link class="navbar-brand" to='/institutes'>Abacus academy</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item active">
                            <Link class="nav-link" to="/institutes" id="userAcademy" style={{fontSize: '30px'}}>Academy </Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/enrolledcourses" id="userEnrolledCourse">Enrolled Course</Link>
                        </li>
                    </ul>
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <Link to="/" class="nav-link" id='logout' onClick={handleLogout}>Logout</Link>
                        </li>
                    </ul>    
                </div>
                <Outlet />
            </nav><br/><br/><br/>

            <div class="row justify-content-center">
            <Col sm={4}>
            <Form className="d-flex justify-content-center">
                <Form.Control
                type="search"
                placeholder="Type here to search academy"
                className="me-3"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button id="searchCourse" onClick={handleSearch}>
                Search
                </Button>
            </Form>
            </Col>
            </div>

      <br/>
      <div className="container">
        {courses.map((course) => (
          <div className="card mb-3" key={course.courseId} id={"userCourseGrid"+course.courseId} style={{padding:"5px"}}>
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
                        <span>{course.courseDuration + " months"}</span>
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
            {login?
              course.status ? 
              <Link className="btn btn-success float-end" to='/enrolledcourses'>
                  Enrolled
              </Link>:
              <Link className="btn btn-success float-end" to='/studentform' state={{id:course.courseId}}>
                  Enroll Course
              </Link>:
              <Link className="btn btn-success float-end" to='/'>
                  Enroll Course
              </Link>
            }
            </div>
          </div>
        ))}
      </div>

      
    </div>
  );
}
export default Courses;
