import { Button } from "@/components/ui/button";

interface ModeToggleProps {
  mode: 'bhari' | 'bars';
  onModeChange: (mode: 'bhari' | 'bars') => void;
}

export default function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="flex gap-2 p-1 bg-muted rounded-md" data-testid="toggle-mode">
      <Button
        variant={mode === 'bhari' ? 'default' : 'ghost'}
        className={mode === 'bhari' ? 'bg-accent text-accent-foreground' : ''}
        onClick={() => onModeChange('bhari')}
        data-testid="button-mode-bhari"
      >
        Bhari (Bundles)
      </Button>
      <Button
        variant={mode === 'bars' ? 'default' : 'ghost'}
        className={mode === 'bars' ? 'bg-accent text-accent-foreground' : ''}
        onClick={() => onModeChange('bars')}
        data-testid="button-mode-bars"
      >
        Number of Bars
      </Button>
    </div>
  );
}
