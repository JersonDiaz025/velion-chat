import { ErrorLabelProps } from '@/types/form.types';

export const ErrorLabel = ( { errorLabel, classes }: ErrorLabelProps ) => {
  return (
    <div className={`text-sm text-red-600 ${ classes } `}>
      {errorLabel && typeof errorLabel === 'string' ? errorLabel : null}
    </div>
  );
}
