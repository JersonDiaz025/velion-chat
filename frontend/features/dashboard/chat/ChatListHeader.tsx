import Title from '@/components/shared/Title';
import { Input } from '@/components/ui/Input';

const ChatListHeader = ({ title }) => {
  return (
    <div className='py-6'>
      <Title text={title} className='text-xl font-bold mb-6' />
      <Input
        className='w-full bg-surface-container rounded-xl py-2 px-3 text-sm'
        placeholder='Search...'
      />
    </div>
  );
};

export default ChatListHeader;
