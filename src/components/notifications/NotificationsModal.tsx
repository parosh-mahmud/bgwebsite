import React, { useLayoutEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';

interface Notification {
  id: number;
  title: string;
  description: string;
  type?: string;
  buttonText?: string;
}

const notifications: Notification[] = [
  { id: 1, title: 'Deposit Successful', description: 'Your deposit of 500 coin has been successfully processed.', type: 'transaction', buttonText: 'Transaction History' },
  { id: 2, title: 'New Promotion!', description: 'Don’t miss our upcoming promotional event starting tomorrow.', type: 'promotion' },
  { id: 3, title: 'Scheduled Maintenance', description: 'Our system will undergo maintenance this weekend from 2 AM to 5 AM.', type: 'info' },
  { id: 4, title: 'Lottery Update', description: 'Your recent lottery entry has been confirmed.', type: 'lottery', buttonText: 'Lottery History' }
];

interface NotificationsModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  positionRef: React.RefObject<HTMLButtonElement>;
}

const NotificationsModal: React.FC<NotificationsModalProps> = ({ isOpen, setIsOpen, positionRef }) => {
  const [positionStyle, setPositionStyle] = useState({});

  useLayoutEffect(() => {
    if (isOpen) {
      if (window.innerWidth <= 768) {
        setPositionStyle({
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -0%)',
          width: '90%',
        });
      } else if (positionRef.current) {
        const rect = positionRef.current.getBoundingClientRect();
        const left = rect.right - 384; // Adjust this value based on your modal width to align the right edges
        setPositionStyle({
          top: `${rect.bottom + window.scrollY}px`,
          left: `${left}px`,
          width: '384px', // Set a fixed width or base it on content/viewport
        });
      }
    }
  }, [isOpen, positionRef]);

  return (
    <div
      className={`absolute bg-white shadow-xl rounded-lg p-4 transition-opacity duration-300 z-50 ${isOpen ? 'block' : 'hidden'}`}
      style={positionStyle}
    >
      <div className="flex justify-between items-center border-b pb-2 mb-3">
        <h4 className="text-lg font-semibold text-gray-800">Notifications</h4>
        <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-gray-100">
          <CloseIcon fontSize="small" />
        </button>
      </div>
      <div className="max-h-64 overflow-y-auto">
        <ul className="space-y-4">
          {notifications.map(notification => (
            <li
              key={notification.id}
              className={`p-4 rounded-md shadow-sm flex flex-col gap-2 border border-gray-200 ${
                notification.type === 'transaction' ? 'bg-green-50 border-green-200' :
                notification.type === 'promotion' ? 'bg-blue-50 border-blue-200' :
                notification.type === 'info' ? 'bg-yellow-50 border-yellow-200' :
                'bg-purple-50 border-purple-200'
              }`}
            >
              <div className="text-sm">
                <h5 className="font-semibold text-gray-800 mb-1">{notification.title}</h5>
                <p className="text-gray-600">{notification.description}</p>
              </div>
              {notification.buttonText && (
                <button className="mt-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600">
                  {notification.buttonText}
                </button>
              )}
            </li>
          ))}
          {notifications.length === 0 && (
            <li className="p-3 text-gray-500 text-center">No new notifications</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NotificationsModal;
