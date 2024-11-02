import { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import CallIcon from '@mui/icons-material/Call';
import VideocamIcon from '@mui/icons-material/Videocam';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
  const [imageLoaded, setImageLoaded] = useState(true);

  return (
    <Avatar
      src={imageLoaded ? src : undefined}
      alt={name}
      onError={() => setImageLoaded(false)}
      className="w-12 h-12"
    >
      {!imageLoaded && name.charAt(0)}
    </Avatar>
  );
}

export default function ChatInterface() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showChat, setShowChat] = useState(false);

  // Fetch contacts from API
  useEffect(() => {
    const fetchContacts = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No authentication token found');
        return;
      }

      try {
        const response = await axios.get('https://api.bazigaar.com/chatWithFriend/GetChatList/', {
          headers: {
            Authorization: `Token ${token}`
          }
        });
        const contactData = response.data.results.map((contact: any) => ({
          id: contact.id,
          name: `${contact.message_req_to.first_name} ${contact.message_req_to.last_name}`,
          avatar: contact.message_req_to.profile_picture,
          lastMessage: contact.lastMessage?.text_message || '',
          lastMessageTime: new Date(contact.lastMessage?.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }));
        setContacts(contactData);
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    };
    fetchContacts();
  }, []);

  // Fetch messages for selected contact
  const fetchMessages = async (contactId: number) => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    try {
      const response = await axios.get(`https://api.bazigaar.com/chatWithFriend/GetChatWithFriend/${contactId}/`, {
        headers: { Authorization: `Token ${token}` }
      });
      const messageData = response.data.messages.map((message: any) => ({
        id: message.id,
        content: message.text_message,
        sender: message.user.id === response.data.message_req_from.id ? 'user' : 'other',
        timestamp: new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }));
      setMessages(messageData);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

 const handleSendMessage = async () => {
  if (inputMessage.trim() !== '' && selectedContact) {
    // Retrieve userDetails from localStorage
    const userDetailsString = localStorage.getItem('userDetails');
    if (!userDetailsString) {
      console.error('No userDetails found in localStorage');
      return;
    }

    let userDetails;
    try {
      userDetails = JSON.parse(userDetailsString); // Parse the JSON string to an object
      console.log('User Details:', userDetails); // Log the entire userDetails object
    } catch (error) {
      console.error('Error parsing userDetails:', error);
      return;
    }

    const userID = userDetails.user.id; // Extract userID
    const token = userDetails.token; // Extract token for Authorization header

    if (!token || !userID) {
      console.error('No authentication token or user ID found');
      return;
    }

    // Construct the request payload
    const requestBody = {
      message_req_from: userID,
      message_req_to: 11,
      text: [inputMessage]
    };

    // Log the request body for debugging
    console.log('Sending message with body:', requestBody);

    try {
      // Send message to the backend
      const response = await axios.post(
        'https://api.bazigaar.com/chatWithFriend/CreateChatWithFriend/',
        requestBody,
        {
          headers: {
            Authorization: `Token ${token}`
          }
        }
      );

      // Check for response to confirm message sent successfully
      if (response.status === 201 || response.status === 200) {
        // Add message to local state if successful
        const newMessage: Message = {
          id: response.data.id, // Use ID from response if available
          content: inputMessage,
          sender: 'user',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages([...messages, newMessage]);
        setInputMessage('');
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
};


  const handleContactSelect = (contact: Contact) => {
    setSelectedContact(contact);
    fetchMessages(contact.id); // Fetch messages when a contact is selected
    setShowChat(true);
  };

  const handleBack = () => {
    setShowChat(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Contacts list */}
      <div className={`w-full lg:w-1/4 bg-white border-r ${showChat ? 'hidden lg:block' : 'block'}`}>
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Chats</h2>
        </div>
        <div className="overflow-y-auto h-full">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-center p-4 hover:bg-gray-100 cursor-pointer ${selectedContact?.id === contact.id ? 'bg-gray-200' : ''}`}
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
      <div className={`flex-1 flex flex-col ${showChat ? 'block' : 'hidden lg:flex'}`}>
        {selectedContact ? (
          <>
            {/* Chat header */}
            <div className="bg-white p-4 flex items-center justify-between border-b">
              <div className="flex items-center">
                {showChat && (
                  <IconButton
                    aria-label="Back"
                    className="lg:hidden mr-2"
                    onClick={handleBack}
                  >
                    <ArrowBackIcon />
                  </IconButton>
                )}
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
                      handleSendMessage();
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
  );
}
