import { FC } from 'react';
import type { OnSort } from '../types/OnSort';
import type { ServerSortState } from '../types/Sort';
import { Sort } from '../types/Sort';

interface SortControlProps extends OnSort, ServerSortState {
	sort: Sort;
}

const SortControl: FC<SortControlProps> = ({
	sort,
	onSort,
	shouldServerSort,
	setServerSort
}) => {
	const onChangeSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
		onSort(e.target.value as Sort);
	};

	const onChangeToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setServerSort(e.target.checked);
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

			<label
				htmlFor='serverSortToggle'
				style={{ marginLeft: '10px' }}>
				Server-side Sorting:
			</label>
			<input
				id='serverSortToggle'
				type='checkbox'
				checked={shouldServerSort}
				onChange={onChangeToggle}
			/>
		</div>
	);
};

export default SortControl;
