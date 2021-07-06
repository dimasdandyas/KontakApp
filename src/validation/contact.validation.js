const validateContact = (firstName, lastName, age, photo) => {
    if (firstName.length == 0) {
        return "First Name cannot be empty!"
    } else if (firstName.length <= 2) {
        return "First Name cannot be less than 3 characters"
    } else if (firstName.length > 30) {
        return "First Name cannot be more than 30 characters"
    } else if (lastName.length == 0) {
        return "Last Name cannot be empty!"
    } else if (lastName.length <= 2) {
        return "Last Name cannot be less than 3 characters"
    } else if (lastName.length > 30) {
        return "Last Name cannot be more than 30 characters"
    } else if (age.length == 0) {
        return "Age cannot be empty!"
    } else if (parseInt(age) > 100) {
        return "Age cannot be more than 100 years old"
    } else if (photo == '') {
        return "Select your image before!"
    } else {
        return ''
    }
}

export { validateContact }
