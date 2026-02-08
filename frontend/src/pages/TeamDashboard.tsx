import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const teamMembers = [
    {
        id: 1,
        name: 'Sarah Jenkins',
        role: 'TEAM LEADER',
        initials: 'SJ',
        heartRate: 78,
        oxygen: 98,
        altitude: 4.2,
        battery: 92,
        status: 'ok',
        distance: '0.0M',
        bearing: '0° N',
        position: { top: '32%', left: '58%' },
        isLeader: true,
    },
    {
        id: 2,
        name: 'Kimi Tanaka',
        role: 'SCOUT',
        initials: 'KT',
        heartRate: 142,
        oxygen: 84,
        altitude: 4.8,
        battery: 48,
        status: 'critical',
        distance: '1.2KM',
        bearing: '285° NW',
        position: { top: '55%', left: '18%' },
        isLeader: false,
    },
    {
        id: 3,
        name: 'David Ross',
        role: 'MEDIC',
        initials: 'DR',
        heartRate: 82,
        oxygen: 96,
        altitude: 4.1,
        battery: 89,
        status: 'ok',
        distance: '450M',
        bearing: '190° S',
        position: { top: '68%', left: '10%' },
        isLeader: false,
    },
    {
        id: 4,
        name: 'Li Chen',
        role: 'SPECIALIST',
        initials: 'LC',
        heartRate: 75,
        oxygen: 99,
        altitude: 4.3,
        battery: 95,
        status: 'ok',
        distance: '210M',
        bearing: '45° NE',
        position: { top: '42%', left: '48%' },
        isLeader: false,
    },
];

