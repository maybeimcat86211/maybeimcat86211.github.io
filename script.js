// ==================== 修改這兩行 ====================
const SUPABASE_URL = 'https://feegzkbrumieucyweghm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_B_taCjibUltphJ-1jmmWYQ_8__FYb45';
const MAX_SLOTS_PER_DAY = 10;
// =====================================================

let selectedDate = null;

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
    const terms = `【活動條款及個人資料使用聲明】\n\n一、活動參加條件\n1. 參加者需年滿12歲（親子路線可6歲以上）\n2. 具備基本游泳能力（部分路線）\n3. 無心臟病、高血壓、氣喘等不適合劇烈運動之疾病\n4. 懷孕婦女不建議參加\n\n二、活動安全規定\n1. 必須全程穿著安全裝備\n2. 務必聽從教練指示\n3. 不得擅自脫隊或進行危險動作\n4. 活動前24小時內禁止飲酒\n\n三、取消政策\n1. 活動前7天取消，退款90%\n2. 活動前3天取消，退款50%\n3. 活動前1天取消，不予退款\n4. 因天候因素取消，可擇期或全額退款\n\n四、個人資料使用聲明\n1. 收集之個人資料僅供本活動使用\n2. 用於保險、緊急聯絡及活動通知\n3. 絕不提供給第三方\n4. 活動結束後將妥善保存或銷毀\n5. 您有權查詢、修改或刪除您的個人資料\n\n五、免責聲明\n1. 參加者需自行評估身體狀況\n2. 如隱瞞病史造成意外，本公司不負責任\n3. 活動中如因個人因素造成傷害，本公司不負賠償責任\n4. 本公司已投保活動相關保險\n\n如有疑問請洽：0912-345-678`;
    alert(terms);
}

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
    generateParticipantFields(); // 預設顯示1人

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

    for (let m = 0; m < 6; m++) {
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
                <input type="text" class="participant-name" required placeholder="請輸入真實姓名">
            </div>
            <div class="form-group">
                <label>出生年月日 *</label>
                <input type="date" class="participant-birthdate" required>
            </div>
            <div class="form-group">
                <label>身分證字號 / 護照號碼 *</label>
                <input type="text" class="participant-idnumber id-uppercase" required placeholder="例如：A123456789">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>身高 (cm) *</label>
                    <input type="number" class="participant-height" required min="100" max="250" placeholder="例如：170">
                </div>
                <div class="form-group">
                    <label>體重 (kg) *</label>
                    <input type="number" class="participant-weight" required min="30" max="200" placeholder="例如：65">
                </div>
            </div>
            <div class="form-group">
                <label>溯溪鞋尺寸 (cm) *</label>
                <select class="participant-shoesize" required>
                    <option value="">請選擇尺寸</option>
                    <option value="20">20 cm</option>
                    <option value="20.5">20.5 cm</option>
                    <option value="21">21 cm</option>
                    <option value="21.5">21.5 cm</option>
                    <option value="22">22 cm</option>
                    <option value="22.5">22.5 cm</option>
                    <option value="23">23 cm</option>
                    <option value="23.5">23.5 cm</option>
                    <option value="24">24 cm</option>
                    <option value="24.5">24.5 cm</option>
                    <option value="25">25 cm</option>
                    <option value="25.5">25.5 cm</option>
                    <option value="26">26 cm</option>
                    <option value="26.5">26.5 cm</option>
                    <option value="27">27 cm</option>
                    <option value="27.5">27.5 cm</option>
                    <option value="28">28 cm</option>
                    <option value="28.5">28.5 cm</option>
                    <option value="29">29 cm</option>
                    <option value="29.5">29.5 cm</option>
                    <option value="30">30 cm</option>
                    <option value="30.5">30.5 cm</option>
                    <option value="31">31 cm</option>
                </select>
            </div>
            <div class="form-group">
                <label>需要教練注意的疾病或事項</label>
                <textarea class="participant-medical" rows="3" placeholder="例如：心臟病、高血壓、氣喘... 如無請填「無」">無</textarea>
            </div>
            ${isNotFirst ? `
            <div style="text-align:center; margin:20px 0;">
                <button type="button" class="btn-next copy-btn" onclick="copyMainContactToParticipant(${i})">複製主要聯絡人資料</button>
            </div>
            ` : ''}
        `;
    }
}

function copyMainContactToParticipant(index) {
    const mainPhone = document.getElementById('mainPhone').value;
    const mainAddress = document.getElementById('mainAddress').value;
    if (!mainPhone || !mainAddress) {
        alert('請先填寫主要聯絡人資料');
        return;
    }
    alert('已複製主要聯絡人資料到隊員 ' + index + '（可自行擴充複製功能）');
}

// 身分證自動大寫
document.addEventListener('input', e => {
    if (e.target && e.target.classList.contains('id-uppercase')) {
        e.target.value = e.target.value.toUpperCase();
    }
});

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
                    alert(`✅ 預訂申請已成功送出！\n\n親愛的顧客，\n\n感謝您選擇洄瀾溪谷探險！\n\n📍 行程：${commonData.trip_name}\n📅 日期：${selectedDate}\n👥 人數：${participants.length} 位\n\n✉️ 我們會在 24 小時內透過電話與您聯繫確認行程細節。\n\n期待與您一起探索花蓮的秘境溪谷！🌊\n\n洄瀾溪谷探險團隊 敬上`);
                    closeBooking();
                } else {
                    const err = await response.text();
                    alert('❌ 送出失敗，請稍後再試。\n錯誤訊息：' + err);
                }
            } catch (err) {
                alert('❌ 網路錯誤，請檢查連線後再試');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});

// 平滑滾動
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// 讓 HTML onclick 能呼叫
window.showDetails = showDetails;
window.openBooking = openBooking;
window.showTerms = showTerms;
window.closeBooking = closeBooking;
