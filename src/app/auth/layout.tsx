const AuthLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <div className="flex min-h-[86vh] items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
