import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  footerActionText: string;
  footerLinkText: string;
  footerHref: string;
}

const AuthLayout = ( {
  children,
  title,
  footerActionText,
  footerLinkText,
  footerHref
}: AuthLayoutProps ) => {
  return (
    <div className="bg-[#0c0e11] text-[#e0e6f1] min-h-screen flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <main className="z-10 w-full max-w-md">
        {/* <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold tracking-tighter text-[#e0e6f1] mb-2">{title}</h1>
        </div> */}

        {/* Card Principal */}
        <div className="bg-[#111418] p-10 rounded-xl shadow-2xl relative overflow-hidden border border-[#424851]/10">
          {children}
          <footer className="mt-12 text-center space-y-4">
            <p className="text-[#9a9ea8] text-sm">
              {footerActionText}
              <a href={footerHref} className="text-[#e0e6f1] font-semibold hover:text-[#b9c7e5] transition-colors ml-1">
                {footerLinkText}
              </a>
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
};

// Sub-componente interno para botones sociales
const SocialButton = ( { icon, label }: { icon: string; label: string } ) => (
  <button className="flex items-center justify-center gap-3 h-11 bg-[#1b2027] rounded-md hover:bg-[#20262f] transition-colors text-[#e0e6f1] text-sm font-medium border border-transparent hover:border-[#424851]/30">
    <span className="material-symbols-outlined text-lg">{icon}</span>
    <span>{label}</span>
  </button>
);

export default AuthLayout;
