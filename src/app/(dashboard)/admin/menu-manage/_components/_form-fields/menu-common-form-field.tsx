import { cn } from '@/lib/utils/utils';

type FormFieldProps = {
  label: string;
  required?: boolean;
  helpText?: string;
  children: React.ReactNode;
};

export const MenuCommonFormField = ({ label, required, helpText, children }: FormFieldProps) => {
  return (
    <div className="flex flex-row items-center justify-start gap-4">
      <label className={cn('min-w-20 text-center font-bold', required && 'wf__form_required')}>{label}</label>
      <div className="flex flex-col items-start justify-start gap-1 flex-1">
        {children}
        {helpText && <div className="wf__text_help">{helpText}</div>}
      </div>
    </div>
  );
};
