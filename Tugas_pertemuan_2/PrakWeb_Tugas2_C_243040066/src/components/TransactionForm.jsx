import { useState } from 'react';

function TransactionForm({ onAdd }) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedDescription = description.trim();
    const numericAmount = Number(amount);
    if (!trimmedDescription) {
      setErrorMessage('Nama transaksi wajib diisi.');
      return;
    }
    if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
      setErrorMessage('Nominal harus berupa angka yang lebih besar dari 0.');
      return;
    }

    onAdd({
      id: crypto.randomUUID(),
      description: trimmedDescription,
      amount: numericAmount,
      type,
      createdAt: new Date().toISOString(),
    });
    setDescription('');
    setAmount('');
    setErrorMessage('');
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
    if (errorMessage) setErrorMessage('');
  }

  function handleAmountChange(event) {
    setAmount(event.target.value);
    if (errorMessage) setErrorMessage('');
  }

  function handleTypeChange(event) {
    setType(event.target.value);
  }

  return (
    <section className="panel form-panel" aria-labelledby="form-title">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">TRANSAKSI BARU</p>
          <h2 id="form-title">Tambah catatan</h2>
        </div>
        <span className="heading-icon" aria-hidden="true">＋</span>
      </div>

      <form className="transaction-form" onSubmit={handleSubmit} noValidate>
        <label className="field-label" htmlFor="description">Nama transaksi</label>
        <input
          id="description"
          className="text-input"
          type="text"
          placeholder="Contoh: Makan siang"
          value={description}
          onChange={handleDescriptionChange}
          maxLength={70}
          autoComplete="off"
        />

        <label className="field-label" htmlFor="amount">Nominal</label>
        <div className="amount-input-wrap">
          <span className="currency-prefix" aria-hidden="true">Rp</span>
          <input
            id="amount"
            className="text-input amount-input"
            type="number"
            placeholder="0"
            value={amount}
            onChange={handleAmountChange}
            min="1"
            step="1"
            inputMode="numeric"
          />
        </div>

        <label className="field-label" htmlFor="type">Jenis transaksi</label>
        <select id="type" className="text-input select-input" value={type} onChange={handleTypeChange}>
          <option value="expense">Pengeluaran</option>
          <option value="income">Pemasukan</option>
        </select>

        {errorMessage && (
          <p className="form-error" role="alert">{errorMessage}</p>
        )}

        <button className="submit-button" type="submit">
          <span aria-hidden="true">＋</span>
          Simpan transaksi
        </button>
      </form>
      <p className="form-hint">
        <span aria-hidden="true">✦</span> Catatanmu tersimpan otomatis di perangkat ini.
      </p>
    </section>
  );
}

export default TransactionForm;
