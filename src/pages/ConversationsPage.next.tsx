import { useState, useRef, useEffect } from 'react';
import { Volume2, Calendar, Clock, User, UserCheck } from 'lucide-react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { useConversationStore } from '../store/conversationStore';
import { SearchBar } from '../components/SearchBar';
import { TipsPanel } from '../components/TipsPanel';
import { useNavigate } from 'react-router-dom';

export const ConversationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('all');
  const { speak } = useTextToSpeech();
  const { conversations, clearAllConversations } = useConversationStore();
  const conversationsRef = useRef<HTMLDivElement>(null);
  const conversationsEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Auto-scroll to bottom when page loads or when new conversations are added
  useEffect(() => {
    if (conversationsEndRef.current && conversations.length > 0) {
      conversationsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [conversations.length]);

  // Also scroll to bottom when the component first mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (conversationsEndRef.current && conversations.length > 0) {
        conversationsEndRef.current.scrollIntoView({ behavior: 'auto' });
      }
    }, 100); // Small delay to ensure DOM is ready

    return () => clearTimeout(timer);
  }, [conversations.length]);

  const filteredConversations = conversations.filter(conversation => {
    const matchesSearch = conversation.originalText.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conversation.translatedText.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterDate === 'all') return matchesSearch;
    
    const conversationDate = new Date(conversation.timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (filterDate === 'today') {
      return matchesSearch && conversationDate.toDateString() === today.toDateString();
    } else if (filterDate === 'yesterday') {
      return matchesSearch && conversationDate.toDateString() === yesterday.toDateString();
    } else if (filterDate === 'week') {
      const weekAgo = new Date(today);
      weekAgo.setDate(weekAgo.getDate() - 7);
      return matchesSearch && conversationDate >= weekAgo;
    }
    
    return matchesSearch;
  }).reverse(); // Reverse to show oldest first (newest at bottom)

  const handleScrollToConversations = () => {
    if (searchTerm.trim() && conversationsRef.current) {
      conversationsRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  const handlePlayAudio = (text: string, lang: string) => {
    speak(text, lang);
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Yesterday ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };

  const getConversationType = (originalLang: string, targetLang: string) => {
    if (originalLang === 'en' && targetLang === 'es') return 'EN → ES';
    if (originalLang === 'es' && targetLang === 'en') return 'ES → EN';
    return 'Translation';
  };

  const getSpeakerIcon = (speaker?: 'officer' | 'detained') => {
    if (speaker === 'officer') {
      return <UserCheck className="w-4 h-4 text-gray-600 dark:text-gray-400" />;
    } else if (speaker === 'detained') {
      return <User className="w-4 h-4 text-gray-600 dark:text-gray-400" />;
    }
    return null;
  };

  const getSpeakerLabel = (speaker?: 'officer' | 'detained') => {
    if (speaker === 'officer') return 'Officer';
    if (speaker === 'detained') return 'Detained';
    return 'Unknown';
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 overflow-hidden items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Conversation History</h2>
      <button
        onClick={() => navigate('/replay')}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Go to Replay Interaction Page
      </button>
    </div>
  );
};