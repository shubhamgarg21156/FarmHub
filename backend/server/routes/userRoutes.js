import multer from 'multer';
import {
    addAddress,
    addToCart,
    createUser,
    currentUserDetails,
    deleteAddress,
    deletefromCart,
    deleteUser,
    displayUser,
    forgotPassword,
    login,
    logout,
    resetPassword,
    updateAddress,
    updateInCart,
    updateUser,
    userList
} from '../controllers/userController';
const userRoutes = (app) => {
    var upload = multer({
        storage: multer.memoryStorage(),
        limits: {
            fileSize: 1024 * 1024 * 5
        }
    });

    //-------------------------------- User Authentication --------------------------------

    app.route('/user/register')
        .post(upload.single('avatar'), createUser);
    app.route('/user/login')
        .post(login);
    app.route('/user/logout')
        .get(logout);

    //-------------------------------- Manage and View Users --------------------------------

    app.route('/user')
        .get(currentUserDetails);
    app.route('/user/:userId')
        .get(displayUser)
        .delete(deleteUser);
    app.route('/user/:userId')
        .put(upload.single('avatar'), updateUser);
    app.route('/user/:userId/password')
        .put(resetPassword);
    app.route("/password/forgot")
        .post(forgotPassword);
    app.route('/users')
        .get(userList);

    //-------------------------------- Manage User Addresses --------------------------------

    app.route('/user/:userId/address')
        .put(addAddress);
    app.route('/user/:userId/address/:addressId')
        .put(updateAddress)
        .delete(deleteAddress);

    //-------------------------------- Manage User Cart --------------------------------

    app.route('/user/:userId/cart')
        .put(addToCart);
    app.route('/user/:userId/cart/:productId')
        .put(updateInCart)
        .delete(deletefromCart);



}



export default userRoutes;