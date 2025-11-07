"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CarBody } from "./CarBody";
import { Check, Info, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";


const workPrices: Record<string, number> = {
  "Рихтування": 150,
  "Шпаклювання": 100,
  "Фарбування": 250,
  "Полірування": 50,
};

const partNames: Record<string, string> = {
    "front-bumper": "Передній бампер",
    "hood": "Капот",
    "roof": "Дах",
    "trunk": "Багажник",
    "front-door": "Передні двері",
    "rear-door": "Задні двері",
    "rear-fender": "Заднє крило",
    "left-fender": "Переднє крило",
    "right-fender": "Заднє крило",
    "rear-bumper": "Задній бампер",
};


type SelectedWork = Record<string, Record<string, boolean>>;

export default function RepairCalculator() {
    const [selectedWork, setSelectedWork] = useState<SelectedWork>({});
    const [popoverState, setPopoverState] = useState<{ open: boolean; target: string | null; triggerRef: React.RefObject<SVGElement> | null }>({ open: false, target: null, triggerRef: null });
    const popoverTriggerRef = useRef<HTMLDivElement>(null);


    const handlePartClick = useCallback((partId: string, triggerRef: React.RefObject<SVGElement>) => {
        // We use a dummy div as a PopoverTrigger and manually position it
        // because PopoverTrigger doesn't work well with SVG elements as children.
        const rect = triggerRef.current?.getBoundingClientRect();
        if (rect && popoverTriggerRef.current) {
            popoverTriggerRef.current.style.top = `${rect.top + window.scrollY + rect.height / 2}px`;
            popoverTriggerRef.current.style.left = `${rect.left + window.scrollX + rect.width / 2}px`;
        }
        setPopoverState({ open: true, target: partId, triggerRef });
    }, []);

    const handleWorkSelection = (partId: string, workType: string) => {
        setSelectedWork(prev => {
            const newWork = { ...prev };
            if (!newWork[partId]) {
                newWork[partId] = {};
            }
            
            // Toggle work type - for now, we allow multiple selections
            newWork[partId][workType] = !newWork[partId][workType];
            
            // If no work is selected for a part, remove it from the selection
            if (Object.values(newWork[partId]).every(v => !v)) {
                delete newWork[partId];
            }
            return newWork;
        });
    };
    
    const { total, selectedItems } = useMemo(() => {
        const items: { name: string; work: string; price: number }[] = [];
        let total = 0;

        for (const partId in selectedWork) {
            const partName = partNames[partId];
            if (!partName) continue;

            for (const workType in selectedWork[partId]) {
                if (selectedWork[partId][workType]) {
                    const price = workPrices[workType];
                    items.push({
                        name: partName,
                        work: workType,
                        price: Math.round(price)
                    });
                    total += price;
                }
            }
        }
        
        return { total: Math.round(total), selectedItems: items };
    }, [selectedWork]);
    
    const selectedPartsForHighlight = useMemo(() => {
        return Object.keys(selectedWork).reduce((acc, partId) => {
            acc[partId] = true;
            return acc;
        }, {} as Record<string, boolean>);
    }, [selectedWork]);


    return (
        <section id="calculator" className="py-20 md:py-32 bg-gray-900/50 text-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">Калькулятор вартості</h2>
                    <p className="mt-4 text-lg text-gray-300">
                        Отримайте миттєву попередню оцінку. Клікніть на деталь, щоб обрати тип робіт.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                    <div className="lg:col-span-3 p-4 md:p-8 rounded-2xl relative">
                        <Popover open={popoverState.open} onOpenChange={(open) => setPopoverState(p => ({ ...p, open }))}>
                             <PopoverTrigger asChild>
                                <div ref={popoverTriggerRef} className="absolute w-0 h-0"></div>
                            </PopoverTrigger>
                            <CarBody selectedParts={selectedPartsForHighlight} onPartClick={handlePartClick} />
                            <PopoverContent 
                                side="top" 
                                align="center"
                                className="w-auto bg-black/80 backdrop-blur-lg border-primary/50 text-white p-4"
                            >
                                {popoverState.target && (
                                    <div className="space-y-3">
                                        <h4 className="font-bold text-lg text-primary">{partNames[popoverState.target]}</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            {Object.entries(workPrices).map(([work, price]) => (
                                                <Button
                                                    key={work}
                                                    variant={selectedWork[popoverState.target!]?.[work] ? "default" : "secondary"}
                                                    onClick={() => handleWorkSelection(popoverState.target!, work)}
                                                    className="justify-between"
                                                >
                                                    <span>{work}</span>
                                                    <span className="font-mono text-xs opacity-75">${price}</span>
                                                </Button>
                                            ))}
                                        </div>
                                         <Button variant="ghost" size="sm" onClick={() => setPopoverState({ open: false, target: null, triggerRef: null })} className="w-full mt-2">
                                            <X className="mr-2 h-4 w-4"/>
                                            Закрити
                                        </Button>
                                    </div>
                                )}
                            </PopoverContent>
                        </Popover>
                    </div>
                    <Card className="lg:col-span-2 glassmorphism-card rounded-2xl sticky top-28">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ShoppingCart/>
                                Ваш розрахунок
                            </CardTitle>
                            <CardDescription className="flex items-start gap-2 pt-2 text-gray-400">
                                <Info className="h-4 w-4 mt-1 shrink-0"/>
                                <span>Це попередня вартість. Точна сума залежить від складності пошкоджень.</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="max-h-60 overflow-y-auto">
                            {selectedItems.length > 0 ? (
                                <ul className="space-y-2">
                                    {selectedItems.map((item, index) => (
                                        <li key={`${item.name}-${item.work}-${index}`} className="flex justify-between items-center text-gray-200 text-sm">
                                            <span>
                                                <Check className="h-4 w-4 inline mr-2 text-primary"/>
                                                {item.name} <span className="text-gray-400">({item.work})</span>
                                            </span>
                                            <span className="font-mono">${item.price}</span>
                                        </li>

                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-400 text-center py-8">Оберіть деталі на схемі для розрахунку</p>
                            )}
                        </CardContent>
                        <CardFooter className="flex flex-col items-stretch gap-4 pt-6 mt-4 border-t border-primary/20">
                            <div className="flex justify-between items-center text-2xl font-bold">
                                <span>Всього:</span>
                                <span className="font-mono">${total}</span>
                            </div>
                            <Button asChild size="lg" className="w-full text-lg bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-105 transition-transform hover:shadow-[0_0_15px_hsl(var(--primary))]" disabled={total === 0}>
                                <Link href="#contact">
                                    Записатись на огляд
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </section>
    )
}
