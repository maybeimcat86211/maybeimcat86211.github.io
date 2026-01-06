// ==================== 請修改這兩行 ====================
const SUPABASE_URL = 'https://feegzkbrumieucyweghm.supabase.co';  // 例如：https://abcde.supabase.co
const SUPABASE_ANON_KEY = 'sb_publishable_B_taCjibUltphJ-1jmmWYQ_8__FYb45';  // 你的 anon key
// =====================================================
const MAX_SLOTS_PER_DAY = 10; // 每團上限人數
// =====================================================

let selectedDate = null;

const tripDetails = { /* 你的原本 tripDetails 保持不變 */ };

function showDetails(tripId) { /* 保持原本 */ }

function showTerms() { /* 保持原本 */ }

function openBooking(tripName, price) {
    document.getElementById('tripName').value = tripName;
    document.getElementById('tripPrice').value = price;

    const modal = document.getElementById('bookingModal');
    const bookingInfo = document.getElementById('bookingInfo');
    bookingInfo.innerHTML = `
        <h3>📍 ${tripName}</h3>
        <p><strong>💰 費用：</strong>NT$ ${price.toLocaleString()} / 人</p>
        <p><strong>📋 說明：</strong>請依序展開各步驟填寫資料</p>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    selectedDate = null;
    document.getElementById('selectedDateDisplay').textContent = '';
    document.getElementById('participantFields').innerHTML = '';

    // 重置所有 accordion
    document.querySelectorAll('.accordion-header').forEach(h => h.classList.remove('active'));
    document.querySelectorAll('.accordion-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.accordion-header')[0].classList.add('active');
    document.querySelectorAll('.accordion-content')[0].classList.add('active');

    loadRealAvailability();
}

function closeBooking() {
    document.getElementById('bookingModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('bookingForm').reset();
}

function toggleAccordion(header) {
    header.classList.toggle('active');
    const content = header.nextElementSibling;
    content.classList.toggle('active');
}

async function loadRealAvailability() {
    const container = document.getElementById('calendarContainer');
    container.innerHTML = '<p style="text-align:center; padding:20px;">載入名額中...</p>';

    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_availability`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ max_slots: MAX_SLOTS_PER_DAY })
        });

        const data = await response.json();
        const availability = {};
        data.forEach(item => {
            availability[item.trip_date] = {
                remaining: parseInt(item.remaining)
            };
        });

        generateCalendarWithRealData(availability);
    } catch (err) {
        container.innerHTML = '<p style="color:red; text-align:center;">載入失敗，使用預設顯示</p>';
        generateCalendarWithRealData({});
    }
}

function generateCalendarWithRealData(availability) {
    const container = document.getElementById('calendarContainer');
    container.innerHTML = '';

    const today = new Date();
    today.setHours(0,0,0,0);

    for (let m = 0; m < 6; m++) {
        const monthDate = new Date(today.getFullYear(), today.getMonth() + m, 1);
        const monthName = monthDate.toLocaleString('zh-TW', { year: 'numeric', month: 'long' });

        let table = `<div class="month-calendar">
            <div class="month-title">${monthName}</div>
            <table class="calendar">
                <thead><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr></thead>
                <tbody><tr>`;

        const firstDay = monthDate.getDay();
        for (let i = 0; i < firstDay; i++) table += '<td></td>';

        const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
        for (let d = 1; d <= daysInMonth; d++) {
            const dateObj = new Date(monthDate.getFullYear(), monthDate.getMonth(), d);
            const dateStr = dateObj.toISOString().split('T')[0];

            if (dateObj < today) {
                table += `<td class="disabled"><div class="day-number">${d}</div></td>`;
            } else {
                const info = availability[dateStr] || { remaining: MAX_SLOTS_PER_DAY };
                let className = 'green';
                let statusText = `剩 ${info.remaining} 名`;

                if (info.remaining <= 0) {
                    className = 'red';
                    statusText = '額滿';
                } else if (info.remaining <= 3) {
                    className = 'yellow';
                }

                table += `<td class="${className}" onclick="selectDate('${dateStr}')">
                    <div class="day-number">${d}</div>
                    <div class="status">${statusText}</div>
                </td>`;
            }

            if ((firstDay + d) % 7 === 0) table += '</tr><tr>';
        }
        table += '</tr></tbody></table></div>';
        container.innerHTML += table;
    }
}

