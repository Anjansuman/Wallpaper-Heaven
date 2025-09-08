export const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8080";

export const API_URL = BACKEND_URL + "/api/v1";

// Uploads
export const UPLOAD_IMAGE_URL = API_URL + "/get-presigned-url";

// Home
export const HOME_URL = API_URL + "/get-home-data";

// Product
export const UPSERT_PRODUCT_URL = API_URL + "/upsert-product";
export const REMOVE_PRODUCT_URL = API_URL + "/remove-product";
export const PRODUCT_DETAILS_URL = API_URL + "/get-product-details";
export const PRODUCTS_BY_TYPE_URL = API_URL + "/get-all-products-via-type";
export const PRODUCTS_BY_TAGS_URL = API_URL + "/get-all-products-via-tags";