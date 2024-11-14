#include <Arduino.h>
#include <DHT.h>
#include <WiFi.h>
#include <ESPSupabase.h>

// defining the pins
#define ESP_LED 2
#define DHTPIN 4
#define DHTTYPE DHT11
#define MIC_PIN 34

DHT dht(DHTPIN, DHTTYPE);

// Wifi setup
const char *ssid = "Etisalat 4G Router-2629";
const char *password = "2vh2nr68";

// supabase setup
Supabase db;
String supabase_url = "https://tbddojxtznetfibdnbxt.supabase.co";
String anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiZGRvanh0em5ldGZpYmRuYnh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzA0NzAyMzYsImV4cCI6MjA0NjA0NjIzNn0.MCJOuhuGHENHwF2Jq1xUfqNyFEfvaCcOVd5-xUYX6K8";
String table = "sensorsData";
String JSON = "";
bool upsert = false;

// variables
float temperature = 0.0,
      humidity = 0.0,
      IR_temperature = 0.0,
      sound_dB = 0.0;
unsigned long sampleWindow = 50; // Sample window width in ms (50ms = 20Hz sampling rate)
unsigned int peakToPeak = 0;     // peak-to-peak level
unsigned long startMillis = 0;   // Start of sample window
unsigned int signalMax = 0;
unsigned int signalMin = 4096;

// reading the temperature
void readTemperature()
{
  temperature = dht.readTemperature();
}

// reading the humidity
void readHumidity()
{
  humidity = dht.readHumidity();
}

void setup()
{
  pinMode(ESP_LED, OUTPUT);
  Serial.begin(115200);
  dht.begin();
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(1000);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Connected to the WiFi network");

  // the setup was successful
  digitalWrite(ESP_LED, HIGH);
}

void loop()
{
  startMillis = millis();

  // Collect data for sample window
  while (millis() - startMillis < sampleWindow)
  {
    unsigned int sample = digitalRead(MIC_PIN);
    if (sample > signalMax)
    {
      signalMax = sample; // Save just the max levels
    }
    else if (sample < signalMin)
    {
      signalMin = sample; // Save just the min levels
    }
  }

  peakToPeak = signalMax - signalMin;           // max - min = peak-peak amplitude
  double db = map(peakToPeak, 0, 1024, 30, 90); // Map peak-to-peak to dB range
  Serial.print("Sound Level: ");
  Serial.print(db);
  Serial.println(" dB");
  delay(100);

  // readTemperature();
  // readHumidity();
  // Serial.print("Temperature: ");
  // Serial.print(temperature);
  // Serial.print(" *C  ");
  // Serial.print("Humidity: ");
  // Serial.print(humidity);
  // Serial.println(" %");
  // delay(2000);
}
