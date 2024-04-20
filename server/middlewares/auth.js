import jwt from 'jsonwebtoken';

const auth = (req,res,next)=>{
    try {
        const token = req.headers['authorization'].split(" ")[1];
        // console.log("🚀 ~ auth ~ token:", token)
        
        let decodeData = jwt.verify(token,'test')
        // console.log("🚀 ~ auth ~ decodeData:", decodeData)
        req.userId = decodeData?.id
        next()
    } catch (error) {
        console.log(error)
    }
}

export default auth;