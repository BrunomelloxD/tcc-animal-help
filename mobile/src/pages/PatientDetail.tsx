import React, { useEffect, useState } from 'react'
import {
    Image,
    View,
    ScrollView,
    Text,
    StyleSheet,
    Dimensions
} from 'react-native'
import { useRoute } from '@react-navigation/native'

import api from '../services/api'

type OngDetailsRouteParams = {
    id: number
}

type Ong = {
    id: number
    name: string
    latitude: number
    longitude: number
    about: string
    instructions: string
    opening_hours: string
    open_on_weekends: boolean
    image: Array<{
        id: number
        url: string
    }>
}

export default function OngDetails() {
    const route = useRoute()
    const [ong, setOng] = useState<Ong>()

    const params = route.params as OngDetailsRouteParams

    useEffect(() => {
        api.get(`ongs/${params.id}`).then(response => {
            setOng(response.data)

            console.log(ong)
        })
    }, [params.id])

    if (!ong) {
        return (
            <View style={styles.container}>
                <Text style={styles.description}>Carregando...</Text>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imagesContainer}>
                <ScrollView horizontal pagingEnabled>
                    {ong.image.map(image => {
                        return (
                            <Image
                                key={image.id}
                                style={styles.image}
                                source={{ uri: image.url }}
                            />
                        )
                    })}
                </ScrollView>
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.title}>PATIENT NAME</Text>
                <Text style={styles.description}>DESCRIÇÃO</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    imagesContainer: {
        height: 240
    },

    image: {
        width: Dimensions.get('window').width,
        height: 240,
        resizeMode: 'cover'
    },

    detailsContainer: {
        padding: 24
    },

    title: {
        color: '#4D6F80',
        fontSize: 30,
        fontFamily: 'Nunito_700Bold'
    },

    description: {
        fontFamily: 'Nunito_600SemiBold',
        color: '#5c8599',
        lineHeight: 24,
        marginTop: 16
    },

    mapContainer: {
        borderRadius: 20,
        // overflow: 'hidden',
        borderWidth: 1.2,
        borderColor: '#B3DAE2',
        marginTop: 40,
        backgroundColor: '#E6F7FB'
    },

    mapStyle: {
        width: '100%',
        height: 200
    },

    routesContainer: {
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center'
    },

    routesText: {
        fontFamily: 'Nunito_700Bold',
        color: '#0089a5'
    },

    separator: {
        height: 0.8,
        width: '100%',
        backgroundColor: '#D3E2E6',
        marginVertical: 40
    },

    scheduleContainer: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    scheduleItem: {
        width: '48%',
        padding: 20
    },

    scheduleItemBlue: {
        backgroundColor: '#E6F7FB',
        borderWidth: 1,
        borderColor: '#B3DAE2',
        borderRadius: 10
    },

    scheduleItemGreen: {
        backgroundColor: '#EDFFF6',
        borderWidth: 1,
        borderColor: '#A1E9C5',
        borderRadius: 10
    },

    scheduleItemRed: {
        backgroundColor: '#FEF6F9',
        borderWidth: 1,
        borderColor: '#FFBCD4',
        borderRadius: 20
    },

    scheduleText: {
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 16,
        lineHeight: 24,
        marginTop: 20
    },

    scheduleTextBlue: {
        color: '#5C8599'
    },

    scheduleTextGreen: {
        color: '#37C77F'
    },

    scheduleTextRed: {
        color: '#FF669D'
    },

    contactButtonWhatsApp: {
        backgroundColor: '#3CDC8C',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginTop: 40
    },

    contactButtonFacebook: {
        backgroundColor: '#0b84ed',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginTop: 10
    },

    contactButtonText: {
        fontFamily: 'Nunito_800ExtraBold',
        color: '#FFF',
        fontSize: 18,
        marginLeft: 16
    },

    viewButtonCreateOng: {
        alignItems: 'center'
    },

    moreOng: {
        backgroundColor: '#15c3d6',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        width: 60,
        borderRadius: 30,

        position: 'absolute',
        bottom: 120
    },
    // FLATLIST

    flatListDetails: {
        borderRadius: 12,
        backgroundColor: '#fff',

        padding: 6,
        marginTop: 30,
        marginBottom: 24
    },

    viewFlatList: {
        borderRadius: 8,
        backgroundColor: '#f2f3f5',

        marginTop: 6,
        marginBottom: 2,
        padding: 4
    },

    textNamePatient: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 18,
        color: '#15c3d6'
    },

    viewHourOperating: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    textDescriptionPatient: {
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 16,
        color: '#3f3d56'
    },

    ButtonGoToOng: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        marginTop: 6
    },

    textButtonGoToPatient: {
        fontFamily: 'Nunito_700Bold',
        fontSize: 16,
        color: '#3f3d56'
    }
})
