import { useState } from 'react';
import { Link } from 'react-router-dom';

const waypoints = [
    { id: 1, name: 'Trailhead', icon: 'home', iconColor: '#22c55e', altitude: 1420, eta: '06:00 AM', temp: 12, weather: 'sunny', wind: 12, safetyScore: 98 },
    { id: 2, name: 'Base Camp', icon: 'camping', iconColor: '#22c55e', altitude: 1950, eta: '08:30 AM', temp: 8, weather: 'partly_cloudy', wind: 18, safetyScore: 92 },
    { id: 3, name: 'Ridge Line', icon: 'filter_hdr', iconColor: '#f59e0b', altitude: 2410, eta: '10:45 AM', temp: 4, weather: 'cloudy', wind: 35, safetyScore: 75 },
    { id: 4, name: 'High Camp', icon: 'cabin', iconColor: '#f97316', altitude: 2850, eta: '12:15 PM', temp: -2, weather: 'windy', wind: 52, safetyScore: 62 },
    { id: 5, name: 'Death Zone', icon: 'warning', iconColor: '#ef4444', altitude: 3120, eta: '01:30 PM', temp: -8, weather: 'snow', wind: 68, safetyScore: 38 },
    { id: 6, name: 'Summit Peak', icon: 'flag', iconColor: '#3b82f6', altitude: 3440, eta: '02:45 PM', temp: -12, weather: 'snow', wind: 75, safetyScore: 25 },
];

const gearList = [
    { item: 'Ice Axe (B-Rated)', checked: true, required: true },
    { item: 'Crampons (12-point)', checked: true, required: true },
    { item: 'Satellite PLB', checked: true, required: true },
    { item: 'Oxygen Reservoir', checked: false, required: false },
    { item: 'Thermal Blanket x2', checked: false, required: true, critical: true },
];

const getWeatherIcon = (weather: string) => {
    switch (weather) {
        case 'sunny': return 'wb_sunny';
        case 'partly_cloudy': return 'partly_cloudy_day';
        case 'cloudy': return 'cloud';
        case 'windy': return 'air';
        case 'snow': return 'ac_unit';
        default: return 'cloud';
    }
};

const getWeatherColor = (weather: string) => {
    switch (weather) {
        case 'sunny': return 'text-yellow-400';
        case 'partly_cloudy': return 'text-yellow-300';
        case 'cloudy': return 'text-blue-300';
        case 'windy': return 'text-slate-300';
        case 'snow': return 'text-white';
        default: return 'text-slate-400';
    }
};

const getSafetyColor = (score: number) => {
    if (score >= 90) return '#22c55e';
    if (score >= 70) return '#f59e0b';
    if (score >= 50) return '#f97316';
    return '#ef4444';
};

