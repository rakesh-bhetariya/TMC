import { Calculator } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center gap-3">
        <Calculator className="h-6 w-6" data-testid="icon-calculator" />
        <h1 className="text-xl font-semibold" data-testid="text-app-title">InfraOne TMT Calculator</h1>
      </div>
    </header>
  );
}
