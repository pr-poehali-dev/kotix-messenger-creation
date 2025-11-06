import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

interface Chat {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
}

interface Message {
  id: number;
  text: string;
  time: string;
  isMine: boolean;
  encrypted: boolean;
}

const mockChats: Chat[] = [
  {
    id: 1,
    name: 'Анна Петрова',
    avatar: '',
    lastMessage: 'Привет! Как дела?',
    time: '14:23',
    unread: 2,
    online: true
  },
  {
    id: 2,
    name: 'Техподдержка KOTIX',
    avatar: '',
    lastMessage: 'Спасибо за обращение!',
    time: '13:45',
    unread: 0,
    online: false
  },
  {
    id: 3,
    name: 'Дизайн-команда',
    avatar: '',
    lastMessage: 'Новый макет готов',
    time: '12:10',
    unread: 5,
    online: true
  },
  {
    id: 4,
    name: 'Мама ❤️',
    avatar: '',
    lastMessage: 'Не забудь позвонить',
    time: 'Вчера',
    unread: 0,
    online: false
  }
];

const mockMessages: Message[] = [
  {
    id: 1,
    text: 'Привет! Как успехи с проектом?',
    time: '14:20',
    isMine: false,
    encrypted: true
  },
  {
    id: 2,
    text: 'Отлично! Почти завершили первую версию 🚀',
    time: '14:21',
    isMine: true,
    encrypted: true
  },
  {
    id: 3,
    text: 'Супер! Когда можно посмотреть?',
    time: '14:22',
    isMine: false,
    encrypted: true
  },
  {
    id: 4,
    text: 'Сейчас отправлю ссылку',
    time: '14:23',
    isMine: true,
    encrypted: true
  }
];

function Index() {
  const [activeChat, setActiveChat] = useState<Chat | null>(mockChats[0]);
  const [activeSection, setActiveSection] = useState('chats');
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);

  const navigationItems = [
    { id: 'chats', icon: 'MessageSquare', label: 'Чаты' },
    { id: 'contacts', icon: 'Users', label: 'Контакты' },
    { id: 'groups', icon: 'UsersRound', label: 'Группы' },
    { id: 'channels', icon: 'Radio', label: 'Каналы' },
    { id: 'calls', icon: 'Phone', label: 'Звонки' },
    { id: 'profile', icon: 'User', label: 'Профиль' }
  ];

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      time: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
      isMine: true,
      encrypted: true
    };

    setMessages([...messages, newMessage]);
    setMessageText('');
  };

  return (
    <div className="flex h-screen bg-background dark">
      <aside className="w-20 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-6 gap-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
          K
        </div>

        <nav className="flex-1 flex flex-col gap-4">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                activeSection === item.id
                  ? 'bg-sidebar-accent text-sidebar-primary'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
              }`}
              title={item.label}
            >
              <Icon name={item.icon as any} size={24} />
            </button>
          ))}
        </nav>

        <button className="w-12 h-12 rounded-xl flex items-center justify-center text-sidebar-foreground hover:bg-sidebar-accent/50 transition-all">
          <Icon name="Settings" size={24} />
        </button>
      </aside>

      <div className="w-96 bg-card border-r border-border flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="relative">
            <Icon name="Search" size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск..."
              className="pl-10 bg-muted/30 border-muted"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {mockChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className={`w-full p-3 rounded-xl flex items-center gap-3 mb-1 transition-all hover:bg-muted/50 ${
                  activeChat?.id === chat.id ? 'bg-muted' : ''
                }`}
              >
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={chat.avatar} />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                      {chat.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card" />
                  )}
                </div>

                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-sm truncate">{chat.name}</h3>
                    <span className="text-xs text-muted-foreground ml-2">{chat.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                </div>

                {chat.unread > 0 && (
                  <Badge className="bg-primary text-primary-foreground rounded-full min-w-[20px] h-5 flex items-center justify-center text-xs">
                    {chat.unread}
                  </Badge>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col bg-background">
        {activeChat ? (
          <>
            <div className="h-16 border-b border-border px-6 flex items-center justify-between bg-card">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={activeChat.avatar} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white">
                    {activeChat.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="font-semibold text-sm">{activeChat.name}</h2>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Icon name="Lock" size={12} className="text-green-500" />
                    <span>Сквозное шифрование</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Icon name="Phone" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Icon name="Video" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Icon name="MoreVertical" size={20} />
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1 p-6">
              <div className="max-w-4xl mx-auto space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isMine ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div
                      className={`max-w-md px-4 py-3 rounded-2xl ${
                        message.isMine
                          ? 'bg-gradient-to-br from-primary to-secondary text-white rounded-br-md'
                          : 'bg-card border border-border rounded-bl-md'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className={`text-xs ${message.isMine ? 'text-white/70' : 'text-muted-foreground'}`}>
                          {message.time}
                        </span>
                        {message.encrypted && (
                          <Icon name="Lock" size={10} className={message.isMine ? 'text-white/70' : 'text-green-500'} />
                        )}
                        {message.isMine && (
                          <Icon name="CheckCheck" size={14} className="text-white/70" />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="border-t border-border p-4 bg-card">
              <div className="max-w-4xl mx-auto flex items-end gap-3">
                <Button variant="ghost" size="icon" className="rounded-full mb-1">
                  <Icon name="Paperclip" size={20} />
                </Button>

                <div className="flex-1 relative">
                  <Input
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Введите сообщение..."
                    className="pr-10 rounded-xl bg-muted/30 border-muted"
                  />
                  <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full">
                    <Icon name="Smile" size={20} />
                  </Button>
                </div>

                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="rounded-full bg-gradient-to-br from-primary to-secondary hover:opacity-90 mb-1"
                >
                  <Icon name="Send" size={20} />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Icon name="MessageSquare" size={64} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg">Выберите чат для начала общения</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;
