import { View, Text, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Global_Styles } from "@/constants/Styles";

export default function PastReading({
  IR_temperature,
  humidity,
  sound,
  temperature,
  safe,
  time,
}: {
  IR_temperature: number;
  humidity: number;
  sound: number;
  temperature: number;
  safe: boolean;
  time: string;
}) {
  return (
    <View
      style={{
        borderBottomColor: Colors.dark.separators,
        borderBottomWidth: 1,
        width: "100%",
        flexDirection: "row",
        paddingBottom: 15,
        marginBottom: 10,
      }}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#3b3b3b",
          borderRadius: 10,
          padding: 10,
        }}>
        <Image
          source={require("../assets/images/headphone.png")}
          style={{ width: 20, height: 20 }}
        />
      </View>
      <View style={{ paddingLeft: 15 }}>
        <Text style={[Global_Styles.normalText, { fontWeight: "bold" }]}>
          {IR_temperature}°C {humidity}% {sound ? "High sound" : "Low sound"}
        </Text>
        <Text style={{ color: "gray" }}>{new Date(time).toLocaleString()}</Text>
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 20,
          justifyContent: "space-between",
        }}>
        {/* <Text style={Global_Styles.normalText}>00 min ago</Text> */}
        <Text
          style={{
            color: safe ? Colors.dark.farmGreen : Colors.dark.warning,
            fontSize: 15,
          }}>
          {safe ? "Safe" : "Unsafe"}
        </Text>
      </View>
    </View>
  );
}
