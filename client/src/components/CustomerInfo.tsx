import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { User, MapPin } from "lucide-react";

interface CustomerInfoProps {
  customerName: string;
  deliveryAddress: string;
  onCustomerNameChange: (name: string) => void;
  onDeliveryAddressChange: (address: string) => void;
}

export default function CustomerInfo({
  customerName,
  deliveryAddress,
  onCustomerNameChange,
  onDeliveryAddressChange,
}: CustomerInfoProps) {
  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="customer-name" className="flex items-center gap-2">
            <User className="h-4 w-4 text-primary" />
            Customer Name
          </Label>
          <Input
            id="customer-name"
            type="text"
            value={customerName}
            onChange={(e) => onCustomerNameChange(e.target.value)}
            placeholder="Enter customer name"
            data-testid="input-customer-name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="delivery-address" className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" />
            Delivery Address
          </Label>
          <Textarea
            id="delivery-address"
            value={deliveryAddress}
            onChange={(e) => onDeliveryAddressChange(e.target.value)}
            placeholder="Enter delivery address"
            rows={3}
            data-testid="input-delivery-address"
          />
        </div>
      </div>
    </Card>
  );
}
