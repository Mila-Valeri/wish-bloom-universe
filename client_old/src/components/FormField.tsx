import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'textarea';
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  error?: string;
  maxLength?: number;
  showCharCount?: boolean;
  className?: string;
}

export const FormField = ({ 
  label, 
  value, 
  onChange, 
  type = 'text',
  placeholder, 
  disabled = false,
  required = false,
  error,
  maxLength,
  showCharCount = false,
  className = ""
}: FormFieldProps) => {
  const remainingChars = maxLength ? maxLength - value.length : 0;
  const isOverLimit = maxLength ? value.length > maxLength : false;

  return (
    <div className={`space-y-2 ${className}`}>
      <Label className={required ? "after:content-['*'] after:text-red-500 after:ml-1" : ""}>
        {label}
      </Label>
      
      {type === 'textarea' ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`min-h-[100px] resize-y ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
          maxLength={maxLength}
        />
      ) : (
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={error ? 'border-red-500 focus:ring-red-500' : ''}
          maxLength={maxLength}
        />
      )}
      
      <div className="flex justify-between items-center min-h-[20px]">
        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}
        
        {showCharCount && maxLength && (
          <p className={`text-sm ml-auto ${
            isOverLimit ? 'text-red-600' : 
            remainingChars < 50 ? 'text-yellow-600' : 
            'text-muted-foreground'
          }`}>
            {remainingChars} characters remaining
          </p>
        )}
      </div>
    </div>
  );
};