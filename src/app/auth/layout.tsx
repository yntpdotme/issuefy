const AuthLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <div className="flex min-h-[88vh] items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
