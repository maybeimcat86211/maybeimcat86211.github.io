// Google Form 設定 - 已填入您的實際資料
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdO_TYqVbBvPMZ9xJGC3cKLxqKrj6X9YrRVQoQx0Xy5nrqC3Q/formResponse';

// Google Form 欄位的 entry ID（已對應您的表單）
const FORM_FIELDS = {
    name: 'entry.1623988474',              // 姓名
    birthDate: 'entry.1952703181',         // 出生年月日
    idNumber: 'entry.1812465871',          // 身分證字號
    phone: 'entry.1933097253',             // 聯絡電話
    emergencyName: 'entry.94106424',       // 緊急聯絡人姓名
    emergencyPhone: 'entry.1640555720',    // 緊急聯絡人電話
    address: 'entry.1248469550',           // 聯絡地址
    shoeSize: 'entry.516143478',           // 溯溪鞋尺寸
    height: 'entry.152310246',             // 身高
    weight: 'entry.972135023',             // 體重
    medicalConditions: 'entry.1995882209'  // 需要注意的疾病及事項
};

// 行程詳細資訊
const tripDetails = {
    xilin: {
        title: '西林秘境',
        description: '西林秘境是教練們於2023年探勘並建置的一條溪谷路線，擁有30公尺高的壯觀瀑布和罕見的S型瀑布景觀。',
        highlights: [
            '✓ 30公尺高瀑布垂降',
            '✓ 罕見S型瀑布奇景',
            '✓ 適合初學者體驗',
            '✓ 專業教練全程指導',
            '✓ 提供完整裝備'
        ],
        duration: '約 4-5 小時',
        difficulty: '初級',
        included: '專業教練、完整裝備、保險、午餐、接駁'
    },
    feicui: {
        title: '翡翠谷',
        description: '隱藏在中央山脈深處的秘境，擁有如翡翠般清澈的碧綠深潭，多個刺激的天然滑水道。',
        highlights: [
            '✓ 碧綠清澈深潭',
            '✓ 多個天然滑水道',
            '✓ 刺激跳水點',
            '✓ 進階溯溪體驗',
            '✓ 絕佳攝影景點'
        ],
        duration: '約 5-6 小時',
        difficulty: '進階',
        included: '專業教練、完整裝備、保險、午餐、接駁'
    },
    huangjin: {
        title: '黃金峽谷',
        description: '最適合親子同遊的溫和路線，金黃色的峽谷岩壁搭配清涼溪水，讓全家大小都能安全享受。',
        highlights: [
            '✓ 親子友善路線',
            '✓ 金黃色峽谷景觀',
            '✓ 溫和地形安全',
            '✓ 適合6歲以上兒童',
            '✓ 家庭回憶首選'
        ],
        duration: '約 3-4 小時',
        difficulty: '入門',
        included: '專業教練、完整裝備、保險、點心、接駁'
    },
    blue: {
        title: '藍色秘境',
        description: '2024年最新開發！如藍寶石般的深藍水潭，搭配壯觀瀑布，是IG打卡必訪聖地。',
        highlights: [
            '✓ 藍寶石般水潭',
            '✓ 壯觀瀑布景觀',
            '✓ IG打卡聖地',
            '✓ 多個跳水點',
            '✓ 絕美攝影角度'
        ],
        duration: '約 4-5 小時',
        difficulty: '初中級',
        included: '專業教練、完整裝備、保險、午餐、接駁'
    }
};

// 顯示行程詳情
function showDetails(tripId) {
    const trip = tripDetails[tripId];
    if (!trip) return;

    const detailsHTML = `
【${trip.title}】

${trip.description}

⭐ 行程特色：
${trip.highlights.join('\n')}

⏰ 活動時間：${trip.duration}
💪 難度等級：${trip.difficulty}
📦 費用包含：${trip.included}

注意事項：
• 請穿著輕便運動服裝
• 建議攜帶一套乾淨衣物
• 活動當天請勿飲酒
• 如有心臟病、高血壓等疾病請事先告知
    `;

    alert(detailsHTML);
}

