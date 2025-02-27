import { FC, useRef, useEffect } from 'react';
import style from './InputWithLabel.module.css';
import type { onInputChange } from '@/types/OnEvent';

interface InputWithLabelProps {
	id: string;
	name?: string;
	value: string;
	onChange: onInputChange;
	children: React.ReactNode;
}

const InputWithLabel: FC<InputWithLabelProps> = ({
	id,
	name = id,
	value,
	onChange,
	children
}) => {
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
};

export default InputWithLabel;
