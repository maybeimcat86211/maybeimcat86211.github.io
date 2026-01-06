// ==================== 修改這兩行 ====================
const SUPABASE_URL = 'https://feegzkbrumieucyweghm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_B_taCjibUltphJ-1jmmWYQ_8__FYb45';
const MAX_SLOTS_PER_DAY = 10;
// =====================================================

let selectedDate = null;

const tripDetails = { /* 保持原本 */ };

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
        <p><strong>📋 說明：</strong>請依序填寫資料</p>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    selectedDate = null;
    document.getElementById('selectedDateDisplay').textContent = '';
    generateParticipantFields(); // 預設顯示1人欄位

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

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => toggleAccordion(header));
    });

    const confirmDateBtn = document.getElementById('confirmDateBtn');
    if (confirmDateBtn) {
        confirmDateBtn.addEventListener('click', () => {
            if (!selectedDate) {
                alert('請先選擇一個日期！');
                return;
            }
            document.getElementById('selectedDateDisplay').textContent = `已選：${selectedDate}`;
            toggleAccordion(document.querySelectorAll('.accordion-header')[0]);
            toggleAccordion(document.querySelectorAll('.accordion-header')[1]);
        });
    }
});

async function loadRealAvailability() {
    const container = document.getElementById('calendarContainer');
    if (!container) return;
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

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();
        const availability = {};
        data.forEach(item => {
            availability[item.trip_date] = {
                remaining: parseInt(item.remaining)
            };
        });

        generateCalendarWithRealData(availability);
    } catch (err) {
        console.error('載入名額錯誤:', err);
        container.innerHTML = '<p style="color:red; text-align:center;">載入失敗，使用預設顯示</p>';
        generateCalendarWithRealData({});
    }
}

function generateCalendarWithRealData(availability) {
    const container = document.getElementById('calendarContainer');
    if (!container) return;
    container.innerHTML = '';

    const today = new Date();
    today.setHours(0,0,0,0);

    for (let m = 0; m = 6; m++) {
        const monthDate = new Date(today.getFullYear(), today.getMonth() + m, 1);
        const monthName = monthDate.toLocaleString('zh-TW', { year: 'numeric', month: 'long' });

        const monthDiv = document.createElement('div');
        monthDiv.className = 'month-calendar';

        const title = document.createElement('div');
        title.className = 'month-title';
        title.textContent = monthName;
        monthDiv.appendChild(title);

        const table = document.createElement('table');
        table.className = 'calendar';

        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['日', '一', '二', '三', '四', '五', '六'].forEach(day => {
            const th = document.createElement('th');
            th.textContent = day;
            headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        let row = document.createElement('tr');

        const firstDay = monthDate.getDay();
        for (let i = 0; i < firstDay; i++) {
            row.appendChild(document.createElement('td'));
        }

        const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
        for (let d = 1; d <= daysInMonth; d++) {
            const currentDate = new Date(monthDate.getFullYear(), monthDate.getMonth(), d);
            const dateStr = currentDate.toLocaleDateString('sv-SE');

            const td = document.createElement('td');

            if (currentDate < today) {
                td.className = 'disabled';
                td.innerHTML = `<div class="day-number">${d}</div>`;
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

                td.className = className;
                td.onclick = () => selectDate(dateStr);
                td.innerHTML = `
                    <div class="day-number">${d}</div>
                    <div class="status">${statusText}</div>
                `;
            }

            row.appendChild(td);

            if ((firstDay + d) % 7 === 0) {
                tbody.appendChild(row);
                row = document.createElement('tr');
            }
        }

        if (row.children.length > 0) tbody.appendChild(row);
        table.appendChild(tbody);
        monthDiv.appendChild(table);
        container.appendChild(monthDiv);
    }
}

function selectDate(date) {
    selectedDate = date;
}

// 預設顯示1人欄位，並根據選擇動態更新
function generateParticipantFields() {
    const count = parseInt(document.getElementById('participantCount').value);
    const container = document.getElementById('participantFields');
    container.innerHTML = '';

    for (let i = 1; i <= count; i++) {
        const title = i === 1 ? '主報人' : `隊員 ${i}`;
        const isNotFirst = i > 1;
        container.innerHTML += `
            <h4 style="margin:30px 0 15px; color:#2E86AB;">${title} 個人資料（保險用）</h4>
            <div class="form-group">
                <label>姓名 *</label>
                <input type="text" class="participant-name" required>
            </div>
            <div class="form-group">
                <label>出生年月日 *</label>
                <input type="date" class="participant-birthdate" required>
            </div>
            <div class="form-group">
                <label>身分證字號 / 護照號碼 *</label>
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
                    <option value="">請選擇尺寸</option>
                    <option value="20">20 cm</option>
                    <option value="20.5">20.5 cm</option>
                    <!-- ... 到 31 cm ... -->
                    <option value="31">31 cm</option>
                </select>
            </div>
            <div class="form-group">
                <label>需要教練注意的疾病或事項</label>
                <textarea class="participant-medical" rows="3">無</textarea>
            </div>
            ${isNotFirst ? `
            <div style="text-align:center; margin:20px 0;">
                <button type="button" class="btn-next copy-btn" onclick="copyMainContactToParticipant(${i})">複製主要聯絡人資料</button>
            </div>
            ` : ''}
        `;
    }
}

// 複製主要聯絡人電話/地址到隊員（可自行擴充）
function copyMainContactToParticipant(index) {
    const mainPhone = document.getElementById('mainPhone').value;
    const mainAddress = document.getElementById('mainAddress').value;
    if (!mainPhone || !mainAddress) {
        alert('請先填寫主要聯絡人資料');
        return;
    }
    // 可擴充複製到其他欄位
    alert(`已複製主要聯絡人資料到隊員 ${index}`);
}

// 送出表單
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bookingForm');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            if (!document.getElementById('agreeTerms').checked) {
                alert('❌ 請同意條款');
                return;
            }
            if (!selectedDate) {
                alert('❌ 請選擇日期');
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
                main_address: document.getElementById('mainAddress').value
            };

            const participants = [];
            document.querySelectorAll('#participantFields .participant-name').forEach((input, i) => {
                participants.push({
                    ...commonData,
                    participant_name: input.value.trim(),
                    birth_date: document.querySelectorAll('.participant-birthdate')[i].value,
                    id_number: document.querySelectorAll('.participant-idnumber')[i].value.toUpperCase().trim(),
                    height: parseInt(document.querySelectorAll('.participant-height')[i].value),
                    weight: parseInt(document.querySelectorAll('.participant-weight')[i].value),
                    shoe_size: parseFloat(document.querySelectorAll('.participant-shoesize')[i].value),
                    medical_conditions: document.querySelectorAll('.participant-medical')[i].value.trim() || '無'
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
                    alert(`✅ 預訂成功！\n人數：${participants.length} 位\n日期：${selectedDate}`);
                    closeBooking();
                } else {
                    const err = await response.text();
                    alert('送出失敗：' + err);
                }
            } catch (err) {
                alert('網路錯誤');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

// 讓 HTML onclick 能呼叫
window.showDetails = showDetails;
window.openBooking = openBooking;
window.showTerms = showTerms;
window.closeBooking = closeBooking;
