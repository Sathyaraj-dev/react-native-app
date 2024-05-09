import { Dimensions, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated'

const { height: SCREEN_HEIGHT } = Dimensions.get('window')
const MAX_TRANSLATE_Y = SCREEN_HEIGHT / 1.5

export default function Shop() {
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false)
    const translateY = useSharedValue(0)

    const reanimatedBottomStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateY: translateY.value }]
        }
    })

    const toggleBottomSheet = () => {
        setBottomSheetVisible(!bottomSheetVisible)
        // You can also perform additional animations or actions here
    }

    return (
        <View style={styles.container}>
            {/* Your content */}
            <TouchableOpacity onPress={toggleBottomSheet}>
                <Text>Open Bottom Sheet</Text>
            </TouchableOpacity>
            {bottomSheetVisible && (
                <React.Fragment>
                    <View style={styles.overlay} />
                    <Animated.View style={[styles.bottomsheet_container, reanimatedBottomStyle]}>
                        <View style={styles.line} />
                        <Text>Bottomsheet</Text>
                    </Animated.View>
                </React.Fragment>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 11000,
    },
    bottomsheet_container: {
        width: '100%',
        height: SCREEN_HEIGHT / 2,
        backgroundColor: "#00f8",
        position: 'absolute',
        bottom: 0,
        zIndex: 12000,
        borderRadius: 25,
        paddingHorizontal: 10,
    },
    line: {
        width: 75,
        height: 4,
        backgroundColor: 'white',
        borderRadius: 20,
        alignSelf: 'center',
        marginVertical: 10,
    },
})
