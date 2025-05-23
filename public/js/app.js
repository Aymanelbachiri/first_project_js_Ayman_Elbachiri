let currentUser;
let users = [];
let depositLimit = 1000;
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
function validateAmount(money) {
    let moneyExp = /^[0-9]*$/
    if (!moneyExp.test(money) || money <= 0 || money == '') {
        money = '';
        return 'Invalid amount';
    } else return 'Valid amount';
}
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || email.length <= 10) {
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
            email = prompt('Enter your email: ').toLowerCase().replaceAll(' ', '');
            emailValidationResult = validateEmail(email);
            if (email === 'exit') {
                exit();
                return;
            } else if (emailValidationResult !== 'Valid email') {
                alert('Email should be valid and at least 10 characters long.');
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
                        alert('Sign-up successful.');
                        start()
                    }
                }
            }
        }
    }
}
function signIn() {
    let email;
    let password;
    let userIndex;
    do {
        email = prompt('Enter your email: ');
        if (email === 'exit') {
            exit();
            return;
        }
        userIndex = users.findIndex(e => e.email === email);
        if (userIndex === -1) {
            alert('Email does not exist, please sign-up.');
        }
    } while (userIndex === -1);
    password = prompt('Enter your password: ');
    if (password === 'exit') {
        exit();
        return;
    }
    if (users[userIndex].password == password) {
        currentUser = users[userIndex];
        alert('Signed-in successfully.');
        invest();
        takeLoan();
        userMenu();
    } else {
        alert('Invalid password.');
        start();
    }
}
function deposit() {
    let amount;
    do {
        amount = prompt('Enter the amount you want to deposit: ').trim().replaceAll(' ', '');
        amountValidation = validateAmount(amount);
        if (amount === 'exit') {
            exit();
            return;
        }
        if (amountValidation !== 'Valid amount') {
            alert(amountValidation)
        }
    } while (amountValidation !== 'Valid amount');
    if (amountValidation === 'Valid amount' && amount <= depositLimit) {
        currentUser.balance += amount;
        depositLimit -= amount;
        currentUser.history.push(`Deposit: ${amount}`);
        alert('Deposit successful.');
        userMenu();
    } else if (amountValidation === 'Valid amount' && amount > depositLimit) {
        alert('Deposit limit is 1000DH per session, please enter a smaller amount, you can deposit ' + depositLimit + ' DH.');
        deposit()
    }
}
function withdraw() {
    let amount;
    do {
        amount = prompt('Enter the amount you want to withdraw: ').trim().replaceAll(' ', '');
        amountValidation = validateAmount(amount);
        if (amount === 'exit') {
            exit();
            return;
        }
        if (amountValidation !== 'Valid amount') {
            alert(amountValidation)
        }
    } while (amountValidation !== 'Valid amount');
    if (amountValidation === 'Valid amount' && amount <= currentUser.balance) {
        currentUser.balance -= amount;
        currentUser.history.push(`Withdrew: ${amount}`);
        alert('withdrawal successful.');
        userMenu();
    } else if (amountValidation === 'Valid amount' && amount > currentUser.balance) {
        alert('You dont have enoug balance to withdraw the selected amount.');
        withdraw()
    }
}
function changePassword(trigger) {
    let newPassword;
    let newPasswordConfirmation;
    let emailAccountCheck;
    if (trigger == 'userMenu') {
        do {
            newPassword = prompt('Enter your new password: ');
            passwordValidationResult = validatePassword(newPassword);
            if (newPassword === 'exit') {
                exit();
                return;
            } else if (passwordValidationResult !== 'Valid password') {
                alert(passwordValidationResult);
            }
        } while (passwordValidationResult !== 'Valid password');
        if (passwordValidationResult === 'Valid password' && newPassword != currentUser.password) {
            newPasswordConfirmation = prompt('Confirm your new password: ');
            if (newPasswordConfirmation === 'exit') {
                exit();
                return;
            } else if (newPasswordConfirmation !== newPassword) {
                alert('Passwords do not match. Retry.');
                changePassword();
            } else {
                currentUser.password = newPassword;
                currentUser.history.push(`Password change`);
                alert('Password change successful.');
                userMenu();
            }
        }
    } else {
        do {
            email = prompt('To reset your account password, enter your email: ');
            emailAccountCheck = users.findIndex(e => e.email === email)
            if (emailAccountCheck === -1) {
                alert('Email does not exist, please sign-up.');
            }
            if (email === 'exit') {
                exit();
                return;
            }
        } while (emailAccountCheck === -1);
        if (emailAccountCheck !== -1) {
            newPassword = prompt('Enter your new password: ');
            passwordValidationResult = validatePassword(newPassword);
            if (passwordValidationResult !== 'Valid password') {
                alert(passwordValidationResult);
            }
        } else if (passwordValidationResult === 'Valid password') {
            newPasswordConfirmation = prompt('Confirm your new password: ');
            if (newPasswordConfirmation === 'exit') {
                exit();
                return;
            } else if (newPasswordConfirmation !== newPassword) {
                alert('Passwords do not match. Retry.');
                changePassword();
            } else {
                users[emailAccountCheck].password = newPassword;
                users[emailAccountCheck].history.push(`Password reseted`);
                alert('Password reseted successfully.');
                userMenu();
            }

        }
    }
}
function takeLoan(trigger) {
    class Loans {
        constructor(status, amount, repaidAmount) {
            this.status = status
            this.amount = amount
            this.repaidAmount = repaidAmount
        }
    }
    let amount;
    let possibleLoanAmount = currentUser.balance * 0.2
    let cut = currentUser.balance * 0.1
    if (trigger == 'userMenu') {
        do {
            amount = prompt('Enter the amount you want to get as a loan (maximum amount : ' + possibleLoanAmount + ' DH): ').trim().replaceAll(' ', '');
            amountValidation = validateAmount(amount);
            if (amount === 'exit') {
                exit();
                return;
            }
            if (amountValidation !== 'Valid amount') {
                alert(amountValidation)
            }
        } while (amountValidation !== 'Valid amount');
        if (amountValidation == 'Valid amount' && amount <= possibleLoanAmount) {
            currentUser.balance += amount
            let loan = new Loans('Ongoing', amount, 0)
            currentUser.loans.push(loan)
            alert('Loan taken successfully.')
            currentUser.history.push(`Loan taken: ${amount}`)
            userMenu()
        } else {
            alert('Amount is greater than possible loan amount')
            takeLoan()
        }
    } else {
        currentUser.loans.forEach(loan => {
            if (loan.status == 'Ongoing' && currentUser.balance >= cut) {
                loan.repaidAmount += cut
                currentUser.balance -= cut
                alert('Repayed ' + cut + ' DH to your loan.')
                currentUser.history.push(`Loan repaid: ${cut}`)
                if (loan.repaidAmount >= loan.amount) {
                    loan.status = 'Completed'
                    alert('Loan completed.')
                    currentUser.history.push(`Loan completed`)
                }
            } else {
                alert('You dont have enough balance to repay the loan.')
                userMenu()
            }
        })
    }
}
function invest(trigger) {
    class Investments {
        constructor(status, amount, profit) {
            this.status = status
            this.amount = amount
            this.profit = profit
        }
    }
    let amount;
    if (trigger == 'userMenu') {
        do {
            amount = prompt('Enter the amount you want to invest: ').trim().replaceAll(' ', '');
            amountValidation = validateAmount(amount);
            if (amount === 'exit') {
            exit();
            return;
        }
        if (amountValidation !== 'Valid amount') {
            alert(amountValidation)
        }
    } while (amountValidation !== 'Valid amount');
    if (amountValidation === 'Valid amount') {
        currentUser.balance -= amount;
        currentUser.investment.push(new Investments('Ongoing', amount, amount * 1.2));
        alert('Investment successful.');
        currentUser.history.push(`Invested: ${amount}`);
        userMenu();
    }
}else {
    currentUser.investment.forEach(investment => {
        if (investment.status == 'Ongoing' && investment.amount < investment.profit) {
            currentUser.balance += investment.amount * 0.2;
            currentUser.history.push(`Investment profit: ${investment.amount * 0.2}`);
        }else if (investment.status == 'Ongoing' && investment.amount > investment.profit) {
            investment.status = 'Completed';
            currentUser.history.push(`Investment completed`);
        }
    })
}
}
function history() {
    currentUser.history.forEach(history => {
        console.log(history);
    })
}
function userMenu() {
    let choice = '';
    while (choice != 'exit') {
        choice = prompt('Hello ' + currentUser.name + ' choose an action to do at the bank (1-4): \n 1.Deposit \n 2.Withdraw \n 3.Change password \n 4.Take loan \n 5.Invest \n 6.History \n 7.logout')
        switch (choice) {
            case '1':
                deposit();
                break;
            case '2':
                withdraw();
                break;
            case '3':
                changePassword('userMenu');
                break;
            case '4':
                takeLoan('userMenu');
                break;
            case '5':
                invest('userMenu');
                break;
            case '6':
                history();
                break;
            case '7':
                alert('Thank you, Have a great day !.')
                currentUser = null;
                start();
                break;
        }
        break;
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
                signIn()
                break;
            case '3':
                changePassword()
                break;
            case '4' || 'exit':
                alert('Thank you for the visit have a great day !.')
                exit();
            default:
                alert('Invalid choice.');
                break;
        }

    }
}
start()