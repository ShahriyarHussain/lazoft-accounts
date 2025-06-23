import {Tabs} from "expo-router";
import "../global.css";
import {icons} from "@/constants/icons";
import {Image, ImageBackground, Text, View} from "react-native";

const NavIcon = ({focused, icon, label} : any) => {
    if (focused) {
        return (
            <ImageBackground className="flex flex-row w-full flex-1 justify-center items-center mt-4 ">
                <Image source={icon} tintColor="#6366f1" className="size-7"/>
            </ImageBackground>
        )
    } else {
        return (
            <View className="size-full justify-center items-center mt-4">
                <Image source={icon} tintColor="#A8B5DB" className="size-5"/>
            </View>
        )
    }
};

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center'},
                tabBarStyle: {
                    height: '7%',
                    backgroundColor: "#0f0D23",
                    borderRadius: 41,
                    marginHorizontal: 7,
                    marginBottom: 17,
                    position: "absolute",
                    overflow: "hidden",
                    borderWidth: 1,
                }
        }}>

            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <NavIcon focused={focused} icon={icons.house} label="Home"/>
                    )
                }}/>
            <Tabs.Screen
                name="add_transaction"
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <NavIcon focused={focused} icon={icons.add} label="Add"/>
                    )
                }}/>
            <Tabs.Screen
                name="view_transactions"
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <NavIcon focused={focused} icon={icons.list} label="Transactions"/>
                    )
                }}/>
            <Tabs.Screen
                name="manage_accounts"
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <NavIcon focused={focused} icon={icons.accounts} label="Accounts"/>
                    )
                }}/>
            <Tabs.Screen
                name="settings"
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <NavIcon focused={focused} icon={icons.settings} label="Settings"/>
                    )
                }}/>
        </Tabs>);
}
