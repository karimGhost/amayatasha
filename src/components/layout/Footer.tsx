import { Link } from 'react-router-dom';
import { Palette,  BookImage, Heart ,RectangleCircle} from 'lucide-react';
import { artistInfo } from '../../lib/config';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800">
      <div className="absolute inset-0 bg-gradient-to-t from-amber-500/5 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl shadow-lg shadow-amber-500/20">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-white">Artistry</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              {artistInfo.bio}
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Quick Links</h3>
            <div className="space-y-2">
              {[
                { path: '/', label: 'Home' },
                { path: '/gallery', label: 'Gallery' },
                { path: '/about', label: 'About' },
                { path: '/contact', label: 'Contact' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="block text-slate-400 hover:text-amber-400 transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Connect</h3>
            <div className="flex gap-3">
              {artistInfo.instagram && (
                <a
                  href={artistInfo.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800/50 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-all"
                >
                  <RectangleCircle className="w-5 h-5" />
                </a>
              )}
              {artistInfo.facebook && (
                <a
                  href={artistInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800/50 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-slate-800 transition-all"
                >
                  <BookImage className="w-5 h-5" />
                </a>
              )}
            </div>
            <p className="text-sm text-slate-400">{artistInfo.email}</p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            {currentYear} {artistInfo.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-slate-500 text-sm">
            Made with <Heart className="w-4 h-4 text-amber-500" /> 
          </p>
        </div>
      </div>
    </footer>
  );
}