// 顯示活動條款
function showTerms() {
    const terms = `
【活動條款及個人資料使用聲明】

一、活動參加條件
1. 參加者需年滿12歲（親子路線可6歲以上）
2. 具備基本游泳能力（部分路線）
3. 無心臟病、高血壓、氣喘等不適合劇烈運動之疾病
4. 懷孕婦女不建議參加

二、活動安全規定
1. 必須全程穿著安全裝備
2. 務必聽從教練指示
3. 不得擅自脫隊或進行危險動作
4. 活動前24小時內禁止飲酒

三、取消政策
1. 活動前7天取消，退款90%
2. 活動前3天取消，退款50%
3. 活動前1天取消，不予退款
4. 因天候因素取消，可擇期或全額退款

四、個人資料使用聲明
1. 收集之個人資料僅供本活動使用
2. 用於保險、緊急聯絡及活動通知
3. 絕不提供給第三方
4. 活動結束後將妥善保存或銷毀
5. 您有權查詢、修改或刪除您的個人資料

五、免責聲明
1. 參加者需自行評估身體狀況
2. 如隱瞞病史造成意外，本公司不負責任
3. 活動中如因個人因素造成傷害，本公司不負賠償責任
4. 本公司已投保活動相關保險

如有疑問請洽：0912-345-678
    `;
    
    alert(terms);
}

// 開啟預訂表單
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
}

// 關閉預訂表單
function closeBooking() {
    const modal = document.getElementById('bookingModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    document.getElementById('bookingForm').reset();
}

// 點擊模態視窗外部關閉
window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target == modal) {
        closeBooking();
    }
}

// ESC 鍵關閉視窗
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeBooking();
    }
});

// 處理表單提交
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {};
    
    // 收集表單資料
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // 驗證表單
    if (!validateForm(data)) {
        return;
    }
    
    // 顯示載入中
    const submitBtn = document.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '送出中，請稍候...';
    submitBtn.disabled = true;
    
    // 提交到 Google Form
    submitToGoogleForm(data, submitBtn, originalText);
});

