import {
  Image,
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";

import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

import { Colors } from "@/constants/Colors";
import { Global_Styles } from "@/constants/Styles";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import PastReading from "@/components/PastReading";

import { createClient } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export const supabase = createClient(
  "https://rswqhwysjsgmxxsljmbo.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzd3Fod3lzanNnbXh4c2xqbWJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzIzOTcxMjcsImV4cCI6MjA0Nzk3MzEyN30.OtpRmnOI2mo4pQt6Glop9b92y1sGAoa2-nKZ84VA5Ug"
);

export default function HomeScreen() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [channels, setChannels] = useState<Notifications.NotificationChannel[]>(
    []
  );
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >(undefined);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(
      (token) => token && setExpoPushToken(token)
    );

    if (Platform.OS === "android") {
      Notifications.getNotificationChannelsAsync().then((value) =>
        setChannels(value ?? [])
      );
    }
    // @ts-expect-error
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });
    // @ts-expect-error
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

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
            console.log(data);
            setData(data);
            if (data[0].humidity >= 70) {
              schedulePushNotification("Warning", "Humidity is too high");
            }
            if (data[0].IR_temperature >= 30) {
              schedulePushNotification("Warning", "Temperature is too high");
            }
            if (data[0].sound >= 1) {
              schedulePushNotification("Warning", "Sound is too high");
            }
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
      console.log(data);
      setData(data);
    };
    getData();
  }, []);

  return (
    <ScrollView>
      <View style={Global_Styles.container}>
        <View>
          <Text style={styles.welcomeText}>Welcome Back</Text>
          <Text
            style={[styles.welcomeText, { fontSize: 30, fontWeight: "bold" }]}>
            Let's get started
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            marginTop: 50,
          }}>
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
            }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingRight: 15,
              }}>
              <View>
                <Text
                  style={[
                    styles.normalText,
                    {
                      fontSize: 20,
                      textTransform: "capitalize",
                      color:
                        data[0].sound > 0
                          ? Colors.dark.warning
                          : Colors.dark.farmGreen,
                    },
                  ]}>
                  {data[0].sound > 0 ? "Unsafe sound level" : "safe to hear"}
                </Text>
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
              }}>
              <View>
                <Text style={styles.normalText}>
                  {data[0].humidity}% Humidity
                </Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={[styles.normalText, { fontWeight: "bold" }]}>
                  Temperature Now
                </Text>
                <Text style={styles.normalText}>{data[0].IR_temperature}</Text>
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
          <Text style={styles.normalText}>past readings</Text>
          {/* TODO: add sorting feature */}
        </View>
        <View style={{ marginBottom: 15, width: "100%" }}>
          {data.map((item: any, index: number) => (
            <PastReading
              key={index}
              IR_temperature={item.IR_temperature}
              humidity={item.humidity}
              sound={item.sound}
              temperature={item.temperature}
              safe={!(item.humidity >= 70 && item.IR_temperature >= 30)}
              time={item.created_at}
            />
          ))}
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

async function schedulePushNotification(title: string, body: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: { data: "goes here", test: { test1: "more data" } },
    },
    trigger: null,
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (true) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    // EAS projectId is used here.
    try {
      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        throw new Error("Project ID not found");
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      console.log(token);
    } catch (e) {
      token = `${e}`;
    }
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
