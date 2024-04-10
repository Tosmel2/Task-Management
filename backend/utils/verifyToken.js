import jwt from "jsonwebtoken";

export const verifytoken = token => {
    return jwt.verify(token, process.env.TOKEN_KEY, (error, decoded) => {
        if(error){
            return false;
        }else{
            return decoded;
        }
    })
}