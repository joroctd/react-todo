function InputWithLabel({ id, name=id, value, onChange, children }) {
    return (
        <>
            <label htmlFor={id}>{children}</label>
            <input id={id} name={name} value={value} onChange={onChange} />
        </>
    )
}

export default InputWithLabel