// ==================== 請修改這兩行 ====================
const SUPABASE_URL = 'https://你的project.supabase.co';  // 例如：https://abcde.supabase.co
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.xxxx';  // 你的 anon key
// =====================================================

// 行程詳細資訊
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

let currentStep = 1;
let totalParticipants = 1;

function openBooking(tripName, price) {
    const modal = document.getElementById('bookingModal');
    const bookingInfo = document.getElementById('bookingInfo');
    
    document.getElementById('tripName').value = tripName;
    document.getElementById('tripPrice').value = price;
    
    bookingInfo.innerHTML = `
        <h3>📍 ${tripName}</h3>
        <p><strong>💰 費用：</strong>NT$ ${price.toLocaleString()} / 人</p>
        <p><strong>📋 說明：</strong>請詳細填寫以下資料，我們會在24小時內與您聯繫確認行程細節。</p>
        <p style="color: #d9534f; font-weight: 600;">⚠️ 所有標註 * 的欄位為必填項目</p>
        <p style="color: #2E86AB; font-size: 0.95rem;">🔒 您的個人資料將受到完善保護，僅供保險及活動使用</p>
    `;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    currentStep = 1;
    totalParticipants = 1;
    document.getElementById('participantSteps').innerHTML = '';
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.querySelector('.step-1').classList.add('active');
    document.querySelector('.progress').style.width = '25%';
}

function closeBooking() {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('bookingForm').reset();
}

window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target == modal) closeBooking();
};

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') closeBooking();
});

document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn-next')) {
        const step = e.target.closest('.step');
        if (validateStep(step)) {
            if (step.classList.contains('step-1')) {
                totalParticipants = parseInt(document.getElementById('participantCount').value);
                document.getElementById('totalParticipants').value = totalParticipants;
                generateParticipantSteps();
                showStep(2);
            } else {
                const stepNum = parseInt(step.id.split('-')[1]);
                showStep(stepNum + 1);
            }
        }
    }
});

function generateParticipantSteps() {
    const container = document.getElementById('participantSteps');
    container.innerHTML = '';
    for (let i = 1; i <= totalParticipants; i++) {
        const stepDiv = document.createElement('div');
        stepDiv.className = 'step';
        stepDiv.id = `step-${i+1}`;
        stepDiv.innerHTML = `
            <h3>參加者 ${i} 詳細資料</h3>
            <div class="form-group">
                <label>姓名 Name *</label>
                <input type="text" class="participant-name" required placeholder="請輸入真實姓名">
            </div>
            <div class="form-group">
                <label>出生年月日 Date of Birth *</label>
                <input type="date" class="participant-birthdate" required>
            </div>
            <div class="form-group">
                <label>身分證字號 / 護照號碼 ID / Passport No. *</label>
                <input type="text" class="participant-idnumber id-uppercase" required placeholder="例如：A123456789">
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>身高 Height (cm) *</label>
                    <input type="number" class="participant-height" required min="100" max="250" placeholder="例如：170">
                </div>
                <div class="form-group">
                    <label>體重 Weight (kg) *</label>
                    <input type="number" class="participant-weight" required min="30" max="200" placeholder="例如：65">
                </div>
            </div>
            <div class="form-group">
                <label>溯溪鞋尺寸 Shoes Size (cm) *</label>
                <select class="participant-shoesize" required>
                    <option value="">請選擇尺寸</option>
                    <option value="22">22 cm</option><option value="22.5">22.5 cm</option><option value="23">23 cm</option><option value="23.5">23.5 cm</option>
                    <option value="24">24 cm</option><option value="24.5">24.5 cm</option><option value="25">25 cm</option><option value="25.5">25.5 cm</option>
                    <option value="26">26 cm</option><option value="26.5">26.5 cm</option><option value="27">27 cm</option><option value="27.5">27.5 cm</option>
                    <option value="28">28 cm</option><option value="28.5">28.5 cm</option><option value="29">29 cm</option><option value="29.5">29.5 cm</option>
                    <option value="30">30 cm</option>
                </select>
            </div>
            <div class="form-group">
                <label>需要教練注意的疾病及事項</label>
                <textarea class="participant-medical" rows="3" placeholder="例如：心臟病、高血壓、氣喘... 如無請填「無」"></textarea>
            </div>
            <button type="button" class="btn-next">下一步 →</button>
        `;
        container.appendChild(stepDiv);
    }
}

function showStep(stepNum) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    const targetStep = document.getElementById(`step-${stepNum}`) || document.getElementById('finalStep');
    targetStep.classList.add('active');
    updateProgress(stepNum);
    currentStep = stepNum;
}

function updateProgress(step) {
    const progress = ((step - 1) / (totalParticipants + 1)) * 100;
    document.querySelector('.progress').style.width = progress + '%';
}

function validateStep(stepElement) {
    const requiredFields = stepElement.querySelectorAll('[required]');
    let valid = true;
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = 'red';
            field.style.boxShadow = '0 0 0 3px rgba(255,0,0,0.1)';
            valid = false;
        } else {
            field.style.borderColor = '#ddd';
            field.style.boxShadow = 'none';
        }
    });
    if (!valid) alert('請填寫所有必填欄位！');
    return valid;
}

document.addEventListener('input', e => {
    if (e.target.classList.contains('id-uppercase')) {
        e.target.value = e.target.value.toUpperCase();
    }
});

document.getElementById('bookingForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    if (!document.getElementById('agreeTerms').checked) {
        alert('❌ 請先閱讀並同意活動條款及個人資料使用聲明');
        return;
    }

    const submitBtn = document.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '送出中，請稍候...';
    submitBtn.disabled = true;

    const commonData = {
        trip_name: document.getElementById('tripName').value,
        trip_price: parseInt(document.getElementById('tripPrice').value),
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

    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/bookings`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_ANON_KEY,
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify(participants.map(p => ({ ...commonData, ...p })))
        });

        if (response.ok) {
            alert(`✅ 預訂申請已成功送出！\n\n親愛的顧客，\n\n感謝您選擇洄瀾溪谷探險！\n\n📍 行程：${commonData.trip_name}\n💰 費用：NT$ ${commonData.trip_price} / 人\n👥 人數：${participants.length} 位\n\n✉️ 我們會在 24 小時內透過電話與您聯繫確認行程細節。\n\n⚠️ 重要提醒：\n• 請保持電話暢通\n• 活動前一天會再次確認\n\n📞 如有任何問題，歡迎來電：0912-345-678\n\n期待與您一起探索花蓮的秘境溪谷！🌊\n\n洄瀾溪谷探險團隊 敬上`);
            closeBooking();
        } else {
            const error = await response.text();
            alert('❌ 送出失敗，請稍後再試或來電詢問。\n錯誤訊息：' + error);
        }
    } catch (err) {
        alert('❌ 網路錯誤，請檢查網路連線後再試。');
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
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
