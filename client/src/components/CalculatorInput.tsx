import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TMT_SPECS } from "@/lib/tmtData";
import { Plus } from "lucide-react";

interface CalculatorInputProps {
  mode: 'bhari' | 'bars';
  onAddItem: (diameter: number, quantity: number) => void;
}

export default function CalculatorInput({ mode, onAddItem }: CalculatorInputProps) {
  const [diameter, setDiameter] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');

  const handleAdd = () => {
    if (diameter && quantity && Number(quantity) > 0) {
      onAddItem(Number(diameter), Number(quantity));
      setQuantity('');
      console.log(`Added ${quantity} ${mode} of ${diameter}mm TMT`);
    }
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="diameter">TMT Diameter</Label>
          <Select value={diameter} onValueChange={setDiameter}>
            <SelectTrigger id="diameter" data-testid="select-diameter">
              <SelectValue placeholder="Select diameter" />
            </SelectTrigger>
            <SelectContent>
              {TMT_SPECS.map((spec) => (
                <SelectItem key={spec.diameter} value={spec.diameter.toString()}>
                  {spec.diameter}mm
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">
            {mode === 'bhari' ? 'Number of Bhari (Bundles)' : 'Number of Bars'}
          </Label>
          <Input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder={mode === 'bhari' ? 'Enter number of bundles' : 'Enter number of bars'}
            min="1"
            data-testid="input-quantity"
          />
        </div>

        <Button
          onClick={handleAdd}
          className="w-full bg-accent hover:bg-accent text-accent-foreground"
          disabled={!diameter || !quantity || Number(quantity) <= 0}
          data-testid="button-add-item"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add to Calculation
        </Button>
      </div>
    </Card>
  );
}
