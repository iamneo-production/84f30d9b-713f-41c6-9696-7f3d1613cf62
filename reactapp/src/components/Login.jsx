import React,{useState} from 'react';
import { Link, Outlet,useNavigate} from 'react-router-dom';
import LoginAuth from './Auth';
import './Login.css'

function Login() {

    const [values, setValues] = useState({
        email: '',
        password: ''
    })

    const[eye,seteye]=useState(true);
    const[password,setpassword]=useState("password");
    const[type,settype]=useState(false);

    const navigate = useNavigate()

    const [errors, setError] = useState('')
    const [invalid,setInvalid]=useState('')

    const handleInput = (event)=> {
        setValues(prev => ({...prev,[event.target.name]:event.target.value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(LoginAuth(values));
        if(errors.email === '' && errors.password === '' ){
            fetch('https://8080-ffbaaaeececadacafaabfdabddffdbddfadbecbaeee.project.examly.io/user/login',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    email: String(values.email),
                    password: String(values.password)
                })
            })
            .then(res=>res.json())
            .then((result)=>{
                if(result.s==="admin"){
                    localStorage.setItem('admin',values.email);
                    localStorage.setItem('authenticatedUser',false);
                    localStorage.setItem('authenticatedAdmin',true);
                    navigate('/Academy');
                }
                else if(result.s==="user")
                {
                    localStorage.setItem('user',values.email);
                    localStorage.setItem('authenticatedUser',true);
                    localStorage.setItem('authenticatedAdmin',false);
                    navigate("/institutes");
                }
                else if(result.s===false)
                    setInvalid("Invalid Username/Password");
            },(error)=>{
                alert('Failed');
            })
        }
    };

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

    return (
    <>
        <div  className='d-flex justify-content-center align-items-center p-4 w-100 loginHead'>
        <strong>Login</strong>
        </div>
        <br/>
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
                <div className='p-4 rounded w-25 loginForm'>
                        <div className='mb-3 input-text'>
                            {invalid && <span className='text-danger'>{invalid}</span>}
                            <input type="text" id="email" placeholder='Enter Email' name='email' value={values.email}
                            onChange={handleInput} className='form-control rounded-0' autoComplete='off'/>
                            {errors.email && <span className='text-danger'>{errors.email}</span>}
                        </div>
                        <div className='mb-3 input-text'>
                            <input type={password} id="password" placeholder='Enter Password' name="password" value={values.password}
                            onChange={handleInput} className={`form-control rounded-0 ${type ? "type_password" : "" }`} />
                            <i onClick={Eye} className={`fa ${eye ? "fa-eye-slash" : "fa-eye" } fa-lg`} style={{float:'right',marginTop:'5px'}}></i>
                            {errors.password && <span className='text-danger'>{errors.password}</span>}
                        </div>
                        <div className='row'>
                            <div className='col-4'>
                                <button id="loginButton" className='btn btn-success w-100 rounded-0' onClick={handleSubmit}> Login</button>
                            </div>
                            <div className='col-8'>
                                <div className="mt-1 text-center">
                                    <p>New User/admin? <Link style={{textDecoration: 'none'}} to='/signup' type="button" id='signupLink' > Sign Up </Link></p>
                                </div>
                            </div>
                            <Outlet/>
                        </div>
                </div>
        </div>
    </>
    )
  }
  
export default Login;
