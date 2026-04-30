import { SIZES } from '@/constants/sizes.constant';
import { AvatarProps } from '@/types/avatar.types';
import clsx from 'clsx';

const Avatar = ({
  initials,
  color,
  size = 'md',
  isOnline = false,
  showStatus = false,
  className,
}: AvatarProps) => {
  const styles = SIZES[size];

  return (
    <div className='relative inline-flex shrink-0'>
      <div
        style={{ backgroundColor: color }}
        className={clsx(
          'rounded-full',
          'flex items-center justify-center',
          'font-semibold text-white uppercase select-none',
          styles.avatar,
          className
        )}
      >
        {initials}
      </div>

      {showStatus && (
        <span
          className={clsx(
            'absolute bottom-0 right-0 rounded-full border-2 border-white',
            styles.badge,
            isOnline ? 'bg-green-500' : 'bg-zinc-400'
          )}
        />
      )}
    </div>
  );
};

export default Avatar;
