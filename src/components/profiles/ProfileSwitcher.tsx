interface Profile {
  id: string;
  businessName: string;
  phone: string;
  suburb: string;
  theme: string;
}

interface ProfileSwitcherProps {
  profiles: Profile[];
  activeProfileId: string;
  onSelectProfile: (profile: Profile) => void;
  onAddNew: () => void;
}

export default function ProfileSwitcher({ profiles, activeProfileId, onSelectProfile, onAddNew }: ProfileSwitcherProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col gap-3 shadow-xl">
      <div className="flex justify-between items-center">
        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Client Profile</label>
        <button 
          onClick={onAddNew}
          className="text-xs text-blue-400 hover:text-blue-300 font-bold transition"
        >
          + New Client
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {profiles.map((p) => (
          <button
            key={p.id}
            onClick={() => onSelectProfile(p)}
            className={`w-full text-left p-3 rounded-xl transition flex items-center justify-between border ${
              p.id === activeProfileId 
                ? 'bg-blue-600/10 border-blue-500/30 text-white shadow-lg shadow-blue-600/10' 
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <div>
              <div className="font-bold text-sm text-white">{p.businessName}</div>
              <div className="text-xs text-slate-400 mt-0.5">{p.suburb} • <span className="capitalize">{p.theme}</span></div>
            </div>
            {p.id === activeProfileId && (
              <span className="w-2 h-2 rounded-full bg-blue-500 shadow-glow"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}