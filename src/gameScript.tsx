import { showNotification } from "./engine/notification";
import { ScriptEntry } from "./engine/script";

export const SCRIPT_DATA: Record<string, ScriptEntry[]> = {
    "intro_game1": [
        // ===== SECTION 1 =====
        // ----- lead-in -----
        ["s1.blank", "System", "*Ở một ngôi làng bé nhỏ, có hai chị em cùng cha khác mẹ tên là Tấm và Cám.*"],
        ["s1.blank", "System", "*Cha Tấm hết mực yêu thương cô, nhưng sau đó không lâu ông cũng qua đời.*"],
        ["s1.blank", "System", "*Tấm phải sống chung với mụ dì ghẻ cay nghiệt.*"],
        ["s1.blank", "System", "*Hằng ngày, Tấm phải làm hết công việc trong nhà, còn Cám thì được lêu lổng vui chơi.*"],

        ["s1.leadin", "Cám", "Chị Tấm! Chị edit xong cái clip Tiktok cho em chưa? Sao em đăng lên nãy giờ mà mới có 2 tim? Chị chỉnh màu kiểu gì nhìn mặt em như vừa đi đào mỏ về thế?", () => {
            showNotification("Mẹo", "Bạn có thể kéo thả các cửa sổ bằng cách nhấn giữ và kéo cửa sổ. Game tự động lưu tiến trình. Bấm vào menu BụtOS ở góc dưới bên trái màn hình để xem các tùy chọn.", 5000);
        }],
        ["s1.leadin", "Tấm", "Chị đang render, máy nó nóng quá nó lag. Với lại em quay ngược sáng thì Bụt cũng không cứu nổi cái da của em đâu Cám ạ."],
        ["s1.leadin", "Dì ghẻ", "Tấm! Nhiệm vụ của mày là cho em nó lên xu hướng, cấm cãi!"],
        ["s1.leadin", "Dì ghẻ", "À, mà tí nữa check hộ tao 500 cái inbox của shop nhé. Khách hỏi giá thì cứ copy-paste cái mẫu trong đấy là được. Làm xong rồi thì tao mới cho đi chơi."],
        ["s1.leadin", "Tấm", "Ơ... nhưng con phải săn vé..."],
        ["s1.leadin", "Dì ghẻ", "Hừ. Vé với chả viếc. Đây, nhìn đống này đi!"],
        ["s1.leadin", "Tấm", "..."],
    ],
};
