# CampusFlow — Urutan Pengerjaan & Checklist

> Berdasarkan PRD Frontend CampusFlow (Portal Akademik).
> Stack: **Next.js + TypeScript**, mobile-first, aksesibel (WCAG AA).
> Breakpoint uji: **360 px (mobile), 768 px (tablet), 1280 px (desktop)**.

---

## Deliverable Akhir (yang dikumpulkan)

- [ ] Wireframe
- [ ] High-fidelity design
- [ ] Prototipe interaktif
- [ ] Source code
- [ ] README singkat
- [ ] Bukti pengujian responsif

---

## Fase 0 — Persiapan

- [ ] Baca PRD sampai paham: masalah, tujuan, pengguna, indikator keberhasilan
- [ ] Tentukan tools: Figma (desain), VS Code, Node.js, Git/GitHub
- [ ] Buat repo dan struktur folder (`/design`, `/src`, `/docs`)
- [ ] Catat ringkasan produk:
  - **Masalah:** mahasiswa sulit memantau jadwal, tugas, materi, progres di banyak kanal
  - **Tujuan:** satu dashboard akademik yang cepat dipindai
  - **Pengguna:** mahasiswa aktif, dosen pengampu, asisten kelas
  - **Nilai:** Jelas • Cepat • Konsisten
  - **Sukses:** 90% pengguna menemukan deadline dalam < 10 detik

## Fase 1 — Perencanaan & Struktur

- [ ] Buat **sitemap** 6 halaman: Masuk → Dashboard → Mata Kuliah → Detail Tugas → Kalender → Profil
- [ ] Buat **user flow** utama (6 langkah):
  1. Masuk → 2. Lihat ringkasan → 3. Pilih mata kuliah → 4. Buka tugas → 5. Unggah jawaban → 6. Terima status
- [ ] Tandai prioritas fitur:
  - **P0:** alur utama, state kosong/error
  - **P1:** filter/favorit, riwayat aktivitas
  - **P2:** personalisasi, fitur sosial lanjutan
- [ ] Pastikan fitur **di luar MVP tidak dikerjakan** (login sosial, pembayaran, push notif, panel admin, analitik AI)

## Fase 2 — Wireframe (low-fidelity)

Buat untuk **setiap halaman × 3 ukuran layar**.

- [ ] Masuk
- [ ] Dashboard (jadwal + deadline, ringkasan nilai/progres)
- [ ] Mata Kuliah (daftar + materi)
- [ ] Detail Tugas (info, unggah jawaban, status)
- [ ] Kalender akademik
- [ ] Profil
- [ ] Terapkan pola layout:
  - Mobile: 1 kolom, navigasi bawah, CTA mudah dijangkau
  - Tablet: grid 2 kolom, navigasi ringkas, panel detail adaptif
  - Desktop: sidebar/top-nav, grid 2–4 kolom, lebar maksimum terkontrol
- [ ] Pastikan **satu aksi utama paling menonjol** di tiap halaman

## Fase 3 — Design System & High-Fidelity

- [ ] Tentukan **design tokens**: warna (kontras min. WCAG AA), tipografi, spacing, radius, bayangan
- [ ] Rancang komponen: tombol, input/form, kartu mata kuliah, kartu tugas, badge status, navigasi (bawah/sidebar), stat card, progress bar, upload area, toast/alert
- [ ] Rancang **4 state** tiap komponen penting:
  - Loading / skeleton
  - Empty (hasil kosong)
  - Error (kesalahan jaringan)
  - Success (berhasil disimpan)
- [ ] Buat high-fidelity untuk 6 halaman × 3 breakpoint
- [ ] Rancang state form: label permanen, pesan error spesifik, konfirmasi tindakan
- [ ] Cek kontras warna dan ukuran target sentuh (min. 44 px)

## Fase 4 — Prototipe Interaktif

- [ ] Hubungkan semua halaman di Figma (prototype mode)
- [ ] Alur utama berjalan tanpa dead-end (Masuk → … → Terima status)
- [ ] Sertakan tampilan state loading, empty, error, success
- [ ] Pengguna bisa kembali tanpa kehilangan input yang sudah diisi

## Fase 5 — Setup Project Next.js

