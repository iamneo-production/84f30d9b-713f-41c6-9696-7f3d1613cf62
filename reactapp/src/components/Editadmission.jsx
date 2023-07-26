import React from 'react'
import './userAcademy.css'
import { Link, Outlet, useNavigate, useParams} from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuthenticationUser } from './UseAuthentication'
import studentVal from './Validations'

function Editadmission(){
    useAuthenticationUser();
    const navigate=useNavigate();
    const { id } = useParams();
    const [student, setStudent] = useState({
      firstName: '',
      lastName: '',
      gender: '',
      fatherName: '',
      motherName: '',
      emailId: '',
      phoneNumber1: '',
      phoneNumber2: '',
      age: 0,
      houseNo: '',
      streetName: '',
      areaName: '',
      state: '',
      pincode: 0,
      nationality: '',
    });
    const [error,setError]= useState('');

    useEffect(() => {
        fetch(`https://8080-ffbaaaeececadacafaabfdabddffdbddfadbecbaeee.project.examly.io/user/getAdmission/${id}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.success) {
              setStudent(data.student);
            } else {
              console.error(data.message);
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }, [id]);

    const handleLogout = () =>
    {
        fetch('https://8080-ffbaaaeececadacafaabfdabddffdbddfadbecbaeee.project.examly.io/user/logout',
        {method: 'DELETE'})
        .then(res => res.json())
       .then(result => {alert(result.value)
        localStorage.clear();            
})
    }
    const handleUpdate = () => {
        const updatedStudent = {
           firstName: student.firstName,
           phoneNumber1: student.phoneNumber1,
           lastName: student.lastName,
           gender: student.gender,
           fatherName: student.fatherName,
           motherName: student.motherName,
           emailId: student.emailId,
           phoneNumber2: student.phoneNumber2,
           age: student.age,
           houseNo: student.houseNo,
           streetName: student.streetName,
           areaName: student.areaName,
           state: student.state,
           pincode: student.pincode,
           nationality: student.nationality,
         };
         console.log(updatedStudent);
         const isFormValid = Object.values(updatedStudent).every((value) => value.toString().trim() !== '');
         if (!isFormValid) {
           alert('Please fill in all the fields.');
           return;
         }
        setError(studentVal(updatedStudent))
        if(error.email === "" && error.phoneNumber1 === "" && error.phoneNumber2 === ""){
         fetch(`https://8080-ffbaaaeececadacafaabfdabddffdbddfadbecbaeee.project.examly.io/user/editAdmission/${id}`, {
           method: 'PUT',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(updatedStudent),
         })
           .then((response) => response.json())
           .then((data) => { if(data.success){
             alert('Details updated successfully:', data);
             navigate('/enrolledcourses');
           }
           else{
            alert(data.message);
           }
           })
           .catch((error) => {
             console.error('Error:', error);
           });
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
                <div class="container" id="studentForm">
                    <div class="row">
                        <div class="col">
                            <input type="text" id="firstName" placeholder='enter your first name' name='firstName' 
                            value={student.firstName} className='form-control rounded-0 c1' autoComplete='off' onChange={(e) =>
                                setStudent((prev) => ({
                                    ...prev,
                                    firstName: e.target.value,
                                }))}/>
                        </div>
                        <div class="col">
                            <input type="text" id="lastName" placeholder='enter your last name' name='lastName' 
                            value={student.lastName} className='form-control rounded-0 c1' autoComplete='off' onChange={(e) =>
                                setStudent((prev) => ({
                                    ...prev,
                                    lastName: e.target.value,
                                }))}/>
                        </div>
                        <div class="col">
                            <input type="text" id="male/female" placeholder='enter male or female' name='gender' 
                            value={student.gender} className='form-control rounded-0 c1' autoComplete='off' onChange={(e) =>
                                setStudent((prev) => ({
                                    ...prev,
                                    gender: e.target.value,
                                }))} />
                        </div>
                    </div>
                    <br/>
                    <div class="row">
                        <div class="col">
                        <input type="text" id="fatherName" placeholder='enter your father name' name='fatherName' 
                            value={student.fatherName} className='form-control rounded-0 c1' autoComplete='off' onChange={(e) =>
                                setStudent((prev) => ({
                                    ...prev,
                                    fatherName: e.target.value,
                                }))}/>
                        </div>
                        <div class="col">
                            <input type="text" id="phoneNumber1" placeholder='enter phone number' name='phoneNumber1' 
                            value={student.phoneNumber1} className='form-control rounded-0 c1' autoComplete='off' onChange={(e) =>
                                setStudent((prev) => ({
                                    ...prev,
                                    phoneNumber1: e.target.value,
                                }))}/>
                            {error.phoneNumber1 && <span className='text-danger'>{error.phoneNumber1}</span>}
                        </div>
                        <div class="col">
                            <input type="text" id="phoneNumber2" placeholder='enter alternate number' name='phoneNumber2' 
                            value={student.phoneNumber2} className='form-control rounded-0 c1' autoComplete='off' onChange={(e) =>
                                setStudent((prev) => ({
                                    ...prev,
                                    phoneNumber2: e.target.value,
                                }))}/>
                            {error.phoneNumber2 && <span className='text-danger'>{error.phoneNumber2}</span>}
                        </div>
                    </div>
                    <br/>
                    <div class="row">
                        <div class="col-4">
                            <input type="text" id="motherName" placeholder='enter your mother name' name='motherName' 
                            value={student.motherName} className='form-control rounded-0 c1' autoComplete='off' onChange={(e) =>
                                setStudent((prev) => ({
                                    ...prev,
                                    motherName: e.target.value,
                                }))}/><br/>
                            <input type="email" id="emailId" placeholder='enter email Id' name='emailId' 
                            value={student.emailId} className='form-control rounded-0 c1' autoComplete='off' onChange={(e) =>
                                setStudent((prev) => ({
                                    ...prev,
                                    emailId: e.target.value,
                                }))} readOnly/><br/>
                            {error.email && <span className='text-danger'>{error.email}</span>}
                            <input type="number" id="age" placeholder='enter your age' name='age' 
                            value={student.age} className='form-control rounded-0 c1' autoComplete='off' onChange={(e) =>
                                setStudent((prev) => ({
                                    ...prev,
                                    age: e.target.value,
                                }))}/>
                        </div>
                        <div class="col-8" id="address">
                            <h6>Address information</h6>
                            <div className='form-group row'>
                                <label class="col-2 col-form-label">House No : </label> 
                                <div class="col-4">
                                    <input type="text" id="houseNo" name="houseNo" value={student.houseNo} className='form-control' autoComplete='off' onChange={(e) =>
                                    setStudent((prev) => ({
                                    ...prev,
                                    houseNo: e.target.value,
                                }))}/>
                            </div>
                            </div>
                            <div className='form-group row'>
                                <label class="col-2 col-form-label">Street Name : </label> 
                                <div class="col-4">
                                <input type="text" id="streeName" name="streetName" value={student.streetName} className='form-control' autoComplete='off' onChange={(e) =>
                                setStudent((prev) => ({
                                    ...prev,
                                    streetName: e.target.value,
                                }))}/>
                                </div>
                            </div>
                            <div className='form-group row'>
                                <label class="col-2 col-form-label">Area Name : </label>
                                <div class="col-4">
                                    <input type="text" id="areaName" name="areaName" value={student.areaName} className='form-control' autoComplete='off' onChange={(e) =>
                                    setStudent((prev) => ({
                                    ...prev,
                                    areaName: e.target.value,
                                }))}/>
                                </div>
                                <label class="col-2 col-form-label">Pincode : </label>
                                <div class="col-4">
                                    <input type="number" id="pincode" name="pincode" value={student.pincode} className='form-control' autoComplete='off' onChange={(e) =>
                                    setStudent((prev) => ({
                                    ...prev,
                                    pincode: e.target.value,
                                }))}/>
                                </div>
                            </div>
                            <div className='form-group row'>
                                <label class="col-2 col-form-label">State : </label>
                                <div class="col-4">
                                    <input type="text" id="state" name="state" value={student.state} className='form-control' autoComplete='off'onChange={(e) =>
                                    setStudent((prev) => ({
                                    ...prev,
                                    state: e.target.value,
                                }))}/>
                                </div>
                                <label class="col-2 col-form-label">Nationality : </label>
                                <div class="col-4">
                                    <input type="text" id="nationality" name="nationality" value={student.nationality} className='form-control' autoComplete='off' onChange={(e) =>
                                    setStudent((prev) => ({
                                    ...prev,
                                    nationality: e.target.value,
                                }))}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <br/>
                    <button id="updateAdmission"  className='btn btn-success rounded-pill' onClick={handleUpdate} style={{float:'right'}}>Update</button>
                </div>
        </div>
    )
}
export default Editadmission
