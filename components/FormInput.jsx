export default function FormInput({ label, col = true, ...inputProps }) {
	return (
		<>
			<div className={`flex ${col ? 'flex-col' : ''} gap-y-2 gap-x-1`}>
				<label htmlFor={`#${label}`} className="font-semibold md:text-lg">
					{label}
				</label>
				<input
					className="p-1 px-2 md:text-md border border-black outline-none appearance-none disabled:bg-gray-400"
					{...inputProps}
					id={label}
				/>
			</div>
		</>
	);
}
