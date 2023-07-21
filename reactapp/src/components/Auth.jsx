export default function SignupAuth(values) {
    let error = {}
    const email_pattern =  /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/
    const password_pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/
    const username_pattern = /^[a-zA-Z0-9]{3,}$/ //alpha numeric character
    const mobilenumber_pattern = /^[0-9]{10}$/
  
    if (!values.email) {
      error.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
      error.email = "Invalid email format";
    } else {
        error.email= "";
    }
  
    if (!values.password) {
      error.password = "Password should not be empty";
    } else if (!password_pattern.test(values.password)) {
      error.password ="password should contain atleast 8 characters, atleast one uppercase letter, one lowercase letter, one number and one special charater";
    } else {
        error.password="";
    }
  
    if (!values.confirmPassword) {
      error.confirmPassword = "Confirm Password should not be empty";
    } else if (String(values.confirmPassword) !== String(values.password)) {
      error.confirmPassword = "Confirm Password didn't match";
    } else {
        error.confirmPassword = "";
    }
  
    if (!values.username) {
      error.username = "Username should not be empty";
    } else if (!username_pattern.test(values.username)) {
      error.username =
        "Username must be at least 3 characters long and can only contain alphanumeric characters";
    } else {
        error.username="";
    }
  
    if (!values.mobileNumber) {
      error.mobileNumber = "Mobile Number should not be empty";
    } else if (!mobilenumber_pattern.test(values.mobileNumber)) {
      error.mobileNumber = "Invalid Mobile Number format";
    } else {
        error.mobileNumber="";
    }
  
    if (values.userRole == "") {
      error.userRole = "admin/user should be selected";
    } else {
        error.userRole = "";
    }
  
    return error;
  }
  export function LoginAuth(values){
    let error = {}
    //const password_pattern = /^[a-zA-Z0-9]{2,}$/
    //const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.email === "") {
        error.email="Email should not be empty"
    }
     else {
        error.email=""
    }

    if(values.password === ""){
        error.password = "Password should not be empty"
    }
    else {
        error.password=""
    }

    return error;
}
