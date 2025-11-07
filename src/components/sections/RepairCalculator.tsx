"use client";

import { useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CarBody } from "./CarBody";
import { Check, Info, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

// Prices for different types of work
const workPrices: Record<string, number> = {
  "рихтування": 150,
  "шпаклювання": 100,
  "фарбування": 250,
  "полірування": 50,
};

// Base price multipliers for each car part
const partMultipliers: Record<string, { name: string; multiplier: number }> = {
    "front-bumper": { name: "Передній бампер", multiplier: 1.2 },
    "rear-bumper": { name: "Задній бампер", multiplier: 1.2 },
    "hood": { name: "Капот", multiplier: 1.8 },
    "trunk": { name: "Багажник", multiplier: 1.5 },
    "roof": { name: "Дах", multiplier: 2.0 },
    "front-left-fender": { name: "Переднє ліве крило", multiplier: 1.0 },
    "front-right-fender": { name: "Переднє праве крило", multiplier: 1.0 },
    "rear-left-fender": { name: "Заднє ліве крило", multiplier: 1.1 },
    "rear-right-fender": { name: "Заднє праве крило", multiplier: 1.1 },
    "front-door": { name: "Передні двері", multiplier: 1.4 },
    "rear-door": { name: "Задні двері", multiplier: 1.4 },
};

type SelectedWork = Record<string, Record<string, boolean>>;

export default function RepairCalculator() {
    const [selectedWork, setSelectedWork] = useState<SelectedWork>({});
    const [popoverState, setPopoverState] = useState<{ open: boolean; target: string | null }>({ open: false, target: null });

    const handlePartClick = useCallback((partId: string, triggerRef: React.RefObject<SVGPathElement>) => {
        setPopoverState({ open: true, target: partId });
    }, []);

    const handleWorkSelection = (partId: string, workType: string) => {
        setSelectedWork(prev => {
            const newWork = { ...prev };
            if (!newWork[partId]) {
                newWork[partId] = {};
            }
            newWork[partId][workType] = !newWork[partId][workType];
            
            // If all work types for a part are deselected, remove the part key
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
            const partInfo = partMultipliers[partId];
            if (!partInfo) continue;

            for (const workType in selectedWork[partId]) {
                if (selectedWork[partId][workType]) {
                    const price = workPrices[workType] * partInfo.multiplier;
                    items.push({
                        name: partInfo.name,
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
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2 glassmorphism-card p-4 md:p-8 rounded-2xl">
                         <Popover open={popoverState.open} onOpenChange={(open) => setPopoverState(p => ({ ...p, open }))}>
                            <PopoverTrigger asChild>
                                <div id="car-body-trigger-wrapper" className="w-full h-full">
                                    <CarBody selectedParts={selectedPartsForHighlight} onPartClick={handlePartClick} />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent 
                                side="top" 
                                align="center"
                                className="w-auto bg-black/80 backdrop-blur-lg border-primary/50 text-white p-4"
                                style={{
                                    left: `var(--radix-popover-trigger-position)`
                                }}
                            >
                                {popoverState.target && (
                                    <div className="space-y-3">
                                        <h4 className="font-bold text-lg text-primary">{partMultipliers[popoverState.target].name}</h4>
                                        <div className="grid grid-cols-2 gap-2">
                                            {Object.entries(workPrices).map(([work, price]) => (
                                                <Button
                                                    key={work}
                                                    variant={selectedWork[popoverState.target!]?.[work] ? "default" : "secondary"}
                                                    onClick={() => handleWorkSelection(popoverState.target!, work)}
                                                    className="justify-between"
                                                >
                                                    <span>{work.charAt(0).toUpperCase() + work.slice(1)}</span>
                                                    <span className="font-mono text-xs opacity-75">${Math.round(price * partMultipliers[popoverState.target!].multiplier)}</span>
                                                </Button>
                                            ))}
                                        </div>
                                         <Button variant="ghost" size="sm" onClick={() => setPopoverState({ open: false, target: null })} className="w-full mt-2">
                                            <X className="mr-2 h-4 w-4"/>
                                            Закрити
                                        </Button>
                                    </div>
                                )}
                            </PopoverContent>
                        </Popover>
                    </div>
                    <Card className="glassmorphism-card rounded-2xl sticky top-28">
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
                                <p className="text-gray-400 text-center py-8">Оберіть деталі на схемах для розрахунку</p>
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
