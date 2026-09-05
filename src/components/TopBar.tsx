import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Phone, Sparkles } from 'lucide-react';
import { STORE_INFO } from '../data/storeData';

export const TopBar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const day = now.getDay(); // 0 = Sun, 6 = Sat
      const hour = now.getHours();
      const minute = now.getMinutes();
      const timeInMinutes = hour * 60 + minute;

      if (day === 0) {
        setIsOpen(false);
      } else if (day === 6) {
        // Saturday 8:00 - 12:00
        setIsOpen(timeInMinutes >= 8 * 60 && timeInMinutes < 12 * 60);
      } else {
        // Mon-Fri 8:00 - 18:00
        setIsOpen(timeInMinutes >= 8 * 60 && timeInMinutes < 18 * 60);
      }
    };

    checkOpenStatus();
    const timer = setInterval(checkOpenStatus, 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div id="top-announcement-bar" className="bg-zinc-950 border-b border-zinc-800/80 px-4 md:px-8 py-2 text-[11px] uppercase tracking-wider text-zinc-400 font-medium">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4">
          <a
            href={STORE_INFO.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-green-400 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-green-500 shrink-0" />
            <span>📍 {STORE_INFO.addressShort}</span>
          </a>
          <span className="hidden md:inline text-zinc-700">•</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
            <span>🕒 Seg–Sex: {STORE_INFO.hoursWeekday} • Sáb: {STORE_INFO.hoursSaturday}</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className={`inline-block w-2 h-2 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-amber-500'}`} />
            <span className={`font-bold ${isOpen ? 'text-green-400' : 'text-amber-400'}`}>
              {isOpen ? 'LOJA ABERTA AGORA' : 'ATENDIMENTO WHATSAPP'}
            </span>
          </div>
          <span className="hidden sm:inline text-zinc-700">•</span>
          <a
            href={`tel:${STORE_INFO.phoneRaw}`}
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <Phone className="w-3 h-3 text-green-500" />
            <span>{STORE_INFO.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
