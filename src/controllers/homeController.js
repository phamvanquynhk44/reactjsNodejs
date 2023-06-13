import db from '../models/index';
import CRUDServices from '../services/CRUDServices';
let getHomePage = async (req, res) => {
    try {
        let data=await db.User.findAll();
        return res.render('homepage.ejs',{
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e);
        
    }
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
    let message =await CRUDServices.createNewUser(req.body);
    console.log(message);
    return res.send('post controller');
}

let getDisplayCRUD = async (req, res) => {
    let data= await CRUDServices.getAllUser();
    console.log(data);
    return res.render('displayCRUD.ejs', {
        dataTable: data
    });
}

let getEditCRUD = async (req, res) => {
    let userId=req.query.id;
    if(userId){
        let userData= await CRUDServices.getUserInfoById(userId);

        return res.render('editCRUD.ejs', {
            user: userData
        });
    }else{
        return res.send('user not found');
    }  
}

let putCRUD = async (req, res) => {
    let data=req.body;
    await CRUDServices.UpdateUserData(data);
    return res.redirect(`get-crud`);
}

// object: {
//     key: '',
//     value: ''
// }
module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD:getCRUD,
    postCRUD:postCRUD,
    getDisplayCRUD:getDisplayCRUD,
    getEditCRUD:getEditCRUD,
    putCRUD:putCRUD,
}
