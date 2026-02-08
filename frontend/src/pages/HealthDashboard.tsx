import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const generateBiometricData = () => ({
    heartRate: Math.floor(72 + Math.random() * 12),
    bloodOxygen: Math.floor(95 + Math.random() * 4),
    bodyTemperature: (36.4 + Math.random() * 0.8).toFixed(1),
    stressLevel: Math.floor(15 + Math.random() * 30),
    sleepHours: 7,
    sleepMinutes: 45,
    deepSleepPercent: 29,
    remSleepPercent: 23,
    recoveryScore: Math.floor(80 + Math.random() * 15),
});

export default function HealthDashboard() {
    const [biometrics, setBiometrics] = useState(generateBiometricData());
    const [isConnected] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => setBiometrics(generateBiometricData()), 5000);
        return () => clearInterval(interval);
    }, []);

    const heartRateProgress = (biometrics.heartRate / 200) * 100;

    const navItems = [
        { path: '/dashboard', icon: 'grid_view', label: 'Home' },
        { path: '/route', icon: 'edit', label: 'Activity' },
        { path: '/health', icon: 'favorite', label: 'Health', active: true },
        { path: '/settings', icon: 'settings', label: 'Settings' },
    ];

    return (
        <div className="flex h-screen bg-[#111318] text-white font-['Space_Grotesk',sans-serif]">
            {/* Left Sidebar */}
            <nav className="w-16 md:w-56 flex flex-col border-r border-white/10 bg-[#111318] shrink-0">
                {/* Logo */}
                <div className="p-4 flex items-center gap-3">
                    <div className="size-10 bg-[#22c55e] rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-black text-xl">explore</span>
                    </div>
                    <span className="hidden md:block text-lg font-bold tracking-wide">ADVENTURE</span>
                </div>

                {/* Nav Items */}
                <div className="flex-1 flex flex-col gap-1 px-2 mt-4">
                    {navItems.map(item => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors ${item.active
                                    ? 'bg-[#22c55e]/10 text-[#22c55e]'
                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <span className="material-symbols-outlined text-xl">{item.icon}</span>
                            <span className="hidden md:block text-sm font-medium">{item.label}</span>
                        </Link>
                    ))}
                </div>

                {/* User */}
                <div className="p-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold">
                            AR
                        </div>
                        <div className="hidden md:block">
                            <p className="text-xs text-white/50">Explorer</p>
                            <p className="text-sm font-semibold">Alex Rivers</p>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between px-4 md:px-8 py-4 border-b border-white/10 shrink-0">
                    <div>
                        <h1 className="text-xl md:text-2xl font-bold">Health Dashboard</h1>
                        <p className="text-white/40 text-xs md:text-sm">Real-time physiological telemetry</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full text-xs font-bold ${isConnected ? 'bg-[#22c55e] text-black' : 'bg-red-500/20 text-red-400'
                            }`}>
                            <span className="material-symbols-outlined text-sm">bluetooth</span>
                            <span className="hidden sm:inline">CONNECTED</span>
                        </div>
                        <button className="size-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10">
                            <span className="material-symbols-outlined">notifications</span>
                        </button>
                    </div>
                </header>

                {/* Dashboard Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
                    {/* AI Safety Banner */}
                    <div className="bg-[#2a2520] border border-[#f59e0b]/30 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="size-12 bg-[#f59e0b]/20 rounded-full flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-[#f59e0b] text-2xl">warning</span>
                            </div>
                            <div>
                                <p className="text-[#f59e0b] text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1">Critical AI Safety Recommendation</p>
                                <h3 className="text-base md:text-lg font-bold text-white">Suggest Rest: Potential Overexertion Detected</h3>
                                <div className="flex flex-wrap gap-2 mt-3">
                                    <span className="bg-[#333]/80 px-3 py-1 rounded-full text-[10px] font-medium text-white/80 uppercase">High Altitude</span>
                                    <span className="bg-[#333]/80 px-3 py-1 rounded-full text-[10px] font-medium text-white/80 uppercase">Rapid Ascent</span>
                                    <span className="bg-[#333]/80 px-3 py-1 rounded-full text-[10px] font-medium text-white/80 uppercase">Low Recovery Score</span>
                                </div>
                            </div>
                        </div>
                        <button className="w-full md:w-auto bg-[#22c55e] hover:bg-[#16a34a] text-black px-6 py-3 rounded-xl font-bold transition-all shrink-0">
                            View Analysis
                        </button>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Heart Rate Gauge */}
                        <div className="lg:col-span-5 bg-[#1a1d24] border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center min-h-[320px] md:min-h-[380px]">
                            <p className="text-white/50 font-medium mb-6 text-sm">Heart Rate</p>
                            <div className="relative flex items-center justify-center">
                                <svg className="w-48 h-48 md:w-56 md:h-56 -rotate-90" viewBox="0 0 200 200">
                                    <circle cx="100" cy="100" r="85" fill="transparent" stroke="#1f2937" strokeWidth="12" />
                                    <circle
                                        cx="100" cy="100" r="85" fill="transparent"
                                        stroke="#22c55e"
                                        strokeWidth="12"
                                        strokeDasharray={2 * Math.PI * 85}
                                        strokeDashoffset={(1 - heartRateProgress / 100) * 2 * Math.PI * 85}
                                        strokeLinecap="round"
                                        style={{ filter: 'drop-shadow(0 0 8px rgba(34, 197, 94, 0.5))' }}
                                    />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-5xl md:text-6xl font-bold text-white">{biometrics.heartRate}</span>
                                    <span className="text-[#22c55e] font-bold text-sm tracking-widest mt-1">BPM</span>
                                </div>
                            </div>
                            <div className="mt-6 flex items-center gap-2 text-[#22c55e] text-sm">
                                <span className="material-symbols-outlined text-base">trending_up</span>
                                <span>+2% from avg</span>
                            </div>
                        </div>

                        {/* Right Stats */}
                        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            {/* SpO2 */}
                            <div className="bg-[#1a1d24] border border-white/10 rounded-2xl p-5 md:p-6 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="size-10 bg-[#14b8a6]/20 rounded-xl flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#14b8a6]">air</span>
                                    </div>
                                    <span className="text-white/30 text-[10px] font-bold uppercase">SpO2 Level</span>
                                </div>
                                <div className="flex-1 flex flex-col justify-end">
                                    <h4 className="text-4xl md:text-5xl font-bold">{biometrics.bloodOxygen}<span className="text-xl text-white/40">%</span></h4>
                                    <p className="text-[#14b8a6] text-sm font-medium mt-2">Optimal Saturation</p>
                                    <div className="h-1.5 w-full bg-white/10 rounded-full mt-4 overflow-hidden">
                                        <div className="h-full bg-[#14b8a6] rounded-full transition-all" style={{ width: `${biometrics.bloodOxygen}%` }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Core Temp */}
                            <div className="bg-[#1a1d24] border border-white/10 rounded-2xl p-5 md:p-6 flex flex-col">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="size-10 bg-[#f97316]/20 rounded-xl flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[#f97316]">device_thermostat</span>
                                    </div>
                                    <span className="text-white/30 text-[10px] font-bold uppercase">Core Temp</span>
                                </div>
                                <div className="flex-1 flex flex-col justify-end">
                                    <h4 className="text-4xl md:text-5xl font-bold">{biometrics.bodyTemperature}<span className="text-xl text-white/40">°C</span></h4>
                                    <p className="text-[#f97316] text-sm font-medium mt-2">Normal Range</p>
                                    <div className="h-1.5 w-full bg-white/10 rounded-full mt-4 overflow-hidden">
                                        <div className="h-full bg-[#f97316] rounded-full" style={{ width: '70%' }}></div>
                                    </div>
                                </div>
                            </div>

                            {/* Stress Meter */}
                            <div className="sm:col-span-2 bg-[#1a1d24] border border-white/10 rounded-2xl p-5 md:p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                                            <span className="material-symbols-outlined text-purple-400">psychology</span>
                                        </div>
                                        <h4 className="font-bold">Physiological Stress</h4>
                                    </div>
                                    <span className="text-[#22c55e] text-xs font-bold bg-[#22c55e]/10 px-3 py-1.5 rounded-lg">
                                        Low Level
                                    </span>
                                </div>
                                <div className="relative pt-4">
                                    <div className="h-2 w-full rounded-full bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"></div>
                                    <div
                                        className="absolute top-0 flex flex-col items-center transition-all duration-500"
                                        style={{ left: `${biometrics.stressLevel}%`, transform: 'translateX(-50%)' }}
                                    >
                                        <div className="w-0.5 h-6 bg-white rounded-full"></div>
                                        <span className="text-[9px] font-bold mt-1 uppercase text-white/60">Current</span>
                                    </div>
                                    <div className="flex justify-between mt-4 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                                        <span>Relaxed</span>
                                        <span>Neutral</span>
                                        <span>High Stress</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sleep Quality & Recovery */}
                    <div className="bg-[#1a1d24] border border-white/10 rounded-2xl p-6 md:p-8">
                        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
                            <div className="flex-1">
                                <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-3">
                                    <span className="material-symbols-outlined text-[#22c55e]">bedtime</span>
                                    Sleep Quality
                                </h3>
                                <div className="flex flex-wrap items-baseline gap-4 mb-6">
                                    <div className="text-4xl md:text-5xl font-bold">{biometrics.sleepHours}h {biometrics.sleepMinutes}m</div>
                                    <div className="text-[#22c55e] font-bold text-sm">Target Achieved</div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-white/60">Deep Sleep</span>
                                            <span className="font-bold">2h 15m ({biometrics.deepSleepPercent}%)</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${biometrics.deepSleepPercent}%` }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-white/60">REM Sleep</span>
                                            <span className="font-bold">1h 50m ({biometrics.remSleepPercent}%)</span>
                                        </div>
                                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-pink-500 rounded-full" style={{ width: `${biometrics.remSleepPercent}%` }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="hidden lg:block w-px bg-white/10"></div>
                            <div className="lg:hidden h-px w-full bg-white/10"></div>

                            <div className="w-full lg:w-64 flex flex-col items-center justify-center text-center py-4">
                                <p className="text-white/50 text-xs font-medium mb-4 uppercase tracking-widest">Recovery Score</p>
                                <div className="relative size-32 md:size-40">
                                    <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                        <circle cx="50" cy="50" r="42" fill="transparent" stroke="#1f2937" strokeWidth="6" />
                                        <circle
                                            cx="50" cy="50" r="42" fill="transparent"
                                            stroke="#22c55e"
                                            strokeWidth="6"
                                            strokeDasharray={2 * Math.PI * 42}
                                            strokeDashoffset={(1 - biometrics.recoveryScore / 100) * 2 * Math.PI * 42}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <span className="text-3xl md:text-4xl font-bold">{biometrics.recoveryScore}<span className="text-lg text-[#22c55e]">%</span></span>
                                    </div>
                                </div>
                                <p className="mt-4 text-xs text-white/60 max-w-[200px]">
                                    Your body is well-rested. Recommended activity level: <span className="text-[#22c55e] font-bold">Moderate-High</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
