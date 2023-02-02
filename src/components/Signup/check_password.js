function check_password(new_password) {
    const text = []
    //lowercase
    if (! new_password.match(/[a-z]/g)) {
        text.push("Password must contain atleast one lowercase letter");
    }
    //uppercase
    if (! new_password.match(/[A-Z]/g)) {
        text.push("Password must contain atleast one uppercase letter")
    }
    //number
    if (! new_password.match(/[0-9]/g)) {
        text.push("Password must contain atleast one number")
    }
    //special character
    if (! new_password.match(/[!,@,#,$,%,^,&,*]/g)) {
        text.push("Password must contain atleast one special character(!,@,#,$,%,^,&,*)")
    }
    //length
    if (new_password.length < 8) {
        text.push("Password must be atleast 8 characters long")
    }
    return text
}

export default check_password