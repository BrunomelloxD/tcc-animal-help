import React, { useState } from 'react'
import {
    ScrollView,
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Image
} from 'react-native'
import { Feather } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'

import api from '../../services/api'

type OngDataRouteParams = {
    ongId: number
}

export default function RegistrationPatient() {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [images, setImages] = useState<string[]>([])

    const navigation = useNavigation()
    const route = useRoute()

    const params = route.params as OngDataRouteParams
    console.log(params)

    // APAGAR justATest
    function justATest() {
        navigation.navigate('SelectMapPosition')
    }

    async function handleCreatePatient() {
        const ongId = params.ongId

        const data = new FormData()

        data.append('name', name)
        data.append('description', description)
        data.append('ongId', String(ongId))
        console.log(ongId)

        images.forEach((image: any, index) => {
            data.append('images', {
                name: `image_${index}.jpg`,
                type: 'image/jpg',
                uri: image
            } as any)
        })

        try {
            console.log(data)

            await api.post('patient', data)
        } catch (error) {
            console.log(error)
            return
        }

        // Arrumar
        navigation.navigate('MapScreen')
    }

    async function handleSelectImages() {
        const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync()

        if (status !== 'granted') {
            alert('Acesso negado as fotos')
            return
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
            mediaTypes: ImagePicker.MediaTypeOptions.Images
        })

        if (result.cancelled) {
            return
        }

        const { uri: image } = result

        // Copiando imagens j?? adicionadas e adicionando novas
        setImages([...images, image])
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{ padding: 24 }}
        >
            <Text style={styles.name}>Cadastre um animal</Text>

            <Text style={styles.label}>Nome</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />

            <Text style={styles.label}>Descri????o</Text>
            <TextInput
                style={[styles.input, { height: 110 }]}
                multiline
                value={description}
                onChangeText={setDescription}
            />

            {/**<Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
      />*/}

            <Text style={styles.label}>Fotos</Text>

            <View style={styles.uploadedImagesContainer}>
                {images?.map(image => {
                    return (
                        <Image
                            key={image}
                            source={{ uri: image }}
                            style={styles.uploadedImage}
                        />
                    )
                })}
            </View>

            <View style={styles.imagesContainer}>
                <TouchableOpacity
                    style={styles.imagesInput}
                    onPress={handleSelectImages}
                >
                    <Feather name="upload" size={24} color="#15B6D6" />
                </TouchableOpacity>
            </View>

            <RectButton style={styles.nextButton} onPress={handleCreatePatient}>
                <Text style={styles.nextButtonText}>Cadastrar</Text>
            </RectButton>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    name: {
        color: '#5c8599',
        fontSize: 24,
        fontFamily: 'Nunito_700Bold',
        marginBottom: 32,
        paddingBottom: 24,
        borderBottomWidth: 0.8,
        borderBottomColor: '#D3E2E6'
    },

    label: {
        color: '#8fa7b3',
        fontFamily: 'Nunito_600SemiBold',
        marginBottom: 8
    },

    labelAddNewImage: {
        //color: '#8fa7b3',
        fontFamily: 'Nunito_600SemiBold',
        marginBottom: 8
    },

    comment: {
        fontSize: 11,
        color: '#8fa7b3'
    },

    input: {
        backgroundColor: '#fff',
        borderWidth: 1.4,
        borderColor: '#d3e2e6',
        borderRadius: 20,
        height: 56,
        paddingVertical: 18,
        paddingHorizontal: 24,
        marginBottom: 16,
        textAlignVertical: 'top'
    },

    uploadedImagesContainer: {
        flexDirection: 'row'
    },

    uploadedImage: {
        width: 64,
        height: 64,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#00bfa6',
        marginBottom: 32,
        marginRight: 8
    },

    imagesContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginBottom: 32
    },

    imagesInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderColor: '#00bfa6',
        borderWidth: 1.4,
        borderRadius: 10,
        height: 64,
        width: 64,
        justifyContent: 'center',
        alignItems: 'center'
        //marginBottom: 32,
    },

    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 16
    },

    nextButton: {
        backgroundColor: '#00bfa6',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        height: 56,
        marginTop: 32
    },

    nextButtonText: {
        fontFamily: 'Nunito_800ExtraBold',
        fontSize: 16,
        color: '#FFF'
    }
})
