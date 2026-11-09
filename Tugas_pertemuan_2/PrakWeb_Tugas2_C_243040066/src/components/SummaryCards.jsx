const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

function SummaryCards({ balance, income, expense }) {
  return (
    <section className="summary-grid" aria-label="Ringkasan saldo dan transaksi">
      <article className="summary-card balance-card">
        <div className="summary-card-top">
          <span className="summary-label">Total saldo</span>
          <span className="summary-icon balance-icon" aria-hidden="true">↗</span>
        </div>
        <p className="summary-amount">{currencyFormatter.format(balance)}</p>
        <p className="summary-note">Pemasukan dikurangi pengeluaran</p>
      </article>
      <article className="summary-card">
        <div className="summary-card-top">
          <span className="summary-label">Total pemasukan</span>
          <span className="summary-icon income-icon" aria-hidden="true">↓</span>
        </div>
        <p className="summary-amount">{currencyFormatter.format(income)}</p>
        <p className="summary-note">Uang yang kamu terima</p>
      </article>
      <article className="summary-card">
        <div className="summary-card-top">
          <span className="summary-label">Total pengeluaran</span>
          <span className="summary-icon expense-icon" aria-hidden="true">↑</span>
        </div>
        <p className="summary-amount">{currencyFormatter.format(expense)}</p>
        <p className="summary-note">Uang yang kamu gunakan</p>
      </article>
    </section>
  );
}

export default SummaryCards;
