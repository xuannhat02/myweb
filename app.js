// Sử dụng thư viện mqtt.js
//const mqtt = require('mqtt');
const clientId = "WEB";
const username = "WEB";
const password = "1111";
const client = mqtt.connect("wss://ff310008.us-east-1.emqx.cloud:8084/mqtt", {
    clientId: clientId,
    username: username,
    password: password,
});

    // Đăng ký hàm xử lý khi kết nối thành công
    client.on('connect', onConnect);
    client.on('message', onMessageArrived);

function onConnect() {
        console.log("Đã kết nối tới MQTT Broker");
        // Đăng ký để nhận thông tin từ các chủ đề cần lắng nghe
        client.subscribe("NhietDo");
        client.subscribe("DoAm");
        client.subscribe("Vitri/1");
        client.subscribe("Vitri/2");
        client.subscribe("Vitri/3");
        client.subscribe("Vitri/4");
        client.subscribe("KhiGas");
        client.subscribe("CanhBao");
    }

 // Declare payload at the top level to make it accessible in both functions
let payload;
let alertActive = false;
function onMessageArrived(topic, message) {
    // Xử lý dữ liệu nhận được từ MQTT
    payload = message.toString();

    switch (topic) {
        case "NhietDo":
            updateInfo("temperature", "Nhiệt độ: " + payload);
            break;
        case "DoAm":
            updateInfo("humidity", "Độ ẩm: " + payload);
            break;
        case "KhiGas":
            updateInfo("KhiGas", "KhiGas: " + payload);
            break;
        case "Vitri/1":
            updateInfo("parkingStatus1", "Vị trí 1: " + payload);
            break;
        case "Vitri/2":
            updateInfo("parkingStatus2", "Vị trí 2: " + payload);
            break;
        case "Vitri/3":
            updateInfo("parkingStatus3", "Vị trí 3: " + payload);
            break;
        case "Vitri/4":
            updateInfo("parkingStatus4", "Vị trí 4: " + payload);
            break;
        case "CanhBao":
            // Thêm xử lý cho topic CanhBao
            handleCanhBao(payload);
            break;
        // Thêm xử lý cho các chủ đề khác nếu cần
    }
}

function updateInfo(id, message) {
    const element = document.getElementById(id);
    if (element) {
        // Giữ nguyên phần đầu của HTML và chỉ cập nhật đoạn mới nhất
        element.innerHTML = element.innerHTML.split('<br>')[0] + "<br>" + message;

        // Thêm đoạn code để đổi màu sắc dựa trên giá trị payload
        if (payload.includes("Có xe")) {
            element.style.backgroundColor = "chartreuse";  // Màu xanh cho ô có xe
        } else if (payload.trim() === "") {
            element.style.backgroundColor = "white";  // Màu trắng cho ô trống
        } else {
            element.style.backgroundColor = "white";    // Màu đỏ cho các trường hợp khác
        }
    }
}


function showAlertUI() {
    // Hiển thị thông điệp cảnh báo
    document.getElementById("alertUI").innerHTML = "<img id='fireImage' src='xechuachay.jpg' alt='Fire Image'><p>Bãi đỗ xe đang có cháy</p>";
    document.getElementById("alertUI").style.display = "block";
}
function hideAlertUI() {
    // Ẩn thông điệp cảnh báo
    document.getElementById("alertUI").style.display = "none";
}
function handleCanhBao(payload) {
    console.log("Handling CanhBao:", payload);  // Kiểm tra xem hàm này được gọi hay không
    if (payload === "1" && !alertActive) {
        showAlertUI();
        setTimeout(function () {
            hideAlertUI();
        }, 9000); // Hiển thị cảnh báo trong 30 giây
    }
}
;