// Playback config for ConversationsPage and other consumers
export type PlaybackSetting = 'source' | 'translation' | 'officer' | 'civilian';

export interface PlaybackConfig {
  defaultPlayback: PlaybackSetting;
}

export const playbackConfig: PlaybackConfig = {
  defaultPlayback: 'civilian',
};
