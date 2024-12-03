#include <Arduino.h>
#include <DHT.h>
#include <WiFi.h>
#include <ESPSupabase.h>
#include <Wire.h>
#include <SPI.h>
#include <Adafruit_MLX90614.h>
#include <Adafruit_Sensor.h>

// defining the pins
#define ESP_LED 2
#define DHTPIN 4
#define DHTTYPE DHT11
#define MIC_PIN 18
#define MOTOR_PIN 19

// MLX90614 setup
Adafruit_MLX90614 mlx = Adafruit_MLX90614();

// DHT setup
DHT dht(DHTPIN, DHTTYPE);

// Wifi setup
const char *ssid = "Etisalat 4G Router-2629";
const char *password = "2vh2nr68";

// supabase setup
Supabase db;
String supabase_url = "https://rswqhwysjsgmxxsljmbo.supabase.co";
String anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzd3Fod3lzanNnbXh4c2xqbWJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzOTcxMjcsImV4cCI6MjA0Nzk3MzEyN30.OtpRmnOI2mo4pQt6Glop9b92y1sGAoa2-nKZ84VA5Ug";
String table = "data";
String JSON = "";
bool upsert = false;

// variables
float temperature = 0.0,
      humidity = 0.0,
      IR_temperature = 0.0;
short sound = 0;
unsigned long previousMillis = 0;

// reading the temperature
float readTemperature()
{
  return dht.readTemperature();
}

// reading the humidity
float readHumidity()
{
  return dht.readHumidity();
}

// reading the IR temperature
float readIRTemperature()
{
  return mlx.readObjectTempC();
}

short readSound()
{
  if (digitalRead(MIC_PIN) == 0)
  {
    return 1;
  }
  return 0;
}

void setup()
{
  Serial.begin(115200);

  // pins setup
  pinMode(ESP_LED, OUTPUT);
  pinMode(MOTOR_PIN, OUTPUT);
  pinMode(MIC_PIN, INPUT_PULLUP);

  // MLX90614 setup
  mlx.begin();

  // DHT setup
  dht.begin();

  // Wifi setup
  // Connect to wifi
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Connected to WiFi");

  // Supabase setup
  db.begin(supabase_url, anon_key);

  // the setup was successful
  digitalWrite(ESP_LED, HIGH);
}

void loop()
{
  if (digitalRead(MIC_PIN) == 0)
  {
    sound = 1;
    Serial.print("temperature: ");
    Serial.println(temperature);
    Serial.print("humidity");
    Serial.println(humidity);
    Serial.print("IR temeprature:");
    Serial.println(IR_temperature);
    Serial.print("sound: ");
    if (sound == true)
    {
      Serial.println("true");
    }
    else
    {
      Serial.println("false");
    }

    previousMillis = millis();

    JSON += "{\"temperature\":";
    JSON += temperature;
    JSON += ",\"humidity\":";
    JSON += humidity;
    JSON += ",\"IR_temperature\":";
    JSON += IR_temperature;
    JSON += ",\"sound\":";
    JSON += 1;
    JSON += "}";
    int code = db.insert(table, JSON, upsert);
    Serial.println(code);
    JSON = "";

    digitalWrite(MOTOR_PIN, HIGH);
    delay(1000);
    digitalWrite(MOTOR_PIN, LOW);
    delay(1000);
  }

  if (millis() - previousMillis >= 10000)
  {
    temperature = readTemperature();
    humidity = readHumidity();
    IR_temperature = readIRTemperature();
    sound = readSound();

    Serial.print("temperature: ");
    Serial.println(temperature);
    Serial.print("humidity");
    Serial.println(humidity);
    Serial.print("IR temeprature:");
    Serial.println(IR_temperature);
    Serial.print("sound: ");
    if (sound == true)
    {
      Serial.println("true");
    }
    else
    {
      Serial.println("false");
    }

    previousMillis = millis();

    JSON += "{\"temperature\":";
    JSON += temperature;
    JSON += ",\"humidity\":";
    JSON += humidity;
    JSON += ",\"IR_temperature\":";
    JSON += IR_temperature;
    JSON += ",\"sound\":";
    JSON += sound;
    JSON += "}";
    int code = db.insert(table, JSON, upsert);
    Serial.println(code);
    JSON = "";
  }

  delay(500);
}
