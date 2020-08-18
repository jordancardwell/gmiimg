import React, { useState, useEffect } from 'react'
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ImageCropData,
} from 'react-native'
// import ImageEditor from '@react-native-community/image-editor'
import * as ImageManipulator from 'expo-image-manipulator'
import * as FileSystem from 'expo-file-system'
import { AppButton } from './AppButton'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import { upload } from '../services/photoUpload'
import { Text, Layout } from '@ui-kitten/components'

interface ImagePickerProps {
  userUid: string
  onUpload: Function
  onPick: Function
}

const PhotoPicker = ({ userUid, onPick, onUpload }: ImagePickerProps) => {
  let [image, setImage] = useState('')
  let [imageUrl, setImageUrl] = useState('')
  // let [croppedImage, setCroppedImage] = useState()
  let [progress, setProgress] = useState(0)

  const _pickImage = async () => {
    try {
      const { status: cameraRollPerm } = await Permissions.askAsync(
        Permissions.CAMERA_ROLL
      )
      if (cameraRollPerm === 'granted') {
        let {
          cancelled,
          uri,
          width,
          height,
          type,
        }: any = await ImagePicker.launchImageLibraryAsync({
          aspect: [1, 1],
          allowsEditing: true,
          quality: 0.75,
          exif: true,
        })
        if (!cancelled) {
          if (width !== height) {
            width = width < height ? width : height
            height = width
          }
          let cropData: ImageCropData = {
            offset: { x: 0, y: 0 },
            size: { width, height },
            displaySize: { width: 400, height: 400 },
            resizeMode: 'cover',
          }
          console.log('pickerResults', { uri, cropData })
          setImage(uri)
          setImageUrl(uri)
        }
      }
    } catch (err) {
      console.log('error during picking/cropping', err)
    }
  }

  useEffect(() => {
    const awaitUpload = async () => {
      console.log('attempting upload with: ', {
        userUid,
        image,
        setProgress,
      })
      const uploadedImageUrl = await upload(userUid, image, setProgress)
      console.log('upload result', uploadedImageUrl)
      setImageUrl(uploadedImageUrl)
      onUpload(uploadedImageUrl)
    }

    onPick(image)

    if (image && userUid) {
      awaitUpload()
    }
  }, [userUid, image])

  // notify onUpload
  // useEffect(() => {
  //   onUpload(imageUrl)
  // }, [imageUrl])

  const hasImage = !!image || !!imageUrl
  return (
    <Layout level='3' style={s.container}>
      <Layout level="2"
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <TouchableOpacity onPress={_pickImage}>
          <Text>tap to add photo</Text>
        </TouchableOpacity>
      </Layout>

      {!image && !imageUrl && (
        <TouchableOpacity onPress={_pickImage}>
          <Layout
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text>tap to add photo</Text>
          </Layout>
        </TouchableOpacity>
      )}
      {(!!image || !!imageUrl) && (
        <Image
          style={[StyleSheet.absoluteFillObject]}
          source={{ uri: image || imageUrl }}
          resizeMode='cover'
        />
      )}
      {/* {(!!image || !!imageUrl) && (
        <View>
          <AppButton text={'Edit'} onPress={_pickImage} />
        </View>
      )} */}
    </Layout>
  )
}

const s = StyleSheet.create({
  container: {
    flex: 0,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'center',
    height: 200,
    width: 200,
    minHeight: 200,
  },
})

export default PhotoPicker
