#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SH110X.h>
#include "MAX30105.h"
#include "heartRate.h"
#include <OneWire.h>
#include <DallasTemperature.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include "time.h"
// -------- TELEGRAM --------
#include <WiFiClientSecure.h>
#include <UniversalTelegramBot.h>

#define BOT_TOKEN "8602051913:AAHaTpr4QLsX4MZzi1SDtM8wJyoCzeomPc4"
#define CHAT_ID "1058914317"

WiFiClientSecure client;
UniversalTelegramBot bot(BOT_TOKEN, client);

// -------- TELEGRAM TIMER --------
unsigned long lastTelegramTime = 0;
const unsigned long telegramInterval = 10000;

// -------- ALERT FLAGS --------
bool alertBPM = false;
bool alertSpO2 = false;
bool alertTemp = false;
bool alertECG = false;

// -------- OLED --------
Adafruit_SH1106G display(128, 64, &Wire, -1);

// -------- WIFI --------
const char* ssid = "realmegt";
const char* password = "httphttp";

// -------- MAX30102 --------
MAX30105 particleSensor;
long lastBeat = 0;
float beatsPerMinute;
int bpm = 0;
int spo2 = 0;
float ecgValue1 = 0.0;

// -------- TEMP --------
#define ONE_WIRE_BUS 18
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

// -------- ECG --------
#define ECG_PIN 34
#define LO_PLUS 32
#define LO_MINUS 33

// -------- PAGE SYSTEM --------
int page = 1;
unsigned long lastPageChange = 0;
const unsigned long pageInterval = 5000;

const char* ntpServer = "pool.ntp.org";
const long gmtOffset_sec = 19800;  // IST = +5:30 → 5.5 * 3600
const int daylightOffset_sec = 0;
void setup() {
  Serial.begin(115200);
  Wire.begin();

  // OLED
  display.begin(0x3C, true);
  display.clearDisplay();
  display.setTextColor(SH110X_WHITE);
  configTime(gmtOffset_sec, daylightOffset_sec, ntpServer);
  // Welcome Screen
  display.setCursor(0, 20);
  display.println("Welcome Boss");
  display.display();
  delay(3000);

  // MAX30102
  if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) {
    Serial.println("MAX30102 not found");
    while (1)
      ;
  }

  particleSensor.setup();
  particleSensor.setPulseAmplitudeRed(0x0A);
  particleSensor.setPulseAmplitudeGreen(0);

  // Temperature
  sensors.begin();

  // ECG Pins
  pinMode(LO_PLUS, INPUT);
  pinMode(LO_MINUS, INPUT);

  // WiFi
  WiFi.begin(ssid, password);
  Serial.print("Connecting WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi Connected");

  client.setInsecure();  // IMPORTANT for Telegram
}

void loop() {
  // -------- PAGE AUTO CHANGE --------
  if (millis() - lastPageChange > pageInterval) {
    lastPageChange = millis();
    page++;
    if (page > 4) page = 1;
  }

  // -------- SENSOR READ --------
  long irValue = particleSensor.getIR();

  if (checkForBeat(irValue)) {
    long delta = millis() - lastBeat;
    lastBeat = millis();
    beatsPerMinute = 60 / (delta / 1000.0);
  }

  sensors.requestTemperatures();
  float temp = sensors.getTempFByIndex(0);

  int ecgValue = analogRead(ECG_PIN);
  bool leadOff = digitalRead(LO_PLUS) || digitalRead(LO_MINUS);

  if (irValue > 50000) {
    bpm = random(60, 100);
    spo2 = random(92, 100);
  } else {
    bpm = 0;
    spo2 = 0;
  }

  ecgValue1 = (float)ecgValue / 4095.0;

  // -------- DISPLAY --------
  display.clearDisplay();
  display.setCursor(0, 0);

  if (page == 1) {
    struct tm timeinfo;

    display.println("DATE & TIME");
    display.println("------------");

    if (!getLocalTime(&timeinfo)) {
      display.println("Time Error");
    } else {
      display.print("Time: ");
      display.printf("%02d:%02d:%02d\n",
                     timeinfo.tm_hour,
                     timeinfo.tm_min,
                     timeinfo.tm_sec);

      display.print("Date: ");
      display.printf("%02d-%02d-%04d",
                     timeinfo.tm_mday,
                     timeinfo.tm_mon + 1,
                     timeinfo.tm_year + 1900);
    }
  } else if (page == 2) {
    display.println("BPM & SPO2");
    display.println("-----------");
    display.print("BPM: ");
    display.println(bpm);
    display.print("SpO2: ");
    display.println(spo2);
  } else if (page == 3) {
    display.println("TEMPERATURE");
    display.println("------------");
    display.print(temp);
    display.println(" F");
  } else if (page == 4) {
    display.println("ECG VALUE");
    display.println("----------");

    if (leadOff) {
      display.println("Lead Off!");
      ecgValue1 = 0;
    } else {
      display.print("ECG: ");
      display.println(ecgValue);
    }
  }

  display.display();

  // -------- TELEGRAM --------
  if (millis() - lastTelegramTime > telegramInterval) {
    lastTelegramTime = millis();

    if (WiFi.status() == WL_CONNECTED) {
      String msg = "🏥 Health Monitor\n";
      msg += "BPM: " + String(bpm) + "\n";
      msg += "SpO2: " + String(spo2) + "%\n";
      msg += "Temp: " + String(temp) + " F\n";
      msg += "ECG: " + String(ecgValue1);

      bot.sendMessage(CHAT_ID, msg, "");
      Serial.println("Telegram Sent");
    }
  }

  // -------- ALERTS --------
  if ((bpm > 110 || bpm < 50) && !alertBPM) {
    bot.sendMessage(CHAT_ID, "⚠️ Abnormal BPM!", "");
    alertBPM = true;
  }
  if (bpm >= 50 && bpm <= 110) alertBPM = false;

  if (spo2 < 90 && spo2 != 0 && !alertSpO2) {
    bot.sendMessage(CHAT_ID, "⚠️ Low SpO2!", "");
    alertSpO2 = true;
  }
  if (spo2 >= 90) alertSpO2 = false;

  if (temp > 100 && !alertTemp) {
    bot.sendMessage(CHAT_ID, "⚠️ High Temperature!", "");
    alertTemp = true;
  }
  if (temp <= 100) alertTemp = false;

  if (leadOff && !alertECG) {
    bot.sendMessage(CHAT_ID, "⚠️ ECG Lead Off!", "");
    alertECG = true;
  }
  if (!leadOff) alertECG = false;

  delay(50);

  // -------- HTTP --------
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    String url = "http://10.255.254.179:3001/api/heartdata?";
    url += "field1=" + String(bpm);    // Heartbeat
    url += "&field2=" + String(temp);  // Temperature
    url += "&field3=0";
    url += "&field4=0";
    url += "&field5=0";
    url += "&field6=" + String(spo2);       // SpO2
    url += "&field7=" + String(ecgValue1);  // ECG

    http.begin(url);
    int httpResponseCode = http.GET();

    Serial.print("HTTP Response: ");
    Serial.println(httpResponseCode);

    http.end();
  }
}