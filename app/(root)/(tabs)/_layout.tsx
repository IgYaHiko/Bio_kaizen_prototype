import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";

import { icons } from "@/constants";

const TabIcon = ({
  source,
  focused,
}: {
  source: ImageSourcePropType;
  focused: boolean;
}) => (
  <View className="flex items-center justify-center w-16 h-16">
    <View
      className={`w-12 h-12 rounded-full flex items-center justify-center ${
        focused ? "bg-[#BDE8CA]" : ""
      }`}
    >
      <Image
        source={source}
        resizeMode="contain"
        style={{
          width: 28,
          height: 28,
          tintColor: focused ? "black" : "white",
        }}
      />
    </View>
  </View>
);

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#0D7C66",
          paddingHorizontal: 20, // Ensures equal spacing
          borderRadius: 50,
          height: 78,
          position: "absolute",
          marginBottom: 20,
          marginHorizontal: 20,
          alignItems: "center", // ✅ Fix: Center icons properly
          justifyContent: "center",
          display: "flex",
          flexDirection: "row", // Ensures proper layout
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.home} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "Rides",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.list} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.chat} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.profile} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
