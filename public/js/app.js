let currentUser;
let users = [];
class User {
    constructor(name, email, age, password, balance, loans, investment, history) {
        this.name = name;
        this.email = email;
        this.age = age;
        this.password = password;
        this.balance = balance;
        this.loans = loans;
        this.investment = investment;
        this.history = history;
    }
}
function validateName(name) {
    let regExp = /^[a-zA-Z/s]*$/
    if (!regExp.test(name) && name.length <= 5 || name === '') {
        name = '';
        return 'Invalid Name';
    } else return 'Valid Name';
}
function validateAge(age) {
    let ageExp = /^[0-9]*$/
    if (!ageExp.test(age) || age.length > 2) {
        age = '';
        return 'Invalid age';
    } else return 'Valid age';
}
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        email = '';
        return 'Invalid email';
    } else return 'Valid email';
}
function validatePassword(password) {
    const passRegex = /[@#\-+*/]/;
    password = password.trim();
    if (password.includes(" ")) {
        return 'Password should not contain spaces.';
    }
    if (password.length < 7) {
        return 'Password should be at least 7 characters long.';
    }
    if (!passRegex.test(password)) {
        return 'Password should contain at least one special character.';
    }
    return 'Valid password';
}
function capitalizeWords(string) {
    return string.split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
}
function signUp() {
    let email;
    let emailValidationResult;
    let nameValidationResult;
    let name;
    let age;
    let ageValidation;
    let password;
    let passwordValidationResult;
    let confirmPassword;
    do {
        name = prompt('Enter your full name: ').trim();
        name = capitalizeWords(name);
        nameValidationResult = validateName(name);
        console.log(nameValidationResult);
        if (name === 'exit') {
            exit();
            return;
        } else if (nameValidationResult !== 'Valid Name') {
            alert('Name should not contain special characters, be less than 5 characters or be empty.');
        }
    } while (nameValidationResult !== 'Valid Name');
    if (nameValidationResult === 'Valid Name') {

        do {
            email = prompt('Enter your email: ').replaceAll(' ', '');
            emailValidationResult = validateEmail(email);
            if (email === 'exit') {
                exit();
                return;
            } else if (emailValidationResult !== 'Valid email') {
                alert('Invalid email.');
            }
        } while (emailValidationResult !== 'Valid email');
        if (emailValidationResult === 'Valid email') {
            if (users.findIndex(e => e.email === email) !== -1) {
                alert('Email already exists, please use a different email or sign-in.');
                start();
            }
            do {
                age = prompt('Enter your age: ');
                ageValidation = validateAge(age);
                if (age === 'exit') {
                    exit();
                    return;
                } else if (ageValidation !== 'Valid age') {
                    alert('Age should be a number and less than 3 digits.');
                }
            } while (ageValidation !== 'Valid age');
            if (ageValidation === 'Valid age') {
                do {
                    password = prompt('Enter a password: ');
                    passwordValidationResult = validatePassword(password);
                    if (password === 'exit') {
                        exit();
                        return;
                    } else if (passwordValidationResult !== 'Valid password') {
                        alert(passwordValidationResult);
                    }
                } while (passwordValidationResult !== 'Valid password');
                if (passwordValidationResult === 'Valid password') {
                    confirmPassword = prompt('Confirm your password: ');
                    if (confirmPassword === 'exit') {
                        exit();
                        return;
                    } else if (confirmPassword !== password) {
                        alert('Passwords do not match. retry sign-up.');
                        signUp();
                    } else {
                        let client = new User(name, email, age, password, 1000, [], [], []);
                        users.push(client);
                        console.table(users);
                        console.table(client);
                        alert('Sign-up successful.');
                    }
                }
            }
        }
    }
}

function start() {
    let choice = ''
    while (choice != 'exit' || choice != 4) {
        choice = prompt('Hello choose an action to do at the bank (1-4): \n 1.sign-up \n 2.sign-in \n 3.reset password \n 4.exit')
        switch (choice) {
            case '1':
                signUp()
                break;
            case '2':
                console.log('1');
                alert('2.')
                break;
            case '3':
                console.log('1');
                alert('3')
                break;
            case '4':
                alert('Thank you for the visit have a great day !.')
                break;
        }
        break;

    }
}
// start()
signUp()