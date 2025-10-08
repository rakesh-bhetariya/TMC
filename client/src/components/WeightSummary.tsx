import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IndianRupee } from "lucide-react";

interface WeightSummaryProps {
  totalWeight: number;
  basePrice: number;
  onBasePriceChange: (price: number) => void;
  showPriceInput: boolean;
}

export default function WeightSummary({
  totalWeight,
  basePrice,
  onBasePriceChange,
  showPriceInput,
}: WeightSummaryProps) {
  return (
    <Card className="p-4 bg-primary/5">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Total Weight</h3>
          <p className="text-2xl font-mono font-bold text-primary" data-testid="text-summary-weight">
            {totalWeight.toFixed(3)} MT
          </p>
        </div>

        {showPriceInput && totalWeight > 0 && (
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-accent" />
              <Label htmlFor="price-input" className="text-base font-semibold">
                Enter Base Price (20mm TMT per MT)
              </Label>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                id="price-input"
                type="number"
                value={basePrice || ''}
                onChange={(e) => onBasePriceChange(Number(e.target.value))}
                placeholder="Enter price per MT"
                className="pl-8"
                data-testid="input-price"
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Prices for other diameters will be calculated based on this base price
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
