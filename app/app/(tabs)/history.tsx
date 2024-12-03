import PastReading from "@/components/PastReading";
import { Colors } from "@/constants/Colors";
import { Global_Styles } from "@/constants/Styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Image,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";

import { View } from "react-native";
import { supabase } from ".";

export default function TabTwoScreen() {
  const [counter, setCounter] = useState(10);
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
    Array.from({ length: 1 }, (_, index) => ({
      id: 0,
      temperature: 0,
      IR_temperature: 0,
      humidity: 0,
      sound: 0,
      created_at: "",
    }))
  );

  useEffect(() => {
    const getData = async () => {
      const { data, error }: any = await supabase
        .from("data")
        .select()
        .order("created_at", { ascending: false })
        .limit(counter);
      // data?.reverse();
      console.log(data);
      setData(data);
    };
    getData();
  }, [counter]);

  return (
    <ScrollView>
      <View style={Global_Styles.container}>
        <View style={{ flexDirection: "row", marginTop: 50, marginBottom: 10 }}>
          <View
            style={{
              flexDirection: "row-reverse",
              alignItems: "center",
              backgroundColor: Colors.dark.background,
              borderRadius: 8,
              // marginHorizontal: 10,
              paddingVertical: 10,
              flex: 1,
              borderColor: "gray",
              borderWidth: 0.5,
            }}>
            <Ionicons
              name="search"
              size={20}
              color="gray"
              style={{ marginRight: 8 }}
            />
            <TextInput
              style={{
                borderRadius: 15,
                width: 300,
                flex: 1,
                fontSize: 16,
                color: Colors.dark.text,
                paddingLeft: 10,
              }}
              placeholder="Search"
              placeholderTextColor="gray"
            />
          </View>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: "#3b3b3b",
                borderRadius: 8,
                marginLeft: 10,
                paddingVertical: 9,
                width: 50,
                justifyContent: "center",
                alignItems: "center",
              }}>
              <Ionicons name="settings-outline" size={30} color="gray" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text style={Global_Styles.normalText}>past readings</Text>
          {/* TODO: add sorting feature */}
        </View>
        <View style={{ marginBottom: 15, width: "100%" }}>
          {data?.map((reading) => (
            <PastReading
              key={reading.id}
              time={reading.created_at}
              temperature={reading.temperature}
              humidity={reading.humidity}
              IR_temperature={reading.IR_temperature}
              sound={reading.sound}
              safe={!(reading.humidity >= 70 && reading.IR_temperature >= 30)}
            />
          ))}
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
            onPress={() => {
              setCounter(counter + 10);
            }}>
            <Text
              style={[
                Global_Styles.normalText,
                {
                  backgroundColor: "#3b3b3b",
                  borderRadius: 8,
                  padding: 15,
                  width: 200,
                  textAlign: "center",
                },
              ]}>
              load more...
            </Text>
          </TouchableOpacity>
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
