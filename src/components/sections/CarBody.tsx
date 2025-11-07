import React, { useRef } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type CarBodyProps = {
  selectedParts: Record<string, boolean>;
  onPartClick: (partId: string, triggerRef: React.RefObject<SVGPathElement>) => void;
};

const carParts = [
    { id: "front-bumper", name: "Передній бампер", d: "M16.3,126.9V113h10.9c-2.3-15.3-4.5-30.6-6.8-45.9c-0.2-1.4-0.5-2.8-0.7-4.2H10v-9.3h10.5 c2.3-15.3,4.5-30.6,6.8-45.9c0.2-1.4,0.5-2.8,0.7-4.2H10v-9.3h19.6C30,1,30.3,0.5,30.7,0h11.2c0.4,0.5,0.7,1,0.9,1.5 c1.5,8.8,3,17.6,4.5,26.4h148.9c1.5-8.8,3-17.6,4.5-26.4c0.2-0.5,0.5-1,0.9-1.5h11.2c0.4,0.5,0.7,1,0.9,1.5 c2.3,15.3,4.5,30.6,6.8,45.9H233v9.3h-10.9c-2.3,15.3-4.5,30.6-6.8,45.9c-0.2,1.4-0.5,2.8-0.7,4.2H233v9.3h-19.6 c-0.4,0.5-0.7,1-0.9,1.5c-1.5,8.8-3,17.6-4.5,26.4H47.3c-1.5-8.8-3-17.6-4.5-26.4c-0.2-0.5-0.5-1-0.9-1.5H16.3z"},
    { id: "hood", name: "Капот", d: "M79.2,53.8V17.9h53.8v35.9H79.2z" },
    { id: "roof", name: "Дах", d: "M133,53.8V17.9h46.2v35.9H133z" },
    { id: "trunk", name: "Багажник", d: "M179.2,53.8V17.9h46.2v35.9H179.2z" },
    { id: "front-fender", name: "Переднє крило", d: "M79.2,108.9V53.8H27.2v55.1H79.2z" },
    { id: "front-door", name: "Передні двері", d: "M133,108.9V53.8H79.2v55.1H133z" },
    { id: "rear-door", name: "Задні двері", d: "M179.2,108.9V53.8H133v55.1H179.2z" },
    { id: "rear-fender", name: "Заднє крило", d: "M225.4,108.9V53.8h-46.2v55.1H225.4z" },
    { id: "rear-bumper", name: "Задній бампер", d: "M226.7,126.9V113h-10.9c2.3-15.3,4.5-30.6,6.8-45.9c0.2-1.4,0.5-2.8,0.7-4.2h10.2v-9.3h-10.5 c-2.3-15.3-4.5-30.6-6.8-45.9c-0.2-1.4-0.5-2.8-0.7-4.2h10.2v-9.3h-19.6c-0.4,0.5-0.7,1-0.9,1.5c-1.5,8.8-3,17.6-4.5,26.4h-148.9 c-1.5-8.8-3-17.6-4.5-26.4c-0.2-0.5-0.5-1-0.9-1.5H16.3C16,1,15.7,0.5,15.3,0H4.1c-0.4,0.5-0.7,1-0.9,1.5 c-2.3,15.3-4.5,30.6-6.8,45.9H-17v9.3h10.9c2.3,15.3,4.5,30.6,6.8,45.9c0.2,1.4,0.5,2.8,0.7,4.2H-17v9.3h19.6 c0.4,0.5,0.7,1,0.9,1.5c1.5,8.8,3,17.6,4.5,26.4h148.9c1.5-8.8,3-17.6,4.5-26.4c0.2-0.5,0.5-1,0.9-1.5H226.7z"},
];


export const CarBody: React.FC<CarBodyProps> = ({ selectedParts, onPartClick }) => {
    
    const renderPart = (part: typeof carParts[0]) => {
        const partRef = useRef<SVGPathElement>(null);

        const handlePartInteraction = () => {
            onPartClick(part.id, partRef);
        };

        return (
            <Tooltip key={part.id} delayDuration={0}>
                <TooltipTrigger asChild>
                    <path
                        ref={partRef}
                        id={part.id}
                        d={part.d}
                        onClick={handlePartInteraction}
                        className={`cursor-pointer transition-all duration-300 stroke-primary/50 stroke-[0.5] ${selectedParts[part.id] ? 'fill-primary/70' : 'fill-primary/10 hover:fill-primary/40'}`}
                    />
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-black text-white border-primary/50">
                    <p>{part.name}</p>
                </TooltipContent>
            </Tooltip>
        )
    }

    return (
        <TooltipProvider>
            <div className="w-full max-w-2xl mx-auto">
                 <div className="w-full">
                    <svg viewBox="-20 0 270 150" className="w-full drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]">
                       {/* Main body shape */}
                        <path 
                          d="M234.2,113h-1.2c-2-15.5-4.1-31-6.1-46.5c-0.2-1.4-0.4-2.8-0.6-4.2h10.8v-9.3h-10.5 c-2-15.5-4.1-31-6.1-46.5c-0.2-1.4-0.4-2.8-0.6-4.2h10.2v-9.3h-18.7c-0.4,0.5-0.6,1-0.8,1.5c-1.4,8.9-2.8,17.8-4.2,26.7H47.1 c-1.4-8.9-2.8-17.8-4.2-26.7c-0.2-0.5-0.5-1-0.8-1.5H23.4c-0.4,0.5-0.6,1-0.8,1.5c-2,15.5-4.1,31-6.1,46.5H5.1v9.3h10.8 c-2,15.5-4.1,31-6.1,46.5c-0.2,1.4-0.4,2.8-0.6,4.2H-1.2v9.3h18.7c0.4,0.5,0.6,1,0.8,1.5c1.4,8.9,2.8,17.8,4.2,26.7h165.3 c1.4-8.9,2.8-17.8,4.2-26.7c0.2-0.5,0.5-1,0.8-1.5H234.2z"
                          className="fill-transparent stroke-primary/30 stroke-[0.5]"
                        />
                        {/* Windows */}
                        <path 
                          d="M79.2,53.8L59.8,17.9h73.2l-19.4,35.9H79.2z M133,53.8L113.6,17.9h65.6l-19.4,35.9H133z"
                          className="fill-primary/20 stroke-primary/30 stroke-[0.5]"
                        />

                        <g>
                            {carParts.map(part => renderPart(part))}
                        </g>

                        {/* Wheels */}
                        <g className="fill-gray-800/50 stroke-primary/30 stroke-[0.5]">
                          <circle cx="53" cy="118" r="18" />
                          <circle cx="200" cy="118" r="18" />
                           <circle cx="53" cy="118" r="8" className="fill-gray-600/50"/>
                          <circle cx="200" cy="118" r="8" className="fill-gray-600/50"/>
                        </g>
                    </svg>
                 </div>
            </div>
        </TooltipProvider>
    );
};
