type Props = {
  label: string;
  id: string;
  children: React.ReactNode;
};

export const FormItem = ({label, id, children}: Readonly<Props>) => {
  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
      {children}
    </div>
  );
};
