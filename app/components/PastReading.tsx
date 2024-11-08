import { View, Text, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Global_Styles } from "@/constants/Styles";

export default function PastReading() {
  const [safe, setSafe] = React.useState(true);
  return (
    <View
      style={{
        borderBottomColor: Colors.dark.separators,
        borderBottomWidth: 1,
        width: "100%",
        flexDirection: "row",
        paddingBottom: 15,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#3b3b3b",
          borderRadius: 10,
          padding: 10,
        }}
      >
        <Image
          source={require("../assets/images/headphone.png")}
          style={{ width: 20, height: 20 }}
        />
      </View>
      <View style={{ paddingLeft: 15 }}>
        <Text style={[Global_Styles.normalText, { fontWeight: "bold" }]}>
          24°C 47% 55 dB
        </Text>
        <Text style={{ color: "gray" }}>May 4th, 2024</Text>
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: "row",
          alignItems: "center",
          paddingLeft: 20,
          justifyContent: "space-between",
        }}
      >
        <Text style={Global_Styles.normalText}>00 min ago</Text>
        <Text
          style={{
            color: safe ? Colors.dark.farmGreen : Colors.dark.warning,
            fontSize: 15,
          }}
        >
          safe
        </Text>
      </View>
    </View>
  );
}
