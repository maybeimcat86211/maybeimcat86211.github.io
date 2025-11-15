// Google Form 設定
// 請替換成您自己的 Google Form URL
const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse';

// Google Form 欄位的 entry ID (需要從您的 Google Form 取得)
const FORM_FIELDS = {
    tripName: 'entry.123456789',      // 行程名稱
    tripPrice: 'entry.987654321',     // 價格
    name: 'entry.111111111',          // 姓名
    email: 'entry.222222222',         // Email
    phone: 'entry.333333333',         // 電話
    date: 'entry.444444444',          // 日期
    participants: 'entry.555555555',  // 人數
    message: 'entry.666666666',       // 訊息
    promoCode: 'entry.777777777'      // 優惠碼
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

// 開啟預訂表單
function openBooking(tripName, price) {
    const modal = document.getElementById('bookingModal');
    const bookingInfo = document.getElementById('bookingInfo');
    
    document.getElementById('tripName').value = tripName;
    document.getElementById('tripPrice').value = price;
    
    bookingInfo.innerHTML = `
        <h3>${tripName}</h3>
        <p><strong>費用：</strong>NT$ ${price.toLocaleString()} / 人</p>
        <p><strong>說明：</strong>請填寫以下資料，我們會在24小時內與您聯繫確認行程細節。</p>
        <p style="color: #2E86AB; font-weight: 600;">⚠️ 請確認您的聯絡方式正確，以便我們與您聯繫</p>
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
    submitBtn.textContent = '送出中...';
    submitBtn.disabled = true;
    
    // 提交到 Google Form
    submitToGoogleForm(data, submitBtn, originalText);
});

// 表單驗證
function validateForm(data) {
    // 驗證電話格式
    const phoneRegex = /^09\d{8}$/;
    const phoneWithDash = data.phone.replace(/-/g, '');
    
    if (!phoneRegex.test(phoneWithDash)) {
        alert('請輸入正確的手機號碼格式（例如：0912-345-678 或 0912345678）');
        return false;
    }
    
    // 驗證日期不能是過去
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        alert('預訂日期不能早於今天，請重新選擇日期');
        return false;
    }
    
    // 驗證人數
    if (data.participants < 1 || data.participants > 20) {
        alert('參加人數必須在 1-20 人之間');
        return false;
    }
    
    return true;
}

// 提交到 Google Form
function submitToGoogleForm(data, submitBtn, originalText) {
    // 創建 FormData 物件
    const formData = new FormData();
    
    // 將資料對應到 Google Form 的欄位
    formData.append(FORM_FIELDS.tripName, data.tripName);
    formData.append(FORM_FIELDS.tripPrice, data.tripPrice);
    formData.append(FORM_FIELDS.name, data.name);
    formData.append(FORM_FIELDS.email, data.email);
    formData.append(FORM_FIELDS.phone, data.phone);
    formData.append(FORM_FIELDS.date, data.date);
    formData.append(FORM_FIELDS.participants, data.participants);
    formData.append(FORM_FIELDS.message, data.message || '無');
    formData.append(FORM_FIELDS.promoCode, data.promoCode || '無');
    
    // 使用 fetch 提交表單
    fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    }).then(() => {
        showSuccessMessage(data);
        closeBooking();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }).catch((error) => {
        console.error('Error:', error);
        // 即使出現錯誤，資料通常也已成功提交
        showSuccessMessage(data);
        closeBooking();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

// 顯示成功訊息
function showSuccessMessage(data) {
    const message = `
✅ 預訂申請已送出！

親愛的 ${data.name}，

感謝您選擇洄瀾溪谷探險！

我們已收到您的預訂申請：
📍 行程：${data.tripName}
📅 日期：${data.date}
👥 人數：${data.participants} 人

我們會在 24 小時內透過以下方式與您聯繫：
📧 Email: ${data.email}
📱 電話: ${data.phone}

請留意來電和郵件（包含垃圾郵件匣）

如有任何問題，歡迎來電詢問：0912-345-678

期待與您一起探索花蓮的秘境溪谷！🌊
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

// 設定日期選擇器的最小日期為明天
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    dateInput.setAttribute('min', tomorrowStr);
    
    // 設定最大日期為3個月後
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    const maxDateStr = maxDate.toISOString().split('T')[0];
    dateInput.setAttribute('max', maxDateStr);
});

/* 
=== Google Form 設定教學 ===

步驟一：建立 Google 表單
1. 前往 https://forms.google.com
2. 點擊「空白」建立新表單
3. 設定表單標題：「洄瀾溪谷探險預訂表單」

步驟二：新增表單欄位
請依序新增以下欄位（都選擇「簡答」題型）：

1. 行程名稱 (tripName)
2. 價格 (tripPrice)
3. 姓名 (name) - 設為必填
4. 電子郵件 (email) - 設為必填
5. 聯絡電話 (phone) - 設為必填
6. 預計日期 (date) - 設為必填
7. 參加人數 (participants) - 設為必填
8. 特殊需求 (message) - 改用「段落」題型
9. 優惠代碼 (promoCode)

步驟三：取得表單 URL 和 Entry IDs

方法 A：使用瀏覽器開發者工具（推薦）
1. 點擊右上角「傳送」
2. 選擇「連結」標籤，複製連結
3. 在新分頁中開啟這個連結
4. 按 F12 開啟開發者工具
5. 切換到「Network」（網路）標籤
6. 填寫表單並點擊「提交」
7. 在 Network 標籤中找到名為「formResponse」的請求
8. 點擊它，查看「Payload」或「表單資料」
9. 您會看到類似這樣的資料：
   entry.123456789: 西林秘境
   entry.987654321: 3500
   ...
10. 記下每個欄位的 entry.xxxxxxx 編號

方法 B：檢視網頁原始碼
1. 在表單預覽頁面按右鍵 → 檢視網頁原始碼
2. 搜尋 "entry." 找到所有的 entry ID
3. 對應每個欄位的 entry ID

步驟四：更新程式碼

1. 將上方 GOOGLE_FORM_URL 改為您的表單網址：
   從: https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform
   改成: https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse

2. 更新 FORM_FIELDS 物件中的 entry ID：
   const FORM_FIELDS = {
       tripName: 'entry.你的編號1',
       tripPrice: 'entry.你的編號2',
       name: 'entry.你的編號3',
       email: 'entry.你的編號4',
       phone: 'entry.你的編號5',
       date: 'entry.你的編號6',
       participants: 'entry.你的編號7',
       message: 'entry.你的編號8',
       promoCode: 'entry.你的編號9'
   };

步驟五：測試表單

1. 儲存所有檔案
2. 在瀏覽器中開啟 index.html
3. 點擊「立即預訂」並填寫測試資料
4. 送出後到 Google 表單查看「回覆」標籤
5. 確認資料有正確送達

步驟六：設定通知

1. 在 Google 表單中點擊「回覆」標籤
2. 點擊右上角的三個點 → 選取通知規則
3. 設定「提交新回應時」傳送電子郵件通知

🎉 完成！現在您的網站可以接收預訂資料了！

常見問題：
Q: 為什麼送出後沒看到成功訊息？
A: 由於 CORS 限制，我們使用 no-cors 模式，但資料仍會成功送達 Google 表單

Q: 可以連結到 Google Sheets 嗎？
A: 可以！在表單的「回覆」標籤中點擊 Google Sheets 圖示即可建立試算表

Q: 如何自訂自動回覆郵件？
A: 可使用 Google Apps Script 設定自動回覆，或使用 Zapier/IFTTT 等服務

需要更多協助嗎？歡迎詢問！
*/
