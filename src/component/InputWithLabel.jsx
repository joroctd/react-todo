import { useRef, useEffect } from 'react';

function InputWithLabel({ id, name = id, value, onChange, children }) {
	const inputRef = useRef();

	useEffect(() => {
		if (inputRef.current) inputRef.current.focus();
	});

	return (
		<>
			<label htmlFor={id}>{children}</label>
			<input
				id={id}
				name={name}
				value={value}
				onChange={onChange}
				ref={inputRef}
				autoComplete='off'
			/>
		</>
	);
}

export default InputWithLabel;
