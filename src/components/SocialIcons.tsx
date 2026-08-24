import React from 'react';
import {
  Instagram,
  Youtube,
  MessageCircle,
  Twitter,
  Linkedin,
  Github,
  Music,
  Send,
  Mail,
  Facebook,
  Globe,
  Radio,
} from 'lucide-react';
import { SocialLink } from '../types';

interface SocialIconsProps {
  socials: SocialLink[];
  color?: string;
  hoverBg?: string;
  onSocialClick?: (platform: string, url: string) => void;
}

export const SocialIcons: React.FC<SocialIconsProps> = ({ socials, color = 'currentColor', onSocialClick }) => {
  const activeSocials = socials.filter(s => s.enabled && s.url);

  if (activeSocials.length === 0) return null;

  const getIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="w-5 h-5" />;
      case 'tiktok':
        return <Music className="w-5 h-5" />;
      case 'youtube':
        return <Youtube className="w-5 h-5" />;
      case 'whatsapp':
        return <MessageCircle className="w-5 h-5" />;
      case 'twitter':
        return <Twitter className="w-5 h-5" />;
      case 'linkedin':
        return <Linkedin className="w-5 h-5" />;
      case 'github':
        return <Github className="w-5 h-5" />;
      case 'spotify':
        return <Radio className="w-5 h-5" />;
      case 'telegram':
        return <Send className="w-5 h-5" />;
      case 'email':
        return <Mail className="w-5 h-5" />;
      case 'facebook':
        return <Facebook className="w-5 h-5" />;
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-3 my-3">
      {activeSocials.map(social => (
        <a
          key={social.id}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (onSocialClick) {
              onSocialClick(social.platform, social.url);
            }
          }}
          style={{ color }}
          className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-200 transform hover:scale-110 active:scale-95 flex items-center justify-center backdrop-blur-sm shadow-sm"
          title={social.platform}
          aria-label={social.platform}
        >
          {getIcon(social.platform)}
        </a>
      ))}
    </div>
  );
};
