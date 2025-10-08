import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IndianRupee } from "lucide-react";

interface BasePriceInputProps {
  basePrice: number;
  onBasePriceChange: (price: number) => void;
}

export default function BasePriceInput({ basePrice, onBasePriceChange }: BasePriceInputProps) {
  return (
    <Card className="p-4">
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <IndianRupee className="h-5 w-5 text-accent" />
          <Label htmlFor="base-price" className="text-base font-semibold">
            Base Price (20mm TMT)
          </Label>
        </div>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
          <Input
            id="base-price"
            type="number"
            value={basePrice || ''}
            onChange={(e) => onBasePriceChange(Number(e.target.value))}
            placeholder="Enter base price per MT"
            className="pl-8"
            data-testid="input-base-price"
          />
        </div>
        <p className="text-sm text-muted-foreground">
          Prices for other diameters will be calculated based on this base price
        </p>
      </div>
    </Card>
  );
}
