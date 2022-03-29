type Props = {
  label: string;
  name: string;
  className?: string;
  placeholder?: string;
};

export const FormField = ({
  label,
  name,
  className = "",
  placeholder,
}: Props) => {
  return (
    <div
      className={`relative border border-slate-600 rounded-md px-3 py-2 focus-within:z-10 focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600 ${className}`}
    >
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-50 pb-1 cursor-text"
      >
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        className="block w-full border-0 p-0 text-slate-50 placeholder-slate-500 bg-transparent focus:ring-0"
        placeholder={placeholder}
      />
    </div>
  );
};
