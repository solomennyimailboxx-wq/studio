import React, { useRef } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type CarBodyProps = {
  selectedParts: Record<string, boolean>;
  onPartClick: (partId: string, triggerRef: React.RefObject<SVGPathElement>) => void;
};

const carParts = [
    { id: "front-bumper", name: "Передній бампер", d: "M2,106.3c1.4-6.3,3.4-12.4,5.9-18.2h28.1v23.8H12.3C8.1,110.1,4.6,108.4,2,106.3z" },
    { id: "hood", name: "Капот", d: "M149.3,88.1H36.1V64.3h123.4L149.3,88.1z" },
    { id: "roof", name: "Дах", d: "M361.3,64.3H170.1l19.5-23.8h152.2L361.3,64.3z" },
    { id: "trunk", name: "Багажник", d: "M371.6,88.1h105.2V64.3H371.6V88.1z" },
    { id: "front-fender", name: "Переднє крило", d: "M149.3,111.9H36.1v-23.8h113.2V111.9z" },
    { id: "front-door", name: "Передні двері", d: "M259.9,111.9H159.5V64.3h100.4V111.9z" },
    { id: "rear-door", name: "Задні двері", d: "M361.3,111.9H259.9V64.3h101.4V111.9z" },
    { id: "rear-fender", name: "Заднє крило", d: "M476.8,111.9H371.6v-23.8h105.2V111.9z" },
    { id: "rear-bumper", name: "Задній бампер", d: "M512.3,106.3c-2.6,2.1-6.1,3.8-10.3,5.6h-23.8v-23.8h28.1C508.9,93.9,510.9,100,512.3,106.3z" },
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
                    <svg viewBox="0 0 514 150" className="w-full drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]">
                       {/* Main body shape */}
                        <path 
                          d="M512.3,106.3c-1.4,6.3-3.4,12.4-5.9,18.2H40.2c-5.1-4-9.3-9-12.3-14.8H2V88.1h28.1V64.3h123.4L170.1,40.5h19.5h152.2l19.5,23.8H476.8v23.8h28.1v23.8H498.4C502.6,109.9,507.2,108.5,512.3,106.3z"
                          className="fill-transparent stroke-primary/30 stroke-[0.5]"
                        />
                        {/* Windows */}
                        <path 
                          d="M259.9,64.3H170.1l10.2-12.4h79.6V64.3z M361.3,64.3H259.9V51.8h91.1L361.3,64.3z"
                          className="fill-primary/20 stroke-primary/30 stroke-[0.5]"
                        />

                        <g>
                            {carParts.map(part => renderPart(part))}
                        </g>

                        {/* Wheels */}
                        <g className="fill-gray-800/50 stroke-primary/30 stroke-[0.5]">
                          <circle cx="92.7" cy="111.9" r="23.8" />
                          <circle cx="423.2" cy="111.9" r="23.8" />
                           <circle cx="92.7" cy="111.9" r="10" className="fill-gray-600/50"/>
                          <circle cx="423.2" cy="111.9" r="10" className="fill-gray-600/50"/>
                        </g>
                    </svg>
                 </div>
            </div>
        </TooltipProvider>
    );
};
