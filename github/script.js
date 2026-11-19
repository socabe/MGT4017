const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

const accountDialog = document.getElementById('accountDialog');
const dialogTitle = document.getElementById('dialogTitle');
const dialogText = document.getElementById('dialogText');

document.querySelectorAll('[data-modal]').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const isSignup = link.dataset.modal === 'signup';
    dialogTitle.textContent = isSignup ? 'Create your account' : 'Welcome back';
    dialogText.textContent = isSignup
      ? 'Sign up to get started.'
      : 'Log in to access your account.';
    accountDialog.showModal();
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

document.getElementById('profileButton').addEventListener('click', () => {
  dialogTitle.textContent = 'Your account';
  dialogText.textContent = 'Log in or sign up to access your account.';
  accountDialog.showModal();
});

document.getElementById('accountForm').addEventListener('submit', event => {
  event.preventDefault();
  alert('Thanks! This is a front-end demo. Connect an authentication service to enable real accounts.');
  accountDialog.close();
  event.target.reset();
});

document.getElementById('searchForm').addEventListener('submit', event => {
  event.preventDefault();
  const query = document.getElementById('searchInput').value.trim().toLowerCase();
  if (!query) return;
  const searchable = [...document.querySelectorAll('main h1, main h2, main h3, main p, main a')];
  const match = searchable.find(element => element.textContent.toLowerCase().includes(query));
  if (match) {
    match.scrollIntoView({ behavior: 'smooth', block: 'center' });
    match.setAttribute('tabindex', '-1');
    match.focus({ preventScroll: true });
  } else {
    alert('No matching content found. Try another search.');
  }
});

let shownMonth = new Date();
const monthLabel = document.getElementById('monthLabel');
const calendarGrid = document.getElementById('calendarGrid');
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function renderCalendar() {
  const year = shownMonth.getFullYear();
  const month = shownMonth.getMonth();
  monthLabel.textContent = shownMonth.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
  calendarGrid.replaceChildren();

  dayNames.forEach(day => {
    const cell = document.createElement('span');
    cell.className = 'day-name';
    cell.textContent = day;
    calendarGrid.appendChild(cell);
  });

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  for (let i = 0; i < firstDay; i++) calendarGrid.appendChild(document.createElement('span'));

  const today = new Date();
  for (let day = 1; day <= daysInMonth; day++) {
    const cell = document.createElement('span');
    cell.textContent = day;
    if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
      cell.className = 'today';
      cell.setAttribute('aria-current', 'date');
    }
    calendarGrid.appendChild(cell);
  }
}

document.getElementById('prevMonth').addEventListener('click', () => {
  shownMonth = new Date(shownMonth.getFullYear(), shownMonth.getMonth() - 1, 1);
  renderCalendar();
});
document.getElementById('nextMonth').addEventListener('click', () => {
  shownMonth = new Date(shownMonth.getFullYear(), shownMonth.getMonth() + 1, 1);
  renderCalendar();
});

document.getElementById('year').textContent = new Date().getFullYear();
renderCalendar();
