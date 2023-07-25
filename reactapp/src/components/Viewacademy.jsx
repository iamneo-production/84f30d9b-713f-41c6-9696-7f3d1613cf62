import React from 'react'
import './userAcademy.css'
import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom'
import { Col, Button, Form} from "react-bootstrap";
  
function Viewacademy(){
    const [academydata,setAcademyData]=useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetch('https://8080-aaccecedbccaaccabfdabddffdbddfadbecbaeee.project.examly.io/user/viewInstitutes')
        .then(res=>res.json())
        .then(data=>setAcademyData(data.value));
    },[]);

    const handleLogout = () =>
    {
        fetch('https://8080-aaccecedbccaaccabfdabddffdbddfadbecbaeee.project.examly.io/user/logout',
        {method: 'DELETE'})
        .then(res => res.json())
        .then(result => alert(result.value))
    }

    const handleSearch = (event) => {
        event.preventDefault();
        const filteredData = academydata.filter((item) =>
          item.instituteName.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setAcademyData(filteredData);
        if (filteredData.length === 0) {
          alert('No results found.');
          window.location.reload();
        }
    };

    
    return(
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
            </nav>
            <br/>
            <br/><br/>

            <div className="row justify-content-center">
            <Col sm={4}>
            <Form className='d-flex justify-content-center'>
            <Form.Control
            type="search"
            className="me-3"
            placeholder="Type here to search academy"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button id="searchButton" onClick={handleSearch}>
                Search
            </Button>
            </Form>
            </Col>
            </div>
            <br></br>
            <div className='container'>
            <div className='row'>
                {academydata.map((q, k) => (
                    <div className='col-md-4' key={k}>
                        <Link id= {'userAcademyGrid'+q.instituteId} to={'/courses'} state={{id: q.instituteId}} style={{textDecoration:'none'}}>
                        <div className="card mb-3">
                            <img
                                src={q.photoFileName}
                                className="card-img-top"
                                alt="Invalid url"
                                style={{ height: '200px' }}
                            />
                            <div className="card-body">
                            <center><h4 center className="card-title" style={{ marginBottom: '5px' }}>
                            {q.instituteName}
                            </h4>
                            </center>
                            <p className="card-text" style={{ marginBottom: '5px' }}>
                            <label>Contact:</label><span>{q.mobile}</span><br/>
                            <label>Email:</label><span>{q.email}</span><br/>
                            <label>Location:</label><span>{q.instituteAddress}</span>
                            </p>
                            </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            </div>
        </div>
    )
}

export default Viewacademy;

