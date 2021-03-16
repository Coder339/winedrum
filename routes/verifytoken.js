const jwt = require('jsonwebtoken')

// TO MAKE ROUTES PRIVATE
function auth(req,res,next){
    // const token = req.header('auth-token')
    // if(!token) return res.status(401).send('Access Denied')

    if (req.headers.authorization === undefined || req.headers.authorization.split(' ')[0] !== 'Bearer') {
        const status = 401
        const message = 'Error in authorization format'
        res.status(status).json({status, message})
        return
    }

    const token = req.headers.authorization.split(' ')[1]
    console.log('token',token)
    if(!token) return res.status(401).send('Access Denied')

    try{
        const verified = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user = verified
        next()
    }catch(error){
        const status = 401
        res.status(status).json({status,error})
    }
}


module.exports = auth