// 表單驗證
function validateForm(data) {
    // 驗證電話格式（台灣手機）
    const phoneRegex = /^09\d{8}$/;
    const phoneClean = data.phone.replace(/[-\s]/g, '');
    const emergencyPhoneClean = data.emergencyPhone.replace(/[-\s]/g, '');
    
    if (!phoneRegex.test(phoneClean)) {
        alert('❌ 請輸入正確的手機號碼格式\n範例：0912-345-678 或 0912345678');
        return false;
    }
    
    if (!phoneRegex.test(emergencyPhoneClean)) {
        alert('❌ 請輸入正確的緊急聯絡人手機號碼格式\n範例：0912-345-678 或 0912345678');
        return false;
    }
    
    // 驗證身分證格式（台灣身分證或護照）
    const idRegex = /^[A-Z][12]\d{8}$/;
    const idUpper = data.idNumber.toUpperCase();
    
    if (!idRegex.test(idUpper) && data.idNumber.length < 6) {
        alert('❌ 請輸入正確的身分證字號（例如：A123456789）\n或護照號碼（至少6位）');
        return false;
    }
    
    // 驗證出生日期（必須是過去的日期且至少6歲）
    const birthDate = new Date(data.birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    
    if (birthDate >= today) {
        alert('❌ 出生日期不能是未來的日期');
        return false;
    }
    
    if (age < 6) {
        alert('❌ 參加者需年滿6歲以上');
        return false;
    }
    
    // 驗證身高體重範圍
    if (data.height < 100 || data.height > 250) {
        alert('❌ 身高請輸入 100-250 公分之間的數值');
        return false;
    }
    
    if (data.weight < 30 || data.weight > 200) {
        alert('❌ 體重請輸入 30-200 公斤之間的數值');
        return false;
    }
    
    // 檢查是否同意條款
    if (!document.getElementById('agreeTerms').checked) {
        alert('❌ 請先閱讀並同意活動條款及個人資料使用聲明');
        return false;
    }
    
    return true;
}

// 提交到 Google Form
function submitToGoogleForm(data, submitBtn, originalText) {
    const scriptUrl = '你的 GAS Web App URL';

    const formData = new FormData();

    // 主報名人資訊（非參加者）
    formData.append('tripName', document.getElementById('tripName').value);
    formData.append('tripPrice', document.getElementById('tripPrice').value);
    formData.append('mainPhone', document.getElementById('mainPhone').value);
    formData.append('mainAddress', document.getElementById('mainAddress').value);
    formData.append('emergencyName', document.getElementById('emergencyName').value);
    formData.append('emergencyPhone', document.getElementById('emergencyPhone').value);

    // 收集所有參加者資料
    document.querySelectorAll('.participant-block').forEach((block, index) => {
        const prefix = `participants[${index}]`;
        const name = block.querySelector(`[name="${prefix}[name]"]`).value;
        const birthDate = block.querySelector(`[name="${prefix}[birthDate]"]`).value;
        const idNumber = block.querySelector(`[name="${prefix}[idNumber]"]`).value.toUpperCase();
        const height = block.querySelector(`[name="${prefix}[height]"]`).value;
        const weight = block.querySelector(`[name="${prefix}[weight]"]`).value;
        const shoeSize = block.querySelector(`[name="${prefix}[shoeSize]"]`).value;
        const medical = block.querySelector(`[name="${prefix}[medicalConditions]"]`).value || '無';

        formData.append(`${prefix}[name]`, name);
        formData.append(`${prefix}[birthDate]`, birthDate);
        formData.append(`${prefix}[idNumber]`, idNumber);
        formData.append(`${prefix}[height]`, height);
        formData.append(`${prefix}[weight]`, weight);
        formData.append(`${prefix}[shoeSize]`, shoeSize);
        formData.append(`${prefix}[medicalConditions]`, medical);
    });

    fetch(scriptUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
    })
    .then(() => {
        showSuccessMessage(); // 可以改成顯示「已送出 X 位參加者」
        closeBooking();
    })
    .catch(err => {
        console.error(err);
        alert('送出失敗，請稍後再試');
    })
    .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}
// 顯示成功訊息
function showSuccessMessage(data) {
    const message = `
✅ 預訂申請已成功送出！

親愛的 ${data.name}，

感謝您選擇洄瀾溪谷探險！

📋 您的預訂資訊：
📍 行程：${data.tripName}
💰 費用：NT$ ${data.tripPrice} / 人
👤 姓名：${data.name}
📱 電話：${data.phone}

✉️ 我們會在 24 小時內透過以下方式與您聯繫：
   📧 簡訊通知
   📞 電話確認行程細節

⚠️ 重要提醒：
• 請保持電話暢通
• 活動前一天會再次確認
• 如需取消請提前告知

📞 如有任何問題，歡迎來電詢問：
   0912-345-678

期待與您一起探索花蓮的秘境溪谷！🌊
祝您有個美好的一天！

洄瀾溪谷探險團隊 敬上
    `;
    
    alert(message);
}

// 平滑滾動
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// 設定出生日期選擇器（最大為今天，最小為120年前）
document.addEventListener('DOMContentLoaded', function() {
    const birthDateInput = document.getElementById('birthDate');
    const today = new Date();
    const maxDate = today.toISOString().split('T')[0];
    
    const minYear = today.getFullYear() - 120;
    const minDate = new Date(minYear, 0, 1).toISOString().split('T')[0];
    
    birthDateInput.setAttribute('max', maxDate);
    birthDateInput.setAttribute('min', minDate);
});
// 參加者區塊模板（用於複製）
const participantTemplate = document.querySelector('.participant-block').cloneNode(true);

