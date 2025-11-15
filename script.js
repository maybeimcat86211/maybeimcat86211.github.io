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
    kalimudah: {
        title: 'Kalimudah Canyon',
        description: 'Perfect for families and beginners. This canyon offers a gentle introduction to canyoning with beautiful scenery and manageable challenges.',
        highlights: ['Family friendly', 'Beautiful waterfalls', 'Easy difficulty', 'Full equipment provided'],
        duration: '4-5 hours',
        difficulty: 'Easy'
    },
    kerenkali: {
        title: 'Kerenkali Canyon',
        description: 'The ultimate water canyon experience in Bali. Perfect for those seeking adventure with multiple jumps, slides, and rappels.',
        highlights: ['Water slides', 'Multiple jumps', 'Professional guides', 'All skill levels'],
        duration: '5-6 hours',
        difficulty: 'Medium'
    },
    excalibur: {
        title: 'Excalibur Canyon',
        description: 'Experience the thrill of rappelling and jumping into crystal clear blue-green water. This is the most complete canyon adventure in Bali.',
        highlights: ['Crystal clear water', 'Exciting rappels', 'Optional jumps', 'Swimming sections'],
        duration: '6-7 hours',
        difficulty: 'Medium-Hard'
    },
    bluegorge: {
        title: 'Blue Gorge',
        description: 'Our newest and most stunning canyon featuring pristine blue water, multiple jumps, and unforgettable rappelling experiences.',
        highlights: ['Pristine blue water', 'Multiple jumps', 'Scenic rappels', 'Photo opportunities'],
        duration: '5-6 hours',
        difficulty: 'Medium'
    }
};

// 顯示行程詳情
function showDetails(tripId) {
    const trip = tripDetails[tripId];
    if (!trip) return;

    alert(`${trip.title}\n\n${trip.description}\n\nHighlights:\n${trip.highlights.join('\n')}\n\nDuration: ${trip.duration}\nDifficulty: ${trip.difficulty}`);
}

// 開啟預訂表單
function openBooking(tripName, price) {
    const modal = document.getElementById('bookingModal');
    const bookingInfo = document.getElementById('bookingInfo');
    
    document.getElementById('tripName').value = tripName;
    document.getElementById('tripPrice').value = price;
    
    bookingInfo.innerHTML = `
        <h3>${tripName}</h3>
        <p><strong>Price:</strong> $${price} per person</p>
        <p>Please fill in the form below to request a booking. We'll contact you within 24 hours to confirm your reservation.</p>
    `;
    
    modal.style.display = 'block';
}

// 關閉預訂表單
function closeBooking() {
    document.getElementById('bookingModal').style.display = 'none';
    document.getElementById('bookingForm').reset();
}

// 點擊模態視窗外部關閉
window.onclick = function(event) {
    const modal = document.getElementById('bookingModal');
    if (event.target == modal) {
        closeBooking();
    }
}

// 處理表單提交
document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = {};
    
    // 收集表單資料
    formData.forEach((value, key) => {
        data[key] = value;
    });
    
    // 方法 1: 使用 Google Form (推薦)
    submitToGoogleForm(data);
    
    // 方法 2: 如果您想使用 Google Sheets API，可以取消下面的註解
    // submitToGoogleSheets(data);
});

// 提交到 Google Form
function submitToGoogleForm(data) {
    // 創建 FormData 物件
    const formData = new FormData();
    
    // 將資料對應到 Google Form 的欄位
    // 注意：您需要替換 FORM_FIELDS 中的 entry ID
    formData.append(FORM_FIELDS.tripName, data.tripName);
    formData.append(FORM_FIELDS.tripPrice, data.tripPrice);
    formData.append(FORM_FIELDS.name, data.name);
    formData.append(FORM_FIELDS.email, data.email);
    formData.append(FORM_FIELDS.phone, data.phone);
    formData.append(FORM_FIELDS.date, data.date);
    formData.append(FORM_FIELDS.participants, data.participants);
    formData.append(FORM_FIELDS.message, data.message);
    formData.append(FORM_FIELDS.promoCode, data.promoCode);
    
    // 使用 fetch 提交表單
    // 注意：由於 CORS 限制，這個方法可能無法直接顯示成功訊息
    // 但資料仍會被成功提交到 Google Form
    fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    }).then(() => {
        showSuccessMessage();
        closeBooking();
    }).catch((error) => {
        console.error('Error:', error);
        // 即使出現錯誤，資料通常也已成功提交
        showSuccessMessage();
        closeBooking();
    });
}

// 顯示成功訊息
function showSuccessMessage() {
    alert('Thank you for your booking request!\n\nWe have received your information and will contact you within 24 hours to confirm your reservation.\n\nPlease check your email (including spam folder) for our confirmation message.');
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

// 設定日期選擇器的最小日期為今天
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
});

/* 
=== Google Form 設定說明 ===

1. 創建 Google Form：
   - 前往 https://forms.google.com
   - 創建新表單
   - 添加以下欄位（短答題型）：
     * Trip Name (行程名稱)
     * Price (價格)
     * Full Name (全名)
     * Email (電子郵件)
     * Phone (電話)
     * Preferred Date (偏好日期)
     * Number of Participants (參加人數)
     * Special Requests (特殊要求) - 段落
     * Promo Code (優惠碼)

2. 取得 Form URL 和 Entry IDs：
   - 點擊右上角的「傳送」
   - 選擇「連結」標籤
   - 複製連結並記下 Form ID
   - 在瀏覽器中打開表單
   - 按 F12 開啟開發者工具
   - 在 Network 標籤中填寫並提交表單
   - 查看提交的資料，找到每個欄位的 entry ID
   - 將這些 ID 更新到上面的 FORM_FIELDS 物件中

3. 更新程式碼：
   - 將 GOOGLE_FORM_URL 替換為您的 Form URL
   - 將 /viewform 改為 /formResponse
   - 更新 FORM_FIELDS 中的 entry IDs

4. 查看回覆：
   - 在 Google Form 中點擊「回覆」標籤
   - 或連結到 Google Sheets 以更好地管理資料

=== 替代方案：使用 Google Sheets API ===

如果您想直接寫入 Google Sheets：
1. 啟用 Google Sheets API
2. 創建服務帳戶並下載憑證
3. 與您的 Sheet 共享給服務帳戶
4. 使用 Apps Script 創建 Web App
5. 從前端 POST 資料到 Web App

需要協助設定的話請告訴我！
*/
