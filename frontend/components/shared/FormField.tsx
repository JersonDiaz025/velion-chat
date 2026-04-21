import { Input } from '@/components/ui/Input';
import { ErrorLabel } from '@/components/ui/ErrorLabel';
import { FormFieldProps } from '@/types/form.types';

export const FormField = ( { label, errorLabel, rightElement, ...props }: FormFieldProps ) => {
  return (
    <div className="space-y-1">
      <div className="flex justify-between items-center ml-1">
        <label className="block text-xs font-semibold uppercase tracking-widest text-[#9a9ea8]">
          {label}
        </label>
        {rightElement}
      </div>
      <Input {...props} />
      <ErrorLabel errorLabel={errorLabel} />
    </div>
  );
};

