<template lang="pug">
  <div class="user-settings full-width" v-if="currentUser">
    <q-form class="full-height" @submit="saveUserData">
        <div class="background-photo">
            <div class="default-background" v-if="showBackgroundPhoto()">
                <q-img src="https://cdn.quasar.dev/img/material.png" style="height: 200px;" @click="showPhotoUpload('background')"></q-img>
            </div>
            <div class="user-background" v-else="v-else">
                <q-img :src="currentUser.backgroundPhoto" style="height: 200px;" @click="showPhotoUpload('background')"></q-img>
            </div>
        </div>
        <div class="absolute-top q-mt-sm text-white text-center">
            <q-icon class="q-mr-sm" color="white" name="edit" size="20px" @click="showPhotoUpload('profile')"></q-icon>Edit your background image</div>
        <div class="profile-photo text-center" @click="showPhotoUpload('profile')">
            <div class="default-user-image column items-center" v-if="showDefaultPhoto()">
                <q-avatar class="q-mb-sm" round="round" color="blue-grey-10" icon="person" font-size="110px" size="180px" text-color="white"></q-avatar><span class="text-caption text-blue-grey-10">Click to edit</span></div>
            <div class="user-image column items-center" v-else="v-else">
                <q-avatar class="q-mb-sm shadow-5" size="180px" @click="showPhotoUpload('profile')">
                    <q-img :src="currentUser.profilePhoto"></q-img>
                </q-avatar><span class="text-blue-grey-10"><q-icon class="q-mr-sm" color="blue-grey-10" name="edit" size="16px"></q-icon>Click to edit</span></div>
        </div>
        <section class="user-info">
            <h6 class="q-mt-none q-mb-md text-center">Edit Your Profile</h6>
            <div class="row justify-between items-center q-mb-lg"><label class="col-3" for="fullName">Name</label>
                <q-input class="col" id="fullName" v-model="fullName" borderless="borderless" dense="dense" type="text"></q-input>
            </div>
            <div class="row justify-between items-center q-mb-lg"><label class="col-3" for="email">Email</label>
                <q-input class="col" id="email" v-model="email" borderless="borderless" dense="dense" type="text"></q-input>
            </div>
            <div class="row justify-between items-center q-mb-lg"><label class="col-3" for="mobile">Mobile</label>
                <q-input class="col" id="mobile" v-model="mobile" borderless="borderless" dense="dense" hint="+1(###) ###-####" mask="+#(###) ###-####" type="text"></q-input>
            </div>
            <div class="row justify-between items-center q-mb-sm"><label class="col-3" for="street">Address</label>
                <q-input class="col no-wrap" id="street" v-model="street" borderless="borderless" dense="dense" hint="Street Address" type="text"></q-input>
            </div>
            <div class="row justify-between items-center q-mb-sm"><label class="col-3" for="cityState"></label>
                <q-input class="col" id="cityState" v-model="cityState" borderless="borderless" dense="dense" hint="City, State" type="text"></q-input>
            </div>
            <div class="row justify-between items-center q-mb-sm"><label class="col-3" for="mobile"></label>
                <q-input class="col no-wrap" id="zipCode" v-model="zipCode" borderless="borderless" dense="dense" hint="Zipcode" type="text"></q-input>
            </div>
        </section>
        <div class="row justify-between q-my-lg q-px-md">
            <q-btn color="primary" label="CANCEL" style="min-width:6em;" @click="setEditUserDialog(false)"></q-btn>
            <q-btn color="primary" type="submit" label="SAVE" style="min-width:6em;"></q-btn>
        </div>
    </q-form>
    <q-dialog v-model="photoUpload" transition-hide="scale" transition-show="scale" @before-hide="resetPhotoType">
        <q-card>
            <p class="text-dialog bg-primary text-white q-mb-none q-pa-sm"><span v-if="photoUploading">Your photo is uploading...<q-spinner-gears></q-spinner-gears></span><span v-else="v-else">Please upload a new photo.</span></p>
            <q-input type="file" value="upload" @change="uploadPhoto"></q-input>
        </q-card>
    </q-dialog>
</div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'UserSettings',
  data () {
    const state = this.$store.state.user.currentUser
    return {
      cityState: state.cityState,
      email: state.email,
      fullName: state.fullName,
      mobile: state.mobile,
      photoType: '',
      photoUpload: false,
      photoUploading: false,
      street: state.street,
      zipCode: state.zipCode
    }
  },
  computed: {
    currentUser () {
      return this.$store.state.user.currentUser
    }
  },
  methods: {
    ...mapActions('user', ['submitPhotoImage', 'updateUserData']),
    ...mapMutations('user', ['setEditUserDialog']),
    resetPhotoType () {
      this.photoType = ''
    },
    async saveUserData () {
      const {
        currentUser,
        cityState,
        email,
        fullName,
        mobile,
        street,
        zipCode
      } = this
      this.$q.loading.show({
        message: 'Updating your data, please stand by...',
        customClass: 'text-h3, text-bold'
      })
      await this.updateUserData({
        id: currentUser.id,
        cityState,
        email,
        fullName,
        mobile,
        street,
        zipCode
      })
      this.$q.loading.hide()
      this.setEditUserDialog(false)
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
    showPhotoUpload (type) {
      this.photoUpload = true
      this.photoType = type
    },
    async uploadPhoto (e) {
      const
        file = e.target.files[0],
        fileSuffix = file.type.split('/')[1]
      const payload = {
        id: this.currentUser.id,
        file,
        fileSuffix,
        photoType: this.photoType
      }
      this.photoUploading = true
      await this.submitPhotoImage(payload)
      this.photoUpload = false
      this.photoUploading = false
      this.resetPhotoType()
    }
  }
}
</script>
<style lang="stylus">
  .user-settings
    background-color $grey-3
    .default-user-image
      cursor pointer
      color white
      @media(max-width $breakpoint-sm)
        margin-bottom 2em
      .q-icon
        @media(max-width $breakpoint-sm)
          font-size 1em!important

    .profile-photo
      cursor pointer
      margin -6em 0 2em
      .q-avatar
        @media(max-width $breakpoint-sm)
          margin-top 1rem
          height .75em
          width .75em
      .user-image
        .edit
          top 2.5em

    .user-info
      max-width 20.5em
      margin auto
      color $blue-grey-10
      label
        text-align left
        font-weight bold
      input
        background rgba(101,104,110,.20)
        border-radius 6px
        color $blue-grety-10
        font-weight bold
        padding .5em
</style>
