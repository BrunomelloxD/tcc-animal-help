import React, { useEffect, useState } from 'react'
import {
    Image,
    View,
    ScrollView,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Linking,
    FlatList
} from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { Feather } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import mapMarkerImg from '../images/map-marker.png'

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
    patients: Array<{
        image: Array<{
            id: number
            url: string
        }>
        id: number
        name: string
        description: string
    }>
}

export default function OngDetails() {
    const route = useRoute()
    const [ong, setOng] = useState<Ong>()
    const navigation = useNavigation()

    const params = route.params as OngDetailsRouteParams

    // Ong data
    useEffect(() => {
        api.get(`ongs/${params.id}`).then(response => {
            setOng(response.data)
        })
    }, [params.id])

    // listPatient data
    useEffect(() => {
        api.get(`listPatient/${params.id}`).then(response => {
            setOng(response.data)
        })
    }, [params.id])

    if (!ong) {
        return (
            <View style={styles.container}>
                <Text style={styles.description}>Carregando...</Text>
            </View>
        )
    }

    const ongId = params.id
    // console.log(ongId)

    function handleNavigateRegistrationPatient() {
        navigation.navigate('RegistrationPatient', { ongId })
    }

    function handleOpenGoogleMapsRoutes() {
        Linking.openURL(
            `https://www.google.com/maps/dir/?api=1&destination=${ong?.latitude},${ong?.longitude}`
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
                <Text style={styles.title}>{ong.name}</Text>
                <Text style={styles.description}>{ong.about}</Text>

                <View style={styles.mapContainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: -21.4683742,
                            longitude: -47.0063995,
                            latitudeDelta: 0.008,
                            longitudeDelta: 0.008
                        }}
                        zoomEnabled={false}
                        pitchEnabled={false}
                        scrollEnabled={false}
                        rotateEnabled={false}
                        style={styles.mapStyle}
                    >
                        <Marker
                            icon={mapMarkerImg}
                            coordinate={{
                                latitude: ong.latitude,
                                longitude: ong.longitude
                            }}
                        />
                    </MapView>

                    <TouchableOpacity
                        onPress={handleOpenGoogleMapsRoutes}
                        style={styles.routesContainer}
                    >
                        <Text style={styles.routesText}>
                            Ver rotas no Google Maps
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.separator} />

                <Text style={styles.title}>Instruções para visita</Text>
                <Text style={styles.description}>{ong.instructions}</Text>

                <View style={styles.scheduleContainer}>
                    <View
                        style={[styles.scheduleItem, styles.scheduleItemBlue]}
                    >
                        <Feather name="clock" size={40} color="#2AB5D1" />
                        <Text
                            style={[
                                styles.scheduleText,
                                styles.scheduleTextBlue
                            ]}
                        >
                            Segunda à Sexta {ong.opening_hours}
                        </Text>
                    </View>

                    {ong.open_on_weekends ? (
                        <View
                            style={[
                                styles.scheduleItem,
                                styles.scheduleItemGreen
                            ]}
                        >
                            <Feather name="info" size={40} color="#39CC83" />
                            <Text
                                style={[
                                    styles.scheduleText,
                                    styles.scheduleTextGreen
                                ]}
                            >
                                Atendemos fim de semana
                            </Text>
                        </View>
                    ) : (
                        <View
                            style={[
                                styles.scheduleItem,
                                styles.scheduleItemRed
                            ]}
                        >
                            <Feather name="info" size={40} color="#FF669D" />
                            <Text
                                style={[
                                    styles.scheduleText,
                                    styles.scheduleTextRed
                                ]}
                            >
                                Não atendemos fim de semana
                            </Text>
                        </View>
                    )}
                </View>

                {/* PACIENTE VIEW */}

                <View style={styles.separator} />
                <Text style={styles.title}>Disponíveis para adoção</Text>

                {console.log('Abelha', ong.patients)}

                <FlatList
                    data={ong.patients}
                    style={styles.flatListDetails}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={ongs => String(ongs.id)}
                    renderItem={({ item: patients }) => {
                        console.log('Abelha2', patients)

                        return (
                            <View style={styles.viewFlatList}>
                                <ScrollView horizontal pagingEnabled>
                                    {patients.image.map(image => {
                                        return (
                                            <Image
                                                key={image.id}
                                                style={styles.image}
                                                source={{ uri: image.url }}
                                            />
                                        )
                                    })}
                                </ScrollView>

                                <Text style={styles.textNamePatient}>
                                    {patients.name}
                                </Text>

                                <View style={styles.viewHourOperating}>
                                    <Text style={styles.textDescriptionPatient}>
                                        {patients.description}
                                    </Text>
                                </View>

                                {/* <TouchableOpacity
                                    style={styles.ButtonGoToOng}
                                    onPress={handleNavigateRegistrationPatient}
                                >
                                    <Text style={styles.textButtonGoToPatient}>
                                        Ver mais detalhes
                                    </Text>
                                    <FontAwesome5
                                        name="paw"
                                        size={16}
                                        color="#3f3d56"
                                    />
                                </TouchableOpacity> */}
                            </View>
                        )
                    }}
                />

                <View style={styles.viewButtonCreateOng}>
                    <TouchableOpacity
                        style={styles.moreOng}
                        onPress={handleNavigateRegistrationPatient}
                    >
                        <FontAwesome5 name="plus" size={20} color="#FFF" />
                    </TouchableOpacity>
                </View>
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
        height: 200,
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
        borderRadius: 30
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
        paddingBottom: 5,
        padding: 10,

        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 18,
        color: '#15c3d6'
    },

    viewHourOperating: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    textDescriptionPatient: {
        padding: 10,
        paddingTop: 0,

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
