interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return <div className="flex flex-row h-screen justify-center items-center">
    {children}
  </div>
}
