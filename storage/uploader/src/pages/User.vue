<template>
  <q-page v-if="currentUser">
    <div class="background-photo">
        <div class="default-background" v-if="showBackgroundPhoto()">
            <q-img src="https://cdn.quasar.dev/img/material.png" style="height: 200px;"></q-img>
        </div>
        <div class="user-background" v-else>
            <q-img :src="currentUser.backgroundPhoto" style="height: 200px;"></q-img>
        </div>
    </div>
    <div class="profile-container">
        <div class="profile-photo text-center">
            <div class="default-user-image" v-if="showDefaultPhoto()">
                <q-avatar round="round" color="blue-grey-10" icon="person" font-size="140px" size="180px" text-color="white"></q-avatar>
            </div>
            <div class="user-image column items-center" v-else>
                <q-avatar class="q-mb-sm shadow-5" size="140px">
                    <q-img :src="currentUser.profilePhoto"></q-img>
                </q-avatar>
            </div>
        </div>
        <div class="text-weight-bold text-h4">{{ currentUser.fullName }}</div>
        <div class="text-h6">{{ currentUser.email }}</div>
        <div class="user-info q-mt-lg">
            <div class="row col-6"><label class="col text-h6 text-bold text-left">Mobile Number:</label>
                <p class="col text-h6 text-bold">{{ currentUser.mobile }}</p>
            </div>
        </div>
    </div>
</q-page>
</template>

<script>
import { QUploaderBase } from 'quasar'
import { mapActions } from 'vuex'
export default {
  mixins: [ QUploaderBase ],

  computed: {
    // [REQUIRED]
    // we're working on uploading files
    // isUploading () {
    //   return <Boolean>
    // },

    // [optional]
    // shows overlay on top of the
    // uploader signaling it's waiting
    // on something (blocks all controls)
    // isBusy () {
    //   return <Boolean>
    // }
    currentUser () {
      return this.$store.state.user.currentUser
    },
    editUserDialog: {
      get () {
        return this.$store.state.user.editUserDialog
      },
      set (val) {
        this.setEditUserDialog(val)
      }
    }
  },

  methods: {
    ...mapActions('user', ['uploadPhoto', 'setEditUserDialog']),
    setBlur () {
      this.$emit('setBlur')
    },
    showBackgroundPhoto () {
      return this.currentUser.backgroundPhoto === '' ||
        this.currentUser.backgroundPhoto === null ||
        this.currentUser.backgroundPhoto === undefined
    },
    showDefaultPhoto () {
      return this.currentUser.profilePhoto === '' ||
        this.currentUser.profilePhoto === null ||
        this.currentUser.profilePhoto === undefined
    },
    // [REQUIRED]
    // abort and clean up any process
    // that is in progress
    // abort () {
    //   // ...
    // },

    // [REQUIRED]
    async upload (files) {
      if (this.canUpload === false) {
        const
          file = files[0],
          payload = {
            id: this.currentUser.id,
            file,
            photoType: this.photoType

          }

        const respLink = await this.uploadPhoto(payload)
        return { url: respLink }
      }
    }
  }
}
</script>
