import { useState } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ModeToggle from "@/components/ModeToggle";
import BasePriceInput from "@/components/BasePriceInput";
import CalculatorInput from "@/components/CalculatorInput";
import CalculationTable, { CalculationItem } from "@/components/CalculationTable";
import SpecTable from "@/components/SpecTable";
import InstallInstructions from "@/components/InstallInstructions";
import { Trash2 } from "lucide-react";

export default function Home() {
  const [mode, setMode] = useState<'bhari' | 'bars'>('bhari');
  const [basePrice, setBasePrice] = useState<number>(50000);
  const [items, setItems] = useState<CalculationItem[]>([]);

  const handleAddItem = (diameter: number, quantity: number) => {
    const newItem: CalculationItem = {
      id: Date.now().toString(),
      diameter,
      quantity,
      mode,
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleClearAll = () => {
    setItems([]);
    console.log('Cleared all items');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6">
          <ModeToggle mode={mode} onModeChange={setMode} />
          
          <BasePriceInput basePrice={basePrice} onBasePriceChange={setBasePrice} />
          
          <CalculatorInput mode={mode} onAddItem={handleAddItem} />
          
          {items.length > 0 && (
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={handleClearAll}
                className="text-destructive hover:text-destructive"
                data-testid="button-clear-all"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            </div>
          )}
          
          <CalculationTable 
            items={items} 
            basePrice={basePrice} 
            onRemoveItem={handleRemoveItem} 
          />
          
          <SpecTable />
          
          <InstallInstructions />
        </div>
      </main>
      
      <footer className="border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 InfraOne TMT Calculator. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
