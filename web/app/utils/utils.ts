import { AllProducts, Product } from 'app/interfaces/Product';

// set severity for <Badge /> component
export const getSeverity = (average_rate: number) => {
	const severity = average_rate > 2.5 ? 'success' : 'error';

	return severity;
};

// set products data (available/deleted/redo) from useFetch response
export const setAllProductsFromData = (
	data: { products: Product[]; redo_products: Product[] },
	setAllProducts: React.Dispatch<React.SetStateAction<AllProducts>>,
) => {
	setAllProducts((prevState) => ({
		...prevState,
		availableProducts: data.products.filter(
			(product: Product) => !product.is_deleted,
		),
		deletedProducts: data.products.filter(
			(product: Product) => product.is_deleted,
		),
		redoProducts: data.redo_products,
	}));
};
