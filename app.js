document.addEventListener("DOMContentLoaded", function () {
    // Kết nối tới MQTT Broker
    const client = new Paho.MQTT.Client('q75a76c2.emqx.cloud', 8083, 'WEB');
    client.connect({
        onSuccess: onConnect,
        userName: "WEB",
        password: "1111"
    });

    // Đăng ký hàm xử lý khi kết nối thành công
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    function onConnect() {
        console.log("Connected to MQTT Broker");
        // Đăng ký để nhận thông tin từ các topic cần lắng nghe
        client.subscribe("NhietDo");
        client.subscribe("DoAm");
        client.subscribe("Vitri/1");
        client.subscribe("Vitri/2");
        client.subscribe("Vitri/3");
        client.subscribe("Vitri/4");
    }

    function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            console.log("Connection lost: " + responseObject.errorMessage);
        }
    }

    function onMessageArrived(message) {
        // Xử lý dữ liệu nhận được từ MQTT
        const topic = message.destinationName;
        const payload = message.payloadString;

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
            // Thêm xử lý cho các topic khác nếu cần
        }
    }

    function updateInfo(id, message) {
        // Cập nhật nội dung của phần tử có id tương ứng
        const element = document.getElementById(id);
        if (element) {
            // Giữ nguyên nội dung hiện tại và thêm tin nhắn MQTT vào cuối
            element.innerHTML = element.innerHTML + "<br>" + message;
        }
    }
});
