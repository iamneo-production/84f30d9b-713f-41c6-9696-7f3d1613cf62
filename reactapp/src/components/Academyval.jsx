export default function AcademyCourseVal(values){
    let error = {}
    const email_pattern =  /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/
    const mobilenumber_pattern = /^[0-9]{10}$/
    
    if ( values.email==="") {
      error.email = "Email should not be empty";
    } else if (!email_pattern.test(values.email)) {
      error.email = "Invalid email format";
    } else {
        error.email= "";
    }
  
    
      if (!values.mobile) {
        error.mobile = "Mobile Number should not be empty";

      } else if (!mobilenumber_pattern.test(values.mobile)) {
        error.mobile = "Invalid Mobile Number format";
      } else {
          error.mobile="";
      }

    return error;
}
