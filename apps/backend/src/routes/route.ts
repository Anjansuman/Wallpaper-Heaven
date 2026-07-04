import { Router } from "express";
import { adminMiddleware } from "../middleware/adminMiddleware";

import getPreSignedUrlController from "../controllers/getPreSignedUrlController";
import upsertProductController from "../controllers/product/upsertProductController";
import removeProductController from "../controllers/product/removeProductController";
import getHomeDataConroller from "../controllers/home/getHomeDataController";
import getProductDataController from "../controllers/product/getProductDataController";
import getAllProductsViaTypeController from "../controllers/product/getAllProductsViaTypeController";
import getAllProductsViaTagsController from "../controllers/product/getAllProductsViaTagsController";
import upsertProductTypeController from "../controllers/product-type/upsertProductTypeController";
import deleteProductTypeController from "../controllers/product-type/deleteProductTypeController";
import getProductTypesController from "../controllers/product-type/getProductTypesController";
import upsertBrandController from "../controllers/brand/upsertBrandController";
import removeBrandController from "../controllers/brand/removeBrandController";
import getBrandsController from "../controllers/brand/getBrandsController";
import upsertTagController from "../controllers/tag/upsertTagController";
import removeTagController from "../controllers/tag/removeTagController";
import getTagsController from "../controllers/tag/getTagsController";
import upsertCreatorController from "../controllers/creator/upsertCreatorController";
import getCreatorsController from "../controllers/creator/getCreatorsController";
import removeCreatorController from "../controllers/creator/removeCreatorController";
import getSiteSectionController from "../controllers/site/getSiteSectionController";
import upsertSiteSectionController from "../controllers/site/upsertSiteSectionController";
import getActiveOfferController from "../controllers/offer/getActiveOfferController";
import getFeaturedProductsController from "../controllers/product/getFeaturedProductsController";
import updateProductBasicsController from "../controllers/product/updateProductBasicsController";
import getProductsByBrandController from "../controllers/product/getProductsByBrandController";
import getProductsByTagController from "../controllers/product/getProductsByTagController";
import getProductsByCreatorController from "../controllers/product/getProductsByCreatorController";
import submitQueryController from "../controllers/query/submitQueryController";
import getQueriesController from "../controllers/query/getQueriesController";
import markQueryReadController from "../controllers/query/markQueryReadController";

const router: Router = Router();

// home
router.get('/get-home-data', getHomeDataConroller);

// product-type
router.get('/get-product-types', getProductTypesController);
router.post('/upsert-product-type', adminMiddleware, upsertProductTypeController);
router.delete('/delete-product-type', adminMiddleware, deleteProductTypeController);

// product
router.post('/upsert-product', adminMiddleware, upsertProductController);
router.delete('/remove-product', adminMiddleware, removeProductController);
router.get('/get-product-details', getProductDataController);
router.get('/get-all-products-via-type', getAllProductsViaTypeController);
router.get('/get-all-products-via-tags', getAllProductsViaTagsController);
router.get('/get-featured-products', getFeaturedProductsController);
router.post('/update-product-basics', adminMiddleware, updateProductBasicsController);
router.get('/get-products-by-brand', getProductsByBrandController);
router.get('/get-products-by-tag', getProductsByTagController);
router.get('/get-products-by-creator', getProductsByCreatorController);

// brand
router.get('/get-brands', getBrandsController);
router.post('/upsert-brand', adminMiddleware, upsertBrandController);
router.delete('/remove-brand', adminMiddleware, removeBrandController);

// tag
router.get('/get-tags', getTagsController);
router.post('/upsert-tag', adminMiddleware, upsertTagController);
router.delete('/remove-tag', adminMiddleware, removeTagController);

// creator
router.get('/get-creators', getCreatorsController);
router.post('/upsert-creator', adminMiddleware, upsertCreatorController);
router.delete('/remove-creator', adminMiddleware, removeCreatorController);

// offers
router.get('/active-offer', getActiveOfferController);

// site sections (editable home page content)
router.get('/get-site-section', getSiteSectionController);
router.post('/upsert-site-section', adminMiddleware, upsertSiteSectionController);

// user queries
router.post('/submit-query', submitQueryController);
router.get('/get-queries', adminMiddleware, getQueriesController);
router.post('/mark-query-read', adminMiddleware, markQueryReadController);

// aws s3 presigned-url
router.post('/get-presigned-url', adminMiddleware, getPreSignedUrlController);

export default router;
