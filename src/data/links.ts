// Single source of truth for /links. Edit this file to change the page.
// Imported from the Linktree "jasonymusic" profile.

export type LinkItem = {
  title: string;
  url: string;
  /** set false to hide without deleting */
  active?: boolean;
  /** filename inside /public/links */
  thumb?: string;
  /** small label shown above the title, e.g. "NEW", "PRE-SAVE" */
  tag?: string;
  /** render as a large card */
  featured?: boolean;
  /** optional section heading rendered before this link */
  group?: string;
  /** automatic switch at a set time (ISO with offset), e.g. pre-save -> out now */
  release?: { at: string; title: string; tag?: string };
};

export const settings = {
  /** page <title> and heading */
  name: 'JASON Y',
  tagline: 'Internet Emotional Music*',
  avatar: '/links/avatar.jpg',
  /** 'ascii' = animated site background, 'plain' = flat black */
  background: 'ascii' as 'ascii' | 'plain',
  /** 'list' = stacked rows, 'grid' = 2-column cards */
  layout: 'list' as 'list' | 'grid',
  /** 'outline' | 'fill' */
  buttonStyle: 'outline' as 'outline' | 'fill',
  showThumbnails: true,
  showNumbers: true,
  /** accent used for hover states and tags */
  accent: '#f4f4f0',
  /** px, max width of the content column */
  maxWidth: 420,
};

export type SocialIcon = 'website' | 'email' | 'instagram' | 'tiktok' | 'youtube' | 'spotify' | 'applemusic';

// label is used for the tooltip and screen readers
export const socials: { label: string; icon: SocialIcon; url: string }[] = [
  { label: 'Instagram', icon: 'instagram', url: 'https://instagram.com/whoisjasony' },
  { label: 'TikTok', icon: 'tiktok', url: 'https://tiktok.com/@whoisjasony' },
  { label: 'YouTube', icon: 'youtube', url: 'https://www.youtube.com/@jasonymusic' },
  { label: 'Spotify', icon: 'spotify', url: 'https://open.spotify.com/artist/51H7Fx9M7pnxFZhlCYsvu9' },
  { label: 'Apple Music', icon: 'applemusic', url: 'https://music.apple.com/ca/artist/jason-y/1666161235' },
  { label: 'Email', icon: 'email', url: 'mailto:info@whoisjasony.com' },
];

export const links: LinkItem[] = [
  // Switches to "OUT NOW" by itself at release.at (Nov 20, 2026, 9:00 PM PT = 12:00 AM ET).
  {
    title: 'pre-save "I MISS YOU"', url: 'https://too.fm/i-miss-you', thumb: 'i-miss-you.jpg',
    tag: 'PRE-SAVE', featured: true,
    release: { at: '2026-11-20T21:00:00-08:00', title: 'stream "I MISS YOU"', tag: 'OUT NOW' },
  },

  { title: 'stream "CLUB ANXIETY"', url: 'https://too.fm/club-anxiety', thumb: 'club-anxiety.jpg', tag: 'OUT NOW' },
  { title: 'stream "DON\'T LIE" with daniel lin', url: 'https://too.fm/dont-lie', thumb: 'dont-lie.jpg', tag: 'OUT NOW' },
  { title: 'watch "RUN" music video', url: 'https://www.youtube.com/watch?v=gWsvF-StYYg', thumb: 'run-video.jpg', tag: 'VIDEO' },
  { title: 'stream "RUN"', url: 'https://too.fm/run-jy', thumb: 'run.jpg', tag: 'OUT NOW' },
  { title: 'stream "EXPERIMENTS VOL. 1"', url: 'https://too.fm/experiments-one-jy', thumb: 'experiments.jpg', tag: 'OUT NOW' },
  { title: 'Jason Y (DJ Set) @ CRITICAL MASS', url: 'https://youtu.be/dx2q32swA4g?is=_EnjMx7rijcU0kEN', thumb: 'critical-mass.jpg', tag: 'DJ SET' },
  { title: 'stream "SPIN IT BACK"', url: 'https://too.fm/4zxoopg', thumb: 'spin-it-back.jpg', tag: 'OUT NOW' },
  { title: 'one hour live DJ set (IEM*)', url: 'https://youtu.be/Pg8MPO6Zv2s', thumb: 'iem-dj-set.jpg', tag: 'DJ SET', active: false },

  // Hidden on Linktree. Flip active to true to bring any back.
  { title: 'stream "THE CITY"', url: 'https://too.fm/zbbx70z', tag: 'OUT NOW', active: false },
  { title: '"ESCAPE" - OUT NOW! 🏃‍➡️', url: 'https://too.fm/eedjomo', active: false },
  { title: '"RADIO" - OUT NOW 📻', url: 'https://too.fm/radio-jasony', active: false },
  { title: 'Tune in to 58.0FM/1580AM 👀 📻', url: 'https://radio.withjasony.com', active: false },
  { title: 'Jason Y - RADIO (Live Acoustic from Home)', url: 'https://www.youtube.com/watch?v=X85TG_e3WlQ', active: false },
  { title: '"SUPERNATURAL" remix [free download]*', url: 'https://soundcloud.com/jasony-music/supernatural-jason-y-remix', active: false },
];
