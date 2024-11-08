import { StyleSheet } from "react-native";
import { Colors } from "./Colors";
export const Global_Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginTop: 25,
    marginHorizontal: 16,
    color: Colors.dark.text,
    height: "auto",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  normalText: {
    color: Colors.dark.text,
  },
});
