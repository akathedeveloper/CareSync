import { useContext } from 'react';
import MessageContext from '../contexts/MessageContext';

// Custom hook to use the message context with enhanced error handling
export const useMessages = () => {
  const context = useContext(MessageContext);

  // Ensure the hook is used within the provider
  if (!context) {
    throw new Error(
      'useMessages must be used within a MessageProvider. ' +
      'Make sure you have wrapped your component tree with <MessageProvider>.'
    );
  }

  // Optional: Validate expected context shape
  const { messages, addMessage, removeMessage } = context;
  if (!Array.isArray(messages)) {
    console.error('Expected "messages" to be an array but got:', messages);
    throw new Error('Invalid context: messages is not an array');
  }
  if (typeof addMessage !== 'function' || typeof removeMessage !== 'function') {
    console.error('Expected "addMessage" and "removeMessage" to be functions');
    throw new Error('Invalid context: addMessage or removeMessage is missing');
  }

  // Return context safely
  return context;
};
