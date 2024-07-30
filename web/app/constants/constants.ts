const HOST_NAME = process.env.NEXT_PUBLIC_HOST_NAME;

// GET current, restorable & deleted products
export const GET_ALL_PRODUCTS = `${HOST_NAME}products`;
export const GET_PRODUCTS_BY_NAME = `${HOST_NAME}products_by_name`;
export const GET_DELETED_PRODUCTS = `${HOST_NAME}deleted_products`;
export const DELETE_PRODUCT_BY_ID = `${HOST_NAME}delete_product`;
export const UPDATE_RESTORE_PRODUCT = `${HOST_NAME}restore_product`;
export const UPDATE_REDO_PRODUCT = `${HOST_NAME}redo_product`;
export const GET_PRODUCTS_SORT_BY_NAME = `${HOST_NAME}products/sort_by_name`;
