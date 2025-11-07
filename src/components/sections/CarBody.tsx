import React, { useRef } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type CarBodyProps = {
  selectedParts: Record<string, any>;
  onPartClick: (partId: string, triggerRef: React.RefObject<SVGPathElement>) => void;
};

const carParts = [
    { id: "rear-bumper", name: "Задній бампер" },
    { id: "trunk", name: "Багажник" },
    { id: "rear-door", name: "Задні двері" },
    { id: "front-door", name: "Передні двері" },
    { id: "hood", name: "Капот" },
    { id: "front-bumper", name: "Передній бампер" },
    { id: "roof", name: "Дах" },
    { id: "left-fender", name: "Переднє крило" },
    { id: "right-fender", name: "Заднє крило" },
];

const partPaths: Record<string, string> = {
    "rear-bumper": "M1010 220 L1140 220 L1140 260 L1020 260 Q1005 255 990 250 L990 240 Z",
    "trunk": "M890 170 L1010 170 L1010 220 L990 240 L900 240 Z",
    "rear-door": "M700 140 L890 140 L900 240 L720 240 Z",
    "front-door": "M520 140 L700 140 L720 240 L540 240 Z",
    "hood": "M360 160 L520 160 L540 240 L380 240 Z",
    "front-bumper": "M160 220 L360 220 L380 240 L220 260 Q190 255 160 250 Z",
    "roof": "M500 100 L700 100 L820 140 L680 160 L560 160 L420 140 Z",
    "left-fender": "M300 190 Q250 170 220 170 L220 200 L300 200 Z",
    "right-fender": "M920 190 Q940 170 980 170 L980 200 L920 200 Z",
};

const CarPart = ({ part, selected, onClick }: { part: {id: string, name: string}, selected: boolean, onClick: (partId: string, triggerRef: React.RefObject<SVGPathElement>) => void }) => {
    const partRef = useRef<SVGPathElement>(null);

    const handlePartInteraction = () => {
        onClick(part.id, partRef);
    };
    
    return (
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
                <path
                    ref={partRef}
                    id={part.id}
                    d={partPaths[part.id]}
                    onClick={handlePartInteraction}
                    className={`car-part ${selected ? 'selected' : ''}`}
                />
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-black text-white border-primary/50">
                <p>{part.name}</p>
            </TooltipContent>
        </Tooltip>
    );
};


export const CarBody: React.FC<CarBodyProps> = ({ selectedParts, onPartClick }) => {
    return (
        <TooltipProvider>
            <div className="w-full max-w-4xl mx-auto">
                <svg viewBox="0 0 1200 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Інтерактивний боковий силует автомобіля">
                    {/* baseline shadow */}
                    <ellipse cx="600" cy="360" rx="380" ry="20" fill="#000000" fillOpacity="0.18"/>
                    
                    {carParts.map(part => (
                        <CarPart 
                            key={part.id}
                            part={part}
                            selected={!!selectedParts[part.id]}
                            onClick={onPartClick}
                        />
                    ))}

                    {/* door outlines (thin strokes for realism) */}
                    <g stroke="#c7d6df" strokeWidth="1" fill="none" opacity="0.5">
                        <path d="M360 160 L520 160 L540 240 L380 240 Z"/>
                        <path d="M520 160 L700 140 L720 240 L540 240 Z"/>
                        <path d="M700 140 L890 140 L900 240 L720 240 Z"/>
                        <path d="M890 140 L1010 170 L990 240 L900 240 Z"/>
                        <path d="M160 220 L360 220 L380 240 L220 260"/>
                    </g>

                    {/* windows (visual) */}
                    <path d="M520 120 L680 120 L760 150 L670 160 L570 160 L480 140 Z" fill="#0b2a38" fillOpacity="0.55"/>

                    {/* wheels */}
                    <g transform="translate(360,260)">
                        <circle className="wheels" cx="0" cy="0" r="48" fill="#222"/>
                        <circle cx="0" cy="0" r="20" fill="#6f7a82"/>
                    </g>
                    <g transform="translate(820,260)">
                        <circle className="wheels" cx="0" cy="0" r="48" fill="#222"/>
                        <circle cx="0" cy="0" r="20" fill="#6f7a82"/>
                    </g>

                    {/* subtle details (lines) */}
                    <path d="M400 210 L760 210" stroke="#8fb6c8" strokeWidth="1" strokeOpacity="0.14" fill="none"/>
                </svg>
            </div>
        </TooltipProvider>
    );
};