export default function RoutePlanner() {
    const [checkedGear, setCheckedGear] = useState<{ [key: string]: boolean }>(
        gearList.reduce((acc, g) => ({ ...acc, [g.item]: g.checked }), {})
    );
    const [routeSaved, setRouteSaved] = useState(false);
    const [exporting, setExporting] = useState(false);

    const toggleGear = (item: string) => {
        setCheckedGear(prev => ({ ...prev, [item]: !prev[item] }));
    };

    const handleSaveRoute = () => {
        setRouteSaved(true);
        setTimeout(() => setRouteSaved(false), 2000);
    };

    const handleExportPDF = () => {
        setExporting(true);
        setTimeout(() => {
            setExporting(false);
            alert('Route exported to PDF successfully!');
        }, 1500);
    };

    const overallSafety = 65;

    return (
        <div className="flex h-screen overflow-hidden bg-[#0d1117] text-slate-100 font-['Space_Grotesk',sans-serif]">
            {/* Left Sidebar Nav */}
            <aside className="w-14 md:w-16 flex flex-col items-center py-6 gap-6 border-r border-white/10 bg-[#0d1117] shrink-0">
                <div className="text-[#3b82f6]">
                    <span className="material-symbols-outlined text-2xl md:text-3xl">landscape</span>
                </div>
                <nav className="flex flex-col gap-4 flex-1">
                    <Link to="/dashboard" className="p-2 md:p-3 rounded-lg text-slate-500 hover:text-white hover:bg-white/5">
                        <span className="material-symbols-outlined text-xl">dashboard</span>
                    </Link>
                    <Link to="/route" className="p-2 md:p-3 rounded-lg bg-[#3b82f6]/20 text-[#3b82f6]">
                        <span className="material-symbols-outlined text-xl">map</span>
                    </Link>
                    <Link to="/alerts" className="p-2 md:p-3 rounded-lg text-slate-500 hover:text-white hover:bg-white/5">
                        <span className="material-symbols-outlined text-xl">notifications</span>
                    </Link>
                    <Link to="/team" className="p-2 md:p-3 rounded-lg text-slate-500 hover:text-white hover:bg-white/5">
                        <span className="material-symbols-outlined text-xl">group</span>
                    </Link>
                    <Link to="/settings" className="p-2 md:p-3 rounded-lg text-slate-500 hover:text-white hover:bg-white/5 mt-auto">
                        <span className="material-symbols-outlined text-xl">settings</span>
                    </Link>
                </nav>
                <div className="size-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-bold">
                    AR
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="px-4 md:px-6 py-4 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 shrink-0">
                    <div className="flex items-center gap-4 md:gap-6">
                        {/* Safety Score Dial */}
                        <div className="relative size-14 md:size-16 shrink-0">
                            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="42" fill="transparent" stroke="#1e293b" strokeWidth="6" />
                                <circle cx="50" cy="50" r="42" fill="transparent" stroke="#f59e0b" strokeWidth="6"
                                    strokeDasharray={2 * Math.PI * 42} strokeDashoffset={(1 - overallSafety / 100) * 2 * Math.PI * 42} strokeLinecap="round" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-lg font-bold">{overallSafety}</span>
                                <span className="text-[8px] uppercase text-slate-400">Safety</span>
                            </div>
                        </div>
                        <div>
                            <h1 className="text-lg md:text-xl font-bold">Alpine Ridge Ascent</h1>
                            <p className="text-slate-400 text-xs md:text-sm">Mount Rainier • National Park, WA</p>
                        </div>
                        <div className="hidden md:flex gap-3">
                            <div className="bg-[#151a21] border border-white/10 px-4 py-2 rounded-lg">
                                <p className="text-[10px] text-slate-500 uppercase">Distance</p>
                                <p className="font-bold text-lg">12.4 <span className="text-sm text-slate-400">km</span></p>
                            </div>
                            <div className="bg-[#151a21] border border-white/10 px-4 py-2 rounded-lg">
                                <p className="text-[10px] text-slate-500 uppercase">Elev. Gain</p>
                                <p className="font-bold text-lg">1,240 <span className="text-sm text-slate-400">m</span></p>
                            </div>
                        </div>
                    </div>

                    {/* AI Banner */}
                    <div className="flex-1 max-w-lg bg-[#1a1520] border border-[#f97316]/30 p-3 md:p-4 rounded-xl flex items-start gap-3">
                        <span className="material-symbols-outlined text-[#f97316] shrink-0">smart_toy</span>
                        <div>
                            <p className="text-[10px] font-bold uppercase text-[#f97316] mb-1">AI Safety Protocol</p>
                            <p className="text-xs leading-snug text-white/80">Recommendation: High wind speeds predicted after 14:00. Plan to begin descent from the Summit no later than 12:30 to avoid ridge gusts.</p>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <button
                            onClick={handleSaveRoute}
                            className={`${routeSaved ? 'bg-[#22c55e]' : 'bg-[#3b82f6] hover:bg-[#2563eb]'} text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors`}
                        >
                            <span className="material-symbols-outlined text-sm">{routeSaved ? 'check_circle' : 'save'}</span>
                            <span className="hidden sm:inline">{routeSaved ? 'Saved!' : 'Save Route'}</span>
                        </button>
                        <button
                            onClick={handleExportPDF}
                            className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2"
                        >
                            {exporting && <span className="material-symbols-outlined text-sm animate-spin">refresh</span>}
                            {exporting ? 'Exporting...' : 'Export PDF'}
                        </button>
                    </div>
                </header>

                {/* Dashboard Grid */}
                <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
                    {/* Left: Waypoints Timeline */}
                    <div className="w-full lg:w-80 xl:w-96 overflow-y-auto p-4 border-b lg:border-b-0 lg:border-r border-white/10 shrink-0">
                        <div className="relative flex flex-col gap-4">
                            {/* Vertical Line */}
                            <div className="absolute left-[18px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#22c55e] via-[#f59e0b] to-[#ef4444] opacity-60"></div>

                            {waypoints.map((wp) => (
                                <div key={wp.id} className="relative flex gap-3">
                                    {/* Node */}
                                    <div
                                        className="z-10 size-9 rounded-full flex items-center justify-center shrink-0 ring-4 ring-[#0d1117]"
                                        style={{ backgroundColor: wp.iconColor }}
                                    >
                                        <span className="material-symbols-outlined text-white text-lg">{wp.icon}</span>
                                    </div>

                                    {/* Card */}
                                    <div className="bg-[#151a21] border border-white/10 p-3 rounded-xl flex-1 hover:border-[#3b82f6]/30 transition-colors">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-sm">{wp.name}</h3>
                                            <span
                                                className="text-[9px] font-bold px-2 py-0.5 rounded uppercase"
                                                style={{ backgroundColor: `${getSafetyColor(wp.safetyScore)}20`, color: getSafetyColor(wp.safetyScore) }}
                                            >
                                                {wp.safetyScore}% Safety
                                            </span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-1 text-[11px]">
                                            <div className="flex items-center gap-1 text-slate-400">
                                                <span className="material-symbols-outlined text-xs">schedule</span> {wp.eta}
                                            </div>
                                            <div className="flex items-center gap-1 text-slate-400">
                                                <span className="material-symbols-outlined text-xs">height</span> {wp.altitude.toLocaleString()}m
                                            </div>
                                            <div className="flex items-center gap-1 text-white">
                                                <span className={`material-symbols-outlined text-xs ${getWeatherColor(wp.weather)}`}>{getWeatherIcon(wp.weather)}</span> {wp.temp}°C
                                            </div>
                                            <div className={`flex items-center gap-1 ${wp.wind > 50 ? 'text-[#ef4444] font-bold' : 'text-slate-400'}`}>
                                                <span className="material-symbols-outlined text-xs">air</span> {wp.wind}km/h
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Center: Elevation Chart */}
                    <div className="flex-1 flex flex-col p-4 md:p-6 overflow-hidden min-h-[300px]">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-sm md:text-base font-bold flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#3b82f6]">analytics</span>
                                Elevation & Hazard Matrix
                            </h2>
                            <div className="flex gap-4 text-[10px]">
                                <div className="flex items-center gap-1">
                                    <span className="size-2 rounded-full bg-[#3b82f6]"></span> Elevation
                                </div>
                                <div className="flex items-center gap-1">
                                    <span className="size-2 rounded-full bg-[#ef4444]/50"></span> Wind Hazard (&gt;50km/h)
                                </div>
                            </div>
                        </div>

                        {/* Chart */}
                        <div className="flex-1 bg-[#151a21] border border-white/10 rounded-xl relative overflow-hidden flex flex-col min-h-[200px]">
                            {/* Weather Icons */}
                            <div className="flex justify-around px-8 py-4">
                                <span className="material-symbols-outlined text-yellow-400 text-xl">wb_sunny</span>
                                <span className="material-symbols-outlined text-yellow-300 text-xl">partly_cloudy_day</span>
                                <span className="material-symbols-outlined text-blue-300 text-xl">cloud</span>
                                <span className="material-symbols-outlined text-slate-300 text-xl">air</span>
                                <span className="material-symbols-outlined text-white text-xl animate-pulse">ac_unit</span>
                            </div>

                            {/* Chart Area */}
                            <div className="flex-1 relative mx-4 mb-2">
                                {/* Danger Zone */}
                                <div className="absolute right-0 top-0 bottom-0 w-2/5 bg-[#ef4444]/10 border-l border-dashed border-[#ef4444]/40 flex items-center justify-center">
                                    <span className="rotate-90 whitespace-nowrap text-[10px] font-bold uppercase tracking-widest text-[#ef4444]/60">
                                        Danger Zone: Wind Warning
                                    </span>
                                </div>

                                {/* Line Chart */}
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.3 }} />
                                            <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 0 }} />
                                        </linearGradient>
                                    </defs>
                                    <path d="M0,150 L0,130 L100,110 L200,80 L300,60 L400,30 L500,10 L500,150 Z" fill="url(#areaGrad)" />
                                    <path d="M0,130 L100,110 L200,80 L300,60 L400,30 L500,10" fill="none" stroke="#3b82f6" strokeWidth="2" />
                                    <circle cx="0" cy="130" r="4" fill="#22c55e" />
                                    <circle cx="100" cy="110" r="4" fill="#22c55e" />
                                    <circle cx="200" cy="80" r="4" fill="#f59e0b" />
                                    <circle cx="300" cy="60" r="4" fill="#f97316" />
                                    <circle cx="400" cy="30" r="4" fill="#ef4444" />
                                    <circle cx="500" cy="10" r="5" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
                                </svg>
                            </div>

                            {/* X-Axis */}
                            <div className="flex justify-between px-4 pb-3 text-[10px] text-slate-500 font-bold uppercase border-t border-white/5 pt-2">
                                <span>0KM</span>
                                <span>2.5KM</span>
                                <span>5.0KM</span>
                                <span>7.5KM</span>
                                <span>10KM</span>
                                <span>12.4KM (Summit)</span>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-3 gap-4 mt-4">
                            <div className="bg-[#151a21] border border-white/10 p-3 md:p-4 rounded-xl">
                                <div className="flex items-center gap-2 mb-1 text-slate-400 text-[10px]">
                                    <span className="material-symbols-outlined text-sm">humidity_low</span> Humidity Average
                                </div>
                                <div className="text-xl md:text-2xl font-bold">42%</div>
                            </div>
                            <div className="bg-[#151a21] border border-white/10 p-3 md:p-4 rounded-xl">
                                <div className="flex items-center gap-2 mb-1 text-slate-400 text-[10px]">
                                    <span className="material-symbols-outlined text-sm">visibility</span> Peak Visibility
                                </div>
                                <div className="text-xl md:text-2xl font-bold">15 km</div>
                            </div>
                            <div className="bg-[#151a21] border border-white/10 p-3 md:p-4 rounded-xl">
                                <div className="flex items-center gap-2 mb-1 text-slate-400 text-[10px]">
                                    <span className="material-symbols-outlined text-sm">speed</span> Surface Pressure
                                </div>
                                <div className="text-xl md:text-2xl font-bold">712 hPa</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Gear Checklist */}
                    <aside className="w-full lg:w-64 xl:w-72 bg-[#0d1117] border-t lg:border-t-0 lg:border-l border-white/10 p-4 flex flex-col gap-4 overflow-y-auto shrink-0">
                        <div>
                            <h2 className="text-sm font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[#3b82f6]">checklist</span>
                                Gear Checklist
                            </h2>
                            <div className="flex flex-col gap-2">
                                {gearList.map((gear) => (
                                    <label
                                        key={gear.item}
                                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${gear.critical && !checkedGear[gear.item]
                                            ? 'border border-[#ef4444]/30 bg-[#ef4444]/5'
                                            : 'hover:bg-white/5'
                                            }`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={checkedGear[gear.item]}
                                            onChange={() => toggleGear(gear.item)}
                                            className="rounded border-white/20 bg-transparent text-[#3b82f6] focus:ring-[#3b82f6] size-4"
                                        />
                                        <span className={`text-xs font-medium flex-1 ${gear.critical && !checkedGear[gear.item] ? 'text-[#ef4444]' : ''}`}>
                                            {gear.item}
                                        </span>
                                        {checkedGear[gear.item] ? (
                                            <span className="material-symbols-outlined text-[#22c55e] text-sm">check_circle</span>
                                        ) : gear.critical ? (
                                            <span className="material-symbols-outlined text-[#ef4444] text-sm">error</span>
                                        ) : (
                                            <span className="text-[9px] text-slate-500 font-bold uppercase">Optional</span>
                                        )}
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="mt-auto pt-4 border-t border-white/10">
                            <div className="bg-[#3b82f6]/10 p-4 rounded-xl border border-[#3b82f6]/20">
                                <p className="text-[10px] text-[#3b82f6] font-bold uppercase mb-3">Team Status</p>
                                <div className="flex -space-x-2 mb-4">
                                    {['AR', 'SJ', 'KT', 'DR'].map((initials) => (
                                        <div
                                            key={initials}
                                            className="size-8 rounded-full border-2 border-[#0d1117] bg-gradient-to-br from-slate-600 to-slate-800 flex items-center justify-center text-[10px] font-bold"
                                        >
                                            {initials}
                                        </div>
                                    ))}
                                    <div className="size-8 rounded-full bg-slate-700 border-2 border-[#0d1117] flex items-center justify-center text-[10px] font-bold">
                                        +2
                                    </div>
                                </div>
                                <Link
                                    to="/team"
                                    className="block w-full py-2.5 bg-[#3b82f6] rounded-lg text-xs font-bold text-center hover:bg-[#2563eb] transition-all"
                                >
                                    Broadcast Update
                                </Link>
                            </div>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    );
}
