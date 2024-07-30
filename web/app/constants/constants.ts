// API ENDPOINTS

const HOST_NAME = process.env.NEXT_PUBLIC_HOST_NAME;

// GET current, restorable & deleted products
export const GET_ALL_PRODUCTS = `${HOST_NAME}products`;
export const GET_PRODUCTS_BY_NAME = `${HOST_NAME}search_by_name`;
export const DELETE_PRODUCT_BY_ID = `${HOST_NAME}delete_product`;
export const UPDATE_RESTORE_PRODUCT = `${HOST_NAME}restore_product`;
export const UPDATE_REDO_PRODUCT = `${HOST_NAME}redo_product`;

export const selectOptions = [
	{
		label: 'Tous les éléments',
		value: 'all',
	},
	{
		label: 'Eléments en ligne',
		value: 'available',
	},
	{
		label: 'Eléments supprimés',
		value: 'deleted',
	},
];
