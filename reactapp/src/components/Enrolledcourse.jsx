import React, { useState,useEffect } from 'react'
import './userAcademy.css'
import { Link, Outlet } from 'react-router-dom'
import { FaTrash, FaPencilAlt } from 'react-icons/fa';

function Enrolledcourse(){

    const [admissionData,setAdmissionData] = useState([]);
    const [enroll,setEnroll] = useState(true);
    
    const handleLogout = () =>
    {
        fetch('https://8080-baedadabfababfdabddffdbddfadbecbaeee.project.examly.io/user/logout',
        {method: 'DELETE'})
        .then(res => res.json())
        .then(result => alert(result.value))
    }
    useEffect(()=>
    {
        fetch('https://8080-baedadabfababfdabddffdbddfadbecbaeee.project.examly.io/user/viewAdmission')
        .then(response => response.json())
        .then((result) => 
        {
            setAdmissionData(result.value)
            var l=result.value.length
            if(l==0)
                setEnroll(false)
        });
    },[]);
    
    const handleEnroll=()=>
    {
        var l=admissionData.length;
        if(l==0)
            setEnroll(true);
    }
    
    const handleDelete = (admissionId) => {
        fetch(`https://8080-baedadabfababfdabddffdbddfadbecbaeee.project.examly.io/user/deleteAdmission/${admissionId}`,
        {method: 'DELETE'})
        .then((response) => response.json())
        .then((data) => {
            alert('Admission deleted successfully:', data);
            window.location.reload();
        })
        .catch((error) => {
            console.error('Error:', error);
        });
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
                            <Link class="nav-link" to="/institutes" id="userAcademy">Academy </Link>
                        </li>
                        <li class="nav-item">
                            <Link class="nav-link" to="/enrolledcourses" id="userEnrolledCourse" style={{fontSize: '30px'}}>Enrolled Course</Link>
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
            {handleEnroll}
            <div style={{backgroundColor: 'rgb(162,162,162)',padding:'10px'}}>
            {enroll? admissionData.map( d =>
            <div key={d.admissionId} id="enrolledCourses" class="card" style={{width: "25rem", margin: '50px',backgroundColor: 'rgb(225, 222, 222)', padding: "10px"}}>
                    <div class="card-body enroll-course">
                    <label>Course name:</label> <span> {d.course_name}</span><br/>
                    <label>Joined date:</label> <span> {d.startDate}</span><br/>
                    <label>Course end date:</label> <span>{d.endDate}</span><br/><br/>
                    <button className="btn" onClick={() => handleDelete(d.admissionId)}>
                        <FaTrash />
                    </button>
                    <Link to={`/editAdmission/${d.studentId}`} className="btn">
                        <FaPencilAlt />
                    </Link>
                    <a href="#" class="btn btn-danger" style={{float:'right'}}>My learning</a>
                </div>
            </div>
            ):<div className='text-center'><h3 style={{color:'white'}}>No Active Courses Avalaible</h3>
            <Link to="/institutes" className='btn btn-primary'>Enroll Now</Link></div>}
            </div>

        </div>
    )
}

export default Enrolledcourse

