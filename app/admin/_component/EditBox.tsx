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
        <div  className="mt-7 flex flex-col space-y-3 border border-slate-500 rounded-lg shadow-sm p-3 bg-white">
            <p className="font-bold text-xl">{title}</p>
            <small>{subTitle}</small>
            <div className="overflow-y-auto mt-3">
                {children}
            </div>
        </div>
    )
  }