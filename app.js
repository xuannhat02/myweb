// Thay đổi các giá trị dưới đây để phản ánh cấu hình của bạn
const brokerAddress = "b1ee828a.us-east-1.emqx.cloud";
const port = 8084;
const clientId = "xuannhat";
const username = "web";
const password = "1111";
const temperatureTopic = "NhietDo";
const humidityTopic = "DoAm";
//Kết nối với MQTT
const client = mqtt.connect("wss://b1ee828a.us-east-1.emqx.cloud:8084/mqtt", {
    clientId: clientId,
    username: username,
    password: password,
});

// Hàm được gọi khi kết nối thành công
client.on("connect", function () {
    console.log("Connected to MQTT broker");

    // Đăng ký theo dõi chủ đề nhiệt độ và độ ẩm
    client.subscribe(temperatureTopic);
    client.subscribe(humidityTopic);
});

// Hàm được gọi khi nhận được một thông điệp từ chủ đề
client.on("message", function (topic, message) {
    // Hiển thị nhiệt độ hoặc độ ẩm tùy thuộc vào chủ đề
    if (topic === temperatureTopic) {
        updateTemperature(message.toString());
    } else if (topic === humidityTopic) {
        updateHumidity(message.toString());
    }
});

// Hàm cập nhật giá trị nhiệt độ trên trang web
function updateTemperature(value) {
    const temperatureElement = document.getElementById("temperature");
    temperatureElement.textContent = value + " °C";
}

// Hàm cập nhật giá trị độ ẩm trên trang web
function updateHumidity(value) {
    const humidityElement = document.getElementById("humidity");
    humidityElement.textContent = value + "%";
}
