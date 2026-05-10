import UserCard from '../ui/UserCard';
import { VIEW_MODE } from '@/constants/view.constants';

const ChatListItem = ({ item, onSelect }: { item: any; onSelect: () => void }) => {

    return (
        <UserCard
            handleClick={onSelect}
            profile={item.participant}
            viewMode={VIEW_MODE.LIST}
            showStatus={true}
            isOnline={item.isOnline}
            avatarClass={{
                style: 'ring-4 ring-surface-container-high',
                size: 'lg',
            }}
            previewMessage={item.lastMessage}
            previewDate={item.previewDate}
            unreadCount={item.unreadCount}
        />
    );
};

export default ChatListItem;
