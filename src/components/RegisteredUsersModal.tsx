import React, { useState } from 'react';
import {
  X,
  Users,
  Search,
  ShieldCheck,
  Calendar,
  Clock,
  ExternalLink,
  Mail,
  FolderKanban,
  Database,
  Info,
  RefreshCw,
} from 'lucide-react';
import { RegisteredUserRecord } from '../types';

interface RegisteredUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  users: RegisteredUserRecord[];
  onRefresh?: () => void;
}

export const RegisteredUsersModal: React.FC<RegisteredUsersModalProps> = ({
  isOpen,
  onClose,
  users,
  onRefresh,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'list' | 'guide'>('list');

  if (!isOpen) return null;

  const filteredUsers = users.filter((u) => {
    const q = searchQuery.toLowerCase();
    return (
      (u.email || '').toLowerCase().includes(q) ||
      (u.displayName || '').toLowerCase().includes(q) ||
      (u.uid || '').toLowerCase().includes(q)
    );
  });

  const formatDate = (timestamp: number) => {
    if (!timestamp) return '-';
    return new Date(timestamp).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl p-5 sm:p-7 shadow-2xl border border-slate-100 space-y-5 my-auto max-h-[90vh] flex flex-col">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
          title="Tutup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-start gap-3 sm:gap-4 pr-8">
          <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                Daftar Pengguna Terdaftar (Gmail)
              </h3>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{users.length} Akun Terdaftar</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Pantau seluruh akun Gmail yang telah login dan terdaftar di database aplikasi.
            </p>
          </div>
        </div>

        {/* Tab Selector: List vs Panduan Cek */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={() => setActiveTab('list')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'list'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Daftar Akun ({users.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('guide')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'guide'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              📖 Cara Cek di Firebase Console
            </button>
          </div>

          {onRefresh && (
            <button
              type="button"
              onClick={onRefresh}
              className="p-1.5 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1 text-xs font-semibold"
              title="Perbarui Data"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Segarkan</span>
            </button>
          )}
        </div>

        {/* TAB 1: LIST USERS */}
        {activeTab === 'list' && (
          <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
            {/* Search bar */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari berdasarkan email Gmail, nama, atau UID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-slate-900 text-slate-900"
              />
            </div>

            {/* Users list scroll container */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 max-h-[360px]">
              {filteredUsers.length === 0 ? (
                <div className="text-center py-10 px-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <Mail className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs font-bold text-slate-700">Belum ada akun yang ditemukan</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    {searchQuery ? 'Coba ubah kata kunci pencarian.' : 'Lakukan login dengan Gmail untuk mencatat akun pertama.'}
                  </p>
                </div>
              ) : (
                filteredUsers.map((user, idx) => (
                  <div
                    key={user.uid || idx}
                    className="p-3.5 rounded-2xl border border-slate-200/80 hover:border-slate-300 bg-white hover:bg-slate-50/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.displayName || 'Avatar'}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-full object-cover border border-slate-200 shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                          {(user.displayName || user.email || 'U')[0].toUpperCase()}
                        </div>
                      )}

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="font-bold text-xs text-slate-900 truncate">
                            {user.displayName || 'Pengguna LinkBio'}
                          </h4>
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" title="Akun Terverifikasi" />
                        </div>
                        <p className="text-xs text-slate-600 font-mono truncate">
                          {user.email}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
                          UID: {user.uid}
                        </p>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-start sm:items-end justify-between border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100 text-[11px] text-slate-500 shrink-0">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        <span>Daftar: <b>{formatDate(user.firstLoginAt)}</b></span>
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>Aktif: {formatDate(user.lastLoginAt)}</span>
                      </div>
                      {typeof user.workspaceCount === 'number' && (
                        <div className="text-[10px] font-semibold text-slate-700 mt-0.5">
                          📂 {user.workspaceCount} Workspace
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 2: PANDUAN CEK DI FIREBASE CONSOLE */}
        {activeTab === 'guide' && (
          <div className="space-y-4 flex-1 overflow-y-auto max-h-[380px] pr-1 text-xs text-slate-700">
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-blue-950 space-y-2">
              <div className="flex items-center gap-2 font-bold">
                <Info className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Bagaimana Cara Mengecek Data User yang Terdaftar?</span>
              </div>
              <p className="leading-relaxed">
                Selain melalui modal di web ini, Anda dapat melihat daftar lengkap seluruh pengguna terdaftar langsung melalui <b>Firebase Console resmi Google</b> secara real-time.
              </p>
            </div>

            {/* Step by step */}
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] flex items-center justify-center font-bold">
                    1
                  </span>
                  <span>Cek di Firebase Authentication (Daftar Akun Login)</span>
                </div>
                <p className="text-slate-600 leading-relaxed pl-7">
                  Buka <b>Firebase Console</b> → Pilih project <b>evident-mercury-w8chg</b> → Buka menu <b>Authentication</b> di sidebar kiri → Tab <b>Users</b>.
                  Di sana akan tercantum setiap email Gmail, Provider (Google), Tanggal Dibuat (Created), Terakhir Masuk (Signed In), dan User UID.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] flex items-center justify-center font-bold">
                    2
                  </span>
                  <span>Cek di Cloud Firestore (Database Koleksi)</span>
                </div>
                <p className="text-slate-600 leading-relaxed pl-7">
                  Buka menu <b>Firestore Database</b> di sidebar kiri → Pilih koleksi <b><code>registered_users</code></b>.
                  Setiap dokumen mewakili 1 user lengkap dengan email, nama, foto profil, riwayat waktu login, dan total workspace mereka.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                <div className="font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[11px] flex items-center justify-center font-bold">
                    3
                  </span>
                  <span>Cek Koleksi Workspaces</span>
                </div>
                <p className="text-slate-600 leading-relaxed pl-7">
                  Di menu Firestore Database, buka koleksi <b><code>workspaces</code></b> untuk melihat semua project link bio yang dibuat oleh masing-masing user.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-400">
            Data tersinkronisasi otomatis dengan Google Firebase Firestore
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white transition-all shadow-xs"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
