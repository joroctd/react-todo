import { Order, Field } from './types/Sort';
import { selectChangeEventHandler } from './types/HtmlEvent';

interface SortControlProps {
	sortOrder: Order;
	sortField: Field;
	setSortOrder: (order: Order) => void;
	setSortField: (field: Field) => void;
}

const SortControl = ({
	sortOrder,
	sortField,
	setSortOrder,
	setSortField
}: SortControlProps) => {
	const onChangeOrder: selectChangeEventHandler = e => {
		setSortOrder(e.target.value as Order);
	};

	const onChangeField: selectChangeEventHandler = e => {
		setSortField(e.target.value as Field);
	};

	return (
		<div>
			<label htmlFor='sortControl'></label>
			<select
				id='sortControl'
				value={sortOrder}
				onChange={onChangeOrder}>
				{Object.values(Order).map(order => (
					<option
						key={`order-option-${order}`}
						value={order}>
						{order[0].toUpperCase() + order.slice(1)}
					</option>
				))}
			</select>

			<label htmlFor='fieldControl'></label>
			<select
				id='fieldControl'
				value={sortField}
				onChange={onChangeField}>
				{Object.values(Field).map(field => (
					<option
						key={`field-option-${field}`}
						value={field}>
						{field[0].toUpperCase() + field.slice(1)}
					</option>
				))}
			</select>
		</div>
	);
};

export default SortControl;
