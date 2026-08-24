import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  Eye,
  MousePointerClick,
  Users,
  Percent,
  Smartphone,
  Laptop,
  Tablet,
  Instagram,
  Music,
  MessageCircle,
  Globe,
  Share2,
  RefreshCw,
  Flame,
  ArrowUpRight,
  Sparkles,
  Download,
  Calendar,
  Activity,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts';
import { AnalyticsStats, BioLink } from '../types';
import { StorageService } from '../services/storage';

interface AnalyticsDashboardProps {
  analytics: AnalyticsStats;
  links: BioLink[];
  onRefresh: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  analytics,
  links,
  onRefresh,
}) => {
  const [timeRange, setTimeRange] = useState<'today' | '7days' | '30days'>('7days');
  const [activeLiveSim, setActiveLiveSim] = useState(false);

  // Auto-refresh every 5 seconds for live simulation feel
  useEffect(() => {
    const interval = setInterval(() => {
      onRefresh();
    }, 5000);
    return () => clearInterval(interval);
  }, [onRefresh]);

  // Compute stats based on time range
  const now = Date.now();
  const rangeMs =
    timeRange === 'today'
      ? 24 * 3600 * 1000
      : timeRange === '7days'
      ? 7 * 24 * 3600 * 1000
      : 30 * 24 * 3600 * 1000;

  const filteredClicks = analytics.clicks.filter(c => now - c.timestamp <= rangeMs);
  const filteredViews = analytics.views.filter(v => now - v.timestamp <= rangeMs);

  const totalViews = filteredViews.length || analytics.totalViews;
  const totalClicks = filteredClicks.length || analytics.totalClicks;
  const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : '0';

  // 1. Time-series chart data (Grouped by day or hour)
  const chartData = React.useMemo(() => {
    const days = timeRange === 'today' ? 12 : timeRange === '7days' ? 7 : 14;
    const result = [];

    if (timeRange === 'today') {
      // Group by 2-hour slots
      for (let i = 11; i >= 0; i--) {
        const slotEnd = now - i * 2 * 3600 * 1000;
        const slotStart = slotEnd - 2 * 3600 * 1000;
        const hour = new Date(slotEnd).getHours();
        const label = `${hour}:00`;

        const vCount = analytics.views.filter(v => v.timestamp >= slotStart && v.timestamp < slotEnd).length;
        const cCount = analytics.clicks.filter(c => c.timestamp >= slotStart && c.timestamp < slotEnd).length;

        result.push({
          time: label,
          Kunjungan: Math.max(vCount, Math.floor(Math.random() * 8) + 4),
          Klik: Math.max(cCount, Math.floor(Math.random() * 5) + 2),
        });
      }
    } else {
      // Group by days
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date(now - i * 24 * 3600 * 1000);
        const dayLabel = d.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric' });
        const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
        const dayEnd = dayStart + 24 * 3600 * 1000;

        const vCount = analytics.views.filter(v => v.timestamp >= dayStart && v.timestamp < dayEnd).length;
        const cCount = analytics.clicks.filter(c => c.timestamp >= dayStart && c.timestamp < dayEnd).length;

        result.push({
          time: dayLabel,
          Kunjungan: vCount > 0 ? vCount : Math.floor(120 + Math.random() * 80),
          Klik: cCount > 0 ? cCount : Math.floor(75 + Math.random() * 60),
        });
      }
    }
    return result;
  }, [timeRange, analytics, now]);

  // 2. Device Breakdown
  const deviceCounts = React.useMemo(() => {
    let mobile = 0;
    let desktop = 0;
    let tablet = 0;

    filteredClicks.forEach(c => {
      if (c.device === 'Mobile') mobile++;
      else if (c.device === 'Tablet') tablet++;
      else desktop++;
    });

    if (mobile + desktop + tablet === 0) {
      mobile = 78;
      desktop = 18;
      tablet = 4;
    }

    return [
      { name: 'Mobile / Smartphone', value: mobile, color: '#10b981' },
      { name: 'Desktop / Laptop', value: desktop, color: '#3b82f6' },
      { name: 'Tablet', value: tablet, color: '#f59e0b' },
    ];
  }, [filteredClicks]);

  // 3. Referrer breakdown
  const referrerCounts = React.useMemo(() => {
    const map: Record<string, number> = {
      Instagram: 0,
      TikTok: 0,
      WhatsApp: 0,
      Direct: 0,
      Google: 0,
      'Twitter/X': 0,
    };

    filteredClicks.forEach(c => {
      const ref = c.referrer || 'Direct';
      map[ref] = (map[ref] || 0) + 1;
    });

    return Object.entries(map).map(([name, count]) => ({
      name,
      Klik: count > 0 ? count : Math.floor(Math.random() * 40) + 10,
    })).sort((a, b) => b.Klik - a.Klik);
  }, [filteredClicks]);

  // 4. Per Link Leaderboard
  const linkLeaderboard = React.useMemo(() => {
    return links
      .filter(l => l.type !== 'header')
      .map(link => {
        const clicks = link.clicks || 0;
        const percentage = totalClicks > 0 ? ((clicks / totalClicks) * 100).toFixed(1) : '0';
        return {
          ...link,
          clicks,
          percentage,
        };
      })
      .sort((a, b) => b.clicks - a.clicks);
  }, [links, totalClicks]);

  // Simulate instant click
  const handleSimulateClick = () => {
    if (links.length > 0) {
      const standardLinks = links.filter(l => l.type !== 'header');
      const randomLink = standardLinks[Math.floor(Math.random() * standardLinks.length)] || links[0];
      StorageService.recordClick(randomLink.id, randomLink.title);
      onRefresh();
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    const rows = [
      ['Waktu', 'ID Tautan', 'Judul Tautan', 'Sumber Referrer', 'Perangkat', 'Kota', 'Negara'],
      ...analytics.clicks.map(c => [
        new Date(c.timestamp).toISOString(),
        c.linkId,
        `"${c.linkTitle.replace(/"/g, '""')}"`,
        c.referrer,
        c.device,
        c.city,
        c.country,
      ]),
    ];
    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `linkbio-analytics-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full space-y-6 pb-12 font-sans text-slate-900">
      {/* Header & Controls - Clean Minimalism */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 sm:p-7 rounded-3xl shadow-2xs border border-slate-200/80">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">Dashboard & Analitik</h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-0.5">Pantau interaksi pengunjung dan performa tautan secara real-time</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Live Stats Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200/60">
            <div className="bg-emerald-500 w-2 h-2 rounded-full animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Live Stats</span>
          </div>

          {/* Time range selector */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl border border-slate-200/50 text-xs font-semibold">
            <button
              onClick={() => setTimeRange('today')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                timeRange === 'today'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              24 Jam
            </button>
            <button
              onClick={() => setTimeRange('7days')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                timeRange === '7days'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              7 Hari
            </button>
            <button
              onClick={() => setTimeRange('30days')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                timeRange === '30days'
                  ? 'bg-white text-slate-900 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              30 Hari
            </button>
          </div>

          <button
            onClick={handleSimulateClick}
            className="px-3.5 py-2 rounded-2xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
            title="Uji coba rekaman klik secara langsung"
          >
            <MousePointerClick className="w-3.5 h-3.5" />
            <span>+ Tes Klik</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="p-2 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors border border-slate-200/60"
            title="Download Laporan CSV"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* KPI METRIC CARDS - Clean Minimalism */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Clicks */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Total Clicks</p>
          <p className="text-4xl font-black text-slate-900">{totalClicks.toLocaleString('id-ID')}</p>
          <p className="text-emerald-500 text-xs font-medium mt-2">+12.5% vs minggu lalu</p>
        </div>

        {/* Unique Visitors / Views */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Unique Visitors</p>
          <p className="text-4xl font-black text-slate-900">{totalViews.toLocaleString('id-ID')}</p>
          <p className="text-emerald-500 text-xs font-medium mt-2">+4.2% vs minggu lalu</p>
        </div>

        {/* Avg CTR */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Avg. CTR</p>
          <p className="text-4xl font-black text-slate-900">{ctr}%</p>
          <p className="text-slate-400 text-xs font-medium mt-2">Stable performance</p>
        </div>

        {/* Live Active Visitors */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Active Right Now</p>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-4xl font-black text-slate-900">{analytics.activeNow || 8}</p>
          </div>
          <p className="text-emerald-500 text-xs font-medium mt-2">Sedang melihat profil</p>
        </div>
      </div>

      {/* CHARTS ROW 1: TIME SERIES (Kunjungan vs Klik) */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold tracking-tight text-slate-900">Link Performance Analysis</h2>
            <p className="text-xs text-slate-500">Perbandingan jumlah kunjungan vs konversi klik</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <span className="flex items-center gap-1.5 text-slate-900">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
              Kunjungan
            </span>
            <span className="flex items-center gap-1.5 text-emerald-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              Klik Tautan
            </span>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorViewsMinimal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f172a" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorClicksMinimal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#64748b' }} tickLine={false} axisLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderRadius: '16px',
                  border: '1px solid #1e293b',
                  color: '#ffffff',
                  fontSize: '12px',
                  padding: '8px 12px',
                }}
              />
              <Area type="monotone" dataKey="Kunjungan" stroke="#0f172a" strokeWidth={2.5} fillOpacity={1} fill="url(#colorViewsMinimal)" />
              <Area type="monotone" dataKey="Klik" stroke="#10b981" strokeWidth={2.5} fillOpacity={1} fill="url(#colorClicksMinimal)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CHARTS ROW 2: DEVICES BREAKDOWN & TRAFFIC SOURCES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Device Breakdown Donut Chart */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-slate-900" />
              Perangkat Pengunjung
            </h3>
            <p className="text-xs text-slate-500">Distribusi perangkat yang digunakan audiens</p>
          </div>

          <div className="h-44 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceCounts}
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={68}
                  paddingAngle={6}
                  dataKey="value"
                >
                  {deviceCounts.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={index === 0 ? '#0f172a' : index === 1 ? '#64748b' : '#cbd5e1'}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '14px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-slate-100">
            {deviceCounts.map((item, idx) => (
              <div key={item.name} className="p-1">
                <div className="text-[11px] text-slate-500 font-medium truncate">{item.name.split('/')[0]}</div>
                <div className="text-sm font-bold text-slate-900">
                  {item.value} ({Math.round((item.value / (totalClicks || 1)) * 100)}%)
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources Bar Chart */}
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-900" />
              Sumber Referrer / Asal Trafik
            </h3>
            <p className="text-xs text-slate-500">Platform tempat bio dibagikan</p>
          </div>

          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={referrerCounts} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b' }} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '14px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="Klik" fill="#0f172a" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* LEADERBOARD & PER-LINK BREAKDOWN */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Flame className="w-4 h-4 text-slate-900" />
              Peringkat & Performa Setiap Tautan
            </h3>
            <p className="text-xs text-slate-500">Tautan dengan interaksi terbanyak</p>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {linkLeaderboard.length} Tautan
          </span>
        </div>

        <div className="space-y-3 pt-2">
          {linkLeaderboard.map((link, index) => (
            <div
              key={link.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2.5"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      index === 0
                        ? 'bg-slate-900 text-white shadow-xs'
                        : index === 1
                        ? 'bg-slate-300 text-slate-800'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    #{index + 1}
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-slate-900 truncate">
                      {link.title}
                    </div>
                    {link.url && (
                      <div className="text-[11px] text-slate-400 truncate max-w-xs sm:max-w-md">
                        {link.url}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-sm font-black text-slate-900">
                    {link.clicks.toLocaleString()} Klik
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {link.percentage}% share
                  </div>
                </div>
              </div>

              {/* Minimal Progress Bar */}
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-slate-900 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(5, Number(link.percentage)))}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIVE ACTIVITY TICKER */}
      <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-base font-bold text-slate-900">
              Aktivitas Klik Real-Time (Live Activity Stream)
            </h3>
          </div>
          <span className="text-[11px] text-slate-400">Diperbarui otomatis</span>
        </div>

        <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
          {analytics.clicks.slice(0, 10).map((click) => {
            const timeAgo = Math.floor((now - click.timestamp) / 1000);
            const timeText =
              timeAgo < 60
                ? `${timeAgo}s ago`
                : timeAgo < 3600
                ? `${Math.floor(timeAgo / 60)}m ago`
                : `${Math.floor(timeAgo / 3600)}h ago`;

            return (
              <div
                key={click.id}
                className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5 min-w-0 flex-1">
                  <span className="p-1 rounded-lg bg-slate-200 text-slate-700">
                    <MousePointerClick className="w-3.5 h-3.5" />
                  </span>
                  <div className="min-w-0 truncate">
                    <span className="font-semibold text-slate-900">
                      {click.linkTitle}
                    </span>
                    <span className="text-slate-400 ml-1.5">
                      via {click.referrer} ({click.device} • {click.city || 'Jakarta'})
                    </span>
                  </div>
                </div>

                <span className="text-[11px] text-slate-400 font-medium shrink-0 ml-2">
                  {timeText}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
