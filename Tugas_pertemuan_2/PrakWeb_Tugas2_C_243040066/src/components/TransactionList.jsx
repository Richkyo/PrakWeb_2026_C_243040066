const currencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-illustration" aria-hidden="true">
        <span className="empty-paper">
          <span />
          <span />
          <span />
        </span>
        <span className="empty-sparkle">✦</span>
      </div>
      <h3>Belum ada transaksi</h3>
      <p>Transaksi yang kamu tambahkan akan muncul di sini.</p>
    </div>
  );
}

function TransactionItem({ transaction, onDelete }) {
  const isIncome = transaction.type === 'income';
  const date = transaction.createdAt ? new Date(transaction.createdAt) : null;
  const formattedDate =
    date && !Number.isNaN(date.getTime()) ? dateFormatter.format(date) : 'Tanggal tidak tersedia';

  function handleDelete() {
    onDelete(transaction.id);
  }

  return (
    <li className="transaction-item">
      <span
        className={`transaction-type-icon ${isIncome ? 'transaction-type-income' : 'transaction-type-expense'}`}
        aria-hidden="true"
      >
        {isIncome ? '↓' : '↑'}
      </span>
      <div className="transaction-details">
        <p className="transaction-name">{transaction.description}</p>
        <p className="transaction-date">{formattedDate}</p>
      </div>
      <div className="transaction-value-group">
        <p className={`transaction-value ${isIncome ? 'income-value' : 'expense-value'}`}>
          {isIncome ? '+' : '−'}{currencyFormatter.format(transaction.amount)}
        </p>
        <button
          className="delete-button"
          type="button"
          onClick={handleDelete}
          aria-label={`Hapus transaksi ${transaction.description}`}
          title="Hapus transaksi"
        >
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M4.5 6h11M8 6V4.5h4V6m2.5 0-.7 9h-7.6l-.7-9M8.2 8.5v4m3.6-4v4" />
          </svg>
        </button>
      </div>
    </li>
  );
}

function TransactionList({ transactions, onDelete }) {
  return (
    <section className="panel list-panel" aria-labelledby="transactions-title">
      <div className="panel-heading list-heading">
        <div>
          <p className="eyebrow">RIWAYAT</p>
          <h2 id="transactions-title">Semua transaksi</h2>
        </div>
        <span className="transaction-count">
          {transactions.length} {transactions.length === 1 ? 'catatan' : 'catatan'}
        </span>
      </div>

      {transactions.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="transaction-list">
          {transactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

export default TransactionList;
