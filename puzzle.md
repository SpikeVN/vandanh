Dì ghẻ và Cám đang chạy chiến dịch marketing cho thương hiệu quần áo Cám Luxury trên nhiều nền tảng MXH khác nhau. Mụ dùng tool để scrape toàn bộ comment trên các nền tảng như Facebook, Shopee, Threads, Zalo.

Sau khi scrape xong, mụ có được một tệp dữ liệu chứa hơn 1.000 comment. Nhưng những comment này chưa rất nhiều comment spam, bot, troll; và nếu không lọc ra những comment này thì khó có thể nào đo được hiệu quả của chiến dịch marketing vừa rồi.

Những comment như sau thì coi là comment rác:
- Có văng tục (trong dữ liệu sẽ bị che thành năm dấu sao `*****`).
- Tài khoản người comment dưới 30 ngày tuổi (tính từ khi scrape lúc 05/5/2026)
- Bình luận 1 sao nhưng không có nội dung comment.
- Một người bình luận nhiều lần (chỉ giữ comment đầu tiên)
- Thiếu một hoặc nhiều trường dữ liệu (trong dữ liệu để là `null` cho văn bản hoặc `NaN` cho số. Lưu ý rằng comment trống không phải là `null` mà là chuỗi trống `""`).

Trong các tệp dữ liệu có các trường sau:
| Cột | Dạng | Mô tả | Ví dụ |
| --- | --- | --- | --- |
| `username` | văn bản | tên người comment| `"@anhtoi"` |
| `accountCreated` | YYYY-MM-DD | ngày tạo tài khoản người comment | `2026-05-01` |
| `commentCreated` | YYYY-MM-DD | ngày comment | `2026-05-01` |
| `rating` | số nguyên | số sao đánh giá | `5` |
| `comment` | văn bản | nội dung bình luận | `"***** góp gạch xây trường"` |

