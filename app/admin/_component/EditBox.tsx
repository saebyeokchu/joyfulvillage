export default function EditBox({
    children,
    title,
    subTitle,
  }: Readonly<{
    children: React.ReactNode;
    title : string;
    subTitle? : string;
  }>){
    return(
        <div  className="mt-7 flex flex-col space-y-3 border rounded-lg shadow-sm p-3">
            <p className="font-bold text-xl">{title}</p>
            <small>{subTitle}</small>
            <div className="overflow-y-auto mt-3">
                {children}
            </div>
        </div>
    )
  }