export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
        <div className="bg-red-500 p-10">{children}</div>
    )
  }
  