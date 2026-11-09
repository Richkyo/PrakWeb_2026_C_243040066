import { useState } from 'react';

function FormTransaksi({ onTambah }) {
  const [keterangan, setKeterangan] = useState('');
  const [nominal, setNominal] = useState('');
  const [jenis, setJenis] = useState('pemasukan');
  const [pesanGalat, setPesanGalat] = useState('');

  const tanganiKirim = (event) => {
    event.preventDefault();
    const jumlah = Number(nominal);

    if (!keterangan.trim()) {
      setPesanGalat('Keterangan transaksi wajib diisi.');
      return;
    }

    if (!Number.isFinite(jumlah) || jumlah <= 0) {
      setPesanGalat('Nominal harus berupa angka lebih dari nol.');
      return;
    }

    onTambah({ keterangan: keterangan.trim(), nominal: jumlah, jenis });
    setKeterangan('');
    setNominal('');
    setJenis('pemasukan');
    setPesanGalat('');
  };

  return (
    <form onSubmit={tanganiKirim}>
      <div className="kolom-form">
        <label className="label-form" htmlFor="keterangan-transaksi">
          Keterangan
        </label>
        <input
          id="keterangan-transaksi"
          className="input"
          type="text"
          value={keterangan}
          onChange={(event) => setKeterangan(event.target.value)}
          placeholder="Contoh: Gaji bulanan"
          maxLength={100}
          required
        />

        <label className="label-form" htmlFor="nominal-transaksi">
          Nominal (Rp)
        </label>
        <input
          id="nominal-transaksi"
          className="input"
          type="number"
          value={nominal}
          onChange={(event) => setNominal(event.target.value)}
          placeholder="Contoh: 500000"
          min="1"
          step="1"
          required
        />

        <label className="label-form" htmlFor="jenis-transaksi">
          Jenis transaksi
        </label>
        <select
          id="jenis-transaksi"
          className="input"
          value={jenis}
          onChange={(event) => setJenis(event.target.value)}
        >
          <option value="pemasukan">Pemasukan</option>
          <option value="pengeluaran">Pengeluaran</option>
        </select>

        <button className="tombol" type="submit">
          Tambah Transaksi
        </button>
      </div>
      {pesanGalat && (
        <p className="galat" role="alert">
          {pesanGalat}
        </p>
      )}
    </form>
  );
}

export default FormTransaksi;
