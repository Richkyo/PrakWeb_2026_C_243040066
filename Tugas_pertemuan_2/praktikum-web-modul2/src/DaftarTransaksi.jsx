import TransaksiItem from './TransaksiItem';

function DaftarTransaksi({ transaksi, onHapus }) {
  if (transaksi.length === 0) {
    return (
      <p className="kosong">
        Belum ada transaksi. Tambahkan pemasukan atau pengeluaran pertamamu.
      </p>
    );
  }

  return (
    <ul className="daftar-transaksi">
      {transaksi.map((item) => (
        <TransaksiItem key={item.id} transaksi={item} onHapus={onHapus} />
      ))}
    </ul>
  );
}

export default DaftarTransaksi;
