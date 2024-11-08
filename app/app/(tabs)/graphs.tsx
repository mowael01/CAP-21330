import { Colors } from "@/constants/Colors";
import { Global_Styles } from "@/constants/Styles";
import { CartesianChart, Bar, BarGroup } from "victory-native";
import { StyleSheet, Text, Image, Platform, ScrollView } from "react-native";

import { View } from "react-native";
import { useFont } from "@shopify/react-native-skia";
export default function TabTwoScreen() {
  const data = Array.from({ length: 3 }, (_, index) => ({
    // Starting at 1 for Jaunary
    month: index + 1,
    // Randomizing the listen count between 100 and 50
    listenCount1: Math.floor(Math.random() * (100 - 50 + 1)) + 50,

    listenCount2: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
  }));
  const data2 = Array.from({ length: 6 }, (_, index) => ({
    // Starting at 1 for Jaunary
    month: index + 1,
    // Randomizing the listen count between 100 and 50
    listenCount1: Math.floor(Math.random() * (100 - 50 + 1)) + 50,
  }));
  const font = useFont(require("../../assets/fonts/Roboto-Medium.ttf"), 12);
  return (
    <ScrollView>
      <View style={Global_Styles.container}>
        <Text
          style={[
            Global_Styles.normalText,
            { fontSize: 30, fontWeight: "bold", fontStyle: "italic" },
          ]}
        >
          Statistics
        </Text>
        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              borderBottomColor: Colors.dark.separators,
              borderBottomWidth: 1,
              paddingBottom: 5,
            }}
          >
            Temperature and Humidity
          </Text>
          <Text style={{ color: "gray" }}>
            Average result: temperature{" "}
            <Text style={{ color: Colors.dark.farmGreen }}>{"00"}</Text>°C ,
            humidity:{" "}
            <Text style={{ color: Colors.dark.farmGreen }}>{"00"}</Text>%{" "}
          </Text>
        </View>
        <View
          style={{
            height: 200,
            // backgroundColor: "red",
            width: "70%",
            marginLeft: "auto",
            marginTop: 15,
          }}
        >
          <CartesianChart
            data={data}
            xKey="month"
            yKeys={["listenCount1", "listenCount2"]}
            xAxis={{
              font,
              labelColor: "white",
              lineWidth: 0,
              tickCount: 3,
              formatXLabel(label) {
                return label + "";
              },
            }}
            yAxis={[
              { font, labelColor: "white", lineColor: Colors.dark.separators },
            ]}
            frame={{ lineWidth: 0 }}
            domainPadding={{ left: 50, right: 50, bottom: 25, top: 20 }}
          >
            {({ points, chartBounds }) => (
              <BarGroup
                chartBounds={chartBounds}
                betweenGroupPadding={0.1}
                withinGroupPadding={1}
                barWidth={30}
                // roundedCorners={{ topLeft: 10, topRight: 10 }}
              >
                <BarGroup.Bar
                  // roundedCorners={{ topLeft: 10, topRight: 10 }}
                  points={points.listenCount1}
                  color="#c5b4e0"
                />
                <BarGroup.Bar points={points.listenCount2} color="#5c507c" />
              </BarGroup>
            )}
          </CartesianChart>
        </View>
        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              borderBottomColor: Colors.dark.separators,
              borderBottomWidth: 1,
              paddingBottom: 5,
            }}
          >
            Noise exposure{" "}
          </Text>
          <Text style={{ color: "gray" }}>
            Average result:{" "}
            <Text style={{ color: Colors.dark.farmGreen }}>{"00"}</Text> dB
          </Text>
        </View>
        <View
          style={{
            height: 200,
            // backgroundColor: "red",
            width: "70%",
            marginRight: "auto",
            marginTop: 15,
          }}
        >
          <CartesianChart
            data={data2}
            xKey="month"
            yKeys={["listenCount1"]}
            xAxis={{
              font,
              labelColor: "white",
              lineWidth: 0,
              tickCount: 3,
              formatXLabel(label) {
                return label + "";
              },
            }}
            yAxis={[
              { font, labelColor: "white", lineColor: Colors.dark.separators },
            ]}
            frame={{ lineWidth: 0 }}
            domainPadding={{ left: 25, right: 25, bottom: 25, top: 20 }}
          >
            {({ points, chartBounds }) => (
              <>
                <Bar
                  chartBounds={chartBounds} // 👈 chartBounds is needed to know how to draw the bars
                  points={points.listenCount1} // 👈 points is an object with a property for each yKey
                  color="#c5b4e0"
                  barWidth={30}
                />
              </>
            )}
          </CartesianChart>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
