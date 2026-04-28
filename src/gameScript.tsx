import { showNotification } from "./engine/notification";
import { getWindowApi, moveWindow, ScriptEntry } from "./engine/script";

export const SCRIPT_DATA: Record<string, ScriptEntry[]> = {
    "intro_game1": [
        // ===== SECTION 1 =====
        // ----- lead-in -----
        ["s1.blank", "System", "*Tiếng gió thổi qua tán lá, âm thanh xào xạc của mùa thu. Tiếng gió rít qua khe cửa sổ.*"],
        ["s1.blank", "System", "*Căn phòng bừa bộn với sách giáo trình thuật toán, vỏ lon cà phê rỗng và dây cáp máy tính giăng khắp nơi.*"],
        ["s1.blank", "System", "*Ánh sáng duy nhất đến từ màn hình laptop phản chiếu lên cặp kính cận dày cộm.*"],
        ["s1.blank", "System", "*Ngoài cửa sổ, tiếng gió thu rít qua khe cửa nghe khô khốc.*"],

        ["s1.leadin", "Bạn", "Gió lạnh thật..."],
        ["s1.leadin", "Bạn", "Tháng 7. Gió mùa về sớm hơn dự báo. Hoặc có lẽ là do cái mô hình dự báo thời tiết của mình lại sai số nữa rồi. Năm ngoái, mình đã thua ở vòng gửi xe vì tin nhầm 'đồng đội'. Năm nay... thậm chí mình còn chẳng tìm nổi một người để mà tin."],
        ["s1.leadin", "Bạn", "*mở máy tính*", () => {
            showNotification("Thời tiết", "Dự báo thời tiết: hôm nay độ ẩm 85%, xác suất mưa là 40%.", 2000);
        }],
        ["s1.leadin", "Bạn", "Sinh viên năm 2. Chuyên gia xây dựng mô hình dự báo tài chính."],
        ["s1.leadin", "Bạn", "Có thể tính toán độ lệch chuẩn của cả một thị trường, nhưng lại không thể tính nổi cách để bắt chuyện với một người bạn cùng lớp mà không làm mọi thứ trở nên gượng gạo."],
        ["s1.leadin", "Bạn", "Một gã mọt dữ liệu lỗi thời.", () => {
            showNotification("Thông báo", "Đã sắp đến hạn đóng đăng ký DSTC. Hãy nhanh tay lên nhé!", 5000);
        }],
        ["s1.leadin", "Bạn", "Ô, đã sắp hết hạn rồi sao? Để mở ra check phát."],
        ["s1.registration.menu", "Bạn", "..."],
        ["s1.registration.menu", "Bạn", "Thế này thì phải nhanh lên thôi."],
        ["s1.registration.menu", "", ""],
        ["s1.registration.findingmatch", "", "", null, "s1->findingmatch"],
        ["s1.registration.matchfound", "", "", null, "s1->matchfound"],
        ["s1.chat", "", "", () => {
            console.log("Attempting to move window with ID 'dstc-dashboard' to (50, 25)");
            moveWindow("dstc-dashboard", 50, 25, {
                duration: 0.5,
            });
        }, "s1->chat"],
    ],

    "branch_example": [
        ["s1.leadin", "Người lạ", "Chào cậu, cậu có phải là người vừa nãy không?", null, "introduction"],
        ["s1.leadin", "Bạn", "Hả? Tôi á?"],
    ]
};
