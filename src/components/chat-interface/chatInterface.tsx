'use client'

import { useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import IconButton from '@mui/material/IconButton'
import CallIcon from '@mui/icons-material/Call'
import VideocamIcon from '@mui/icons-material/Videocam'
import SendIcon from '@mui/icons-material/Send'
import MicIcon from '@mui/icons-material/Mic'

interface Message {
  id: number;
  content: string;
  sender: 'user' | 'other';
  timestamp: string;
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
}

function CustomAvatar({ src, name }: { src: string, name: string }) {
  const [imageLoaded, setImageLoaded] = useState(true)

  return (
    <Avatar
      src={imageLoaded ? src : undefined}
      alt={name}
      onError={() => setImageLoaded(false)}
      className="w-12 h-12"
    >
      {!imageLoaded && name.charAt(0)}
    </Avatar>
  )
}

export default function ChatInterface() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')

  const contacts: Contact[] = [
    { id: 1, name: 'John Doe', avatar: '/placeholder.svg?height=40&width=40', lastMessage: 'Hey, how are you?', lastMessageTime: '2:30 PM' },
    { id: 2, name: 'Jane Smith', avatar: '/placeholder.svg?height=40&width=40', lastMessage: 'See you tomorrow!', lastMessageTime: '1:45 PM' },
    { id: 3, name: 'Mike Johnson', avatar: '/placeholder.svg?height=40&width=40', lastMessage: 'Thanks for your help!', lastMessageTime: 'Yesterday' },
  ]

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '') {
      const newMessage: Message = {
        id: messages.length + 1,
        content: inputMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages([...messages, newMessage])
      setInputMessage('')
    }
  }

  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact)
    setMessages([]) // In a real application, fetch messages for the selected contact here
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Contacts list */}
      <div className="w-1/4 bg-white border-r">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Chats</h2>
        </div>
        <div className="overflow-y-auto h-full">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-center p-4 hover:bg-gray-100 cursor-pointer ${
                selectedContact?.id === contact.id ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleContactSelect(contact)}
            >
              <CustomAvatar src={contact.avatar} name={contact.name} />
              <div className="ml-4">
                <h3 className="font-semibold">{contact.name}</h3>
                <p className="text-sm text-gray-500">{contact.lastMessage}</p>
              </div>
              <span className="ml-auto text-xs text-gray-400">{contact.lastMessageTime}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {selectedContact ? (
          <>
            {/* Chat header */}
            <div className="bg-white p-4 flex items-center justify-between border-b">
              <div className="flex items-center">
                <CustomAvatar src={selectedContact.avatar} name={selectedContact.name} />
                <h2 className="ml-4 font-semibold">{selectedContact.name}</h2>
              </div>
              <div>
                <IconButton aria-label="Audio call">
                  <CallIcon />
                </IconButton>
                <IconButton aria-label="Video call">
                  <VideocamIcon />
                </IconButton>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <Card className={`p-3 max-w-[70%] ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                    <CardContent>
                      <p>{message.content}</p>
                      <span className="text-xs opacity-75 mt-1 block">{message.timestamp}</span>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>

            {/* Message input */}
            <div className="bg-white p-4 border-t">
              <div className="flex items-center">
                <TextField
                  variant="outlined"
                  placeholder="Type a message..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage()
                    }
                  }}
                  fullWidth
                  className="mr-4"
                />
                <IconButton aria-label="Voice message">
                  <MicIcon />
                </IconButton>
                <Button onClick={handleSendMessage} variant="contained" color="primary" endIcon={<SendIcon />}>
                  Send
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">Select a contact to start chatting</p>
          </div>
        )}
      </div>
    </div>
  )
}
