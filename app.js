document.addEventListener("DOMContentLoaded", function () {
    // Kết nối tới MQTT Broker
    const client = new Paho.MQTT.Client('wss://q75a76c2.emqx.cloud', 8083, 'WEB');
    client.connect({
        onSuccess: onConnect,
        userName: "WEB",
        password: "1111"
    });

    // Đăng ký hàm xử lý khi kết nối thành công
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

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

    function onMessageArrived(message) {
        // Xử lý dữ liệu nhận được từ MQTT
        const topic = message.destinationName;
        const payload = message.payloadString;

        switch (topic) {
            case "NhietDo":
                appendText("temperature", "Nhiệt độ: " + payload);
                break;
            case "DoAm":
                appendText("humidity", "Độ ẩm: " + payload);
                break;
            case "Vitri/1":
                appendText("parkingStatus1", "Vị trí 1: " + payload);
                break;
            case "Vitri/2":
                appendText("parkingStatus2", "Vị trí 2: " + payload);
                break;
            case "Vitri/3":
                appendText("parkingStatus3", "Vị trí 3: " + payload);
                break;
            case "Vitri/4":
                appendText("parkingStatus4", "Vị trí 4: " + payload);
                break;
            // Thêm xử lý cho các chủ đề khác nếu cần
        }
    }

    function appendText(id, newText) {
        // Lấy tham chiếu đến phần tử có id tương ứng
        const element = document.getElementById(id);
        
        // Kiểm tra xem phần tử có tồn tại không
        if (element) {
            // Giữ nguyên phần đầu của HTML và chỉ cập nhật đoạn mới nhất
            element.innerHTML = element.innerHTML.split('<br>')[0] + "<br>" + newText;
        }
    }
    
    
});
