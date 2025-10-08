import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { History, Trash2, Download } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export interface SavedEstimate {
  id: string;
  date: string;
  customerName: string;
  deliveryAddress: string;
  items: any[];
  basePrice: number;
  totalCost: number;
  totalWeight: number;
}

interface HistoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  estimates: SavedEstimate[];
  onLoad: (estimate: SavedEstimate) => void;
  onDelete: (id: string) => void;
}

export default function HistoryModal({
  open,
  onOpenChange,
  estimates,
  onLoad,
  onDelete,
}: HistoryModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Estimate History
          </DialogTitle>
          <DialogDescription>
            View and manage your saved estimates
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-[500px] pr-4">
          {estimates.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No saved estimates yet
            </div>
          ) : (
            <div className="space-y-3">
              {estimates.map((estimate) => (
                <Card key={estimate.id} className="p-4 hover-elevate">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold" data-testid={`text-history-customer-${estimate.id}`}>
                          {estimate.customerName || 'Unnamed Customer'}
                        </h3>
                        {estimate.deliveryAddress && (
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {estimate.deliveryAddress}
                          </p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(estimate.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total Weight</p>
                        <p className="font-mono font-semibold">{estimate.totalWeight.toFixed(3)} MT</p>
                        <p className="text-sm text-muted-foreground mt-1">Total Cost</p>
                        <p className="font-mono font-bold text-primary" data-testid={`text-history-cost-${estimate.id}`}>
                          ₹{estimate.totalCost.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        onClick={() => {
                          onLoad(estimate);
                          onOpenChange(false);
                        }}
                        data-testid={`button-load-${estimate.id}`}
                      >
                        <Download className="h-3 w-3 mr-2" />
                        Load
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(estimate.id)}
                        className="text-destructive hover:text-destructive"
                        data-testid={`button-delete-${estimate.id}`}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
