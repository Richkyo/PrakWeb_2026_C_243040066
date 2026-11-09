function Header() {
  return (
    <header className="topbar">
      <a className="brand" href="#" aria-label="Semoga Bisa Nabung, beranda">
        <span className="brand-icon" aria-hidden="true">
          <svg viewBox="0 0 32 32" role="img">
            <path d="M7 17.5 13 23l12-14" />
            <path d="M16 3.5a12.5 12.5 0 1 0 12.5 12.5" />
          </svg>
        </span>
        <span>Semoga Bisa Nabung</span>
      </a>
      <span className="topbar-label">CATATAN KEUANGAN MINI</span>
      <div className="profile-badge" aria-label="Profil pengguna">K</div>
    </header>
  );
}

export default Header;
