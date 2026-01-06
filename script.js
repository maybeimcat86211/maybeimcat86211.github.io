// ==================== 請修改這兩行 ====================
const SUPABASE_URL = 'https://feegzkbrumieucyweghm.supabase.co';  // 例如：https://abcde.supabase.co
const SUPABASE_ANON_KEY = 'sb_publishable_B_taCjibUltphJ-1jmmWYQ_8__FYb45';  // 你的 anon key
// =====================================================

const tripDetails = {
    xilin: { title: '西林秘境', description: '西林秘境是教練們於2023年探勘並建置的一條溪谷路線，擁有30公尺高的壯觀瀑布和罕見的S型瀑布景觀。', highlights: ['✓ 30公尺高瀑布垂降','✓ 罕見S型瀑布奇景','✓ 適合初學者體驗','✓ 專業教練全程指導','✓ 提供完整裝備'], duration: '約 4-5 小時', difficulty: '初級', included: '專業教練、完整裝備、保險、午餐、接駁' },
    feicui: { title: '翡翠谷', description: '隱藏在中央山脈深處的秘境，擁有如翡翠般清澈的碧綠深潭，多個刺激的天然滑水道。', highlights: ['✓ 碧綠清澈深潭','✓ 多個天然滑水道','✓ 刺激跳水點','✓ 進階溯溪體驗','✓ 絕佳攝影景點'], duration: '約 5-6 小時', difficulty: '進階', included: '專業教練、完整裝備、保險、午餐、接駁' },
    huangjin: { title: '黃金峽谷', description: '最適合親子同遊的溫和路線，金黃色的峽谷岩壁搭配清涼溪水，讓全家大小都能安全享受。', highlights: ['✓ 親子友善路線','✓ 金黃色峽谷景觀','✓ 溫和地形安全','✓ 適合6歲以上兒童','✓ 家庭回憶首選'], duration: '約 3-4 小時', difficulty: '入門', included: '專業教練、完整裝備、保險、點心、接駁' },
    blue: { title: '藍色秘境', description: '2024年最新開發！如藍寶石般的深藍水潭，搭配壯觀瀑布，是IG打卡必訪聖地。', highlights: ['✓ 藍寶石般水潭','✓ 壯觀瀑布景觀','✓ IG打卡聖地','✓ 多個跳水點','✓ 絕美攝影角度'], duration: '約 4-5 小時', difficulty: '初中級', included: '專業教練、完整裝備、保險、午餐、接駁' }
};

function showDetails(tripId) {
    const trip = tripDetails[tripId];
    if (!trip) return;
    const detailsHTML = `【${trip.title}】\n${trip.description}\n\n⭐ 行程特色：\n${trip.highlights.join('\n')}\n\n⏰ 活動時間：${trip.duration}\n💪 難度等級：${trip.difficulty}\n📦 費用包含：${trip.included}\n\n注意事項：\n• 請穿著輕便運動服裝\n• 建議攜帶一套乾淨衣物\n• 活動當天請勿飲酒\n• 如有心臟病、高血壓等疾病請事先告知`;
    alert(detailsHTML);
}

function showTerms() {
    const terms = `【活動條款及個人資料使用聲明】\n\n（內容同原本）`;
    alert(terms);
}

let selectedDate = null;
let currentStep = 0;

function openBooking(tripName, price) {
    document.getElementById('tripName').value = tripName;
    document.getElementById('tripPrice').value = price;

    const modal = document.getElementById('bookingModal');
    const bookingInfo = document.getElementById('bookingInfo');
    bookingInfo.innerHTML = `
        <h3>📍 ${tripName}</h3>
        <p><strong>💰 費用：</strong>NT$ ${price.toLocaleString()} / 人</p>
        <p><strong>📋 說明：</strong>請先選擇日期，再填寫報名資料。</p>
    `;

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    selectedDate = null;
    currentStep = 0;
    document.getElementById('participantSteps').innerHTML = '';
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById('dateStep').classList.add('active');
    document.querySelector('.progress').style.width = '16.66%';

    generateCalendar();
}

function closeBooking() {
    document.getElementById('bookingModal').style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('bookingForm').reset();
}

