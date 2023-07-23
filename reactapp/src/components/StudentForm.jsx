import React from 'react'
import './userAcademy.css'
import { Link, Outlet, useLocation, useNavigate} from 'react-router-dom'
import { useState } from 'react'

function StudentForm(){
    const [student,setStudent]=useState({
        firstName: '',
        lastName: '',
        gender: '',
        fatherName: '',
        phoneNumber1: '',
        phoneNumber2: '',
        mothetName: '',
        emailId: '',
        age: 0,
        houseNo: '',
        streetName: '',
        areaName: '',
        pincode: 0,
        state: '',
        nationality: ''
    })

    const location = useLocation()

    const navigate = useNavigate()

    const handleInput = (event)=> {
        setStudent(prev => ({...prev,[event.target.name]: [event.target.value]}))
    }
    const handleLogout = () =>
    {
        fetch('https://8080-aaccecedbccaaccabfdabddffdbddfadbecbaeee.project.examly.io/user/logout',
        {method: 'DELETE'})
        .then(res => res.json())
        .then(result => alert(result.value))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!student.firstName ||  !student.phoneNumber1 || !student.lastName || !student.gender || !student.fatherName || !student.emailId || 
            !student.phoneNumber2 || !student.age || !student.houseNo || !student.streetName || !student.areaName || !student.state || !student.motherName ||
            !student.pincode || !student.nationality) {
          alert('Please fill in all the fields.');
          return;
        }
        const id = location.state.id;
            fetch('https://8080-aaccecedbccaaccabfdabddffdbddfadbecbaeee.project.examly.io/user/addAdmission/'+id,{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    firstName: String(student.firstName),
                    lastName: String(student.lastName),
                    gender: String(student.gender),
                    fatherName: String(student.fatherName),
                    phoneNumber1: String(student.phoneNumber1),
                    phoneNumber2: String(student.phoneNumber2),
                    motherName: String(student.motherName),
                    emailId: String(student.emailId),
                    age: Number(student.age),
                    houseNo: String(student.houseNo),
                    streetName: String(student.streetName),
                    areaName: String(student.areaName),
                    pincode: Number(student.pincode),
                    state: String(student.state),
                    nationality: String(student.nationality)
                })
            })
            .then(res=>res.json())
            .then((result)=>{
                if(!result.value){
                    alert(result.message)
                }
                else
                {
                    alert(result.message);
                    navigate('/enrolledcourses');
                }
                }
                ,(error)=>{
                alert(error);
            })
    }

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
                            <Link class="nav-link" to="/enrolledcourses" id="userEnrolledCourse" >Enrolled Course</Link>
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
            <form id="studentForm" onSubmit={handleSubmit}>
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <input type="text" id="firstName" placeholder='enter your first name' name='firstName' 
                            onChange={handleInput} className='form-control rounded-0 c1' autoComplete='off' />
                        </div>
                        <div class="col">
                            <input type="text" id="lastName" placeholder='enter your last name' name='lastName' 
                            onChange={handleInput} className='form-control rounded-0 c1' autoComplete='off' />
                        </div>
                        <div class="col">
                            <input type="text" id="male/female" placeholder='enter male or female' name='gender' 
                            onChange={handleInput} className='form-control rounded-0 c1' autoComplete='off' />
                        </div>
                    </div>
                    <br/>
                    <div class="row">
                        <div class="col">
                            <input type="text" id="fatherName" placeholder='enter your father name' name='fatherName' 
                            onChange={handleInput} className='form-control rounded-0 c1' autoComplete='off' />
                        </div>
                        <div class="col">
                            <input type="text" id="phoneNumber1" placeholder='enter phone number' name='phoneNumber1' 
                            onChange={handleInput} className='form-control rounded-0 c1' autoComplete='off' />
                        </div>
                        <div class="col">
                            <input type="text" id="phoneNumber2" placeholder='enter alternate number' name='phoneNumber2' 
                            onChange={handleInput} className='form-control rounded-0 c1' autoComplete='off' />
                        </div>
                    </div>
                    <br/>
                    <div class="row">
                        <div class="col-4">
                            <input type="text" id="motherName" placeholder='enter your mother name' name='motherName' 
                            onChange={handleInput} className='form-control rounded-0 c1' autoComplete='off' /><br/>
                            <input type="email" id="emailId" placeholder='enter email Id' name='emailId' 
                            onChange={handleInput} className='form-control rounded-0 c1' autoComplete='off' /><br/>
                            <input type="number" id="age" placeholder='enter your age' name='age' 
                            onChange={handleInput} className='form-control rounded-0 c1' autoComplete='off' />
                        </div>
                        <div class="col-8" id="address">
                            <h6>Address information</h6>
                            <div className='form-group row'>
                                <label class="col-2 col-form-label">House No : </label> 
                                <div class="col-4">
                                    <input type="text" id="houseNo" name="houseNo" onChange={handleInput} className='form-control' autoComplete='off'/>
                                </div>
                            </div>
                            <div className='form-group row'>
                                <label class="col-2 col-form-label">Street Name : </label> 
                                <div class="col-4">
                                    <input type="text" id="streeName" name="streetName" onChange={handleInput} className='form-control' autoComplete='off'/>
                                </div>
                            </div>
                            <div className='form-group row'>
                                <label class="col-2 col-form-label">Area Name : </label>
                                <div class="col-4">
                                    <input type="text" id="areaName" name="areaName" onChange={handleInput} className='form-control' autoComplete='off'/>
                                </div>
                                <label class="col-2 col-form-label">Pincode : </label>
                                <div class="col-4">
                                    <input type="number" id="pincode" name="pincode" onChange={handleInput} className='form-control' autoComplete='off'/>
                                </div>
                            </div>
                            <div className='form-group row'>
                                <label class="col-2 col-form-label">State : </label>
                                <div class="col-4">
                                    <input type="text" id="state" name="state" onChange={handleInput} className='form-control' autoComplete='off'/>
                                </div>
                                <label class="col-2 col-form-label">Nationality : </label>
                                <div class="col-4">
                                    <input type="text" id="nationality" name="nationality" onChange={handleInput} className='form-control' autoComplete='off'/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <button type='submit' id="enrollNowButton"  className='btn btn-success rounded-pill'>Enroll now</button>
                </div>
            </form>
        </div>
    )
}
export default StudentForm
