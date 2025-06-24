import {Tabs} from "expo-router";
import "../global.css";
import {icons} from "@/constants/icons";
import {Image, ImageBackground, Text, View} from "react-native";

const NavIcon = ({focused, icon} : any) => {
    if (focused) {
        return (
            <View className="flex flex-row w-full flex-1 justify-center items-center">
                <Image
                    source={icon}
                    style={{
                        width: 30,
                        height: 30,
                        tintColor: "#DFD0B8"
                    }}
                    resizeMode="contain"
                />
            </View>
        )
    } else {
        return (
            <View className="flex flex-row w-full flex-1 justify-center items-center">
                <Image
                    source={icon}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: '#7F8CAA'
                    }}
                    resizeMode="contain"
                />
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
                    height: '6%',
                    backgroundColor: "#393E46",
                    borderRadius: 41,
                    marginHorizontal: 7,
                    marginBottom: 25,
                    position: "absolute",
                    overflow: "hidden",
                }
        }}>

            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <NavIcon focused={focused} icon={icons.house}/>
                    )
                }}/>
            <Tabs.Screen
                name="add_transaction"
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <NavIcon focused={focused} icon={icons.add}/>
                    )
                }}/>
            <Tabs.Screen
                name="view_transactions"
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <NavIcon focused={focused} icon={icons.list}/>
                    )
                }}/>
            <Tabs.Screen
                name="manage_accounts"
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <NavIcon focused={focused} icon={icons.accounts}/>
                    )
                }}/>
            <Tabs.Screen
                name="settings"
                options={{
                    headerShown: false,
                    tabBarIcon: ({focused}) => (
                        <NavIcon focused={focused} icon={icons.settings}/>
                    )
                }}/>
        </Tabs>);
}
