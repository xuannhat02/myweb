// Sử dụng thư viện mqtt.js
//const mqtt = require('mqtt');
document.addEventListener("DOMContentLoaded", function () {
    // Kết nối tới MQTT Broker qua WSS
    const client = mqtt.connect('ws://q75a76c2.emqx.cloud:8083/mqtt', {
        clientId: 'WEB',
        username: 'WEB',
        password: '1111'
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
    }

    function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("Mất kết nối: " + responseObject.errorMessage);
        }
    }

    function onMessageArrived(topic, message) {
        // Xử lý dữ liệu nhận được từ MQTT
        const payload = message.toString();

        switch (topic) {
            case "NhietDo":
                updateInfo("temperature", "Nhiệt độ: " + payload);
                break;
            case "DoAm":
                updateInfo("humidity", "Độ ẩm: " + payload);
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
            // Thêm xử lý cho các chủ đề khác nếu cần
        }
    }

    function updateInfo(id, message) {
        const element = document.getElementById(id);

        if (element) {
            // Giữ nguyên phần đầu của HTML và chỉ cập nhật đoạn mới nhất
            element.innerHTML = element.innerHTML.split('<br>')[0] + "<br>" + message;
        }
    }
});
