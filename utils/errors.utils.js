module.exports.signUpErrors = (err) => {
    let errors = { pseudo: '', email: '', password: ''}

    if (err.message.includes('pseudo')) 
        errors.pseudo = "pseudo incorrect deja pris"

    if (err.message.includes('email')) 
        errors.email = "email incorrect"

    if (err.message.includes('password')) 
        errors.password = "le mots de passe doit faire 6 carracteres minimum"
    
    if (err.code == 11000 && Object.keys(err.keyValue)[0].includes('pseudo') ) 
        errors.pseudo = "ce pseudo est deja enregistré"

    if (err.code == 11000 && Object.keys(err.keyValue)[0].includes('email') ) 
        errors.email = "ce mail est deja enregistré"

    return errors
}

module.exports.signInErrors = (err) => {
    let errors = {email: "", password: ''}

    if (err.message.includes('email'))
        errors.email ="email inconnu"
        
    if (err.message.includes('password'))
        errors.password ="password inconnu"

    return errors
}
