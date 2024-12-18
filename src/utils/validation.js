// NOTE: All of these things could be done on the server side. 

export function validateEmailAddress(emailAddress) {
    // TODO: Do more robust email validation 
    return emailAddress.includes('@') 
}

export function validatePassword(password) {
    return password.length >= 8; 
}