import { useEffect, useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import SummaryCards from './components/SummaryCards.jsx';
import TransactionForm from './components/TransactionForm.jsx';
import TransactionList from './components/TransactionList.jsx';

const STORAGE_KEY = 'transactions';

function loadTransactions() {
  try {
    const savedTransactions = localStorage.getItem(STORAGE_KEY);
    if (!savedTransactions) return [];

    const parsedTransactions = JSON.parse(savedTransactions);
    if (!Array.isArray(parsedTransactions)) {
      throw new TypeError('Data transaksi harus berupa daftar.');
    }

    return parsedTransactions.filter(
      (transaction) =>
        transaction &&
        typeof transaction.id === 'string' &&
        typeof transaction.description === 'string' &&
        typeof transaction.amount === 'number' &&
        (transaction.type === 'income' || transaction.type === 'expense'),
    );
  } catch (error) {
    console.error('Gagal membaca catatan keuangan dari penyimpanan lokal.', error);
    return [];
  }
}

function App() {
  const [transactions, setTransactions] = useState(loadTransactions);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (error) {
      console.error('Gagal menyimpan catatan keuangan ke penyimpanan lokal.', error);
    }
  }, [transactions]);

  const totals = useMemo(
    () =>
      transactions.reduce(
        (result, transaction) => {
          if (transaction.type === 'income') {
            result.income += transaction.amount;
          } else {
            result.expense += transaction.amount;
          }
          return result;
        },
        { income: 0, expense: 0 },
      ),
    [transactions],
  );

  const balance = totals.income - totals.expense;

  function addTransaction(transaction) {
    setTransactions((currentTransactions) => [transaction, ...currentTransactions]);
  }

  function deleteTransaction(transactionId) {
    setTransactions((currentTransactions) =>
      currentTransactions.filter((transaction) => transaction.id !== transactionId),
    );
  }

  return (
    <div className="app-shell">
      <Header />
      <main className="dashboard">
        <section className="welcome-section" aria-labelledby="welcome-title">
          <div>
            <p className="eyebrow">RINGKASAN KEUANGAN</p>
            <h1 id="welcome-title">Uangmu, lebih tertata.</h1>
            <p className="welcome-copy">
              Catat setiap pemasukan dan pengeluaran supaya kamu tahu ke mana uangmu pergi.
            </p>
          </div>
          <div className="date-chip">
            <span className="date-dot" aria-hidden="true" />
            Catatan pribadiS
          </div>
        </section>

        <SummaryCards balance={balance} income={totals.income} expense={totals.expense} />

        <div className="content-grid">
          <TransactionForm onAdd={addTransaction} />
          <TransactionList
            transactions={transactions}
            onDelete={deleteTransaction}
          />
        </div>

        <footer className="app-footer">
          <span className="footer-mark" aria-hidden="true">r.</span>
          <span>Mulai dari catatan kecil, untuk keputusan yang lebih baik.</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
