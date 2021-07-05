const validateContact = (firstName, lastName, age, photo) => {

    if (firstName.length == 0) {
        return "First Name cannot be empty!"
    } else if (lastName.length == 0) {
        return "Last Name cannot be empty!"
    } else if (age.length == 0) {
        return "Age cannot be empty!"
    } else if (parseInt(age) > 100) {
        return "Age cannot be more than 100 years old"
    } else if (typeof (photo) === 'undefined') {
        return "Select your image before!"
    } else {
        return ''
    }
}

export default validateContact