// 當前參加者數量
let participantCount = 1;

// 新增參加者
document.getElementById('addParticipantBtn').addEventListener('click', function() {
    participantCount++;
    
    const newBlock = participantTemplate.cloneNode(true);
    newBlock.dataset.index = participantCount - 1;
    
    // 更新所有 name 屬性的索引
    newBlock.querySelectorAll('[name]').forEach(el => {
        const oldName = el.getAttribute('name');
        const newName = oldName.replace(/\[\d+\]/, `[${participantCount - 1}]`);
        el.setAttribute('name', newName);
    });
    
    // 更新標題
    newBlock.querySelector('h4').innerHTML = `參加者 ${participantCount} <span class="remove-participant">- 移除</span>`;
    
    // 顯示移除按鈕（從第二個開始）
    newBlock.querySelector('.remove-participant').style.display = 'inline';
    
    // 清空輸入值
    newBlock.querySelectorAll('input, textarea, select').forEach(el => {
        if (el.type === 'checkbox' || el.type === 'radio') el.checked = false;
        else el.value = '';
    });
    
    document.getElementById('participantsContainer').appendChild(newBlock);
});

// 移除參加者（使用事件委託）
document.getElementById('participantsContainer').addEventListener('click', function(e) {
    if (e.target.classList.contains('remove-participant')) {
        const block = e.target.closest('.participant-block');
        if (block) {
            block.remove();
            participantCount--;
            // 重新編號剩餘的參加者
            document.querySelectorAll('.participant-block').forEach((block, idx) => {
                block.dataset.index = idx;
                block.querySelector('h4').innerHTML = `參加者 ${idx + 1} ${idx > 0 ? '<span class="remove-participant">- 移除</span>' : ''}`;
                // 更新 name 索引
                block.querySelectorAll('[name]').forEach(el => {
                    const oldName = el.getAttribute('name');
                    const newName = oldName.replace(/\[\d+\]/, `[${idx}]`);
                    el.setAttribute('name', newName);
                });
            });
        }
    }
});

// 身分證字號自動轉大寫
document.getElementById('idNumber').addEventListener('input', function(e) {
    e.target.value = e.target.value.toUpperCase();
});

// 電話號碼自動格式化
function formatPhone(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 4 && value.length <= 7) {
        value = value.slice(0, 4) + '-' + value.slice(4);
    } else if (value.length > 7) {
        value = value.slice(0, 4) + '-' + value.slice(4, 7) + '-' + value.slice(7, 10);
    }
    input.value = value;
}

document.getElementById('phone').addEventListener('input', function(e) {
    formatPhone(e.target);
});

document.getElementById('emergencyPhone').addEventListener('input', function(e) {
    formatPhone(e.target);
});
// 在 script.js 中加入

let currentStep = 1;
let totalParticipants = 1;

