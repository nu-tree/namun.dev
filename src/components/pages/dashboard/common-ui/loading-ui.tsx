import { cn } from '@/lib/utils/utils';
import { FaSpinner } from 'react-icons/fa';

type Props = React.HTMLAttributes<HTMLElement>;

export const LoadingUi = ({ className }: Readonly<Props>) => {
  return <FaSpinner className={cn('w-10 h-10 animate-spin text-primary', className)} />;
};