function generateCalendar() {
    const container = document.getElementById('calendarContainer');
    container.innerHTML = '';

    const today = new Date();
    today.setHours(0,0,0,0);

    for (let m = 0; m < 3; m++) {
        const monthDate = new Date(today.getFullYear(), today.getMonth() + m, 1);
        const monthName = monthDate.toLocaleString('zh-TW', { year: 'numeric', month: 'long' });

        let table = `<h4 style="text-align:center;color:#2E86AB;margin:30px 0 10px;">${monthName}</h4>`;
        table += `<table class="calendar"><thead><tr><th>日</th><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th></tr></thead><tbody><tr>`;

        const firstDay = monthDate.getDay();
        for (let i = 0; i < firstDay; i++) table += '<td></td>';

        const daysInMonth = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
        for (let d = 1; d <= daysInMonth; d++) {
            const dateObj = new Date(monthDate.getFullYear(), monthDate.getMonth(), d);
            const dateStr = dateObj.toISOString().split('T')[0];

            if (dateObj < today) {
                table += `<td class="disabled"><div class="day-number">${d}</div></td>`;
            } else {
                const remaining = Math.floor(Math.random() * 11); // 假資料 0~10
                let className = 'green';
                let statusText = '可報名';
                if (remaining === 0) {
                    className = 'red';
                    statusText = '額滿';
                } else if (remaining <= 3) {
                    className = 'yellow';
                    statusText = `剩 ${remaining} 名`;
                }

                table += `<td class="${className}" onclick="selectDate('${dateStr}')">
                    <div class="day-number">${d}</div>
                    <div class="status">${statusText}</div>
                </td>`;
            }

            if ((firstDay + d) % 7 === 0) table += '</tr><tr>';
        }
        table += '</tr></tbody></table>';
        container.innerHTML += table;
    }
}

function selectDate(date) {
    selectedDate = date;
    alert(`已選擇 ${date} 作為探險日期！`);
}

document.getElementById('confirmDateBtn').addEventListener('click', () => {
    if (!selectedDate) {
        alert('請先點選一個綠色或黃色的日期！');
        return;
    }
    showStep(1);
});

function showStep(stepNum) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    const steps = ['dateStep', 'step-1', ...Array.from(document.querySelectorAll('#participantSteps .step')).map((_, i) => `step-${i+2}`), 'finalStep'];
    if (steps[stepNum]) document.getElementById(steps[stepNum]).classList.add('active');
    else document.getElementById('finalStep').classList.add('active');

    const totalSteps = steps.length;
    document.querySelector('.progress').style.width = `${(stepNum + 1) / totalSteps * 100}%`;
}

function generateParticipantSteps() {
    const container = document.getElementById('participantSteps');
    container.innerHTML = '';
    const count = parseInt(document.getElementById('participantCount').value);
    for (let i = 1; i <= count; i++) {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step';
        stepDiv.innerHTML = `
            <h3>參加者 ${i} 詳細資料</h3>
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
                    <option value="22">22 cm</option><option value="22.5">22.5 cm</option>
                    <option value="23">23 cm</option><option value="23.5">23.5 cm</option>
                    <option value="24">24 cm</option><option value="24.5">24.5 cm</option>
                    <option value="25">25 cm</option><option value="25.5">25.5 cm</option>
                    <option value="26">26 cm</option><option value="26.5">26.5 cm</option>
                    <option value="27">27 cm</option><option value="27.5">27.5 cm</option>
                    <option value="28">28 cm</option><option value="28.5">28.5 cm</option>
                    <option value="29">29 cm</option><option value="29.5">29.5 cm</option>
                    <option value="30">30 cm</option>
                </select>
            </div>
            <div class="form-group">
                <label>健康狀況</label>
                <textarea class="participant-medical" rows="3">無</textarea>
            </div>
            ${i < count ? '<button type="button" class="btn-next">下一步 →</button>' : ''}
        `;
        container.appendChild(stepDiv);
    }
}

// 其他函數（validateStep、submit 等）保持你原本成功的版本，只加 trip_date

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
    document.querySelectorAll('#participantSteps .step').forEach(step => {
        participants.push({
            participant_name: step.querySelector('.participant-name').value.trim(),
            birth_date: step.querySelector('.participant-birthdate').value,
            id_number: step.querySelector('.participant-idnumber').value.toUpperCase().trim(),
            height: parseInt(step.querySelector('.participant-height').value),
            weight: parseInt(step.querySelector('.participant-weight').value),
            shoe_size: parseFloat(step.querySelector('.participant-shoesize').value),
            medical_conditions: step.querySelector('.participant-medical').value.trim() || '無'
        });
    });

    const payload = participants.map(p => ({ ...commonData, ...p }));

    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/bookings`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            alert(`✅ 預訂成功！\n行程日期：${selectedDate}\n人數：${participants.length} 位\n我們會在24小時內聯繫您確認`);
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
