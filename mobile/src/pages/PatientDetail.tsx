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
import { FontAwesome5 } from '@expo/vector-icons'

import api from '../services/api'

type PatientDetailsRouteParams = {
    id: number
}

type Patient = {
    id: number
    name: string
    description: string
    image: Array<{
        id: number
        url: string
    }>
}

export default function PatientDetails() {
    const route = useRoute()
    const [patient, setPatient] = useState<Patient>()

    const params = route.params as PatientDetailsRouteParams

    useEffect(() => {
        api.get(`listPatients/${params.id}`).then(response => {
            setPatient(response.data)

            console.log(patient)
        })
    }, [params.id])

    if (!patient) {
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
                    {patient.image.map(patient => {
                        return (
                            <Image
                                key={patient.id}
                                style={styles.image}
                                source={{ uri: patient.url }}
                            />
                        )
                    })}
                </ScrollView>
            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.title}>{patient.name}</Text>
                <Text style={styles.description}>{patient.description}</Text>

                <View style={styles.separatorView}>
                    <View style={styles.separator} />
                    <Text style={styles.title}>
                        Adote!{' '}
                        <FontAwesome5 name="heart" size={26} color="#c4302b" />
                    </Text>
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

    separatorView: {
        bottom: 0,
        alignItems: 'center'
    },

    scheduleContainer: {
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

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
