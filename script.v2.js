alert('script.js loaded');
// ==================== 基本設定 ====================
const SUPABASE_URL = 'https://feegzkbrumieucyweghm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_B_taCjibUltphJ-1jmmWYQ_8__FYb45';
const MAX_SLOTS_PER_DAY = 10;
// =================================================

let selectedDate = null;

/* ==================== 行程資料 ==================== */
const tripDetails = {
    xilin: {
        title: '西林秘境',
        description: '西林秘境是教練們於2023年探勘並建置的一條溪谷路線。',
        highlights: ['✓ 30公尺高瀑布垂降','✓ 罕見S型瀑布','✓ 適合初學者'],
        duration: '約 4-5 小時',
        difficulty: '初級',
        included: '教練、裝備、保險'
    }
};
/* ================================================= */

/* ==================== UI 基本 ==================== */
function showDetails(tripId) {
    const trip = tripDetails[tripId];
    if (!trip) return;
    alert(`【${trip.title}】\n${trip.description}`);
}

function showTerms() {
    alert('活動條款與個資聲明');
}
/* ================================================= */

/* ==================== 開啟預約 ==================== */
function openBooking(tripName, price) {
    const numericPrice = Number(price);
    if (Number.isNaN(numericPrice)) {
        alert('價格資料錯誤，請重新整理頁面');
        return;
    }

    document.getElementById('tripName').value = tripName;
    document.getElementById('tripPrice').value = numericPrice;

    document.getElementById('bookingInfo').innerHTML = `
        <h3>${tripName}</h3>
        <p>費用：NT$ ${numericPrice.toLocaleString()} / 人</p>
    `;

    document.getElementById('bookingModal').style.display = 'block';
    document.body.style.overflow = 'hidden';

    selectedDate = null;
    document.getElementById('selectedDateDisplay').textContent = '';
    document.getElementById('allParticipantFields').innerHTML = '';

    loadRealAvailability();
}

function closeBooking() {
    document.getElementById('bookingModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('bookingForm').reset();
}
/* ================================================= */

/* ==================== Supabase 日曆 ==================== */
async function loadRealAvailability() {
    const container = document.getElementById('calendarContainer');
    if (!container) return;

    container.innerHTML = '載入中...';

    try {
        const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_availability`, {
            method: 'POST',
            headers: {
                apikey: SUPABASE_ANON_KEY,
                Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ max_slots: MAX_SLOTS_PER_DAY })
        });

        const data = await res.json();
        const availability = {};

        data.forEach(d => {
            availability[d.trip_date] = Number(d.remaining);
        });

        generateCalendar(availability);
    } catch (e) {
        console.error(e);
        generateCalendar({});
    }
}

function generateCalendar(availability) {
    const container = document.getElementById('calendarContainer');
    container.innerHTML = '';

    const today = new Date();
    today.setHours(0,0,0,0);

    for (let m = 0; m < 6; m++) {
        const base = new Date(today.getFullYear(), today.getMonth() + m, 1);
        const days = new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();

        const monthDiv = document.createElement('div');
        monthDiv.className = 'month-calendar';
        monthDiv.innerHTML = `<h3>${base.getFullYear()} / ${base.getMonth() + 1}</h3>`;

        const table = document.createElement('table');
        const tbody = document.createElement('tbody');
        let row = document.createElement('tr');

        for (let i = 0; i < base.getDay(); i++) row.appendChild(document.createElement('td'));

        for (let d = 1; d <= days; d++) {
            const date = new Date(base.getFullYear(), base.getMonth(), d);
            const dateStr = date.toLocaleDateString('sv-SE');
            const td = document.createElement('td');

            if (date < today) {
                td.className = 'disabled';
                td.textContent = d;
            } else {
                const remain = availability[dateStr] ?? MAX_SLOTS_PER_DAY;
                td.className = remain <= 0 ? 'red' : remain <= 3 ? 'yellow' : 'green';
                td.innerHTML = `<div>${d}</div><small>${remain <= 0 ? '額滿' : `剩 ${remain}`}</small>`;
                td.onclick = () => selectDate(dateStr);
            }

            row.appendChild(td);
            if ((base.getDay() + d) % 7 === 0) {
                tbody.appendChild(row);
                row = document.createElement('tr');
            }
        }

        tbody.appendChild(row);
        table.appendChild(tbody);
        monthDiv.appendChild(table);
        container.appendChild(monthDiv);
    }
}

function selectDate(date) {
    selectedDate = date;
}
/* ================================================= */

/* ==================== 參加者 ==================== */
function generateAllParticipantFields() {
    const count = Number(document.getElementById('participantCount').value);
    const container = document.getElementById('allParticipantFields');
    container.innerHTML = '';

    for (let i = 1; i <= count; i++) {
        container.innerHTML += `
            <h4>${i === 1 ? '主報人' : `隊員 ${i}`}</h4>
            <input class="participant-name" required placeholder="姓名">
            <input type="date" class="participant-birthdate" required>
            <input class="participant-idnumber id-uppercase" required>
        `;
    }
}
/* ================================================= */

/* ==================== 表單送出 ==================== */
document.addEventListener('DOMContentLoaded', () => {

    document.getElementById('bookingForm')?.addEventListener('submit', async e => {
        e.preventDefault();

        if (!selectedDate) {
            alert('請選擇日期');
            return;
        }

        const participants = [...document.querySelectorAll('.participant-name')].map((el, i) => ({
            trip_name: document.getElementById('tripName').value,
            trip_price: Number(document.getElementById('tripPrice').value),
            trip_date: selectedDate,
            participant_name: el.value.trim(),
            birth_date: document.querySelectorAll('.participant-birthdate')[i].value,
            id_number: document.querySelectorAll('.participant-idnumber')[i].value.toUpperCase()
        }));

        try {
            const res = await fetch(`${SUPABASE_URL}/rest/v1/bookings`, {
                method: 'POST',
                headers: {
                    apikey: SUPABASE_ANON_KEY,
                    Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(participants)
            });

            if (!res.ok) throw new Error(await res.text());

            alert('預約成功');
            closeBooking();
        } catch (err) {
            console.error(err);
            alert('送出失敗');
        }
    });

    document.addEventListener('input', e => {
        if (e.target.classList.contains('id-uppercase')) {
            e.target.value = e.target.value.toUpperCase();
        }
    });

});
