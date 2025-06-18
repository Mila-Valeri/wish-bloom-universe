import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface StatusOption {
  label: string;
  value: string;
}

interface StatusSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: StatusOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const StatusSelect = ({ 
  label, 
  value, 
  onChange, 
  options, 
  placeholder = "Select status...",
  disabled = false,
  className = ""
}: StatusSelectProps) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};