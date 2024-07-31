export const dateOptions: Intl.DateTimeFormatOptions = {
	year: 'numeric',
	month: 'long',
	day: 'numeric',
};

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

export const radioButtonsOptions = [
	{
		label: 'Nom',
		defaultChecked: true,
		value: 'name',
		sort_by: 'sort_by_name',
	},
	{
		label: 'Date de modification',
		defaultChecked: false,
		value: 'date',
		sort_by: 'sort_by_date',
	},
	{
		label: 'Note',
		defaultChecked: false,
		value: 'rate',
		sort_by: 'sort_by_rate',
	},
];
