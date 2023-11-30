document.addEventListener("DOMContentLoaded", function () {
    // Kết nối tới MQTT Broker
    const client = new Paho.MQTT.Client('q75a76c2.emqx.cloud', 8083, 'WEB');
    client.connect({
        onSuccess: onConnect,
        userName: "WEB",
        password: "1111"})
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
                document.getElementById("temperature").innerText = "Nhiệt độ: " + payload;
                break;
            case "DoAm":
                document.getElementById("humidity").innerText = "Độ ẩm: " + payload;
                break;
            case "Vitri/1":
                document.getElementById("parkingStatus1").innerText = "Vị trí  1: " + payload;
                break;
            case "Vitri/2":
                document.getElementById("parkingStatus2").innerText = "Vị trí  2: " + payload;
                break;
            case "Vitri/3":
                document.getElementById("parkingStatus3").innerText = "Vị trí  3: " + payload;
                break;
            case "Vitri/4":
                document.getElementById("parkingStatus4").innerText = "Vị trí  4: " + payload;
                break;
            // Thêm xử lý cho các topic khác nếu cần
        }
    }
});
