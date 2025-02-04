import { useRef, useEffect } from 'react';

import { inputChangeEventHandler } from './types/HtmlEvent';

interface InputWithLabelProps {
	label: string;
	inputValue: string;
	onChange: inputChangeEventHandler;
	children: React.ReactNode;
}

function InputWithLabel({
	label,
	inputValue,
	onChange,
	children
}: InputWithLabelProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
		inputRef.current?.focus();
	});

	return (
		<>
			<label htmlFor={label}>{children}: </label>
			<input
				id={label}
				name={label}
				value={inputValue}
				onChange={onChange}
				ref={inputRef}
			/>
		</>
	);
}

export default InputWithLabel;
