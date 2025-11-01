# Cách xử lý lỗi GitHub Secret Protection

## Vấn đề

GitHub phát hiện Google OAuth Client ID và Secret trong commit cũ `951c285` và chặn push.

## Giải pháp

### Cách 1: Cho phép secret trên GitHub (NHANH)

1. Truy cập link này để allow secret:
   - Client ID: https://github.com/phamthang2808/movie-project-fe/security/secret-scanning/unblock-secret/34tCne6OfCrWVgPDgVx8kbPWS2w
   - Client Secret: https://github.com/phamthang2808/movie-project-fe/security/secret-scanning/unblock-secret/34tCneeNhj2kiuNwRByLSubQpI5
2. Click "Allow" trên mỗi link
3. Sau đó chạy: `git push`

### Cách 2: Xóa commit cũ khỏi history (AN TOÀN HƠN)

⚠️ **CẨN THẬN**: Chỉ làm nếu bạn chắc chắn không có ai khác đã pull code!

```bash
# Xóa commit 951c285 khỏi history
git rebase -i 9685e8e

# Trong editor, tìm dòng có commit 951c285 và thay "pick" thành "drop"
# Hoặc xóa dòng đó đi
# Save và close

# Force push (CẨN THẬN!)
git push --force-with-lease
```

### Cách 3: Tạo commit mới để ghi đè (AN TOÀN NHẤT)

Nếu đã có người khác pull code, không nên force push. Thay vào đó:

1. Vào link GitHub ở trên và click "Allow"
2. Push bình thường

---

**Khuyến nghị**: Dùng **Cách 1** (nhanh và an toàn) vì đã xóa secret khỏi commit mới rồi.
