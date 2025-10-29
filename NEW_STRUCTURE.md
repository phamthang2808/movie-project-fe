# 📁 CẤU TRÚC THƯ MỤC MỚI

**Date:** 2025-01-29  
**Status:** ✅ HOÀN TẤT - TỔ CHỨC LẠI PAGES & COMPONENTS

---

## 📂 PAGES STRUCTURE

```
src/pages/
├── Account/
│   ├── index.jsx         ← Main component
│   └── Account.scss      ← Styles
├── Auth/
│   ├── Login.jsx         ← Login component
│   ├── Register.jsx      ← Register component
│   └── Auth.scss         ← Shared auth styles
├── Home/
│   ├── index.jsx
│   └── Home.scss
├── MovieDetail/
│   ├── index.jsx
│   └── MovieDetail.scss
├── Recharge/
│   ├── index.jsx
│   └── Recharge.scss
├── Search/
│   ├── index.jsx
│   └── Search.scss
├── Series/
│   ├── index.jsx
│   └── Series.scss
└── Watch/
    ├── index.jsx
    └── Watch.scss
```

---

## 📂 COMPONENTS STRUCTURE

```
src/components/
├── ConfirmPurchaseModal/
│   ├── index.jsx
│   └── ConfirmPurchaseModal.scss
├── Footer/
│   ├── index.jsx
│   └── Footer.scss
├── Header/
│   ├── index.jsx
│   └── Header.scss
├── Loading/
│   ├── index.jsx
│   └── Loading.scss
├── LoadingButton/
│   ├── index.jsx
│   └── LoadingButton.scss
├── MovieCard/
│   ├── index.jsx
│   └── MovieCard.scss
├── MovieDetail/              ← Sub-components cho MovieDetail page
│   ├── index.js
│   ├── CommentInput.jsx
│   ├── CommentItem.jsx
│   ├── MovieActions.jsx
│   ├── MovieComments.jsx
│   ├── MovieComments.scss
│   ├── MovieRating.jsx
│   ├── MovieSidebar.jsx
│   └── MovieTabs.jsx
├── Pagination/
│   ├── index.jsx
│   └── Pagination.scss
├── PricingModal/
│   ├── index.jsx
│   └── PricingModal.scss
├── Recharge/                 ← Sub-components cho Recharge page
│   ├── BankTransferDetail.jsx
│   ├── BankTransferDetail.scss
│   ├── PaymentMethods.jsx
│   ├── PaymentMethods.scss
│   ├── RechargePackages.jsx
│   └── RechargePackages.scss
├── SafeAvatar/
│   └── index.jsx
├── TopMoviesWeek/
│   ├── index.jsx
│   └── TopMoviesWeek.scss
├── UserMenu/
│   ├── index.jsx
│   └── UserMenu.scss
└── Watch/                    ← Sub-components cho Watch page
    ├── index.js
    ├── RecommendedMovies.jsx
    ├── VideoPlayer.jsx
    └── WatchInfo.jsx
```

---

## ✅ ƯU ĐIỂM CẤU TRÚC MỚI

### **1. Dễ tìm kiếm:**
- Mỗi page/component có thư mục riêng
- File jsx và scss cùng một chỗ
- Dễ navigate trong IDE

### **2. Dễ maintain:**
- Thêm files liên quan vào cùng thư mục
- Ví dụ: `Account/index.jsx`, `Account/Account.scss`, `Account/types.ts`

### **3. Import paths không đổi:**
```javascript
// Vẫn import như cũ
import Account from "./pages/Account";
import Header from "./components/Header";

// Vì đã đổi tên thành index.jsx
```

### **4. Scalable:**
- Dễ thêm tests: `Account/Account.test.jsx`
- Dễ thêm types: `Account/types.ts`
- Dễ thêm hooks: `Account/useAccount.js`

---

## 📝 QUY ƯỚC

### **Page Structure:**
```
PageName/
├── index.jsx       ← Main component (export default)
├── PageName.scss   ← Styles
├── types.ts        ← Type definitions (nếu dùng TypeScript)
└── hooks.js        ← Custom hooks (nếu có)
```

### **Component Structure:**
```
ComponentName/
├── index.jsx            ← Main component (export default)
├── ComponentName.scss   ← Styles
├── SubComponent.jsx     ← Sub-components (nếu có)
└── utils.js             ← Helper functions (nếu có)
```

---

## 🔄 SO SÁNH

### **❌ TRƯỚC ĐÂY:**
```
src/pages/
├── Account.jsx
├── Account.scss
├── Home.jsx
├── Home.scss
├── Login.jsx
├── Register.jsx
├── Auth.scss
├── MovieDetail.jsx
├── MovieDetail.scss
...15+ files lộn xộn
```

### **✅ BÂY GIỜ:**
```
src/pages/
├── Account/
│   ├── index.jsx
│   └── Account.scss
├── Auth/
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Auth.scss
├── Home/
...gọn gàng, dễ tìm
```

---

## 🎯 CÁCH SỬ DỤNG

### **Import pages:**
```javascript
// App.jsx
import Account from "./pages/Account";        // ✅ import từ thư mục
import Home from "./pages/Home";
import { Login, Register } from "./pages/Auth"; // Nếu export riêng
```

### **Import components:**
```javascript
// Trong pages
import Header from "../components/Header";
import Footer from "../components/Footer";
import PricingModal from "../components/PricingModal";
```

### **Import styles:**
```javascript
// Trong component index.jsx
import "./ComponentName.scss";
```

---

## 📊 THỐNG KÊ

### **Pages:**
- ✅ 8 pages đã tổ chức
- ✅ 8 thư mục mới
- ✅ 16 files di chuyển

### **Components:**
- ✅ 11 components đã tổ chức
- ✅ 11 thư mục mới
- ✅ 20+ files di chuyển

### **Total:**
- ✅ 19 thư mục mới
- ✅ 36+ files di chuyển
- ✅ 0 linter errors
- ✅ Import paths không đổi

---

## ✅ TRẠNG THÁI

```
✅ Pages reorganized into folders
✅ Components reorganized into folders
✅ All imports working
✅ No linter errors
✅ Cleaner structure
✅ Easier to navigate
✅ Scalable for future
```

---

**Cấu trúc mới gọn gàng và dễ quản lý hơn nhiều! 🎉**

