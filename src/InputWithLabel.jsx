import { useRef, useEffect } from 'react';

function InputWithLabel({ inputValue, onChange, children }) {
	const inputRef = useRef();

	useEffect(() => {
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
		inputRef.current?.focus();
	});

	return (
		<>
			<label htmlFor='todo-title'>{children}: </label>
			<input
				id='todo-title'
				name='title'
				value={inputValue}
				onChange={onChange}
				ref={inputRef}
			/>
		</>
	);
}

export default InputWithLabel;
