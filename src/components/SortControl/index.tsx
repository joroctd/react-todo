import { FC } from 'react';
import type { OnSort } from '../types/OnSort';
import { Sort } from '../types/Sort';

interface SortControlProps extends OnSort {
	sort: Sort;
}

const SortControl: FC<SortControlProps> = ({ sort, onSort }) => {
	const onChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onSort(e.target.value as Sort);
	};

	return (
		<div>
			<label htmlFor='sortControl'>Sort By: </label>
			<select
				id='sortControl'
				value={sort}
				onChange={onChangeSort}>
				{Object.keys(Sort)
					.filter(k => isNaN(Number(k)))
					.map(sortKey => (
						<option
							key={`sort-option-${sortKey}`}
							value={Sort[sortKey]}>
							{sortKey[0] + sortKey.slice(1).toLowerCase()}
						</option>
					))}
			</select>
		</div>
	);
};

export default SortControl;
