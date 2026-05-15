"use client";

import { useState, type MouseEvent } from "react";
import Link from "next/link";

interface RegisterButtonProps {
  color: string;
  href?: string;
  links?: Array<{ label: string; url: string }>;
  label?: string;
}

export default function RegisterButton({ color, href, links, label = "Register Now" }: RegisterButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isMultiLink = Boolean(links && links.length > 0);
  const isDirectLink = Boolean(href);

  const baseClassName =
    "w-full sm:w-auto px-10 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.2)]";

  const handleMouseEnter = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.boxShadow = `0 0 30px ${color}80`;
    el.style.backgroundColor = color;
    el.style.color = "#fff";
  };

  const handleMouseLeave = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget as HTMLElement;
    el.style.boxShadow = "0 0 20px rgba(255,255,255,0.2)";
    el.style.backgroundColor = "#fff";
    el.style.color = "#000";
  };

  return (
    <>
      {isDirectLink ? (
        <Link
          href={href!}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClassName}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {label}
        </Link>
      ) : (
        <button
          className={baseClassName}
          onClick={() => setIsModalOpen(true)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {label}
        </button>
      )}

      {/* Coming Soon Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div 
            className="bg-gray-950 border p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center relative"
            style={{ borderColor: `${color}40`, boxShadow: `0 0 40px ${color}20` }}
          >
            {/* Close 'X' Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {isMultiLink ? (
              <>
                <h2 className="text-2xl font-bold text-white mb-3 tracking-widest uppercase">
                  Choose Form
                </h2>
                <p className="text-gray-400 mb-6">
                  Select the registration form for your domain.
                </p>
                <div className="flex flex-col gap-3 mb-6">
                  {links!.map((item) => (
                    <Link
                      key={item.url}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-4 py-3 rounded-xl font-bold uppercase tracking-wider transition-all duration-300 hover:scale-[1.02] bg-white/10 text-white border border-white/10 hover:border-white/30"
                      style={{ boxShadow: `0 0 12px ${color}20` }}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold text-white mb-3 tracking-widest uppercase">
                  Coming Soon
                </h2>
                <p className="text-gray-400 mb-6">
                  Registration for this event has not opened yet. Stay tuned!
                </p>
              </>
            )}
            
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-8 py-3 rounded-full font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: color, color: '#fff', boxShadow: `0 0 15px ${color}60` }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}