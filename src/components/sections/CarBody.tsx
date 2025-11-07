import React, { useRef, MouseEvent } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useComposedRefs } from '@/hooks/use-composed-refs';

type CarBodyProps = {
  selectedParts: Record<string, boolean>;
  onPartClick: (partId: string, triggerRef: React.RefObject<SVGPathElement>) => void;
};

const carParts = [
    { id: "hood", name: "Капот", d: "M25,15 h50 v35 h-50 z" },
    { id: "roof", name: "Дах", d: "M22,55 h56 v60 h-56 z" },
    { id: "trunk", name: "Багажник", d: "M25,120 h50 v25 h-50 z" },
    { id: "front-left-fender", name: "Переднє ліве крило", d: "M15,18 h10 l-2,30 h-8 z" },
    { id: "front-right-fender", name: "Переднє праве крило", d: "M75,18 h10 l-2,30 h-8 z" },
    { id: "rear-left-fender", name: "Заднє ліве крило", d: "M15,115 h10 v28 l-10,2 z" },
    { id: "rear-right-fender", name: "Заднє праве крило", d: "M75,115 h10 v28 l-10,2 z" },
    { id: "front-bumper", name: "Передній бампер", d: "M288,75 h-18 l-10,-15 h-5 l-5,15 h-10 v20 h48 z" },
    { id: "front-door", name: "Передні двері", d: "M195,65 h50 v55 h-50 z" },
    { id: "rear-door", name: "Задні двері", d: "M145,65 h50 v55 h-50 z" },
    { id: "rear-bumper", name: "Задній бампер", d: "M30,75 h20 l5-15 h5 l5,15 h5 v20 h-35 z" },
];


export const CarBody: React.FC<CarBodyProps> = ({ selectedParts, onPartClick }) => {
    
    // This ref will be attached to the PopoverTrigger wrapper
    const triggerRef = useRef<HTMLDivElement>(null);

    const renderPart = (partId: string) => {
        const part = carParts.find(p => p.id === partId);
        if (!part) return null;
        
        const partRef = useRef<SVGPathElement>(null);

        const handlePartInteraction = (event: MouseEvent<SVGPathElement>) => {
            // We pass the ref to the specific SVG part to the parent
            onPartClick(part.id, partRef);
        };

        return (
            <Tooltip key={part.id} delayDuration={0}>
                <TooltipTrigger asChild>
                    <path
                        ref={partRef}
                        d={part.d}
                        onClick={handlePartInteraction}
                        className={`cursor-pointer transition-all duration-200 ${selectedParts[part.id] ? 'fill-primary/70 stroke-primary' : 'fill-primary/20 hover:fill-primary/40'}`}
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
            <div ref={triggerRef} className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                 <div className="w-full">
                    <h3 className="text-center text-lg font-semibold text-primary mb-4">Вид зверху</h3>
                    <svg viewBox="0 0 100 160" className="w-full drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]">
                        <g className="stroke-primary/50 stroke-1 fill-transparent">
                            {/* Main Body Top */}
                            <path d="M15,20 a10,10 0 0,0 -5,5 v110 a10,10 0 0,0 5,5 h70 a10,10 0 0,0 5,-5 v-110 a10,10 0 0,0 -5,-5 h-70 z" />
                            {/* Windshield */}
                            <path d="M25,50 l50,0 -5,15 h-40 z" />
                            {/* Rear window */}
                            <path d="M25,115 l50,0 5,-15 h-60 z" />
                        </g>
                        {renderPart("hood")}
                        {renderPart("roof")}
                        {renderPart("trunk")}
                        {renderPart("front-left-fender")}
                        {renderPart("front-right-fender")}
                        {renderPart("rear-left-fender")}
                        {renderPart("rear-right-fender")}
                    </svg>
                 </div>
                 <div className="w-full">
                    <h3 className="text-center text-lg font-semibold text-primary mb-4">Вид збоку</h3>
                    <svg viewBox="0 0 300 140" className="w-full drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]">
                         <g className="stroke-primary/50 stroke-1 fill-transparent">
                             {/* Main Body Side */}
                            <path d="M285,80 a40,40 0 0,1 -20,15 h-220 a30,30 0 0,1 -25,-15 l-10,-20 a10,10 0 0,1 10,-10 h260 a10,10 0 0,1 10,10 l-5,20 z" />
                            {/* Roof and windows */}
                            <path d="M245,65 h-150 a10,10 0 0,0 -10,-10 l-10,-20 a5,5 0 0,1 5,-5 h150 a10,10 0 0,1 10,10 v25 z" />
                            {/* Wheels */}
                            <circle cx="70" cy="95" r="15" />
                            <circle cx="230" cy="95" r="15" />
                        </g>
                        {renderPart("front-bumper")}
                        {renderPart("front-door")}
                        {renderPart("rear-door")}
                        {renderPart("rear-bumper")}
                        {renderPart("hood")}
                        {renderPart("trunk")}
                        {renderPart("roof")}
                    </svg>
                 </div>
            </div>
        </TooltipProvider>
    );
};
