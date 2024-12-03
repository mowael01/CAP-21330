import { Colors } from "@/constants/Colors";
import { Global_Styles } from "@/constants/Styles";
import { CartesianChart, Bar } from "victory-native";
import { StyleSheet, Text, Image, Platform, ScrollView } from "react-native";

import { View } from "react-native";
import { useFont } from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import { supabase } from ".";
export default function TabTwoScreen() {
  const [data, setData] = useState<
    {
      id: number;
      created_at: string;
      temperature: number;
      IR_temperature: number;
      humidity: number;
      sound: number;
    }[]
  >(
    Array.from({ length: 3 }, (_, index) => ({
      id: 0,
      temperature: 0,
      IR_temperature: 0,
      humidity: 0,
      sound: 0,
      created_at: "",
    }))
  );

  useEffect(() => {
    const subscription = supabase
      .channel("changes2") // name your channel
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "data" },
        (payload) => {
          const getData = async () => {
            const { data, error }: any = await supabase
              .from("data")
              .select()
              .order("created_at", { ascending: false })
              .limit(10);
            data?.reverse();
            console.log(data);
            setData(data);
          };
          getData();
        }
      )
      .subscribe();

    // Clean up the subscription when component unmounts
    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      const { data, error }: any = await supabase
        .from("data")
        .select()
        .order("created_at", { ascending: false })
        .limit(10);
      data?.reverse();
      console.log(data);
      setData(data);
    };
    getData();
  }, []);

  const font = useFont(require("../../assets/fonts/Roboto-Medium.ttf"), 12);
  return (
    <ScrollView>
      <View style={Global_Styles.container}>
        <Text
          style={[
            Global_Styles.normalText,
            { fontSize: 30, fontWeight: "bold", fontStyle: "italic" },
          ]}>
          Statistics
        </Text>
        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              color: "white",
              fontSize: 30,
              borderBottomColor: Colors.dark.separators,
              borderBottomWidth: 1,
              paddingBottom: 5,
            }}>
            Temperature
          </Text>
          <Text style={{ color: "gray" }}>
            Average Temperature{" "}
            <Text style={{ color: Colors.dark.farmGreen }}>
              {(
                data.reduce((a, b) => a + b.temperature, 0) / data.length
              ).toFixed(2)}
            </Text>
            °C
          </Text>
        </View>
        <View
          style={{
            height: 300,
            // backgroundColor: "red",
            width: "99%",
            margin: "auto",
            marginTop: 15,
          }}>
          <CartesianChart
            data={data}
            xKey="created_at"
            yKeys={["IR_temperature"]}
            xAxis={{
              // font,
              labelColor: "white",
              lineWidth: 0,
              tickCount: 5,
              formatXLabel(label) {
                return label + "";
              },
            }}
            domain={{ y: [15, 45] }}
            yAxis={[
              {
                font,
                labelColor: "white",
                lineColor: Colors.dark.separators,
                tickCount: 10,
              },
            ]}
            frame={{ lineWidth: 0 }}
            domainPadding={{ left: 50, right: 50, bottom: 25, top: 20 }}>
            {({ points, chartBounds }) => (
              <Bar
                // roundedCorners={{ topLeft: 10, topRight: 10 }}
                points={points.IR_temperature}
                chartBounds={chartBounds}
                color="#c5b4e0"
                barWidth={20}
              />
            )}
          </CartesianChart>
        </View>
        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              color: "white",
              fontSize: 30,
              borderBottomColor: Colors.dark.separators,
              borderBottomWidth: 1,
              paddingBottom: 5,
            }}>
            Humidity{" "}
          </Text>
          <Text style={{ color: "gray" }}>
            Average Humidity:{" "}
            <Text style={{ color: Colors.dark.farmGreen }}>
              {(data.reduce((a, b) => a + b.humidity, 0) / data.length).toFixed(
                2
              )}
            </Text>{" "}
            %
          </Text>
        </View>
        <View
          style={{
            height: 300,
            // backgroundColor: "red",
            width: "99%",
            margin: "auto",
            marginTop: 15,
          }}>
          <CartesianChart
            data={data}
            xKey="created_at"
            yKeys={["humidity"]}
            xAxis={{
              // font,
              labelColor: "white",
              lineWidth: 0,
              tickCount: 3,
              formatXLabel(label) {
                return label + "";
              },
            }}
            domain={{ y: [0, 100] }}
            yAxis={[
              {
                font,
                labelColor: "white",
                lineColor: Colors.dark.separators,
                tickCount: 10,
              },
            ]}
            frame={{ lineWidth: 0 }}
            domainPadding={{ left: 25, right: 25, bottom: 25, top: 20 }}>
            {({ points, chartBounds }) => (
              <>
                <Bar
                  chartBounds={chartBounds} // 👈 chartBounds is needed to know how to draw the bars
                  points={points.humidity} // 👈 points is an object with a property for each yKey
                  color="#c5b4e0"
                  barWidth={20}
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
