console.log('script.js loaded');

/* ================= Supabase 設定 ================= */
const SUPABASE_URL = 'https://feegzkbrumieucyweghm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_B_taCjibUltphJ-1jmmWYQ_8__FYb45';
const MAX_SLOTS_PER_DAY = 10;

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

console.log('supabase client ready', supabase);
/* ================================================= */

let selectedDate = null;

/* ================= 行程資料 ================= */
const tripDetails = {
  xilin: { title: '西林秘境' },
  feicui: { title: '翡翠谷' },
  huangjin: { title: '黃金峽谷' },
  blue: { title: '藍色秘境' }
};
/* ============================================ */

function openBooking(tripName, price) {
  document.getElementById('tripName').value = tripName;
  document.getElementById('tripPrice').value = price;
  document.getElementById('bookingModal').style.display = 'block';
  document.body.style.overflow = 'hidden';
  selectedDate = null;
  loadRealAvailability();
}

function closeBooking() {
  document.getElementById('bookingModal').style.display = 'none';
  document.body.style.overflow = 'auto';
}

/* ================== 讀取名額（重點） ================== */
async function loadRealAvailability() {
  const container = document.getElementById('calendarContainer');
  container.innerHTML = '載入名額中…';

  const { data, error } = await supabase.rpc('get_availability', {
    max_slots: MAX_SLOTS_PER_DAY
  });

  if (error) {
    console.error(error);
    container.innerHTML = '名額載入失敗';
    return;
  }

  const availability = {};
  data.forEach(d => {
    availability[d.trip_date] = d.remaining;
  });

  generateCalendar(availability);
}
/* ===================================================== */

function generateCalendar(availability) {
  const container = document.getElementById('calendarContainer');
  container.innerHTML = '';

  const today = new Date();
  today.setHours(0,0,0,0);

  for (let m = 0; m < 6; m++) {
    const monthDate = new Date(today.getFullYear(), today.getMonth() + m, 1);
    const daysInMonth = new Date(
      monthDate.getFullYear(),
      monthDate.getMonth() + 1,
      0
    ).getDate();

    const div = document.createElement('div');
    div.className = 'month-calendar';
    div.innerHTML = `<h3>${monthDate.toLocaleString('zh-TW',{year:'numeric',month:'long'})}</h3>`;

    const table = document.createElement('table');
    table.className = 'calendar';

    let row = document.createElement('tr');
    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), d);
      const dateStr = date.toISOString().split('T')[0];
      const td = document.createElement('td');

      if (date < today) {
        td.className = 'disabled';
        td.textContent = d;
      } else {
        const remain = availability[dateStr] ?? MAX_SLOTS_PER_DAY;
        td.className = remain <= 0 ? 'red' : remain <= 3 ? 'yellow' : 'green';
        td.innerHTML = `<b>${d}</b><br>剩 ${remain}`;
        td.onclick = () => selectedDate = dateStr;
      }

      row.appendChild(td);
      if ((date.getDay()) === 6) {
        table.appendChild(row);
        row = document.createElement('tr');
      }
    }
    table.appendChild(row);
    div.appendChild(table);
    container.appendChild(div);
  }
}

/* ================== 表單送出 ================== */
document.getElementById('bookingForm').addEventListener('submit', async e => {
  e.preventDefault();
  if (!selectedDate) return alert('請選擇日期');

  const count = parseInt(document.getElementById('participantCount').value);
  const fields = document.querySelectorAll('.participant-name');

  const records = [];
  for (let i = 0; i < count; i++) {
    records.push({
      trip_name: document.getElementById('tripName').value,
      trip_price: parseInt(document.getElementById('tripPrice').value),
      trip_date: selectedDate,
      participant_name: fields[i].value
    });
  }

  const res = await fetch(`${SUPABASE_URL}/rest/v1/bookings`, {
    method: 'POST',
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(records)
  });

  if (res.ok) {
    alert('預訂成功');
    closeBooking();
  } else {
    alert('送出失敗');
  }
});

/* ================== 掛到 window ================== */
window.openBooking = openBooking;
window.closeBooking = closeBooking;
