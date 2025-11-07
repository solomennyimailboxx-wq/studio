"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CarBody } from "./CarBody";
import { Check, Info, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const partPrices: Record<string, { name: string; price: number }> = {
    "front-bumper": { name: "Передній бампер", price: 250 },
    "rear-bumper": { name: "Задній бампер", price: 250 },
    "hood": { name: "Капот", price: 400 },
    "trunk": { name: "Багажник", price: 300 },
    "roof": { name: "Дах", price: 500 },
    "front-left-fender": { name: "Переднє ліве крило", price: 200 },
    "front-right-fender": { name: "Переднє праве крило", price: 200 },
    "rear-left-fender": { name: "Заднє ліве крило", price: 200 },
    "rear-right-fender": { name: "Заднє праве крило", price: 200 },
    "front-left-door": { name: "Передні ліві двері", price: 350 },
    "front-right-door": { name: "Передні праві двері", price: 350 },
    "rear-left-door": { name: "Задні ліві двері", price: 350 },
    "rear-right-door": { name: "Задні праві двері", price: 350 },
};

type SelectedParts = Record<string, boolean>;

export default function RepairCalculator() {
    const [selectedParts, setSelectedParts] = useState<SelectedParts>({});

    const handlePartClick = (partId: string) => {
        setSelectedParts(prev => ({ ...prev, [partId]: !prev[partId] }));
    };

    const { total, selectedItems } = useMemo(() => {
        const items = Object.entries(selectedParts)
            .filter(([, isSelected]) => isSelected)
            .map(([id]) => partPrices[id]);

        const total = items.reduce((sum, item) => sum + item.price, 0);

        return { total, selectedItems: items };
    }, [selectedParts]);


    return (
        <section id="calculator" className="py-20 md:py-32 bg-gray-900/50 text-white">
            <div className="container mx-auto px-4 md:px-6">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-400">Калькулятор вартості</h2>
                    <p className="mt-4 text-lg text-gray-300">
                        Отримайте миттєву попередню оцінку вартості фарбування. Просто оберіть пошкоджені деталі на схемі.
                    </p>
                </div>
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2">
                        <CarBody selectedParts={selectedParts} onPartClick={handlePartClick} />
                    </div>
                    <Card className="glassmorphism-card rounded-2xl sticky top-28">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ShoppingCart/>
                                Ваш розрахунок
                            </CardTitle>
                            <CardDescription className="flex items-start gap-2 pt-2 text-gray-400">
                                <Info className="h-4 w-4 mt-1 shrink-0"/>
                                <span>Це попередня вартість фарбування. Точна сума залежить від складності ремонту.</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="max-h-60 overflow-y-auto">
                            {selectedItems.length > 0 ? (
                                <ul className="space-y-2">
                                    {selectedItems.map(item => (
                                        <li key={item.name} className="flex justify-between items-center text-gray-200">
                                            <span>
                                                <Check className="h-4 w-4 inline mr-2 text-primary"/>
                                                {item.name}
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
