import Image from "next/image";
import { useMemo, useState } from "react";

const StayWrapper = (
    {
        name, 
        address,
        children, 
        images,
        onClickImage,
        wrapperId,
        alt
    } : 
    Readonly<{
        name:string;
        address:string;
        children:React.ReactNode; 
        images:string[];
        onClickImage : React.MouseEventHandler<HTMLDivElement>;
        wrapperId : string,
        alt : string
    }>
    
) => {
    const [index, setIndex] = useState(0);
    
    const totalSlides = images.length;

    const renderedOptions = useMemo(() => {
        return images.map((src : string, index : number) => (
            <Image
                key={`stay-image-${index}`}
                onClick={onClickImage}
                width={427}
                height={270}
                className="object-cover cursor-pointer"
                src={src}
                alt="stay1"
                priority
            />
        ));
    }, [images]);

    const handlePrev = () => {
        setIndex((prevIndex) => (prevIndex - 1 + totalSlides ) % totalSlides);
    }

    const handleNext = () => {  
        setIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }

    return( 
        <div className="md:h-[550px] border border-green-500" key={`stay`+ wrapperId} >
            <div className="relative border border-red-500 w-full h-[200px] md:h-[270px] overflow-hidden group" >
                <div
                    className={`relative transition-transform duration-1000 ease-in-out w-full flex flex-row ${images.length == 1  && 'hover:scale-105 hover:opacity-90'} `}
                    style={{ transform: `translateX(-${index * 100}%)` }}
                    >
                    {renderedOptions}
                </div>

                {/* left arrow */}
                { index != 0 && <div className="hidden cursor-pointer md:group-hover:block md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2" onClick={handlePrev}>
                    <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="21.5" cy="21.5" r="21" stroke="#fff"/>
                        <path d="M25.5 9.5L13 22L25.5 34.5" stroke="#fff"/>
                    </svg>
                </div> }

                {/* right arrow */}
                { index != ( totalSlides - 1 ) && <div className="hidden cursor-pointer md:group-hover:block md:absolute md:top-1/2 md:right-0 md:-translate-y-1/2" onClick={handleNext}>
                    <svg width="43" height="43" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="21.5" cy="21.5" r="21" transform="rotate(-180 21.5 21.5)" stroke="#fff"/>
                        <path d="M17.5 33.5L30 21L17.5 8.5" stroke="#fff"/>
                    </svg>
                </div> }

                {/* Dot indicators */}
                <div className="absolute flex md:hidden bottom-4 left-1/2 transform -translate-x-1/2 space-x-2">
                    {images.map((_, idx) => (
                        <button
                        key={`dot-${idx}`}
                        onClick={() => setIndex(idx)}
                        className={`w-3 h-3 rounded-full ${index === idx ? "bg-white" : "bg-gray-500"}`}
                        ></button>
                    ))}
                </div>
            </div>
            <div className="mt-5">
                <p className="font-bold text-xl">{name}</p>
                <p className="mt-4">{address}</p>

                <div className="mt-8 max-w-[427px] korean-text text-sm">
                {children}
                </div>
            </div>
        </div>)
}

export default StayWrapper;