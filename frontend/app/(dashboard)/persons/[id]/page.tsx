interface Props {
  params: {
    contactId: string;
  };
}

export default function PersonProfile({ params }: Props) {
  return (
    <div className='p-6'>
      <h1>Perfil del usuario {params.contactId}</h1>
    </div>
  );
}
