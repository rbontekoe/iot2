OLED.init(128, 64)
ESP8266_IoT.initWIFI(SerialPin.P8, SerialPin.P12, BaudRate.BaudRate115200)
radio.setGroup(10)
basic.forever(function () {
    OLED.clear()
    OLED.newLine()
    OLED.writeString("Time:")
    OLED.writeNum(RTC_DS1307.getTime(RTC_DS1307.TimeType.HOUR))
    OLED.writeString(":")
    OLED.writeNum(RTC_DS1307.getTime(RTC_DS1307.TimeType.MINUTE))
    OLED.writeString(":")
    OLED.writeNum(RTC_DS1307.getTime(RTC_DS1307.TimeType.SECOND))
    OLED.newLine()
    OLED.writeString("Light:")
    OLED.writeNum(Environment.ReadLightIntensity(AnalogPin.P1))
    OLED.newLine()
    OLED.writeString("Temperature: ")
    OLED.writeNum(Environment.octopus_BME280(Environment.BME280_state.BME280_temperature_C))
    OLED.writeString("" + String.fromCharCode(248) + "C")
    OLED.newLine()
    OLED.writeString("Humidity:    ")
    OLED.writeNum(Environment.octopus_BME280(Environment.BME280_state.BME280_humidity))
    OLED.writeString(" %")
    OLED.newLine()
    OLED.writeString("Atm presure: ")
    OLED.writeNum(Environment.octopus_BME280(Environment.BME280_state.BME280_pressure))
    OLED.writeString(" hPa")
    basic.pause(6000)
})
basic.forever(function () {
    if (ESP8266_IoT.wifiState(false)) {
        ESP8266_IoT.connectWifi("xxxxxxxxxx", "xxxxxxxxxxx")
    } else {
        ESP8266_IoT.setData(
        "xxxxxxxxxxxxxxxx",
        Environment.ReadLightIntensity(AnalogPin.P1),
        Environment.octopus_BME280(Environment.BME280_state.BME280_temperature_C),
        Environment.octopus_BME280(Environment.BME280_state.BME280_humidity),
        Environment.octopus_BME280(Environment.BME280_state.BME280_pressure)
        )
        ESP8266_IoT.uploadData()
    }
    radio.sendString("" + Environment.octopus_BME280(Environment.BME280_state.BME280_temperature_C) + "|" + Environment.octopus_BME280(Environment.BME280_state.BME280_pressure) + "|" + Environment.octopus_BME280(Environment.BME280_state.BME280_humidity))
    basic.pause(300000)
})
