import { Router } from "express";
import { adminMiddleware } from "../middleware/adminMiddleware";

import getPreSignedUrlController from "../controllers/getPreSignedUrlController";
import upsertProductController from "../controllers/product/upsertProductController";
import removeProductController from "../controllers/product/removeProductController";
import getHomeDataConroller from "../controllers/home/getHomeDataController";
import getProductDataController from "../controllers/product/getProductDataController";
import getAllProductsViaTypeController from "../controllers/product/getAllProductsViaTypeController";
import getAllProductsViaTagsController from "../controllers/product/getAllProductsViaTagsController";

const router: Router = Router();

// data controllers
router.get('/get-home-data', getHomeDataConroller);

// product controllers
router.post('/upsert-product', adminMiddleware, upsertProductController);
router.delete('/remove-product', adminMiddleware, removeProductController);
router.get('/get-product-details', getProductDataController);
router.get('/get-all-products-via-type', getAllProductsViaTypeController);
router.get('/get-all-products-via-tags', getAllProductsViaTagsController);

// aws s3 presigned-url
router.post('/get-presigned-url', adminMiddleware, getPreSignedUrlController);


export default router;