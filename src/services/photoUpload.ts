import { firebase } from './firebase'

export const uriToBlob = (uri: string): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      // return the blob
      resolve(xhr.response)
    }

    xhr.onerror = function () {
      // something went wrong
      reject(new Error('uriToBlob failed'))
    }
    // this helps us get a blob
    xhr.responseType = 'blob'
    xhr.open('GET', uri, true)

    xhr.send(null)
  })
}

export const upload = async (
  userUid: string,
  imageUri: string,
  setProgress: Function
): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    if (!userUid || !imageUri) {
      console.log('missing parameters', { userUid, imageUri })
      return reject(new Error('UserUid and file required to upload'))
    }

    // Create a root reference
    let storageRef = firebase.storage().ref()
    // Create the file metadata
    let metadata = {
      contentType: 'image/jpeg',
    }

    const imageBlob: Blob = await uriToBlob(imageUri)

    // Upload file and metadata to the object 'images/mountains.jpg'
    let uploadTask = storageRef
      .child(`images/${userUid}+${Date.now()}.jpg`)
      .put(imageBlob, metadata)

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function (snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log('Upload is ' + progress + '% done')
        setProgress(progress)
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused')
            break
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running')
            break
        }
      },
      function (error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch ((error as any).code) {
          case 'storage/unauthorized':
            alert('User doesnt have permission to access the object')
            reject(error)
            break

          case 'storage/canceled':
            alert('User canceled the upload')
            reject(error)
            break

          case 'storage/unknown':
            alert('Unknown error occurred, inspect error.serverResponse')
            reject(error)
            break
        }
      },
      function () {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('File available at', downloadURL)
          resolve(downloadURL)
        })
      }
    )
  })
}
