import { useRef, useEffect } from 'react';

import { inputChangeEventHandler } from '@/types/htmlEvent';

interface InputWithLabelProps {
	inputValue: string;
	onChange: inputChangeEventHandler;
	children: React.ReactNode;
}

function InputWithLabel({
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
