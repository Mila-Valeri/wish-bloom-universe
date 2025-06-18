import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface LinkInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  showTooltip?: boolean;
  className?: string;
}

export const LinkInput = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  disabled, 
  readonly, 
  showTooltip = false,
  className = ""
}: LinkInputProps) => {
  const shortenedUrl = value.length > 30 ? `${value.substring(0, 30)}...` : value;

  if (readonly && showTooltip) {
    return (
      <div className={`space-y-2 ${className}`}>
        <Label>{label}</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="relative flex-1 max-w-[180px] sm:max-w-[200px]">
                <input
                  type="text"
                  value={shortenedUrl}
                  readOnly
                  className="wish-link-input text-xs text-muted-foreground font-mono w-full cursor-text bg-muted/30 px-2 py-1 rounded border outline-none focus:ring-1 focus:ring-primary/50 overflow-x-auto whitespace-nowrap resize-none"
                  style={{ 
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(156, 163, 175, 0.5) transparent'
                  }}
                  onMouseDown={(e) => {
                    e.stopPropagation();
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    const input = e.target as HTMLInputElement;
                    if (document.activeElement !== input) {
                      input.focus();
                    }
                  }}
                  onFocus={(e) => {
                    const input = e.target as HTMLInputElement;
                    setTimeout(() => {
                      if (input.selectionStart === input.selectionEnd && input.selectionStart === input.value.length) {
                        input.setSelectionRange(0, 0);
                      }
                    }, 0);
                  }}
                  onKeyDown={(e) => {
                    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
                      e.preventDefault();
                      e.stopPropagation();
                      const input = e.target as HTMLInputElement;
                      input.setSelectionRange(0, input.value.length);
                    }
                    if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'c' || e.key.toLowerCase() === 'x')) {
                      return;
                    }
                    if (!e.ctrlKey && !e.metaKey && !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
            </TooltipTrigger>
            <TooltipContent className="max-w-[280px] sm:max-w-[350px] md:max-w-[450px] p-2">
              <div className="overflow-x-auto max-h-20">
                <div className="text-xs font-mono whitespace-nowrap select-text cursor-text p-1 bg-background/50 rounded border">
                  {value}
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <Label>{label}</Label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        readOnly={readonly}
        className="font-mono text-sm"
      />
    </div>
  );
};