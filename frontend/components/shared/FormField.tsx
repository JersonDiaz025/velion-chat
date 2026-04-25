import { Input } from '@/components/ui/Input';
import { FormFieldProps } from '@/types/form.types';
import { ErrorLabel } from '@/components/ui/ErrorLabel';

export const FormField = ( { label, defaultValue, errorLabel, rightElement, ...props }: FormFieldProps ) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center mb-3 ml-1">
        <label className="block text-xs font-semibold tracking-widest text-[#9a9ea8]">
          {label}
        </label>
        {rightElement}
      </div>
      <Input hasError={!!errorLabel} defaultValue={defaultValue} {...props} />
      <ErrorLabel errorLabel={errorLabel} />
    </div>
  );
};