export default function TeamDashboard() {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    const criticalMember = teamMembers.find(m => m.status === 'critical');

    return (
        <div className="flex flex-col h-screen w-full bg-[#0a0d12] text-white font-['Space_Grotesk',sans-serif] overflow-hidden">
            {/* Header */}
            <header className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="size-10 bg-[#22c55e]/20 rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#22c55e]">explore</span>
                    </div>
                    <div>
                        <h1 className="text-lg md:text-xl font-bold tracking-wider">EXPEDITION ALPHA</h1>
                        <div className="flex items-center gap-2">
                            <span className="size-2 bg-[#22c55e] rounded-full animate-pulse"></span>
                            <span className="text-[#22c55e]/70 text-[10px] md:text-xs font-medium uppercase">Live Uplink • Syncing...</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4 md:gap-8">
                    <div className="hidden sm:flex items-center gap-6">
                        <div className="text-right">
                            <span className="text-[10px] text-white/40 uppercase block">Local Time</span>
                            <span className="text-sm font-bold">{currentTime.toLocaleTimeString('en-US', { hour12: false })}</span>
                        </div>
                        <div className="text-right">
                            <span className="text-[10px] text-white/40 uppercase block">Coordinates</span>
                            <span className="text-sm font-bold">45.8327° N, 6.8651° E</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10">
                            <span className="material-symbols-outlined text-xl">notifications</span>
                        </button>
                        <Link to="/settings" className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10">
                            <span className="material-symbols-outlined text-xl">settings</span>
                        </Link>
                        <div className="size-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold border-2 border-[#22c55e]/50">
                            SJ
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex flex-1 overflow-hidden flex-col lg:flex-row">
                {/* Map View */}
                <div className="relative flex-1 bg-[#0a0d12] overflow-hidden min-h-[300px] lg:min-h-0">
                    {/* Grid Pattern */}
                    <div
                        className="absolute inset-0 opacity-20"
                        style={{ backgroundImage: 'radial-gradient(circle, #22c55e 1px, transparent 1px)', backgroundSize: '50px 50px' }}
                    ></div>

                    {/* Signal Coverage */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#22c55e]/5 blur-[100px] pointer-events-none"></div>

                    {/* Elevation Profile - Top Left */}
                    <div className="absolute top-4 left-4 bg-[#151a21]/90 backdrop-blur border border-white/10 rounded-xl p-4 z-10">
                        <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest mb-3">Elevation Profile</p>
                        <div className="flex items-end gap-1 h-16">
                            <div className="w-4 bg-[#22c55e]/30 rounded-t" style={{ height: '40%' }}></div>
                            <div className="w-4 bg-[#22c55e]/40 rounded-t" style={{ height: '55%' }}></div>
                            <div className="w-4 bg-[#22c55e]/50 rounded-t" style={{ height: '70%' }}></div>
                            <div className="w-4 bg-[#22c55e]/70 rounded-t" style={{ height: '95%' }}></div>
                            <div className="w-4 bg-[#22c55e]/60 rounded-t" style={{ height: '80%' }}></div>
                            <div className="w-4 bg-[#22c55e]/40 rounded-t" style={{ height: '60%' }}></div>
                        </div>
                        <div className="flex justify-between mt-2 text-[9px] text-white/40 font-mono">
                            <span>3260m</span>
                            <span className="text-[#22c55e]">4800m</span>
                            <span>3600m</span>
                        </div>
                    </div>

                    {/* Trail Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <path
                            d="M80,520 Q150,400 200,450 Q280,380 350,420 L480,280 L550,320"
                            fill="none"
                            stroke="#22c55e"
                            strokeWidth="2"
                            strokeDasharray="8,8"
                            className="opacity-50"
                        />
                    </svg>

                    {/* Base Camp Flag */}
                    <div className="absolute top-[28%] right-[35%] flex flex-col items-center z-10">
                        <div className="px-3 py-1 bg-[#1a2e1e] border border-[#22c55e]/30 text-[#22c55e] text-[10px] font-bold rounded mb-1">BASE CAMP B</div>
                        <span className="material-symbols-outlined text-[#22c55e] text-2xl">flag</span>
                    </div>

                    {/* Team Markers */}
                    {teamMembers.map((member) => (
                        <div
                            key={member.id}
                            className="absolute cursor-pointer transition-transform hover:scale-110 z-10"
                            style={{ top: member.position.top, left: member.position.left }}
                        >
                            <div className="relative flex items-center justify-center">
                                {member.isLeader && (
                                    <div className="absolute inset-0 size-12 animate-ping rounded-full bg-[#22c55e]/30"></div>
                                )}
                                <div
                                    className={`size-10 md:size-12 rounded-full border-2 flex items-center justify-center font-bold text-xs md:text-sm z-10 overflow-hidden ${member.status === 'critical'
                                            ? 'bg-[#dc2626]/20 border-[#dc2626] shadow-[0_0_15px_rgba(220,38,38,0.5)]'
                                            : member.isLeader
                                                ? 'bg-[#22c55e]/20 border-[#22c55e] shadow-[0_0_15px_rgba(34,197,94,0.5)]'
                                                : 'bg-white/10 border-white/30'
                                        }`}
                                >
                                    {member.status === 'critical' ? (
                                        <span className="material-symbols-outlined text-[#dc2626]">bolt</span>
                                    ) : (
                                        <div className="size-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center rounded-full">
                                            {member.initials}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Map Controls */}
                    <div className="absolute bottom-4 left-4 flex flex-col gap-2 z-10">
                        <button className="size-10 bg-[#151a21]/90 backdrop-blur border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10">
                            <span className="material-symbols-outlined text-lg">add</span>
                        </button>
                        <button className="size-10 bg-[#151a21]/90 backdrop-blur border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10">
                            <span className="material-symbols-outlined text-lg">remove</span>
                        </button>
                        <button className="size-10 bg-[#151a21]/90 backdrop-blur border border-white/10 rounded-lg flex items-center justify-center hover:bg-white/10 mt-2">
                            <span className="material-symbols-outlined text-lg">my_location</span>
                        </button>
                    </div>
                </div>

                {/* Right Sidebar */}
                <aside className="w-full lg:w-[380px] border-t lg:border-t-0 lg:border-l border-white/10 bg-[#0d1117] flex flex-col overflow-hidden">
                    {/* Critical Alert */}
                    {criticalMember && (
                        <div className="p-4 shrink-0">
                            <div className="bg-[#2a1a1a] border border-[#dc2626]/40 rounded-xl p-4">
                                <div className="flex items-start gap-3">
                                    <div className="size-8 bg-[#dc2626] rounded-full flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-white text-sm">warning</span>
                                    </div>
                                    <div>
                                        <h3 className="text-[#dc2626] text-sm font-bold uppercase">Critical Alert</h3>
                                        <p className="text-white/80 text-sm mt-1 leading-snug">
                                            Low oxygen levels detected in Sector B. {criticalMember.name}'s O2 at {criticalMember.oxygen}%.
                                        </p>
                                        <button className="mt-2 text-xs font-bold text-[#dc2626] uppercase tracking-wider hover:underline">
                                            Broadcast Warning
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Team Vitals */}
                    <div className="flex-1 overflow-y-auto px-4 pb-4">
                        <p className="text-[10px] text-white/50 uppercase font-bold tracking-widest py-3 sticky top-0 bg-[#0d1117]">
                            Team Vitals ({teamMembers.length}/{teamMembers.length} Online)
                        </p>

                        <div className="space-y-3">
                            {teamMembers.map((member) => (
                                <div
                                    key={member.id}
                                    className={`bg-[#151a21] border border-white/10 p-4 rounded-xl border-l-4 ${member.status === 'critical' ? 'border-l-[#dc2626]' : 'border-l-[#22c55e]'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="size-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center font-bold text-sm border border-white/10">
                                                {member.initials}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm">{member.name}</h4>
                                                <p className="text-[10px] text-white/50 font-bold">{member.role}</p>
                                            </div>
                                        </div>
                                        <span className={`px-3 py-1 rounded text-[10px] font-bold ${member.status === 'critical'
                                                ? 'bg-[#dc2626]/20 text-[#dc2626]'
                                                : 'bg-[#22c55e]/20 text-[#22c55e]'
                                            }`}>
                                            {member.status === 'critical' ? 'ELEVATED HR' : 'STATUS: OK'}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-4 gap-2 mb-3">
                                        <div className={`rounded-lg p-2 flex flex-col items-center ${member.status === 'critical' ? 'bg-[#dc2626]/10' : 'bg-white/5'
                                            }`}>
                                            <span className={`material-symbols-outlined text-xs mb-1 ${member.status === 'critical' ? 'text-[#dc2626]' : 'text-[#22c55e]'}`}>favorite</span>
                                            <span className={`text-sm font-bold ${member.status === 'critical' ? 'text-[#dc2626]' : ''}`}>{member.heartRate}</span>
                                        </div>
                                        <div className={`rounded-lg p-2 flex flex-col items-center ${member.oxygen < 90 ? 'bg-[#dc2626]/10' : 'bg-white/5'
                                            }`}>
                                            <span className={`material-symbols-outlined text-xs mb-1 ${member.oxygen < 90 ? 'text-[#dc2626]' : 'text-[#22c55e]'}`}>air</span>
                                            <span className={`text-sm font-bold ${member.oxygen < 90 ? 'text-[#dc2626]' : ''}`}>{member.oxygen}%</span>
                                        </div>
                                        <div className="bg-white/5 rounded-lg p-2 flex flex-col items-center">
                                            <span className="material-symbols-outlined text-xs mb-1 text-[#22c55e]">landscape</span>
                                            <span className="text-sm font-bold">{member.altitude}k</span>
                                        </div>
                                        <div className="bg-white/5 rounded-lg p-2 flex flex-col items-center">
                                            <span className={`material-symbols-outlined text-xs mb-1 ${member.battery < 50 ? 'text-[#f59e0b]' : 'text-[#22c55e]'}`}>battery_horiz_075</span>
                                            <span className="text-sm font-bold">{member.battery}%</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between text-[10px] text-white/40 font-mono uppercase pt-2 border-t border-white/5">
                                        <span>Dist: {member.distance}</span>
                                        <span>Bearing: {member.bearing}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SOS Button */}
                    <div className="p-4 border-t border-white/10 shrink-0">
                        <button className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-black py-4 rounded-xl shadow-[0_0_30px_rgba(220,38,38,0.4)] transition-all active:scale-95 uppercase tracking-widest flex items-center justify-center gap-3 text-lg">
                            <span className="material-symbols-outlined text-2xl">sos</span>
                            Emergency SOS
                        </button>
                        <p className="text-[10px] text-center text-white/30 mt-3 uppercase tracking-wider">
                            Instant satellite deployment for search & rescue
                        </p>
                    </div>
                </aside>
            </main>
        </div>
    );
}
