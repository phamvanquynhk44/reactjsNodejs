import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);
let createNewUser = async (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            let hashUserPasswordFrom = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashUserPasswordFrom,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phoneNumber: data.phoneNumber,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
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

let getAllUser = () =>{
    return new Promise(async(resolve, reject) => {
        try {
            let users= await db.User.findAll({
                raw:true,
            });     
            resolve(users);
        } catch (e) {
            reject(e);         
        }
    })
}

let getUserInfoById = (userId) =>{
    return new Promise(async(resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id:userId },
                raw:true
            })
            if(user){
                resolve(user);
            }else{
                resolve({});
            }
        } catch (e) {
            reject(e);         
        }
    })
}

let UpdateUserData = (data) =>{
    return new Promise( async (resolve, reject) => {
        try {
            let user= await db.User.findOne({
                where: {id: data.id},
                raw: false
            })
           
            if(user){
                user.fullname= data.fullname;
                user.username= data.username;
                
                await user.save();
                resolve();
            }else{
                resolve();
            }  
        } catch (e) {
            reject(e);
            
        }
    })
}

let DeleteUserData = (id) =>{
    return new Promise( async (resolve, reject) => {
        try { 
            let user= await db.User.destroy({
                where: {id: id}
            })
            resolve(user);
        } catch (e) {
            reject(e);        
        }
    })
}

module.exports={
    createNewUser:createNewUser,
    getAllUser: getAllUser,
    getUserInfoById:getUserInfoById,
    UpdateUserData:UpdateUserData,
    DeleteUserData:DeleteUserData,
}