import PastReading from "@/components/PastReading";
import { Colors } from "@/constants/Colors";
import { Global_Styles } from "@/constants/Styles";
import Ionicons from "@expo/vector-icons/Ionicons";
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

export default function TabTwoScreen() {
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
            }}
          >
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
              }}
            >
              <Ionicons name="settings-outline" size={30} color="gray" />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: 15 }}>
          <Text style={Global_Styles.normalText}>past readings</Text>
          {/* TODO: add sorting feature */}
        </View>
        <View style={{ marginBottom: 15, width: "100%" }}>
          <PastReading />
          <PastReading />
          <PastReading />
          <PastReading />
          <PastReading />
          <PastReading />
          <PastReading />
          <PastReading />
          <PastReading />
          <PastReading />
          <PastReading />
          <PastReading />
          <PastReading />
          <PastReading />
          <PastReading />
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
