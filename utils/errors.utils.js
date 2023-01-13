module.exports.signUpErrors = (err) => {
    let errors = { pseudo: '', email: '', password: ''}

    if (err.message.includes('pseudo')) 
        errors.pseudo = "pseudo incorrect deja pris"

    if (err.message.includes('email')) 
        errors.pseudo = "email incorrect"

    if (err.message.includes('password')) 
        errors.pseudo = "le mots de passe doit faire 6 carracteres minimum"
    
    if (err.code == 11000 ) 
        errors.pseudo = "ce mail est deja enregistré"

    return errors
}