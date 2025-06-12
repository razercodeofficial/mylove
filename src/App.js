import React, { useState, useEffect } from 'react';

const MENU = [
  { key: 'album', label: 'Album Foto', icon: '🖼️' },
  { key: 'jurnal', label: 'Jurnal Cinta', icon: '📖' },
  { key: 'kalender', label: 'Kalender & Bucket', icon: '🗓️' },
  { key: 'capsule', label: 'Time Capsule', icon: '⏳' },
  { key: 'surat', label: 'Surat Cinta', icon: '💌' },
  { key: 'wishlist', label: 'Wishlist & Gift', icon: '🎁' },
];

// Komponen pemutar musik
function MusicPlayer() {
  return (
    <div className="w-full flex flex-col items-center bg-pink-50 border-b border-pink-200 px-4 py-2">
      <div className="font-semibold text-pink-600 text-sm sm:text-base mb-1">Arash Buana - Something About U</div>
      <iframe
        width="100%"
        height="80"
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/arashbuana-music/something-about-you&color=%23ffb6c1&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
        title="Arash Buana - Something About U"
        style={{ borderRadius: '8px', maxWidth: 400 }}
      ></iframe>
    </div>
  );
}

// --- Album Foto ---
function AlbumFoto() {
  // Daftar nama file foto di public
  const photoFiles = ['1.jpeg', '4.jpeg'];
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-lg font-bold text-pink-500 mb-1 flex items-center gap-2"><span>🖼️</span> Album Foto</h2>
        <div className="h-1 w-12 bg-pink-200 rounded mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {photoFiles.map((file, idx) => (
            <div key={file} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
              <img src={`/${file}`} alt={file} className="object-cover w-full h-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Time Capsule Cinta ---
function TimeCapsule() {
  const [capsules, setCapsules] = useState([]);
  const [form, setForm] = useState({ date: '', message: '' });
  useEffect(() => {
    const saved = localStorage.getItem('timeCapsule');
    if (saved) setCapsules(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem('timeCapsule', JSON.stringify(capsules));
  }, [capsules]);
  const now = new Date();
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    if (!form.date || !form.message) return;
    setCapsules([{ ...form }, ...capsules]);
    setForm({ date: '', message: '' });
  };
  const handleDelete = idx => setCapsules(capsules.filter((_, i) => i !== idx));
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-lg font-bold text-pink-500 mb-1 flex items-center gap-2"><span>⏳</span> Time Capsule Cinta</h2>
        <div className="h-1 w-12 bg-pink-200 rounded mb-4" />
        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-4 flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <input type="date" name="date" value={form.date} onChange={handleChange} className="border rounded px-2 py-1 text-xs sm:text-sm flex-1" required />
          </div>
          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tulis pesan untuk masa depan..." className="border rounded px-2 py-1 text-xs sm:text-sm min-h-[60px]" maxLength={300} required />
          <div className="flex justify-end">
            <button type="submit" className="px-3 py-1 rounded bg-pink-500 text-white text-xs sm:text-sm hover:bg-pink-600 transition">Tambah Capsule</button>
          </div>
        </form>
        <div className="flex flex-col gap-3">
          {capsules.length === 0 && <div className="text-gray-400 text-xs sm:text-sm text-center">Belum ada capsule</div>}
          {capsules.map((c, idx) => {
            const open = new Date(c.date) <= now;
            return (
              <div key={idx} className={`bg-white border border-gray-100 rounded-lg p-3 shadow-sm relative group ${open ? '' : 'opacity-70'}`}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-400">{c.date}</span>
                  <button className="text-red-500 text-xs px-2 py-0.5 rounded hover:bg-red-50 opacity-0 group-hover:opacity-100 transition" onClick={() => handleDelete(idx)} title="Hapus">Hapus</button>
                </div>
                <div className="text-xs sm:text-sm whitespace-pre-line text-gray-700">
                  {open ? c.message : <span className="italic text-gray-400">Terkunci hingga {c.date}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// --- Surat Cinta Digital Berkala ---
function SuratCinta() {
  const [letters, setLetters] = useState([]);
  const [form, setForm] = useState({ date: '', message: '' });
  useEffect(() => {
    const saved = localStorage.getItem('suratCinta');
    if (saved) setLetters(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem('suratCinta', JSON.stringify(letters));
  }, [letters]);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    if (!form.date || !form.message) return;
    setLetters([{ ...form, sent: false }, ...letters]);
    setForm({ date: '', message: '' });
  };
  // Auto-move to sent if date has passed
  useEffect(() => {
    const now = new Date();
    setLetters(ls => ls.map(l => {
      if (!l.sent && new Date(l.date) <= now) return { ...l, sent: true };
      return l;
    }));
  }, []);
  const handleDelete = idx => setLetters(letters.filter((_, i) => i !== idx));
  const handleEdit = idx => {
    setForm({ date: letters[idx].date, message: letters[idx].message });
    handleDelete(idx);
  };
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-lg font-bold text-pink-500 mb-1 flex items-center gap-2"><span>💌</span> Surat Cinta Digital Berkala</h2>
        <div className="h-1 w-12 bg-pink-200 rounded mb-4" />
        <form onSubmit={handleSubmit} className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-4 flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <input type="date" name="date" value={form.date} onChange={handleChange} className="border rounded px-2 py-1 text-xs sm:text-sm flex-1" required />
          </div>
          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tulis surat cinta..." className="border rounded px-2 py-1 text-xs sm:text-sm min-h-[60px]" maxLength={300} required />
          <div className="flex justify-end">
            <button type="submit" className="px-3 py-1 rounded bg-pink-500 text-white text-xs sm:text-sm hover:bg-pink-600 transition">Jadwalkan Surat</button>
          </div>
        </form>
        <div className="flex flex-col gap-3">
          <div className="font-semibold text-xs sm:text-sm text-pink-500 mb-1">Terkirim</div>
          {letters.filter(l => l.sent).length === 0 && <div className="text-gray-400 text-xs sm:text-sm text-center">Belum ada surat terkirim</div>}
          {letters.filter(l => l.sent).map((l, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm relative group">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-400">{l.date}</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                  <button className="text-green-600 border border-green-200 bg-green-50 hover:bg-green-100 text-xs px-2 py-0.5 rounded flex items-center gap-1" onClick={() => {
                    const waMsg = encodeURIComponent(l.message);
                    window.open(`https://wa.me/?text=${waMsg}`,'_blank');
                  }} title="Kirim ke WhatsApp">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M20.52 3.48A12.07 12.07 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.63A12.07 12.07 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.21-1.25-6.23-3.48-8.52zM12 22c-1.85 0-3.68-.5-5.26-1.44l-.38-.22-3.69.97.99-3.59-.25-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.8c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.27-.96.94-.96 2.3 0 1.36.99 2.68 1.13 2.87.14.18 1.95 2.98 4.74 4.06.66.28 1.18.45 1.58.58.66.21 1.26.18 1.73.11.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z"/></svg>
                    <span className="hidden sm:inline">Kirim ke WA</span>
                  </button>
                  <button className="text-red-500 text-xs px-2 py-0.5 rounded hover:bg-red-50" onClick={() => handleDelete(letters.findIndex(x => x === l))} title="Hapus">Hapus</button>
                </div>
              </div>
              <div className="text-xs sm:text-sm whitespace-pre-line text-gray-700">{l.message}</div>
            </div>
          ))}
          <div className="font-semibold text-xs sm:text-sm text-pink-500 mt-4 mb-1">Terjadwal</div>
          {letters.filter(l => !l.sent).length === 0 && <div className="text-gray-400 text-xs sm:text-sm text-center">Tidak ada surat terjadwal</div>}
          {letters.filter(l => !l.sent).map((l, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm relative group">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-400">{l.date}</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                  <button className="text-blue-500 text-xs px-2 py-0.5 rounded hover:bg-blue-50" onClick={() => handleEdit(letters.findIndex(x => x === l))} title="Edit">Edit</button>
                  <button className="text-red-500 text-xs px-2 py-0.5 rounded hover:bg-red-50" onClick={() => handleDelete(letters.findIndex(x => x === l))} title="Hapus">Hapus</button>
                </div>
              </div>
              <div className="text-xs sm:text-sm whitespace-pre-line text-gray-700">{l.message}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// --- Wishlist & Gift Matcher ---
function WishlistGift() {
  const [wishlist, setWishlist] = useState([]);
  const [form, setForm] = useState('');
  const [editIdx, setEditIdx] = useState(null);
  const [giftForm, setGiftForm] = useState('');
  useEffect(() => {
    const saved = localStorage.getItem('wishlistGift');
    if (saved) setWishlist(JSON.parse(saved));
  }, []);
  useEffect(() => {
    localStorage.setItem('wishlistGift', JSON.stringify(wishlist));
  }, [wishlist]);
  const handleAdd = e => {
    e.preventDefault();
    if (!form.trim()) return;
    if (editIdx !== null) {
      const updated = [...wishlist];
      updated[editIdx].text = form;
      setWishlist(updated);
      setEditIdx(null);
    } else {
      setWishlist([{ text: form, done: false, gifts: [] }, ...wishlist]);
    }
    setForm('');
  };
  const handleEdit = idx => {
    setForm(wishlist[idx].text);
    setEditIdx(idx);
  };
  const handleDelete = idx => setWishlist(wishlist.filter((_, i) => i !== idx));
  const handleToggle = idx => {
    const updated = [...wishlist];
    updated[idx].done = !updated[idx].done;
    setWishlist(updated);
  };
  // Gift Matcher
  const handleAddGift = (idx) => {
    if (!giftForm.trim()) return;
    const updated = [...wishlist];
    updated[idx].gifts = updated[idx].gifts || [];
    updated[idx].gifts.unshift({ text: giftForm, given: false });
    setWishlist(updated);
    setGiftForm('');
  };
  const handleToggleGift = (idx, gidx) => {
    const updated = [...wishlist];
    updated[idx].gifts[gidx].given = !updated[idx].gifts[gidx].given;
    setWishlist(updated);
  };
  const handleDeleteGift = (idx, gidx) => {
    const updated = [...wishlist];
    updated[idx].gifts.splice(gidx, 1);
    setWishlist(updated);
  };
  return (
    <section>
      <div className="mb-6">
        <h2 className="text-lg font-bold text-pink-500 mb-1 flex items-center gap-2"><span>🎁</span> Wishlist & Gift Matcher</h2>
        <div className="h-1 w-12 bg-pink-200 rounded mb-4" />
        <form onSubmit={handleAdd} className="flex gap-2 mb-3">
          <input type="text" value={form} onChange={e => setForm(e.target.value)} placeholder="Tambah wishlist..." className="border rounded px-2 py-1 text-xs sm:text-sm flex-1" maxLength={50} required />
          {editIdx !== null && (
            <button type="button" className="px-3 py-1 rounded bg-gray-200 text-gray-600 text-xs sm:text-sm" onClick={() => { setForm(''); setEditIdx(null); }}>Batal</button>
          )}
          <button type="submit" className="px-3 py-1 rounded bg-pink-500 text-white text-xs sm:text-sm hover:bg-pink-600 transition">{editIdx !== null ? 'Simpan Edit' : 'Tambah'}</button>
        </form>
        <ul className="flex flex-col gap-3">
          {wishlist.length === 0 && <li className="text-gray-400 text-xs sm:text-sm text-center">Belum ada wishlist</li>}
          {wishlist.map((item, idx) => (
            <li key={idx} className="bg-white border border-gray-100 rounded-lg px-3 py-2 shadow-sm flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={item.done} onChange={() => handleToggle(idx)} className="accent-pink-500" />
                <span className={`flex-1 text-xs sm:text-base ${item.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>{item.text}</span>
                <button className="text-blue-500 text-xs px-2 py-0.5 rounded hover:bg-blue-50" onClick={() => handleEdit(idx)} title="Edit">Edit</button>
                <button className="text-red-500 text-xs px-2 py-0.5 rounded hover:bg-red-50" onClick={() => handleDelete(idx)} title="Hapus">Hapus</button>
              </div>
              {/* Gift Matcher */}
              <div className="ml-6">
                <form onSubmit={e => { e.preventDefault(); handleAddGift(idx); }} className="flex gap-2 mb-1">
                  <input type="text" value={giftForm} onChange={e => setGiftForm(e.target.value)} placeholder="Ide kado..." className="border rounded px-2 py-1 text-xs sm:text-sm flex-1" maxLength={40} />
                  <button type="submit" className="px-2 py-1 rounded bg-pink-100 text-pink-500 text-xs sm:text-sm hover:bg-pink-200 transition">Tambah</button>
                </form>
                <ul className="flex flex-col gap-1">
                  {item.gifts && item.gifts.length > 0 && item.gifts.map((g, gidx) => (
                    <li key={gidx} className="flex items-center gap-2 text-xs sm:text-sm">
                      <input type="checkbox" checked={g.given} onChange={() => handleToggleGift(idx, gidx)} className="accent-pink-500" />
                      <span className={g.given ? 'line-through text-gray-400' : 'text-gray-700'}>{g.text}</span>
                      <button className="text-red-400 px-1 rounded hover:bg-red-50" onClick={() => handleDeleteGift(idx, gidx)} title="Hapus">×</button>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// --- Kalender & Bucket List Component ---
function getMonthDays(year, month) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = [];
  let week = [];
  for (let i = 0; i < firstDay; i++) week.push(null);
  for (let d = 1; d <= daysInMonth; d++) {
    week.push(d);
    if (week.length === 7) {
      days.push(week);
      week = [];
    }
  }
  if (week.length) {
    while (week.length < 7) week.push(null);
    days.push(week);
  }
  return days;
}

function KalenderBucket() {
  // Kalender
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  const [events, setEvents] = useState([]);
  const [eventForm, setEventForm] = useState({ date: '', title: '', desc: '' });
  // Bucket List
  const [bucket, setBucket] = useState([]);
  const [bucketForm, setBucketForm] = useState('');
  const [editIdx, setEditIdx] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const e = localStorage.getItem('kalenderEvents');
    if (e) setEvents(JSON.parse(e));
    const b = localStorage.getItem('bucketList');
    if (b) setBucket(JSON.parse(b));
  }, []);
  useEffect(() => {
    localStorage.setItem('kalenderEvents', JSON.stringify(events));
  }, [events]);
  useEffect(() => {
    localStorage.setItem('bucketList', JSON.stringify(bucket));
  }, [bucket]);

  // Kalender logic
  const monthNames = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const days = getMonthDays(year, month);
  const handlePrev = () => {
    if (month === 0) { setMonth(11); setYear(year-1); }
    else setMonth(month-1);
  };
  const handleNext = () => {
    if (month === 11) { setMonth(0); setYear(year+1); }
    else setMonth(month+1);
  };
  const handleEventForm = (e) => setEventForm({ ...eventForm, [e.target.name]: e.target.value });
  const handleAddEvent = (e) => {
    e.preventDefault();
    if (!eventForm.date || !eventForm.title) return;
    setEvents([{ ...eventForm }, ...events]);
    setEventForm({ date: '', title: '', desc: '' });
  };
  const handleDeleteEvent = (idx) => setEvents(events.filter((_, i) => i !== idx));

  // Bucket logic
  const handleAddBucket = (e) => {
    e.preventDefault();
    if (!bucketForm.trim()) return;
    if (editIdx !== null) {
      const updated = [...bucket];
      updated[editIdx].text = bucketForm;
      setBucket(updated);
      setEditIdx(null);
    } else {
      setBucket([{ text: bucketForm, done: false }, ...bucket]);
    }
    setBucketForm('');
  };
  const handleEditBucket = (idx) => {
    setBucketForm(bucket[idx].text);
    setEditIdx(idx);
  };
  const handleDeleteBucket = (idx) => setBucket(bucket.filter((_, i) => i !== idx));
  const handleToggleBucket = (idx) => {
    const updated = [...bucket];
    updated[idx].done = !updated[idx].done;
    setBucket(updated);
  };

  // Render
  return (
    <section className="flex flex-col gap-8">
      <div>
        <h2 className="text-lg font-bold text-pink-500 mb-1 flex items-center gap-2"><span>🗓️</span> Kalender Event Pasangan</h2>
        <div className="h-1 w-12 bg-pink-200 rounded mb-4" />
        <div className="flex items-center justify-between mb-2">
          <button onClick={handlePrev} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-xs">&lt;</button>
          <span className="font-semibold text-sm sm:text-base">{monthNames[month]} {year}</span>
          <button onClick={handleNext} className="px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 text-xs">&gt;</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="text-gray-400">
                {['Min','Sen','Sel','Rab','Kam','Jum','Sab'].map((d) => (
                  <th key={d} className="p-1 font-normal">{d}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((week, i) => (
                <tr key={i}>
                  {week.map((d, j) => {
                    const dateStr = d ? `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}` : '';
                    const dayEvents = events.filter(ev => ev.date === dateStr);
                    return (
                      <td key={j} className={`h-12 w-12 p-1 align-top ${d ? 'bg-gray-50' : ''}`}>
                        {d && (
                          <div className="flex flex-col h-full">
                            <span className="font-semibold text-gray-700 text-xs mb-1">{d}</span>
                            {dayEvents.map((ev, idx) => (
                              <div key={idx} className="bg-pink-100 text-pink-700 rounded px-1 py-0.5 mb-1 text-[10px] flex items-center justify-between">
                                <span className="truncate max-w-[60px]" title={ev.title}>{ev.title}</span>
                                <button className="ml-1 text-[10px] text-red-400 hover:text-red-600" onClick={() => handleDeleteEvent(events.findIndex(e => e === ev))} title="Hapus">×</button>
                              </div>
                            ))}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <form onSubmit={handleAddEvent} className="flex flex-col sm:flex-row gap-2 mt-3">
          <input type="date" name="date" value={eventForm.date} onChange={handleEventForm} className="border rounded px-2 py-1 text-xs sm:text-sm flex-1" required />
          <input type="text" name="title" value={eventForm.title} onChange={handleEventForm} placeholder="Judul event..." className="border rounded px-2 py-1 text-xs sm:text-sm flex-1" maxLength={30} required />
          <input type="text" name="desc" value={eventForm.desc} onChange={handleEventForm} placeholder="Deskripsi (opsional)" className="border rounded px-2 py-1 text-xs sm:text-sm flex-1" maxLength={60} />
          <button type="submit" className="px-3 py-1 rounded bg-pink-500 text-white text-xs sm:text-sm hover:bg-pink-600 transition">Tambah Event</button>
        </form>
      </div>
      <div>
        <h2 className="text-lg font-bold text-pink-500 mb-1 flex items-center gap-2"><span>📝</span> Bucket List Pasangan</h2>
        <div className="h-1 w-12 bg-pink-200 rounded mb-4" />
        <form onSubmit={handleAddBucket} className="flex gap-2 mb-3">
          <input type="text" value={bucketForm} onChange={e => setBucketForm(e.target.value)} placeholder="Tambah impian..." className="border rounded px-2 py-1 text-xs sm:text-sm flex-1" maxLength={50} required />
          {editIdx !== null && (
            <button type="button" className="px-3 py-1 rounded bg-gray-200 text-gray-600 text-xs sm:text-sm" onClick={() => { setBucketForm(''); setEditIdx(null); }}>Batal</button>
          )}
          <button type="submit" className="px-3 py-1 rounded bg-pink-500 text-white text-xs sm:text-sm hover:bg-pink-600 transition">{editIdx !== null ? 'Simpan Edit' : 'Tambah'}</button>
        </form>
        <ul className="flex flex-col gap-2">
          {bucket.length === 0 && <li className="text-gray-400 text-xs sm:text-sm text-center">Belum ada bucket list. Yuk buat impian bersama!</li>}
          {bucket.map((item, idx) => (
            <li key={idx} className="flex items-center gap-2 bg-white border border-gray-100 rounded-lg px-3 py-2 shadow-sm">
              <input type="checkbox" checked={item.done} onChange={() => handleToggleBucket(idx)} className="accent-pink-500" />
              <span className={`flex-1 text-xs sm:text-base ${item.done ? 'line-through text-gray-400' : 'text-gray-700'}`}>{item.text}</span>
              {item.done && (
                <span className="bg-green-100 text-green-600 text-[10px] px-2 py-0.5 rounded-full font-semibold">Tercapai</span>
              )}
              <button className="text-blue-500 text-xs px-2 py-0.5 rounded hover:bg-blue-50" onClick={() => handleEditBucket(idx)} title="Edit">Edit</button>
              <button className="text-red-500 text-xs px-2 py-0.5 rounded hover:bg-red-50" onClick={() => handleDeleteBucket(idx)} title="Hapus">Hapus</button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// --- Jurnal Cinta Component (unchanged) ---
function JurnalCinta() {
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState({ date: '', title: '', content: '' });
  const [editIdx, setEditIdx] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('jurnalCinta');
    if (saved) setEntries(JSON.parse(saved));
  }, []);
  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('jurnalCinta', JSON.stringify(entries));
  }, [entries]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.date || !form.title || !form.content) return;
    if (editIdx !== null) {
      const updated = [...entries];
      updated[editIdx] = { ...form };
      setEntries(updated);
      setEditIdx(null);
    } else {
      setEntries([{ ...form }, ...entries]);
    }
    setForm({ date: '', title: '', content: '' });
  };

  const handleEdit = (idx) => {
    setForm(entries[idx]);
    setEditIdx(idx);
  };

  const handleDelete = (idx) => {
    if (window.confirm('Hapus jurnal ini?')) {
      setEntries(entries.filter((_, i) => i !== idx));
      if (editIdx === idx) {
        setForm({ date: '', title: '', content: '' });
        setEditIdx(null);
      }
    }
  };

  return (
    <section>
      <div className="mb-6">
        <h2 className="text-lg font-bold text-pink-500 mb-1 flex items-center gap-2"><span>📖</span> Jurnal Cinta Interaktif</h2>
        <div className="h-1 w-12 bg-pink-200 rounded mb-4" />
        <form onSubmit={handleSubmit} className="bg-gray-50 p-3 sm:p-4 rounded-lg border border-gray-100 mb-4 flex flex-col gap-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="border rounded px-2 py-1 text-xs sm:text-sm flex-1"
              required
            />
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Judul singkat..."
              className="border rounded px-2 py-1 text-xs sm:text-sm flex-1"
              maxLength={40}
              required
            />
          </div>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Tulis cerita atau momen hari ini..."
            className="border rounded px-2 py-1 text-xs sm:text-sm min-h-[60px]"
            maxLength={500}
            required
          />
          <div className="flex gap-2 justify-end">
            {editIdx !== null && (
              <button
                type="button"
                className="px-3 py-1 rounded bg-gray-200 text-gray-600 text-xs sm:text-sm"
                onClick={() => { setForm({ date: '', title: '', content: '' }); setEditIdx(null); }}
              >
                Batal
              </button>
            )}
            <button
              type="submit"
              className="px-3 py-1 rounded bg-pink-500 text-white text-xs sm:text-sm hover:bg-pink-600 transition"
            >
              {editIdx !== null ? 'Simpan Edit' : 'Tambah Jurnal'}
            </button>
          </div>
        </form>
        <div className="flex flex-col gap-3">
          {entries.length === 0 && (
            <div className="text-gray-400 text-xs sm:text-sm text-center">Belum ada jurnal. Yuk mulai tulis cerita cinta kalian!</div>
          )}
          {entries.map((entry, idx) => (
            <div key={idx} className="bg-white border border-gray-100 rounded-lg p-3 shadow-sm relative group">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-400">{entry.date}</span>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition">
                  <button
                    className="text-blue-500 text-xs px-2 py-0.5 rounded hover:bg-blue-50"
                    onClick={() => handleEdit(idx)}
                    title="Edit"
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 text-xs px-2 py-0.5 rounded hover:bg-red-50"
                    onClick={() => handleDelete(idx)}
                    title="Hapus"
                  >
                    Hapus
                  </button>
                </div>
              </div>
              <div className="font-semibold text-sm sm:text-base text-pink-600 mb-1">{entry.title}</div>
              <div className="text-xs sm:text-sm whitespace-pre-line text-gray-700">{entry.content}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function App() {
  const [activeMenu, setActiveMenu] = useState('album');
  const [fadeKey, setFadeKey] = useState(0);

  // Trigger fade animation on menu change
  const handleMenuClick = (key) => {
    if (key !== activeMenu) {
      setActiveMenu(key);
      setFadeKey(fadeKey + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <MusicPlayer />
      <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-2 sm:px-4 py-1.5 sm:py-2 flex flex-col gap-2 sm:flex-row sm:gap-0 justify-between items-center">
          <span className="text-lg sm:text-xl font-bold text-pink-500 tracking-tight">My Love</span>
          <ul className="flex flex-wrap gap-1 sm:gap-2 justify-center">
            {MENU.map((item) => (
              <li key={item.key} className="flex-shrink-0">
                <button
                  className={`flex items-center gap-1 px-2 py-1 rounded-lg transition text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-pink-300 transform duration-200 ${activeMenu === item.key ? 'bg-pink-500 text-white shadow scale-105' : 'text-gray-600 hover:bg-gray-100 hover:scale-105'}`}
                  onClick={() => handleMenuClick(item.key)}
                  title={item.label}
                >
                  <span className="text-base sm:text-lg">{item.icon}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <main className="flex-1 flex items-center justify-center py-4 sm:py-8 px-1 sm:px-2">
        <div
          key={fadeKey}
          className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-3 sm:p-6 animate-fadein"
        >
          {activeMenu === 'album' && <AlbumFoto />}
          {activeMenu === 'jurnal' && <JurnalCinta />}
          {activeMenu === 'kalender' && <KalenderBucket />}
          {activeMenu === 'capsule' && <TimeCapsule />}
          {activeMenu === 'surat' && <SuratCinta />}
          {activeMenu === 'wishlist' && <WishlistGift />}
        </div>
      </main>
      <footer className="text-center text-xs text-gray-400 py-3 sm:py-4">&copy; {new Date().getFullYear()} My Love</footer>
    </div>
  );
}

export default App;
