import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            let hashUserPasswordFrom = await hashUserPassword(data.password);
            await db.User.create({
                fullname: data.fullname,
                username: data.username,
                password: hashUserPasswordFrom,
                email: data.email,
                phone: data.phone,
                address: data.address,
                roleId: data.roleId,
                gender: data.gender === '1' ? true : false,
                status: data.status,
            })
            resolve('ok create add new user succes');
        } catch (e) {
            reject(e);
            
        }
    })

}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => { 
        try {
            let hashPassword = await bcrypt.hashSync(password, salt); 
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
        
    })
}

module.exports={
    createNewUser:createNewUser,
}