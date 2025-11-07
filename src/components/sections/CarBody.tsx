import React, { useRef, MouseEvent } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type CarBodyProps = {
  selectedParts: Record<string, boolean>;
  onPartClick: (partId: string, triggerRef: React.RefObject<SVGPathElement>) => void;
};

const carParts = [
    { id: "front-bumper", name: "Передній бампер", d: "M558.1,95.2c-15.6-0.1-30.8,4.2-44.1,11.9l-31.1-11.9H347.3l-28.9,11.9c-12.7-7.9-27-12.3-42.3-12.3H42.9v23.8h233.2c15.3,0,29.6,4.4,42.3,12.3l28.9-11.9h135.6l31.1,11.9c13.3-7.7,28.5-11.9,44.1-12.3H600V95.2H558.1z" },
    { id: "hood", name: "Капот", d: "M347.3,107.1l-31.1,23.8H180.6l-31.1-23.8H42.9v47.6h106.6l31.1,23.8h166.7l31.1-23.8h221.7V107.1H347.3z" },
    { id: "roof", name: "Дах", d: "M336.7,178.6l-31.1,23.8H211.7l-31.1-23.8h-57v47.6h42.4l31.1,23.8h135.6l31.1-23.8h174.9v-47.6H336.7z" },
    { id: "trunk", name: "Багажник", d: "M558.1,178.6H384.3l-31.1,23.8H123.6L92.5,178.6H42.9v47.6h50.2l31.1,23.8h250l31.1-23.8h194.8v-47.6H558.1z" },
    { id: "front-fender", name: "Переднє крило", d: "M149.5,107.1H42.9v47.6h106.6V107.1z" },
    { id: "front-door", name: "Передні двері", d: "M282.9,154.8H180.6v47.6h102.3V154.8z" },
    { id: "rear-door", name: "Задні двері", d: "M384.3,154.8H282.9v47.6h101.4V154.8z" },
    { id: "rear-fender", name: "Заднє крило", d: "M558.1,154.8H384.3v23.8h173.8V154.8z" },
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
                            {/* Main Body */}
                            <path d="M571.4,85.2c-10.9-25-32.5-42.6-59.2-49.4l-50.2-12.9H138.1L87.9,35.8C61.2,42.6,39.6,60.2,28.6,85.2H0v119h50.2 c3.6,11.3,10.6,21.3,20.2,28.6h459.5c9.6-7.2,16.6-17.3,20.2-28.6H600v-119H571.4z" 
                            className="fill-transparent stroke-primary/50 stroke-1"
                            />
                            {/* Windows */}
                            <path d="M386,47.6L267.3,47.6l-33.5,37.6h183.3L386,47.6z M233.8,85.2l-31.1,37.6h-59.2l31.1-37.6H233.8z M417.1,85.2l-31.1,37.6H267.3l31.1-37.6H417.1z"
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
