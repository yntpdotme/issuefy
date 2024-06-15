type Props = {
  error: string | undefined;
};

export const FormMessage = ({error}: Readonly<Props>) => {
  if (!error) return null;
  return <p className="text-[0.8rem] font-medium text-destructive">{error}</p>;
};
