import { useRef, useEffect } from 'react';
import style from './InputWithLabel.module.css';

interface InputWithLabelProps {
	id: string;
	name?: string;
	value: string;
	onChange: (event: object) => void;
	children: any;
}

function InputWithLabel({
	id,
	name = id,
	value,
	onChange,
	children
}: InputWithLabelProps) {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		if (inputRef.current) inputRef.current.focus();
	});

	return (
		<>
			<label
				className={style.label}
				htmlFor={id}>
				{children}
			</label>
			<input
				className={style.input}
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
