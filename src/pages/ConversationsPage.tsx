import { useState, useRef } from 'react';
import { Volume2, Calendar, Clock, User, UserCheck } from 'lucide-react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { useConversationStore } from '../store/conversationStore';
import { SearchBar } from '../components/SearchBar';
import { TipsPanel } from '../components/TipsPanel';

export const ConversationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('all');
  const { speak } = useTextToSpeech();
  const { conversations, clearAllConversations } = useConversationStore();
  const conversationsRef = useRef<HTMLDivElement>(null);

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
  });

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
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Conversation History</h2>
          {conversations.length > 0 && (
            <button
              onClick={clearAllConversations}
              className="px-3 py-1 text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-3">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search conversations and translations..."
            onSearch={handleScrollToConversations}
          />
        </div>

        {/* Date Filter */}
        <div className="flex gap-1 overflow-x-auto pb-2 prevent-bounce">
          {[
            { value: 'all', label: 'All' },
            { value: 'today', label: 'Today' },
            { value: 'yesterday', label: 'Yesterday' },
            { value: 'week', label: 'This Week' }
          ].map(filter => (
            <button
              key={filter.value}
              onClick={() => setFilterDate(filter.value)}
              className={`px-3 py-1 text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                filterDate === filter.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto prevent-bounce">
        {filteredConversations.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              {conversations.length === 0 ? 'No Conversations Yet' : 'No Matching Conversations'}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {conversations.length === 0 
                ? 'Start using the app to build your conversation history for audit purposes.'
                : 'Try adjusting your search or date filter.'
              }
            </p>
          </div>
        ) : (
          <div ref={conversationsRef} className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-700 dark:text-gray-300 px-2 py-1 rounded font-medium">
                      {getConversationType(conversation.originalLang, conversation.targetLang)}
                    </span>
                    {conversation.speaker && (
                      <div className="flex items-center gap-1">
                        {getSpeakerIcon(conversation.speaker)}
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {getSpeakerLabel(conversation.speaker)}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs">{formatTime(conversation.timestamp)}</span>
                    </div>
                  </div>
                </div>

                {/* Original Text */}
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {conversation.originalLang === 'en' ? 'English' : 'Español'}
                    </div>
                    <button
                      onClick={() => handlePlayAudio(conversation.originalText, conversation.originalLang)}
                      className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
                      title="Play original audio"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-gray-900 dark:text-gray-100 text-sm leading-relaxed bg-gray-50 dark:bg-gray-700 p-2">
                    {conversation.originalText}
                  </div>
                </div>

                {/* Translated Text */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {conversation.targetLang === 'en' ? 'English' : 'Español'}
                    </div>
                    <button
                      onClick={() => handlePlayAudio(conversation.translatedText, conversation.targetLang)}
                      className="p-1 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
                      title="Play translated audio"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-gray-900 dark:text-gray-100 text-sm leading-relaxed bg-green-50 dark:bg-green-900/20 p-2">
                    {conversation.translatedText}
                  </div>
                </div>

                {/* Source indicator */}
                <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-xs text-gray-400 dark:text-gray-500">
                    Source: {conversation.source === 'phrase' ? 'Quick Phrase' : 'Voice Recording'}
                    {conversation.speaker && ` • Speaker: ${getSpeakerLabel(conversation.speaker)}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tips Panel */}
      {conversations.length > 0 && (
        <TipsPanel
          title="Audit Information"
          color="purple"
          storageKey="audit-tips-dismissed"
          tips={[
            "All conversations are stored locally for audit purposes",
            "Speaker identification helps track conversation flow",
            "Use search and filters to find specific interactions",
            "Audio playback available for all recorded conversations",
            "Clear all history as needed for privacy"
          ]}
        />
      )}
    </div>
  );
};