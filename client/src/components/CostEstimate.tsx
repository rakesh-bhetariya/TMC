import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Save, Share2 } from "lucide-react";
import { CalculationItem } from "./CalculationTable";
import { calculateWeightFromBhari, calculateWeightFromBars, calculatePrice } from "@/lib/tmtData";
import html2canvas from "html2canvas";
import { useRef } from "react";

interface CostEstimateProps {
  items: CalculationItem[];
  basePrice: number;
  customerName: string;
  deliveryAddress: string;
  onSave: () => void;
}

export default function CostEstimate({
  items,
  basePrice,
  customerName,
  deliveryAddress,
  onSave,
}: CostEstimateProps) {
  const estimateRef = useRef<HTMLDivElement>(null);

  const totalCost = items.reduce((sum, item) => {
    const weight = item.mode === 'bhari' 
      ? calculateWeightFromBhari(item.diameter, item.quantity)
      : calculateWeightFromBars(item.diameter, item.quantity);
    const price = calculatePrice(item.diameter, basePrice);
    return sum + (weight * price);
  }, 0);

  const totalWeight = items.reduce((sum, item) => {
    const weight = item.mode === 'bhari' 
      ? calculateWeightFromBhari(item.diameter, item.quantity)
      : calculateWeightFromBars(item.diameter, item.quantity);
    return sum + weight;
  }, 0);

  const handleShareAsImage = async () => {
    if (!estimateRef.current) return;

    try {
      const canvas = await html2canvas(estimateRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
      });
      
      canvas.toBlob((blob) => {
        if (!blob) return;
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `TMT-Estimate-${customerName || 'Customer'}-${new Date().toLocaleDateString()}.jpg`;
        link.click();
        URL.revokeObjectURL(url);
        
        console.log('Estimate shared as JPG');
      }, 'image/jpeg', 0.95);
    } catch (error) {
      console.error('Failed to capture estimate:', error);
    }
  };

  if (items.length === 0 || basePrice === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div ref={estimateRef} className="bg-white p-6 rounded-lg">
        <div className="space-y-6">
          <div className="text-center border-b pb-4">
            <h2 className="text-2xl font-bold text-primary">InfraOne TMT Calculator</h2>
            <p className="text-sm text-muted-foreground mt-1">Cost Estimate</p>
          </div>

          {(customerName || deliveryAddress) && (
            <div className="space-y-2 border-b pb-4">
              {customerName && (
                <div>
                  <span className="font-semibold">Customer: </span>
                  <span data-testid="text-estimate-customer">{customerName}</span>
                </div>
              )}
              {deliveryAddress && (
                <div>
                  <span className="font-semibold">Delivery Address: </span>
                  <span data-testid="text-estimate-address">{deliveryAddress}</span>
                </div>
              )}
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-primary text-primary-foreground">
                <tr>
                  <th className="px-3 py-2 text-left">Diameter</th>
                  <th className="px-3 py-2 text-left">Quantity</th>
                  <th className="px-3 py-2 text-left">Weight (MT)</th>
                  <th className="px-3 py-2 text-left">Price/MT</th>
                  <th className="px-3 py-2 text-left">Total</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  const weight = item.mode === 'bhari' 
                    ? calculateWeightFromBhari(item.diameter, item.quantity)
                    : calculateWeightFromBars(item.diameter, item.quantity);
                  const price = calculatePrice(item.diameter, basePrice);
                  const cost = weight * price;

                  return (
                    <tr key={item.id} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                      <td className="px-3 py-2">{item.diameter}mm</td>
                      <td className="px-3 py-2">{item.quantity} {item.mode === 'bhari' ? 'Bhari' : 'Bars'}</td>
                      <td className="px-3 py-2 font-mono">{weight.toFixed(3)}</td>
                      <td className="px-3 py-2 font-mono">₹{price.toLocaleString('en-IN')}</td>
                      <td className="px-3 py-2 font-mono">₹{cost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                    </tr>
                  );
                })}
              </tbody>
              <tfoot className="bg-accent text-accent-foreground font-semibold">
                <tr>
                  <td colSpan={2} className="px-3 py-2 text-right">TOTAL</td>
                  <td className="px-3 py-2 font-mono">{totalWeight.toFixed(3)} MT</td>
                  <td className="px-3 py-2"></td>
                  <td className="px-3 py-2 font-mono text-lg" data-testid="text-estimate-total">
                    ₹{totalCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="text-center text-xs text-muted-foreground pt-4 border-t">
            <p>Date: {new Date().toLocaleDateString('en-IN')}</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={onSave}
          className="flex-1 bg-primary hover:bg-primary text-primary-foreground"
          data-testid="button-save-estimate"
        >
          <Save className="h-4 w-4 mr-2" />
          Save to History
        </Button>
        <Button
          onClick={handleShareAsImage}
          className="flex-1 bg-accent hover:bg-accent text-accent-foreground"
          data-testid="button-share-image"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share as Image
        </Button>
      </div>
    </div>
  );
}
