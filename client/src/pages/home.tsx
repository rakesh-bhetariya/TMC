import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import ModeToggle from "@/components/ModeToggle";
import CustomerInfo from "@/components/CustomerInfo";
import CalculatorInput from "@/components/CalculatorInput";
import CalculationTable, { CalculationItem } from "@/components/CalculationTable";
import WeightSummary from "@/components/WeightSummary";
import CostEstimate from "@/components/CostEstimate";
import SpecTable from "@/components/SpecTable";
import HistoryModal, { SavedEstimate } from "@/components/HistoryModal";
import { Trash2, History } from "lucide-react";
import { calculateWeightFromBhari, calculateWeightFromBars, calculatePrice, roundUpToBhariMultiple } from "@/lib/tmtData";

const STORAGE_KEY = 'tmt-calculator-history';

export default function Home() {
  const [mode, setMode] = useState<'bhari' | 'bars'>('bhari');
  const [customerName, setCustomerName] = useState<string>('');
  const [deliveryAddress, setDeliveryAddress] = useState<string>('');
  const [basePrice, setBasePrice] = useState<number>(0);
  const [items, setItems] = useState<CalculationItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [savedEstimates, setSavedEstimates] = useState<SavedEstimate[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSavedEstimates(JSON.parse(stored));
      } catch (e) {
        console.error('Failed to load history:', e);
      }
    }
  }, []);

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
    setBasePrice(0);
    console.log('Cleared all items');
  };

  const totalWeight = items.reduce((sum, item) => {
    const roundedQuantity = item.mode === 'bars' 
      ? roundUpToBhariMultiple(item.diameter, item.quantity)
      : item.quantity;
    
    const weight = item.mode === 'bhari' 
      ? calculateWeightFromBhari(item.diameter, item.quantity)
      : calculateWeightFromBars(item.diameter, roundedQuantity);
    return sum + weight;
  }, 0);

  const totalCost = items.reduce((sum, item) => {
    const roundedQuantity = item.mode === 'bars' 
      ? roundUpToBhariMultiple(item.diameter, item.quantity)
      : item.quantity;
    
    const weight = item.mode === 'bhari' 
      ? calculateWeightFromBhari(item.diameter, item.quantity)
      : calculateWeightFromBars(item.diameter, roundedQuantity);
    const price = calculatePrice(item.diameter, basePrice);
    return sum + (weight * price);
  }, 0);

  const handleSaveEstimate = () => {
    const estimate: SavedEstimate = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      customerName,
      deliveryAddress,
      items,
      basePrice,
      totalCost,
      totalWeight,
    };

    const updated = [estimate, ...savedEstimates];
    setSavedEstimates(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    
    console.log('Estimate saved to history');
    
    // Clear current estimate
    setCustomerName('');
    setDeliveryAddress('');
    setItems([]);
    setBasePrice(0);
  };

  const handleLoadEstimate = (estimate: SavedEstimate) => {
    setCustomerName(estimate.customerName);
    setDeliveryAddress(estimate.deliveryAddress);
    setItems(estimate.items);
    setBasePrice(estimate.basePrice);
    console.log('Loaded estimate from history');
  };

  const handleDeleteEstimate = (id: string) => {
    const updated = savedEstimates.filter(est => est.id !== id);
    setSavedEstimates(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    console.log('Deleted estimate from history');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        <div className="space-y-6">
          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => setShowHistory(true)}
              data-testid="button-view-history"
            >
              <History className="h-4 w-4 mr-2" />
              View History
            </Button>
          </div>

          <CustomerInfo
            customerName={customerName}
            deliveryAddress={deliveryAddress}
            onCustomerNameChange={setCustomerName}
            onDeliveryAddressChange={setDeliveryAddress}
          />

          <ModeToggle mode={mode} onModeChange={setMode} />
          
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
            onRemoveItem={handleRemoveItem} 
          />

          {items.length > 0 && (
            <WeightSummary
              totalWeight={totalWeight}
              basePrice={basePrice}
              onBasePriceChange={setBasePrice}
              showPriceInput={true}
            />
          )}

          {basePrice > 0 && items.length > 0 && (
            <CostEstimate
              items={items}
              basePrice={basePrice}
              customerName={customerName}
              deliveryAddress={deliveryAddress}
              onSave={handleSaveEstimate}
            />
          )}
          
          <SpecTable />
        </div>
      </main>
      
      <footer className="border-t py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2024 InfraOne TMT Calculator. All rights reserved.</p>
        </div>
      </footer>

      <HistoryModal
        open={showHistory}
        onOpenChange={setShowHistory}
        estimates={savedEstimates}
        onLoad={handleLoadEstimate}
        onDelete={handleDeleteEstimate}
      />
    </div>
  );
}
