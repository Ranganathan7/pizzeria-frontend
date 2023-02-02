function check_email(email){
    const valid = /[a-z]+[a-z0-9.!#$%&'*+/=?^_`]+@+[a-z]+[.]+[a-z]/g
        if (email.toLowerCase().match(valid)) {
            return ""
        }
        else {
            return "Enter a valid Email"
        }
}

export default check_email