import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function MaritimeDashboard() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [weatherRadarOn, setWeatherRadarOn] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col h-screen w-screen bg-[#0a1628] text-slate-200 font-['Space_Grotesk',sans-serif] overflow-hidden">
            {/* Header */}
            <header className="h-14 border-b border-white/10 bg-[#0a1628]/90 flex items-center justify-between px-4 md:px-6 z-50 shrink-0">
                <div className="flex items-center gap-3 md:gap-4">
                    <div className="flex items-center gap-2 text-[#3b82f6]">
                        <span className="material-symbols-outlined text-2xl">explore</span>
                        <h1 className="text-lg font-bold tracking-tight">MARITIME<span className="text-slate-400 font-light">SAFE</span></h1>
                    </div>
                    <div className="hidden md:flex items-center gap-4 ml-4">
                        <div className="flex items-center gap-1 text-xs">
                            <span className="material-symbols-outlined text-[#22c55e] text-sm">settings_input_antenna</span>
                            <span className="text-slate-400">SAT:</span>
                            <span className="font-medium">LINKED (98%)</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs">
                            <span className="material-symbols-outlined text-[#3b82f6] text-sm">radio</span>
                            <span className="text-slate-400">VHF:</span>
                            <span className="font-medium">CH 16 ACTIVE</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-4 md:gap-6">
                    <div className="hidden sm:flex items-center gap-2 bg-slate-800/50 p-1.5 rounded-lg border border-slate-700">
                        <span className="text-[10px] font-medium ml-2 text-slate-400 uppercase">Weather Radar</span>
                        <button
                            onClick={() => setWeatherRadarOn(!weatherRadarOn)}
                            className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors ${weatherRadarOn ? 'bg-[#3b82f6]' : 'bg-slate-600'}`}
                        >
                            <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition ${weatherRadarOn ? 'translate-x-5' : 'translate-x-1'}`}></span>
                        </button>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <div className="text-sm font-bold tabular-nums">{currentTime.toLocaleTimeString('en-US', { hour12: false })}</div>
                            <div className="text-[10px] text-slate-400">{currentTime.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}</div>
                        </div>
                        <Link to="/settings" className="p-2 hover:bg-slate-800 rounded-lg transition">
                            <span className="material-symbols-outlined text-xl">settings</span>
                        </Link>
                    </div>
                </div>
            </header>

            <main className="flex-1 relative flex flex-col lg:flex-row overflow-hidden">
                {/* Left Sidebar: Tide & Sea State */}
                <aside className="w-full lg:w-64 xl:w-72 p-3 flex flex-row lg:flex-col gap-3 z-40 relative overflow-x-auto lg:overflow-x-visible shrink-0 border-b lg:border-b-0 lg:border-r border-white/10">
                    {/* Tide Panel */}
                    <div className="min-w-[260px] lg:min-w-0 flex-1 lg:flex-none bg-[#111827]/80 backdrop-blur border border-white/10 rounded-xl overflow-hidden flex flex-col">
                        <div className="px-4 py-3 border-b border-slate-700/50 flex justify-between items-center">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Tide Levels</h3>
                            <span className="text-[10px] bg-[#3b82f6]/20 text-[#3b82f6] px-2 py-0.5 rounded-full font-bold">PORT KEMBLA</span>
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                            <div className="flex items-end gap-2 mb-4">
                                <span className="text-3xl font-bold text-white">+1.42m</span>
                                <span className="text-xs text-[#22c55e] mb-1 flex items-center">
                                    <span className="material-symbols-outlined text-sm">arrow_upward</span>RISING
                                </span>
                            </div>
                            <div className="flex-1 min-h-[60px]">
                                <svg className="w-full h-full opacity-80" viewBox="0 0 200 60">
                                    <line x1="0" y1="55" x2="200" y2="55" stroke="#334155" strokeDasharray="4" />
                                    <path d="M0 45 Q 50 15, 100 45 T 200 45" fill="none" stroke="#3b82f6" strokeWidth="2" />
                                    <circle cx="70" cy="30" r="4" fill="#3b82f6" />
                                </svg>
                            </div>
                            <div className="grid grid-cols-2 gap-2 mt-3">
                                <div className="bg-slate-800/50 p-2 rounded">
                                    <p className="text-[9px] text-slate-500 uppercase">Next High</p>
                                    <p className="text-sm font-bold">18:45 • 1.6m</p>
                                </div>
                                <div className="bg-slate-800/50 p-2 rounded">
                                    <p className="text-[9px] text-slate-500 uppercase">Next Low</p>
                                    <p className="text-sm font-bold">01:20 • 0.3m</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sea State Panel */}
                    <div className="min-w-[260px] lg:min-w-0 flex-1 lg:flex-none bg-[#111827]/80 backdrop-blur border border-white/10 rounded-xl overflow-hidden flex flex-col">
                        <div className="px-4 py-3 border-b border-slate-700/50 flex justify-between items-center">
                            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Sea State</h3>
                            <span className="material-symbols-outlined text-sm text-slate-500">water_drop</span>
                        </div>
                        <div className="p-4 flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full border-2 border-[#f59e0b]/30 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[#f59e0b] text-2xl">waves</span>
                                </div>
                                <div>
                                    <p className="text-lg font-bold text-white uppercase">Moderate</p>
                                    <p className="text-[10px] text-slate-400">Beaufort Scale: 4</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div>
                                    <div className="flex justify-between items-center text-[10px] mb-1">
                                        <span className="text-slate-400 uppercase">Swell Height</span>
                                        <span className="font-bold">2.4m</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                                        <div className="bg-[#f59e0b] h-full" style={{ width: '45%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center text-[10px] mb-1">
                                        <span className="text-slate-400 uppercase">Wind Spd</span>
                                        <span className="font-bold">18 kts</span>
                                    </div>
                                    <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden">
                                        <div className="bg-[#3b82f6] h-full" style={{ width: '30%' }}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center text-[10px] mb-1">
                                        <span className="text-slate-400 uppercase">Visibility</span>
                                        <span className="font-bold">8.5 nm</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Nautical Chart */}
                <div
                    className="flex-1 relative bg-[#0a1020] overflow-hidden min-h-[300px]"
                    style={{ backgroundImage: 'radial-gradient(circle, #1e3a5f 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                >
                    {/* Bathymetry Gradient */}
                    <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-blue-900 via-slate-900 to-blue-950"></div>

                    {/* Wave Pattern */}
                    {weatherRadarOn && (
                        <div
                            className="absolute inset-0 opacity-10 pointer-events-none"
                            style={{ background: 'repeating-linear-gradient(45deg, transparent, transparent 100px, #3b82f6 101px, #3b82f6 102px)' }}
                        ></div>
                    )}

                    {/* AIS Ship Markers */}
                    <div className="absolute top-[30%] left-[35%] cursor-pointer group">
                        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-b-[14px] border-b-[#f59e0b] border-r-[6px] border-r-transparent rotate-[45deg]"></div>
                    </div>
                    <div className="absolute bottom-[35%] right-[25%] cursor-pointer">
                        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-b-[14px] border-b-[#f59e0b] border-r-[6px] border-r-transparent rotate-[180deg]"></div>
                    </div>

                    {/* Reef Hazard */}
                    <div className="absolute top-[45%] right-[30%]">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute w-10 h-10 bg-[#ef4444]/20 rounded-full animate-ping"></div>
                            <span className="material-symbols-outlined text-[#ef4444] text-xl">warning</span>
                        </div>
                        <span className="text-[9px] text-[#ef4444] font-bold absolute top-7 -left-4 whitespace-nowrap">SHALLOW REEF</span>
                    </div>

                    {/* User Vessel */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="relative">
                            <div className="absolute w-0.5 h-24 bg-[#3b82f6]/60 bottom-full left-1/2 -translate-x-1/2"></div>
                            <div className="bg-[#3b82f6] p-2 rounded shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                                <span className="material-symbols-outlined text-white text-2xl">navigation</span>
                            </div>
                        </div>
                    </div>

                    {/* Map Controls */}
                    <div className="absolute bottom-24 right-4 flex flex-col gap-2">
                        <button className="bg-[#111827]/80 backdrop-blur border border-white/10 size-9 flex items-center justify-center rounded-lg hover:bg-slate-700">
                            <span className="material-symbols-outlined text-lg">add</span>
                        </button>
                        <button className="bg-[#111827]/80 backdrop-blur border border-white/10 size-9 flex items-center justify-center rounded-lg hover:bg-slate-700">
                            <span className="material-symbols-outlined text-lg">remove</span>
                        </button>
                        <button className="bg-[#111827]/80 backdrop-blur border border-white/10 size-9 flex items-center justify-center rounded-lg hover:bg-slate-700">
                            <span className="material-symbols-outlined text-lg">layers</span>
                        </button>
                    </div>

                    {/* Coordinate Display */}
                    <div className="absolute bottom-24 left-4 lg:left-auto lg:right-[calc(100%-280px)] bg-[#111827]/80 backdrop-blur border border-white/10 px-3 py-1.5 rounded-lg flex gap-3 text-[10px] font-mono text-slate-400">
                        <span>LAT: 34° 28' 56" S</span>
                        <span className="text-slate-600">|</span>
                        <span>LON: 150° 54' 32" E</span>
                        <span className="text-slate-600">|</span>
                        <span className="text-[#3b82f6] font-bold">HDG: 045°</span>
                    </div>
                </div>

                {/* Bottom Telemetry Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-20 flex items-stretch gap-px bg-slate-900/95 border-t border-slate-700 z-50">
                    {/* Depth Sounder */}
                    <div className="flex-1 bg-[#0a1628] px-4 md:px-6 flex items-center gap-4 md:gap-6 border-r border-slate-800">
                        <div className="flex flex-col shrink-0">
                            <span className="text-[9px] font-bold text-slate-500 uppercase">Depth Under Keel</span>
                            <span className="text-2xl md:text-3xl font-bold text-[#3b82f6] tabular-nums">
                                042.8<span className="text-base">m</span>
                            </span>
                        </div>
                        <div className="flex-1 h-12 bg-[#111827]/80 border border-white/10 rounded-lg overflow-hidden relative hidden sm:block">
                            <svg className="w-full h-full" viewBox="0 0 400 48" preserveAspectRatio="none">
                                <path d="M0 48 L0 35 Q 50 30, 100 38 T 200 25 T 300 36 T 400 32 L 400 48 Z" fill="#3b82f6" fillOpacity="0.1" stroke="#3b82f6" strokeWidth="1" />
                            </svg>
                        </div>
                    </div>

                    {/* Anti-Collision */}
                    <div className="w-[280px] md:w-[350px] bg-[#0a1628] px-4 flex items-center gap-4 border-r border-slate-800 hidden md:flex">
                        <div className="p-2 rounded bg-[#ef4444]/10 border border-[#ef4444]/20 flex flex-col items-center shrink-0">
                            <span className="material-symbols-outlined text-[#ef4444] text-xl">radar</span>
                            <span className="text-[7px] font-black text-[#ef4444] mt-0.5">AI COLLISION</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-[10px] text-slate-400">NEAREST CONTACT: <span className="text-white">AIS-3248</span></span>
                                <span className="text-[10px] font-bold text-[#ef4444]">ALARM: 1.2 NM</span>
                            </div>
                            <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                                <div className="bg-[#ef4444] h-full" style={{ width: '15%' }}></div>
                            </div>
                            <div className="flex justify-between text-[9px] mt-1 text-slate-500">
                                <span>0nm</span>
                                <span>5nm</span>
                                <span>10nm</span>
                            </div>
                        </div>
                    </div>

                    {/* EPIRB Button */}
                    <div className="w-48 md:w-64 bg-slate-900 p-2 flex items-center justify-center">
                        <button className="w-full h-full bg-[#dc2626] hover:bg-red-600 rounded-xl flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(220,38,38,0.4)] border-2 border-white/20 active:scale-95 transition-all">
                            <span className="material-symbols-outlined text-2xl text-white animate-pulse">emergency</span>
                            <div className="text-left">
                                <p className="text-[9px] font-black text-white leading-tight uppercase">Distress Signal</p>
                                <p className="text-base font-bold text-white">EPIRB ON</p>
                            </div>
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
