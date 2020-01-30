<script>
import { QUploaderBase } from 'quasar'
import firebase from 'firebase/app'
import 'firebase/storage'
import { userRef, storageRef } from '../services/firebase/db.js'
export default {
  name: 'FBQUploader',

  mixins: [ QUploaderBase ],
  props: {
    meta: {
      type: Object
    },
    prefixPath: {
      type: String
    }
  },
  computed: {
    // [REQUIRED]
    // we're working on uploading files
    isUploading () {
      return this.uploading
    },

    // [optional]
    // shows overlay on top of the
    // uploader signaling it's waiting
    // on something (blocks all controls)
    isBusy () {
      return this.uploading
    }
  },

  data () {
    return {
      uploading: false,
      filesUploading: []
    }
  },

  methods: {
    // Required for QUploaderBase. Will not be
    // used do to isBusy Overlay
    abort () {},

    updateComponent (index, snapshot, status = 'uploading') {
      const file = this.files[index],
        uploadSize = (typeof snapshot === 'object') ? snapshot.bytesTransferred : 0

      // QUploaderBase private method to update file progress
      this.__updateFile(file, status, uploadSize)
    },

    upload () {
      if (this.canUpload === false) {
        return
      }

      this.uploading = true
      this.queuedFiles.forEach(file => {
        this.filesUploading.push(this.uploadFileToFirestore(file))
      })

      Promise.all(this.filesUploading)
        .then(() => {
          this.uploading = false
        })
        .catch(err => {
          this.$q.notify({
            color: 'negative',
            message: `One or more of your files failed to upload. ${err}`
          })
        })
    },

    uploadFileToFirestore (file) {
      const { meta } = this,
        index = this.filesUploading.length,
        fileSuffix = file.type.split('/')[1],
        uploadImageStorageRef = storageRef(`${this.prefixPath}${fileSuffix}`),
        profileImageStorageRef = uploadImageStorageRef.put(file)

      return new Promise((resolve, reject) => {
        // Firebase UploadTask Event
        profileImageStorageRef.on(
          firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) => {
            this.updateComponent(index, snapshot)
          },
          (err) => {
            this.$q.notify({
              color: 'negative',
              message: `There was a problem with the upload. ${err}`
            })
            this.updateComponent(index, 0, 'failed')
            reject()
          },
          () => {
            this.uploadedFiles = this.uploadedFiles.concat(this.files)
            this.queuedFiles = []
            this.filesUploading = []
            this.files.forEach(async file => {
              this.updateComponent(index, 0, 'uploaded')
              const link = await profileImageStorageRef.snapshot.ref.getDownloadURL()
              userRef('users', meta.id).update({ [`${meta.photoType}Photo`]: link })
              this.$emit('uploaded', { files: [ file.name ] })
            })
            resolve()
          }
        )
      })
    }
  }
}
</script>