document.addEventListener('DOMContentLoaded', function() {
    // 綁定下一步
    document.querySelector('.btn-next').addEventListener('click', function() {
        if (validateStep(1)) {
            totalParticipants = parseInt(document.getElementById('participantCount').value);
            document.getElementById('totalParticipants').value = totalParticipants;
            generateParticipantSteps();
            showStep(2);
        }
    });

    // 動態產生參加者步驟
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
                    <label>姓名 *</label>
                    <input type="text" name="participants[${i-1}][name]" required>
                </div>
                <div class="form-group">
                    <label>出生年月日 *</label>
                    <input type="date" name="participants[${i-1}][birthDate]" required>
                </div>
                <div class="form-group">
                    <label>身分證 / 護照號碼 *</label>
                    <input type="text" name="participants[${i-1}][idNumber]" required class="id-uppercase">
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>身高 (cm) *</label>
                        <input type="number" name="participants[${i-1}][height]" required min="100" max="250">
                    </div>
                    <div class="form-group">
                        <label>體重 (kg) *</label>
                        <input type="number" name="participants[${i-1}][weight]" required min="30" max="200">
                    </div>
                </div>
                <div class="form-group">
                    <label>溯溪鞋尺寸 (cm) *</label>
                    <select name="participants[${i-1}][shoeSize]" required>
                        <option value="">請選擇</option>
                        <option value="22">22 cm</option>
                        <!-- ... 填入所有尺寸 ... -->
                        <option value="30">30 cm</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>健康狀況</label>
                    <textarea name="participants[${i-1}][medicalConditions]" rows="3" placeholder="如無請填「無」"></textarea>
                </div>
                <button type="button" class="btn-next">下一步 →</button>
            `;
            container.appendChild(stepDiv);

            // 綁定下一步
            stepDiv.querySelector('.btn-next').addEventListener('click', function() {
                if (validateStep(i+1)) {
                    showStep(i+2);
                }
            });
        }
    }

    // 顯示特定步驟
    function showStep(stepNum) {
        document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
        document.getElementById(`step-${stepNum}`) || document.querySelector('.step-final').classList.add('active');
        updateProgress(stepNum);
        currentStep = stepNum;
    }

    // 更新進度條
    function updateProgress(step) {
        const progress = ((step - 1) / (totalParticipants + 1)) * 100;
        document.querySelector('.progress').style.width = progress + '%';
    }

    // 簡單驗證（可擴充）
    function validateStep(stepNum) {
        const step = document.querySelector(`.step-${stepNum}`) || document.querySelector('.step-1');
        const required = step.querySelectorAll('[required]');
        let valid = true;
        required.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = 'red';
                valid = false;
            } else {
                field.style.borderColor = '';
            }
        });
        if (!valid) alert('請填寫所有必填欄位！');
        return valid;
    }

    // 身分證自動大寫（動態欄位）
    document.addEventListener('input', e => {
        if (e.target.classList.contains('id-uppercase')) {
            e.target.value = e.target.value.toUpperCase();
        }
    });

    // 電話格式化（同原程式碼）
});

// 表單送出時（修改原 submitToGoogleForm）
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (!document.getElementById('agreeTerms').checked) {
        alert('請同意條款');
        return;
    }
    // 收集所有資料的方式同之前，但現在 name 屬性已正確
    // ... 原 fetch 程式碼 ...
});
/* 
=== 表單測試步驟 ===

1. 在本地開啟 index.html
2. 點擊任一行程的「立即預訂」
3. 填寫所有欄位（使用測試資料）
4. 送出表單
5. 前往您的 Google Form 查看「回覆」
6. 確認所有資料都正確對應

測試用資料範例：
- 姓名：王小明
- 出生年月日：1990-01-01
- 身分證：A123456789
- 聯絡電話：0912-345-678
- 緊急聯絡人：王大明
- 緊急聯絡人電話：0923-456-789
- 地址：花蓮縣花蓮市中山路123號
- 鞋子尺寸：26 cm
- 身高：170
- 體重：65
- 疾病：無

=== 重要提醒 ===

1. Google Form URL 檢查：
   ✓ 確認網址已從 /edit 改為 /formResponse
   ✓ 當前設定的網址是正確的格式

2. 資料隱私保護：
   ✓ 收集身分證號碼需符合個資法
   ✓ 建議在 Google Sheets 中設定存取權限
   ✓ 定期備份並刪除舊資料
   ✓ 不要公開分享含有個資的試算表

3. 保險相關：
   ✓ 確認您有為參加者投保
   ✓ 保險需要的資料已收集完整
   ✓ 保單資訊建議也告知參加者

4. 後續流程：
   ✓ 收到預訂後24小時內聯繫
   ✓ 確認日期、人數、集合地點
   ✓ 提醒攜帶物品及注意事項
   ✓ 活動前一天再次確認

祝您的溯溪事業順利！🎉
*/
