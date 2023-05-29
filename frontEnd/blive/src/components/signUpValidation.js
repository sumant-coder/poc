function validation(values) {
    let error = {}

    if (values.name === '') {
        error.name = "Username should not be empty";
    } else {
        error.name = ''
    }
    if (values.email === '') {
        error.email = "Email should not be empty";
    } else {
        error.password = ''
    }
    if (values.password === '') {
        error.password = "Password should not be empty";
    } else {
        error.password = ''
    }
    if (values.contact === '') {
        error.contact = "Contact should not be empty";
    } else {
        error.contact = ''
    }
    return error;
}

export default validation;