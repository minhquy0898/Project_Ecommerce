import express from 'express';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import {
    braintreePaymentController,
    braintreeTokenController,
    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    productCategoryController,
    productCountController,
    productFilterController,
    productListController,
    productPhotoController,
    realtedProductController,
    searchProductController,
    updateProductController
} from '../controllers/productController.js';
import formidable from 'express-formidable';

const router = express.Router()

// routes
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController)

//
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController)

// get product
router.get('/get-product', getProductController)

//single product
router.get('/get-product/:slug', getSingleProductController)

// get photo
router.get('/product-photo/:pid', productPhotoController)

//delete product
router.delete('/delete-product/:pid', deleteProductController)

// filter product
router.post('/product-filters', productFilterController)

// product count
router.get('/product-count', productCountController)

// product per page
router.get('/product-list/:page', productListController)

// search product
router.get('/search/:keyword', searchProductController)

// similar product
router.get('/realted-product/:pid/:c:id', realtedProductController)

//category wise product
router.get('/product-category/:slug', productCategoryController)

//payment router
//token
router.get('/braintree/token', braintreeTokenController)

//payment
router.post('/braintree/payment', requireSignIn, braintreePaymentController)


export default router