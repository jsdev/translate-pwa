import React, { useState, useRef, useEffect } from 'react';
import { Calendar, User, UserCheck, Globe2, BookOpen, Megaphone } from 'lucide-react';
import { PlayTranslationCard } from '../components/PlayTranslationCard';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import { useConversationStore } from '../store/conversationStore';
import { SearchBar } from '../components/SearchBar';
import { TipsPanel } from '../components/TipsPanel';
import { DateFilter } from '../components/DateFilter';
import { playbackConfig, PlaybackSetting } from '../config/playbackConfig';

export const ConversationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('all');
  const [playbackSetting, setPlaybackSetting] = useState<PlaybackSetting>(playbackConfig.defaultPlayback);
  const { speak } = useTextToSpeech();
  const { conversations, clearAllConversations } = useConversationStore();
  const conversationsRef = useRef<HTMLDivElement>(null);
  const conversationsEndRef = useRef<HTMLDivElement>(null);

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

  const getSpeakerLabel = (speaker?: 'officer' | 'civilian' | 'detained') => {
    if (speaker === 'officer') return 'Officer';
    if (speaker === 'civilian' || speaker === 'detained') return 'Civilian';
    return 'Unknown';
  };

  const getSpeakerColor = (speaker?: 'officer' | 'civilian' | 'detained') => {
    if (speaker === 'officer') return 'bg-blue-600 text-white';
    if (speaker === 'civilian' || speaker === 'detained') return 'bg-orange-500 text-white';
    return 'bg-gray-400 text-white';
  };

  // Determine which audio to play based on playbackSetting
  const getPlaybackTextAndLang = (conversation: any): { text: string; lang: string } => {
    if (playbackSetting === 'source') {
      return { text: conversation.originalText, lang: conversation.originalLang };
    }
    if (playbackSetting === 'translation') {
      return { text: conversation.translatedText, lang: conversation.targetLang };
    }
    if (playbackSetting === 'officer') {
      // Officer always speaks English
      if (conversation.originalLang === 'en') {
        return { text: conversation.originalText, lang: 'en' };
      } else {
        return { text: conversation.translatedText, lang: 'en' };
      }
    }
    // Civilian always speaks the non-English language
    if (conversation.originalLang !== 'en') {
      return { text: conversation.originalText, lang: conversation.originalLang };
    } else {
      return { text: conversation.translatedText, lang: conversation.targetLang };
    }
  };

  // Helper to get playback label for button
  const getPlaybackLabel = (setting: PlaybackSetting) => {
    if (setting === 'officer') return 'English';
    if (setting === 'civilian') {
      const firstNonEnglish = conversations.find(c => c.originalLang !== 'en')?.originalLang || conversations.find(c => c.targetLang !== 'en')?.targetLang;
      if (firstNonEnglish === 'es') return 'Spanish';
      if (firstNonEnglish) return firstNonEnglish.charAt(0).toUpperCase() + firstNonEnglish.slice(1);
      return 'Other';
    }
    if (setting === 'source') return 'Source';
    if (setting === 'translation') return 'Translation';
    return 'Other';
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

        {/* Playback Setting */}
        <fieldset className="mb-2">
          <legend className="flex items-center gap-2 text-xs font-semibold text-gray-700 dark:text-gray-200 mb-1">
            <Megaphone className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Playback Voice
          </legend>
          <div className="flex gap-2">
            {(['source', 'translation', 'officer', 'civilian'] as PlaybackSetting[]).map((setting) => {
              let baseColor = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
              let selectedColor = '';
              let icon = null;
              if (setting === 'officer') {
                selectedColor = 'bg-blue-600 text-white';
                icon = <UserCheck className="w-4 h-4 mr-1" />;
              } else if (setting === 'civilian') {
                selectedColor = 'bg-orange-500 text-white';
                icon = <User className="w-4 h-4 mr-1" />;
              } else if (setting === 'translation') {
                selectedColor = 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
                icon = <BookOpen className="w-4 h-4 mr-1" />;
              } else if (setting === 'source') {
                selectedColor = 'bg-gray-300 text-gray-900 dark:bg-gray-600 dark:text-gray-100';
                icon = <Globe2 className="w-4 h-4 mr-1" />;
              }
              const isSelected = playbackSetting === setting;
              return (
                <label
                  key={setting}
                  className={`flex items-center px-2 py-1 rounded cursor-pointer text-xs font-medium transition-colors focus-within:ring-2 focus-within:ring-blue-500 gap-1 ${isSelected ? selectedColor : baseColor}`}
                >
                  <input
                    type="radio"
                    name="playback-setting"
                    value={setting}
                    checked={isSelected}
                    onChange={() => setPlaybackSetting(setting)}
                    className="sr-only"
                  />
                  {/* icon */}
                  {getPlaybackLabel(setting)}
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Date Filter
        <DateFilter filterDate={filterDate} setFilterDate={setFilterDate} />
         */}
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
            {filteredConversations.map((conversation) => {
              const { text, lang } = getPlaybackTextAndLang(conversation);
              return (
                <div
                  key={conversation.id}
                  className="bg-white dark:bg-gray-800 pt-4 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                >
                  {/* Speaker tag, then (Phrase or Voice), then timestamp */}
                  <div className="grid grid-cols-[auto_1fr_auto] justify-center items-center gap-2 text-xs mx-4 mb-2">
                    <span className={`px-2 py-1 rounded ${getSpeakerColor(conversation.speaker)}`}>{getSpeakerLabel(conversation.speaker)}</span>
                    <span className="text-gray-500 dark:text-gray-400">{conversation.source === 'phrase' ? 'Phrase' : 'Voice'}</span>
                    <span className="text-gray-400 dark:text-gray-500">{formatTime(conversation.timestamp)}</span>
                  </div>
                  <PlayTranslationCard
                    title={conversation.originalText}
                    subtitle={conversation.translatedText}
                    onPlay={() => handlePlayAudio(text, lang)}
                    className="mb-0"
                  />
                </div>
              );
            })}
            {/* Scroll target for auto-scroll to bottom */}
            <div ref={conversationsEndRef} />
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
            "Most recent messages appear at the bottom - page auto-scrolls",
            "Use search and filters to find specific interactions",
            "Audio playback available for all recorded conversations",
            "Clear all history as needed for privacy"
          ]}
        />
      )}
    </div>
  );
};