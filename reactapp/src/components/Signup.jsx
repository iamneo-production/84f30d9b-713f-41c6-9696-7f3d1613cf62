import React, {useState} from "react";
import SignupAuth from './Auth';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './Signup.css'

function Signup(){

    const [values, setValues] = useState({
        email: '',
        password: '',
        username:'',
        mobileNumber:'',
        userRole:'',
        confirmPassword:''

    })

    const[eye,seteye]=useState(true);
    const[password,setpassword]=useState("password");
    const[type,settype]=useState(false);

    const[ceye,setceye]=useState(true);
    const[cpassword,setcpassword]=useState("password");
    const[ctype,setctype]=useState(false);

    const navigate = useNavigate()

    const [errors, setError] = useState('')

    const handleInput = (event)=> {
        setValues(prev => ({...prev,[event.target.name]: [event.target.value]}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(SignupAuth(values));
        if(errors.email === "" && errors.password === "" && errors.username === ""  && errors.mobileNumber === "" && errors.userRole === ""){
            fetch('https://8080-dfffaaaaabccbabfdabddffdbddfadbecbaeee.project.examly.io/user/signup',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    username: String(values.username),
                    email: String(values.email),
                    mobileNumber: String(values.mobileNumber),
                    password: String(values.password),
                    userRole: String(values.userRole)
                })
            })
            .then(res=>res.json())
            .then((result)=>{
                if(result.value){
                alert(result.message);
                navigate('/');}
                else
                {
                    document.getElementById('ch').innerHTML="Already a registered user";
                }
            },(error)=>{
                alert(error);
            })
        }
    }
    const Eye=()=>{
        if(password=="password"){
            setpassword("text");
            seteye(false);
            settype(true);
        }
        else{
            setpassword("password");
            seteye(true);
            settype(false);
        }
    }

    const CEye=()=>{
        if(cpassword=="password"){
            setcpassword("text");
            setceye(false);
            setctype(true);
        }
        else{
            setcpassword("password");
            setceye(true);
            setctype(false);
        }
    }

    return(
        <>
        <div className='d-flex justify-content-center align-items-center p-4 w-100 signupHead'>
        <strong>Register</strong>
        </div>
        <br/>
        <div className='d-flex justify-content-center align-items-center vh-90 SignupPage'>
                <div className='p-1 rounded w-25 signupForm'>
                    <form onSubmit={handleSubmit}>
                        <div className='mb-3'>
                            <span id='ch' className='text-danger'></span>
                            <select className="form-control rounded-0" name ="userRole" id="admin/user" placeholder='Enter admin/user' value={values.userRole}
                            onChange={handleInput}>
                                <option value=''>Enter admin/user</option>
                                <option value="admin">Admin</option>
                                <option value="user">user</option>
                            </select>
                            {errors.userRole && <span className='text-danger'>{errors.userRole}</span>}
                        </div>
                        <div className='mb-3'>
                            <input type="email" id="email" placeholder='Enter Email' name='email'
                            onChange={handleInput} className='form-control rounded-0' autoComplete='off' value={values.email}/>
                            {errors.email && <span className='text-danger'>{errors.email}</span>}
                        </div>
                        <div className='mb-3'>
                            <input type="text" id="username" placeholder='Enter Username' name='username'
                            onChange={handleInput} className='form-control rounded-0' autoComplete='off' value={values.username}/>
                            {errors.username && <span className='text-danger'>{errors.username}</span>}
                        </div>
                        <div className='mb-3'>
                            <input type="text" id="mobileNumber" placeholder='Enter Mobilenumber' name='mobileNumber'
                            onChange={handleInput} className='form-control rounded-0' autoComplete='off' value={values.mobileNumber}/>
                            {errors.mobileNumber && <span className='text-danger'>{errors.mobileNumber}</span>}
                        </div>
                        <div className='mb-3'>
                            <input type={password} id="password" placeholder='Password' name='password'
                            onChange={handleInput} className={`form-control rounded-0 ${type ? "type_password" : "" }`} value={values.password}/>
                            <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye" } `} style={{float:'right',marginTop:'5px',marginBottom:'5px'}}></i>
                            {errors.password && <span className='text-danger'>{errors.password}</span>}
                        </div>
                        <div className='mb-3'>
                            <input type={cpassword} id="confirmPassword" placeholder='Confirm Password' name='confirmPassword'
                            onChange={handleInput} className={`form-control rounded-0 ${ctype ? "type_password" : "" }`} value={values.confirmPassword}/>
                            <i onClick={CEye} className={`fa ${ceye ? "fa-eye-slash" : "fa-eye" } `} style={{float:'right',marginTop:'5px',marginBottom:'5px'}}></i>
                            {errors.confirmPassword && <span className='text-danger'>{errors.confirmPassword}</span>}
                        </div>
                        <div>
                            <div className='col'>
                                <button type='submit' id="submitButton" className='btn btn-success w-100 rounded-0'> Submit</button>
                            </div>
                            <div className='d-flex justify-content-center'>
                               <p>Already an user? <Link style={{textDecoration: 'none'}} to='/' type="button" id='signinLink'> Login </Link></p>
                            </div>
                            <Outlet/>
                        </div> 
                    </form>
                </div>
        </div>
    </>
    )
}

export default Signup