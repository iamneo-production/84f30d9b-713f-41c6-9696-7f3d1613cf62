export default function studentVal(values) {
    let error = {}
    const email_pattern =  /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/
    const mobilenumber_pattern = /^[0-9]{10}$/
  
    if (!values.emailId) {
      error.email = "Email should not be empty";
    } else if (!email_pattern.test(values.emailId)) {
      error.email = "Invalid email format";
    } else {
        error.email= "";
    }
  
    if (!values.phoneNumber1) {
      error.phoneNumber1 = "Mobile Number should not be empty";
    } else if (!mobilenumber_pattern.test(values.phoneNumber1)) {
      error.phoneNumber1 = "Invalid Mobile Number format";
    } else {
        error.phoneNumber1="";
    }

    if(values.phoneNumber2!="")
    {
        if(!mobilenumber_pattern.test(values.phoneNumber2))
        {
            error.phoneNumber2="Invalid Mobile Number format";
        }
        else
        {
            error.phoneNumber2="";
        }
    }
    else
    {
        error.phoneNumber2="";
    }

    return error;
  }
  export function AcademyCourseVal(values){
    let error = {}
    const email_pattern =  /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/
    const mobilenumber_pattern = /^[0-9]{10}$/

    if (!values.email) {
        error.email = "Email should not be empty";
      } else if (!email_pattern.test(values.email)) {
        error.email = "Invalid email format";
      } else {
          error.email= "";
      }
    
      if (!values.mobile) {
        error.phoneNumber1 = "Mobile Number should not be empty";
      } else if (!mobilenumber_pattern.test(values.mobile)) {
        error.phoneNumber1 = "Invalid Mobile Number format";
      } else {
          error.mobileNumber="";
      }

    return error;
}
