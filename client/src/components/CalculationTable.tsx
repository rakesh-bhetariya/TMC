import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { calculateWeightFromBhari, calculateWeightFromBars } from "@/lib/tmtData";

export interface CalculationItem {
  id: string;
  diameter: number;
  quantity: number;
  mode: 'bhari' | 'bars';
}

interface CalculationTableProps {
  items: CalculationItem[];
  onRemoveItem: (id: string) => void;
}

export default function CalculationTable({ items, onRemoveItem }: CalculationTableProps) {
  if (items.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No items added yet. Add TMT bars to see calculations.</p>
      </Card>
    );
  }

  const totalWeight = items.reduce((sum, item) => {
    const weight = item.mode === 'bhari' 
      ? calculateWeightFromBhari(item.diameter, item.quantity)
      : calculateWeightFromBars(item.diameter, item.quantity);
    return sum + weight;
  }, 0);

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-primary text-primary-foreground">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Diameter</th>
                <th className="px-4 py-3 text-left font-semibold">Quantity</th>
                <th className="px-4 py-3 text-left font-semibold">Weight (MT)</th>
                <th className="px-4 py-3 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => {
                const weight = item.mode === 'bhari' 
                  ? calculateWeightFromBhari(item.diameter, item.quantity)
                  : calculateWeightFromBars(item.diameter, item.quantity);

                return (
                  <tr 
                    key={item.id} 
                    className={index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}
                    data-testid={`row-item-${item.id}`}
                  >
                    <td className="px-4 py-3 font-medium" data-testid={`text-diameter-${item.id}`}>
                      {item.diameter}mm
                    </td>
                    <td className="px-4 py-3" data-testid={`text-quantity-${item.id}`}>
                      {item.quantity} {item.mode === 'bhari' ? 'Bhari' : 'Bars'}
                    </td>
                    <td className="px-4 py-3 font-mono" data-testid={`text-weight-${item.id}`}>
                      {weight.toFixed(3)}
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          onRemoveItem(item.id);
                          console.log(`Removed item: ${item.diameter}mm`);
                        }}
                        className="text-destructive hover:text-destructive"
                        data-testid={`button-remove-${item.id}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-accent text-accent-foreground font-semibold">
              <tr>
                <td colSpan={2} className="px-4 py-3 text-right">TOTAL WEIGHT</td>
                <td className="px-4 py-3 font-mono text-lg" data-testid="text-total-weight">
                  {totalWeight.toFixed(3)} MT
                </td>
                <td className="px-4 py-3"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </div>
  );
}
