import React from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type CarBodyProps = {
  selectedParts: Record<string, boolean>;
  onPartClick: (partId: string) => void;
};

const carParts = [
    { id: "front-bumper", name: "Передній бампер", d: "M15,25 h70 v10 h-70 z" },
    { id: "hood", name: "Капот", d: "M20,35 h60 v15 h-60 z" },
    { id: "front-right-fender", name: "Переднє праве крило", d: "M80,35 h5 v30 h-5 z" },
    { id: "front-left-fender", name: "Переднє ліве крило", d: "M15,35 h-5 v30 h5 z" },
    { id: "front-right-door", name: "Передні праві двері", d: "M80,65 h5 v30 h-5 z" },
    { id: "front-left-door", name: "Передні ліві двері", d: "M15,65 h-5 v30 h5 z" },
    { id: "rear-right-door", name: "Задні праві двері", d: "M80,95 h5 v30 h-5 z" },
    { id: "rear-left-door", name: "Задні ліві двері", d: "M15,95 h-5 v30 h5 z" },
    { id: "roof", name: "Дах", d: "M20,50 h60 v60 h-60 z" },
    { id: "rear-right-fender", name: "Заднє праве крило", d: "M80,125 h5 v20 h-5 z" },
    { id: "rear-left-fender", name: "Заднє ліве крило", d: "M15,125 h-5 v20 h5 z" },
    { id: "trunk", name: "Багажник", d: "M20,145 h60 v10 h-60 z" },
    { id: "rear-bumper", name: "Задній бампер", d: "M15,155 h70 v10 h-70 z" },
];

export const CarBody: React.FC<CarBodyProps> = ({ selectedParts, onPartClick }) => {
    // A more abstract representation of a car from top-down view
    return (
        <TooltipProvider>
            <div className="w-full max-w-lg mx-auto">
                 <svg viewBox="0 0 100 180" className="w-full drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]">
                    <g className="stroke-primary/50 stroke-2 fill-transparent">
                        {/* Main Body */}
                        <path d="M15,25 C5,25 5,25 10,65 L10,125 C5,125 5,165 15,165 H85 C95,165 95,125 90,125 L90,65 C95,25 95,25 85,25 H15 Z" />
                        {/* Windshield */}
                        <path d="M20,50 L80,50 L75,65 L25,65 Z" />
                        {/* Rear window */}
                        <path d: "M25 110 L75 110 L80 125 L20 125 Z" />
                    </g>
                    {carParts.map(part => (
                        <Tooltip key={part.id} delayDuration={0}>
                            <TooltipTrigger asChild>
                                <path
                                    d={part.d}
                                    onClick={() => onPartClick(part.id)}
                                    className={`cursor-pointer transition-all duration-200 ${selectedParts[part.id] ? 'fill-primary/70 stroke-primary' : 'fill-primary/20 hover:fill-primary/40'}`}
                                />
                            </TooltipTrigger>
                            <TooltipContent side="top" className="bg-black text-white border-primary/50">
                                <p>{part.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    ))}
                </svg>
            </div>
        </TooltipProvider>
    );
};