function selectDate(date) {
    selectedDate = date;
}

document.getElementById('confirmDateBtn').addEventListener('click', () => {
    if (!selectedDate) {
        alert('請先選擇一個日期！');
        return;
    }
    document.getElementById('selectedDateDisplay').textContent = `已選：${selectedDate}`;
    toggleAccordion(document.querySelectorAll('.accordion-header')[0]); // 收合日期
    toggleAccordion(document.querySelectorAll('.accordion-header')[1]); // 展開主報人
});

function generateParticipantFields() {
    const count = parseInt(document.getElementById('participantCount').value);
    const container = document.getElementById('participantFields');
    container.innerHTML = '';
    for (let i = 2; i <= count; i++) {
        container.innerHTML += `
            <h4 style="margin:30px 0 15px; color:#2E86AB;">隊員 ${i} 資料</h4>
            <div class="form-group">
                <label>姓名 *</label>
                <input type="text" class="participant-name" required>
            </div>
            <div class="form-group">
                <label>出生年月日 *</label>
                <input type="date" class="participant-birthdate" required>
            </div>
            <div class="form-group">
                <label>身分證 / 護照號碼 *</label>
                <input type="text" class="participant-idnumber id-uppercase" required>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>身高 (cm) *</label>
                    <input type="number" class="participant-height" required min="100" max="250">
                </div>
                <div class="form-group">
                    <label>體重 (kg) *</label>
                    <input type="number" class="participant-weight" required min="30" max="200">
                </div>
            </div>
            <div class="form-group">
                <label>溯溪鞋尺寸 (cm) *</label>
                <select class="participant-shoesize" required>
                    <option value="">請選擇</option>
                    <!-- 你的鞋碼選項 -->
                    <option value="22">22 cm</option>
                    <!-- ... 省略其餘 ... -->
                    <option value="30">30 cm</option>
                </select>
            </div>
            <div class="form-group">
                <label>健康狀況</label>
                <textarea class="participant-medical" rows="3">無</textarea>
            </div>
        `;
    }
}

document.getElementById('bookingForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    if (!document.getElementById('agreeTerms').checked) {
        alert('請同意條款');
        return;
    }
    if (!selectedDate) {
        alert('請選擇日期');
        return;
    }

    const submitBtn = document.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '送出中...';
    submitBtn.disabled = true;

    const commonData = {
        trip_name: document.getElementById('tripName').value,
        trip_price: parseInt(document.getElementById('tripPrice').value),
        trip_date: selectedDate,
        main_phone: document.getElementById('mainPhone').value,
        main_address: document.getElementById('mainAddress').value,
        emergency_name: document.getElementById('emergencyName').value,
        emergency_phone: document.getElementById('emergencyPhone').value
    };

    const participants = [];

    // 主報人（假設主報人也填個人資料，可自行加欄位）
    participants.push({
        ...commonData,
        participant_name: '主報人', // 或加欄位讓主報人填姓名
        birth_date: '', // 可加欄位
        id_number: '',
        height: null,
        weight: null,
        shoe_size: null,
        medical_conditions: '無'
    });

    // 隊員資料
    document.querySelectorAll('#participantFields .participant-name').forEach((input, i) => {
        const section = input.closest('#participantFields');
        participants.push({
            ...commonData,
            participant_name: input.value.trim(),
            birth_date: section.querySelectorAll('.participant-birthdate')[i].value,
            id_number: section.querySelectorAll('.participant-idnumber')[i].value.toUpperCase().trim(),
            height: parseInt(section.querySelectorAll('.participant-height')[i].value),
            weight: parseInt(section.querySelectorAll('.participant-weight')[i].value),
            shoe_size: parseFloat(section.querySelectorAll('.participant-shoesize')[i].value),
            medical_conditions: section.querySelectorAll('.participant-medical')[i].value.trim() || '無'
        });
    });

    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/bookings`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(participants)
        });

        if (response.ok) {
            alert(`✅ 預訂成功！\n日期：${selectedDate}\n人數：${participants.length} 位\n我們會在24小時內聯繫您`);
            closeBooking();
        } else {
            const err = await response.text();
            alert('送出失敗：' + err);
        }
    } catch (err) {
        alert('網路錯誤，請再試一次');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
});