- [ ] `npx create-next-app@latest campusflow --typescript`
- [ ] Atur struktur folder: `app/` (route), `components/`, `lib/`, `data/`, `types/`, `styles/`
- [ ] Pasang global styles + design tokens (CSS variables), pendekatan **mobile-first**
- [ ] Buat route 6 halaman: `/login`, `/dashboard`, `/courses`, `/assignments/[id]`, `/calendar`, `/profile`
- [ ] Buat layout bersama: bottom-nav (mobile) dan sidebar/top-nav (desktop)

## Fase 6 — Data Dummy & Tipe Data

- [ ] Definisikan tipe TypeScript: `Course`, `Assignment`, `Material`, `Grade`, `CalendarEvent`, `User`
- [ ] Buat data dummy lokal (JSON/TS)
- [ ] Buat lapisan akses data (mis. `lib/api.ts`) agar **mudah diganti API** nanti
- [ ] Simulasikan delay/error agar state loading & error bisa diuji

## Fase 7 — Komponen Reusable

- [ ] Button, Input, Card, Badge, Navbar/Sidebar, Skeleton, EmptyState, ErrorState, Toast
- [ ] Setiap komponen data punya **loading, empty, error, success**
- [ ] Label aksesibel (`aria-label`, `<label>` permanen), fokus terlihat

## Fase 8 — Implementasi Halaman (urut prioritas P0 dulu)

- [ ] **Masuk** — form tervalidasi, pesan error spesifik
- [ ] **Dashboard** — jadwal, deadline terdekat, ringkasan nilai & progres (deadline harus terlihat < 10 detik)
- [ ] **Mata Kuliah** — daftar mata kuliah + materi
- [ ] **Detail Tugas** — info tugas, unggah jawaban, status pengumpulan, feedback hasil
- [ ] **Kalender** — kalender akademik
- [ ] **Profil**
- [ ] P1 (jika sempat): filter, favorit, riwayat aktivitas

## Fase 9 — Responsif

- [ ] Uji di **360, 768, 1280 px**
- [ ] Tidak ada teks terpotong atau elemen bertumpuk
- [ ] Hindari ukuran tetap (fixed px) yang memotong konten
- [ ] Target sentuh min. 44 px di tablet/mobile
- [ ] Lebar maksimum konten di desktop terkontrol

## Fase 10 — Aksesibilitas

- [ ] Navigasi keyboard penuh (Tab, Enter, Esc), urutan fokus logis
- [ ] Kontras minimum WCAG AA
- [ ] Gunakan HTML semantik (`nav`, `main`, `button`, heading berurutan)
- [ ] Alt text / label untuk ikon dan gambar
- [ ] Jalankan Lighthouse Accessibility → target **≥ 90**

## Fase 11 — Pengujian

- [ ] **Usability test**: minta beberapa orang menemukan deadline; catat waktu (target 90% < 10 detik)
- [ ] Tes alur utama dari awal sampai akhir tanpa dead-end
- [ ] Screenshot tampilan 360 / 768 / 1280 px sebagai **bukti responsif**
- [ ] Simpan laporan Lighthouse (screenshot/PDF)

## Fase 12 — Dokumentasi & Pengumpulan

- [ ] **README singkat**: deskripsi, cara menjalankan, struktur folder, fitur, keputusan desain
- [ ] Susun folder bukti pengujian (screenshot responsif, hasil Lighthouse, catatan usability)
- [ ] Rapikan link Figma (wireframe, high-fidelity, prototipe)
- [ ] Push source code ke repo

---

## Definition of Done (cek terakhir)

- [ ] Seluruh halaman MVP dapat dinavigasi
- [ ] Alur utama selesai tanpa dead-end
- [ ] Tampilan teruji pada 360, 768, dan 1280 px
- [ ] Tidak ada teks terpotong / elemen bertumpuk
- [ ] Form tervalidasi dan memberi feedback
- [ ] Lighthouse Accessibility ≥ 90
- [ ] Semua deliverable lengkap (wireframe, hi-fi, prototipe, source code, README, bukti uji)

---

## Saran Urutan Waktu (opsional)

| Tahap | Fase | Estimasi |
|---|---|---|
| Desain | 0–4 | ~40% waktu |
| Coding | 5–8 | ~35% waktu |
| Penyempurnaan | 9–10 | ~15% waktu |
| Uji & dokumentasi | 11–12 | ~10% waktu |