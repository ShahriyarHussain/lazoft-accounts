import React from 'react';
import {Text, View} from 'react-native'
const PageTitle = ({title} : any) => {
    return (
        <View>
            <Text className="text-3xl font-bold mb-6 color-primary">{title}</Text>
        </View>
    )
}

export default PageTitle;