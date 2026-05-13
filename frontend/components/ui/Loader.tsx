import Image from 'next/image';
import Title from '../shared/Title';

const Loader = ({ text = 'Cargando...' }: { text?: string }) => {
    const logoUrl = '/favicon.ico';
    return (
        <div className='flex flex-col items-center justify-center w-full h-screen bg-background p-6'>
            <div className='relative flex items-center justify-center w-35 h-35'>
                <div className='absolute inset-0 border-4 border-solid border-primary-container rounded-[100px] animate-spin border-t-primary'></div>
                <Image
                    src={logoUrl}
                    alt='Velion Logo'
                    width={80}
                    height={80}
                    className='z-10 rounded-full'
                />
            </div>
            {text && (
                <Title
                    text={text}
                    className='mt-4 text-on-surface-variant text-md font-medium tracking-widest animate-pulse'
                />
            )}
        </div>
    );
};

export default Loader;
