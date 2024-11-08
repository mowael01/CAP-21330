import {
  Image,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Global_Styles } from "@/constants/Styles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import PastReading from "@/components/PastReading";

export default function HomeScreen() {
  return (
    <ScrollView>
      <View style={Global_Styles.container}>
        <View>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text
            style={[styles.welcomeText, { fontSize: 30, fontWeight: "bold" }]}
          >
            Let's get started
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            marginTop: 50,
          }}
        >
          <LinearGradient
            // Button Linear Gradient
            colors={["#000", "#5c507c"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={{
              height: 150,
              width: "100%",
              borderRadius: 15,
              padding: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: 15,
              }}
            >
              <View>
                <Text style={styles.normalText}>
                  <Text
                    style={[
                      styles.normalText,
                      { fontSize: 26, fontWeight: "bold" },
                    ]}
                  >
                    {"60" + " "}
                  </Text>
                  dB
                </Text>
                <Text style={styles.normalText}>{"safe to hear"}</Text>
              </View>
              <Image
                source={require("../../assets/images/headphone.png")}
                style={{ width: 50, height: 50 }}
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: "auto",
                justifyContent: "space-between",
                alignItems: "flex-end",
                padding: 15,
              }}
            >
              <View>
                <Text style={styles.normalText}>{"00"}% Humidity</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={[styles.normalText, { fontWeight: "bold" }]}>
                  Temperature Now
                </Text>
                <Text style={styles.normalText}>{"20C"}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>
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
          <Text style={styles.normalText}>past readings</Text>
          {/* TODO: add sorting feature */}
        </View>
        <View style={{ marginBottom: 15, width: "100%" }}>
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
  welcomeText: {
    color: Colors.dark.text,
    fontSize: 20,
    fontWeight: "light",
  },
  normalText: {
    color: Colors.dark.text,
  },
});
