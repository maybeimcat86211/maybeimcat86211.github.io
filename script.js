// ==================== 請修改這兩行 ====================
const SUPABASE_URL = 'https://feegzkbrumieucyweghm.supabase.co';  // 例如：https://abcde.supabase.co
const SUPABASE_ANON_KEY = 'sb_publishable_B_taCjibUltphJ-1jmmWYQ_8__FYb45';  // 你的 anon key
// =====================================================
const MAX_SLOTS_PER_DAY = 10; // 每團上限人數
// =====================================================



let selectedDate = null;

function openBooking(tripName, price) {
    document.getElementById('tripName').value = tripName;
    document.getElementById('tripPrice').value = price;

    const modal = document.getElementById('bookingModal');
    const bookingInfo = document.getElementById('bookingInfo');
    bookingInfo.innerHTML = `
        <h3>📍 ${tripName}</h3>
        <p><strong>💰 費用：</strong>NT$ ${price.toLocaleString()} / 人</p>
        <p><strong>📅 請滑動選擇探險日期</strong></p>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    selectedDate = null;
    document.getElementById('participantSteps').innerHTML = '';
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById('dateStep').classList.add('active');
    document.querySelector('.progress').style.width = '16.66%';

    loadRealAvailability(); // 直接查 Supabase 真實名額
}

async function loadRealAvailability() {
    const container = document.getElementById('calendarContainer');
    container.innerHTML = '<p style="text-align:center;">載入名額中...</p>';

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

        const data = await response.json(); // [{trip_date: '2026-01-10', booked: 3, remaining: 7}, ...]
        const availability = {};
        data.forEach(item => {
            availability[item.trip_date] = {
                booked: parseInt(item.booked),
                remaining: parseInt(item.remaining)
            };
        });

        generateCalendarWithRealData(availability);
    } catch (err) {
        container.innerHTML = '<p style="color:red;text-align:center;">載入名額失敗，使用預設顯示</p>';
        generateCalendarWithRealData({}); // 降級用假資料
    }
}

function generateCalendarWithRealData(availability) {
    const container = document.getElementById('calendarContainer');
    container.innerHTML = '';

    const today = new Date();
    today.setHours(0,0,0,0);

    for (let m = 0; m < 6; m++) { // 顯示未來 6 個月
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
                let statusText = '可報名';

                if (info.remaining <= 0) {
                    className = 'red';
                    statusText = '額滿';
                } else if (info.remaining <= 3) {
                    className = 'yellow';
                    statusText = `剩 ${info.remaining} 名`;
                } else {
                    statusText = `剩 ${info.remaining} 名`;
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
    showStep(1); // 直接進入下一步，不用按確認
}

// 參加人數顯示修正（在成功訊息）
document.getElementById('bookingForm').addEventListener('submit', async function(e) {
    // ...原本程式碼...

    const participantCount = participants.length;

    if (response.ok) {
        alert(`✅ 預訂申請已成功送出！\n\n親愛的顧客，\n\n感謝您選擇洄瀾溪谷探險！\n\n📍 行程：${commonData.trip_name}\n📅 日期：${selectedDate}\n👥 人數：${participantCount} 位\n💰 費用：NT$ ${commonData.trip_price} / 人\n\n✉️ 我們會在 24 小時內透過電話與您聯繫確認行程細節。\n\n期待與您一起探索花蓮的秘境溪谷！🌊\n\n洄瀾溪谷探險團隊 敬上`);
        closeBooking();
    }
    // ...
});
