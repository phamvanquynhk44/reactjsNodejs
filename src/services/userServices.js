import bcrypt from 'bcryptjs';
import db from '../models/index';
const salt = bcrypt.genSaltSync(10);

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

let handleUserLogin =(email,password) =>{
    return new Promise( async (resolve, reject) => {
        try {
            let userData={};
            let isExist= await checkUserEmail(email);
            if(isExist){
                let user = await db.User.findOne({
                    attributes: ['email','roleId', 'password'],
                    where: {email: email},
                    raw: true
                });
                if(user){
                   let check= await bcrypt.compareSync( password, user.password );
                   if(check){
                        userData.errCode =0;
                        userData.errMessage= `OK`;
                        delete user.password;
                        userData.user=user;
                   }else{
                        userData.errCode =3;
                        userData.errMessage= `wrong password`;
                   }
                }else{
                    userData.errCode =2;
                    userData.errMessage= `user not found`;
                }
            }else{
                userData.errCode =1;
                userData.errMessage= `Your email or password null`;     
            }   
            resolve(userData) 
        } catch (e) {
            reject(e)          
        }
    })
}

let checkUserEmail= (userEmail) => {
    return new Promise( async (resolve, reject) => {
        try { 
            let user= await db.User.findOne({
                where: {email: userEmail}
            })
            if(user){
                resolve(true);
            }else{
                resolve(false);
            }     
        } catch (e) {
            reject(e);        
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise( async (resolve, reject) => {
        try { 
            let users='';
            if(userId === 'ALL'){
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if(userId && userId !== 'ALL'){
                users = await db.User.findOne({
                    where: { id:userId },
                    attributes: {
                        exclude: ['password']
                    }
                })   
            }    
            resolve(users); 
        } catch (e) {
            reject(e);        
        }
    })
}

let createNewUser = (data) => {
    return new Promise( async (resolve, reject) => {
        try { 
            let check= await checkUserEmail(data.email);
            if(check === true){
                resolve({
                    errCode: 1,
                    errMessage: 'Email này đã được sử dụng xin hãy sử dụng email khác'
                })
            }else{
                let hashUserPasswordFrom = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashUserPasswordFrom,
                    firstName: data.firstName,
                    lastName: data.lastName,    
                    address: data.address,
                })
                resolve({
                    errCode:0,
                    message: 'OK',
                });  
            }       
        } catch (e) {
            reject(e);        
        }
    })
}


let deleteUser = (userId) => {
    return new Promise( async (resolve, reject) => {
        try { 
            let user= await db.User.findOne({
                where: {id : userId }
            })
            if(!user){
                resolve({
                    errCode: 2,
                    errMessage: `The user isn't exist`
                })    
            }
            await db.User.destroy({
                where: {id : userId }
            });   
            resolve({
                errCode: 0,
                message: `The user is delete`
            })   
        } catch (e) {
            reject(e);        
        }
    })
}

let UpdateUserData = (data) => {
    return new Promise( async (resolve, reject) => {
        try {
            if(!data.id){
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required paramaters'
                })
            }
            let user = await db.User.findOne({
                where: {id: data.id},
                raw: false  
            }) 
            if(user){
                user.firstName = data.firstName,
                user.lastName = data.lastName,
                user.address = data.address,  
                await user.save();
                resolve({
                    errCode: 0,
                    message: 'Update the user success!'
                });
            }else{
                resolve({
                    errCode: 1,
                    errMessage: ''
                });
            }  
        } catch (e) {
            reject(e);    
        }
    })
}

module.exports = {
    handleUserLogin:handleUserLogin,
    checkUserEmail:checkUserEmail,
    getAllUsers:getAllUsers,
    createNewUser:createNewUser,
    deleteUser:deleteUser,
    UpdateUserData:UpdateUserData,
}