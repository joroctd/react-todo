import { OnSort } from '../propTypes/OnSort';
import { Sort } from '../propTypes/Sort';

interface SortControlProps extends OnSort {
	sort: Sort;
}

const SortControl = ({ sort, onSort }: SortControlProps) => {
	const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onSort(e.target.value as Sort);
	};

	// could create an order option, with asc. / desc. there
	//  and then remove the Airtable options to fully have sorting
	//  be controlled on the client side
	return (
		<div>
			<label htmlFor='sortControl'>Sort By: </label>
			<select
				id='sortControl'
				value={sort}
				onChange={onChange}>
				{Object.keys(Sort)
					.filter(k => isNaN(Number(k)))
					.map(sortKey => (
						<option
							key={`sort-option-${sortKey}`}
							value={Sort[sortKey]}>
							{sortKey[0] + sortKey.slice(1).toLowerCase()}
						</option>
					))}
				{/* <option value={Sort.NONE}>None</option>
				<option value={Sort.VIEW}>View</option>
				<option value={Sort.FIELD}>Field</option> */}
			</select>
		</div>
	);
};

export default SortControl;
