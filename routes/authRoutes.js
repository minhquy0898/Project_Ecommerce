import express from "express";
import {
    forgotPasswordController,
    getOrdersController,
    loginController,
    registerController,
    testController,
    updateProfileController
} from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
// router object
const router = express.Router();

// routing

// REGISTER ||  METHOD POST
router.post('/register', registerController);

// LOGIN || POST
router.post('/login', loginController);

// Forgot Password
router.post('/forgot-password', forgotPasswordController)

// test router
router.get('/test', requireSignIn, isAdmin, testController)


// Protected User router auth
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})
// Protected ADmin router  auth
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

//update profile
router.put('/profile', requireSignIn, updateProfileController)

//order router
router.get('/orders', requireSignIn, getOrdersController)

export default router