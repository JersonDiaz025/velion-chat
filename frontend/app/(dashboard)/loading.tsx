import Image from 'next/image'; // O 'react' si no usas Next.js

export default function Loading() {
  // Pon aquí la URL de tu logo
  const logoUrl = '/favicon.ico';

  return (
    <div className='flex flex-col items-center justify-center w-full h-screen bg-background p-6'>
      <div className='relative flex items-center justify-center w-40 h-40'>
        {/* El círculo giratorio hecho con Tailwind */}
        <div className='absolute inset-0 border-4 border-solid border-primary-container rounded-full animate-spin border-t-primary'></div>

        {/* El logo en el centro */}
        {/* Usando Next.js Image para optimización */}
        <Image
          src={logoUrl}
          alt='Velion Logo'
          width={80} // Ajusta el tamaño según tu logo
          height={80}
          className='z-10 rounded-full' // Mantiene el logo por encima del círculo
        />

        {/* Si no usas Next.js, usa la etiqueta img normal:
        <img
          src={logoUrl}
          alt="Velion Logo"
          className="w-20 h-20 z-10 rounded-full"
        />
        */}
      </div>

      {/* Texto de carga opcional */}
      <p className='mt-8 text-on-surface-variant text-sm font-medium tracking-widest uppercase animate-pulse'>
        Cargando...
      </p>
    </div>
  );
}
