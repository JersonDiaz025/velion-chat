import { NotResultProps } from '@/types/title.types';
import Title from '../shared/Title';

const NotResult = ({ icon: Icon, text, className }: NotResultProps) => {
    return (
        <div className='flex flex-col items-center justify-center text-secondary'>
            {Icon}
            <Title text={text} className={className} />
        </div>
    );
};

export default NotResult;
