import SearchBar from '@codegouvfr/react-dsfr/SearchBar';
import Select from '@codegouvfr/react-dsfr/SelectNext';
import { GET_PRODUCTS_BY_NAME } from 'app/constants/constants';
import { selectOptions } from 'app/constants/DefaultValues';
import { SearchFiltersProps } from 'app/interfaces/ComponentsProps';
import React from 'react';

export const SearchFilters: React.FC<SearchFiltersProps> = ({
	value,
	setValue,
	fetchProducts,
}) => {
	const handleSearch = (text: string) => {
		fetchProducts(GET_PRODUCTS_BY_NAME + `?product_name=${text}`);
	};

	return (
		<div className="fr-grid-row fr-grid-row--gutters">
			<SearchBar
				className="fr-col-9 fr-p-0"
				data-testid="search-bar"
				label="Rechercher un produit"
				onButtonClick={handleSearch}
				allowEmptySearch={true}
			/>
			<Select
				className="fr-col-3 fr-p-0"
				label={null}
				options={selectOptions}
				nativeSelectProps={{
					value,
					onChange: (e) => setValue(e.target.value),
				}}
			/>
		</div>
	);
};
