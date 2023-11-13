export default async function BookingInfoLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <>
        <div className="mt-8 px-2 sm:px-48">
          {children}
        </div>
      </>
    )
}