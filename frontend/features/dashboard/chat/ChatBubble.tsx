// features/chat/components/ChatBubble.tsx
export const ChatBubble = ({ message, isMe }: { message: any; isMe: boolean }) => (
  <div className={`flex ${isMe ? 'justify-end' : 'justify-start'} mb-4`}>
    <div
      className={`max-w-[70%] p-3 rounded-2xl ${
        isMe ? 'bg-primary text-black rounded-tr-none' : 'bg-surface-container-high rounded-tl-none'
      }`}
    >
      <p className='text-sm'>{message.content}</p>
      <span className='text-[10px] opacity-50 block mt-1'>
        {new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </span>
    </div>
  </div>
);
