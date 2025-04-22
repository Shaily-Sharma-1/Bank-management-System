const users = [
    { username: 'john', password: '123', name: 'John Doe', accountNo: '1001', balance: 5000, transactions: [] },
    { username: 'jane', password: '123', name: 'Jane Smith', accountNo: '1002', balance: 6000, transactions: [] },
    { username: 'alex', password: '123', name: 'Alex Kim', accountNo: '1003', balance: 7000, transactions: [] },
    { username: 'emma', password: '123', name: 'Emma Brown', accountNo: '1004', balance: 8000, transactions: [] },
    { username: 'mike', password: '123', name: 'Mike Lee', accountNo: '1005', balance: 9000, transactions: [] } 
  ];
  
  let currentUser = null;
  
  function login() {
    const uname = document.getElementById('username').value;
    const pword = document.getElementById('password').value;
    const user = users.find(u => u.username === uname && u.password === pword);
    if (user) {
      currentUser = user;
      showDashboard();
    } else {
      document.getElementById('login-msg').innerText = 'Invalid credentials!';
    }
  }
  
  function showDashboard() {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('dashboard-section').classList.remove('hidden');
    document.getElementById('user-name').innerText = currentUser.name;
    document.getElementById('account-no').innerText = currentUser.accountNo;
    document.getElementById('balance').innerText = currentUser.balance;
    populateRecipients();
    showPassbook();
  }
  
  function populateRecipients() {
    const select = document.getElementById('recipient-select');
    select.innerHTML = '';
    users.forEach(u => {
      if (u.username !== currentUser.username) {
        const opt = document.createElement('option');
        opt.value = u.username;
        opt.text = `${u.name} (${u.accountNo})`;
        select.appendChild(opt);
      }
    });
  }
  
  function transferMoney() {
    const recipientUsername = document.getElementById('recipient-select').value;
    const amount = parseFloat(document.getElementById('transfer-amount').value);
    const recipient = users.find(u => u.username === recipientUsername);
  
    if (!amount || amount <= 0 || amount > currentUser.balance) {
      document.getElementById('transfer-msg').innerText = 'Invalid amount!';
      return;
    }
  
    currentUser.balance -= amount;
    recipient.balance += amount;
    const now = new Date().toLocaleString();
  
    currentUser.transactions.push({ date: now, type: 'Debit', amount, target: recipient.name, balance: currentUser.balance });
    recipient.transactions.push({ date: now, type: 'Credit', amount, target: currentUser.name, balance: recipient.balance });
  
    document.getElementById('balance').innerText = currentUser.balance;
    document.getElementById('transfer-msg').innerText = 'Transfer successful!';
    document.getElementById('transfer-amount').value = '';
    showPassbook();
  }
  
  function depositMoney() {
    const amount = parseFloat(document.getElementById('deposit-amount').value);
    if (!amount || amount <= 0) {
      document.getElementById('deposit-msg').innerText = 'Invalid amount!';
      return;
    }
  
    currentUser.balance += amount;
    const now = new Date().toLocaleString();
    currentUser.transactions.push({ date: now, type: 'Credit', amount, target: 'Self Deposit', balance: currentUser.balance });
  
    document.getElementById('balance').innerText = currentUser.balance;
    document.getElementById('deposit-msg').innerText = 'Deposit successful!';
    document.getElementById('deposit-amount').value = '';
    showPassbook();
  }
  
  function withdrawMoney() {
    const amount = parseFloat(document.getElementById('withdraw-amount').value);
    if (!amount || amount <= 0 || amount > currentUser.balance) {
      document.getElementById('withdraw-msg').innerText = 'Invalid amount!';
      return;
    }
  
    currentUser.balance -= amount;
    const now = new Date().toLocaleString();
    currentUser.transactions.push({ date: now, type: 'Debit', amount, target: 'Self Withdraw', balance: currentUser.balance });
  
    document.getElementById('balance').innerText = currentUser.balance;
    document.getElementById('withdraw-msg').innerText = 'Withdraw successful!';
    document.getElementById('withdraw-amount').value = '';
    showPassbook();
  }
  
  function showPassbook() {
    const passbook = document.getElementById('passbook');
    passbook.innerHTML = '';
    currentUser.transactions.forEach(t => {
      const row = `<tr><td>${t.date}</td><td>${t.type}</td><td>$${t.amount}</td><td>${t.target}</td><td>$${t.balance}</td></tr>`;
      passbook.innerHTML += row;
    });
  }
  
  function logout() {
    currentUser = null;
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('dashboard-section').classList.add('hidden');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('login-msg').innerText = '';
  }
  