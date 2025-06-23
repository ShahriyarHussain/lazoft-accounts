import React from 'react';
import {Text, View} from 'react-native'
const PageTitle = ({title} : any) => {
    return (
        <View>
            <Text className="font-bold text-4xl color-indigo-900 justify-items-start justify-start items-start flex mt-20 ml-4">{title}</Text>
        </View>
    )
}

export default PageTitle;