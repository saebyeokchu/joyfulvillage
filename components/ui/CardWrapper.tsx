const CardWrapper = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => (
    <div className="container py-20 px-10 md:px-14 md:mx-auto grid grid-cols-1 items-start justify-center md:grid-cols-3 gap-x-5 gap-y-14  min:h-[2034px]">{children}</div>
)

export default CardWrapper;