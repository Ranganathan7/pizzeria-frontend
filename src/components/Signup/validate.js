function validate(name, email, password1, password2, passwordFeedback, emailFeedback) {
    if (name.length > 0 && email.length > 0 && password1.length > 0 && password2.length > 0) {
        if (password1.localeCompare(password2) === 0 && passwordFeedback.length === 0 && emailFeedback.length === 0) {
            return true
        }
        else return false
    }
    else return false
}

export default validate