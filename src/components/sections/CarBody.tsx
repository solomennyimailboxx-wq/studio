import React, { useRef } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type CarBodyProps = {
  selectedParts: Record<string, boolean>;
  onPartClick: (partId: string, triggerRef: React.RefObject<SVGPathElement>) => void;
};

const carParts = [
    { id: "front-bumper", name: "Передній бампер", d: "M28.6,85.2H0v119h50.2c-0.1-2-0.2-4-0.2-6V95.2C42.9,95.2,35.8,89.5,28.6,85.2z" },
    { id: "hood", name: "Капот", d: "M233.8,85.2L202.7,123H42.9V85.2H233.8z" },
    { id: "roof", name: "Дах", d: "M384.3,85.2H233.8v37.6h150.5V85.2z" },
    { id: "trunk", name: "Багажник", d: "M558.1,85.2H384.3v37.6h173.8V85.2z" },
    { id: "front-fender", name: "Переднє крило", d: "M149.5,123H42.9v31.8h106.6V123z" },
    { id: "front-door", name: "Передні двері", d: "M282.9,123H149.5v55.6h133.4V123z" },
    { id: "rear-door", name: "Задні двері", d: "M417.1,123H282.9v55.6h134.2V123z" },
    { id: "rear-fender", name: "Заднє крило", d: "M558.1,123H417.1v31.8h141V123z" },
    { id: "rear-bumper", name: "Задній бампер", d: "M550,204h-459.5c-9.6-7.2-16.6-17.3-20.2-28.6H0v-10.4h28.6c-0.1,2.7-0.2,5.4-0.2,8.2 c0,1,0,2.1,0.1,3.1H571.4c0.1-1,0.1-2.1,0.1-3.1c0-2.8-0.1-5.5-0.2-8.2H600v10.4h-50 C566.6,186.7,559.6,196.8,550,204z" },
];


export const CarBody: React.FC<CarBodyProps> = ({ selectedParts, onPartClick }) => {
    
    const renderPart = (partId: string) => {
        const part = carParts.find(p => p.id === partId);
        if (!part) return null;
        
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
                        className={`cursor-pointer transition-all duration-200 stroke-primary/50 stroke-1 ${selectedParts[part.id] ? 'fill-primary/70 stroke-primary' : 'fill-primary/20 hover:fill-primary/40'}`}
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
                    <svg viewBox="0 0 600 250" className="w-full drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]">
                        <g>
                            {/* Main Body Outline */}
                            <path d="M571.4,85.2c-10.9-25-32.5-42.6-59.2-49.4l-50.2-12.9H138.1L87.9,35.8C61.2,42.6,39.6,60.2,28.6,85.2H0v119h50.2 c3.6,11.3,10.6,21.3,20.2,28.6h459.5c9.6-7.2,16.6-17.3,20.2-28.6H600v-119H571.4z" 
                            className="fill-transparent stroke-primary/50 stroke-1"
                            />
                            
                            {/* Windows Area */}
                            <path d="M384.3,85.2L267.3,47.6h-33.5l-31.1,37.6h183.3L384.3,85.2z M233.8,85.2l-31.1,37.6h-59.2l31.1-37.6H233.8z M417.1,85.2l-31.1,37.6H267.3l31.1-37.6H417.1z"
                            className="fill-primary/10 stroke-primary/50 stroke-1"
                            />
                        </g>
                        <g>
                            {carParts.map(part => renderPart(part.id))}
                        </g>

                        {/* Wheels */}
                        <g className="fill-gray-800 stroke-primary/30 stroke-1">
                          <circle cx="135" cy="180" r="30" />
                          <circle cx="465" cy="180" r="30" />
                          <circle cx="135" cy="180" r="10" className="fill-gray-600"/>
                          <circle cx="465" cy="180" r="10" className="fill-gray-600"/>
                        </g>
                    </svg>
                 </div>
            </div>
        </TooltipProvider>
    );
};
