function validation(values){
    let error = {}
    const email_parttern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_parttern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    if(values.email === ''){
      error.email = "Email should not be empty";
    } else if(!email_parttern.test(values.email)) {
      error.email = "Email don't metch";
    } else {
      error.email = ""
    }
  
    if(values.password === ''){
      error.password = "Password should not be empty";
    }  else{
      error.password = ''
    }
    return error;
  }

  export default validation;