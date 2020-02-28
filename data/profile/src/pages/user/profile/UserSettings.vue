<template>
  <div class="user-settings full-width" v-if="currentUser">
    <q-form class="full-height" @submit="saveUserData">
      <div class="background-photo">
        <div class="default-background" v-if="showBackgroundPhoto()">
          <q-img src="https://cdn.quasar.dev/img/material.png" style="height: 200px;" @click="showPhotoUpload('background')"></q-img>
        </div>
        <div class="user-background" v-else>
          <q-img :src="currentUser.backgroundPhoto" style="height: 200px;" @click="showPhotoUpload('background')"></q-img>
        </div>
      </div>
      <div class="absolute-top q-mt-sm text-white text-center">
        <q-icon class="q-mr-sm" color="white" name="edit" size="20px" @click="showPhotoUpload('background')"></q-icon>Edit your background image</div>
      <div class="profile-photo text-center" @click="showPhotoUpload('profile')">
        <div class="default-user-image column items-center" v-if="showDefaultPhoto()">
          <q-avatar class="q-mb-sm" round="round" color="blue-grey-10" icon="person" font-size="110px" size="180px" text-color="white"></q-avatar><span class="text-caption text-blue-grey-10">Click to edit</span></div>
        <div class="user-image column items-center" v-else>
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
      </section>
      <div class="row justify-between q-my-lg q-px-md absolute-bottom">
        <q-btn color="primary" label="CANCEL" style="min-width:6em;" @click="setEditUserDialog(false)"></q-btn>
        <q-btn color="primary" type="submit" label="SAVE" style="min-width:6em;"></q-btn>
      </div>
    </q-form>
    <q-dialog v-model="photoUpload" transition-hide="scale" transition-show="scale" @before-hide="resetPhotoType">
      <fbq-uploader
        class="q-my-lg"
        label="Please Upload a Photo"
        :meta="meta"
        :prefixPath="prefixPath"
        @uploaded="uploadComplete"
      ></fbq-uploader>
    </q-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { QUploaderBase } from 'quasar'
export default {
  name: 'UserSettings',
  mixins: [ QUploaderBase ],
  components: {
    'fbq-uploader': () => import('../../../components/FBQUploader.vue')
  },
  data () {
    const state = this.$store.state.user.currentUser
    return {
      email: state.email,
      fullName: state.fullName,
      mobile: state.mobile,
      photoType: '',
      photoUpload: false
    }
  },
  computed: {
    ...mapGetters('user', ['currentUser']),
    meta () {
      return {
        id: this.currentUser.id,
        photoType: this.photoType
      }
    },
    prefixPath () {
      const id = this.currentUser.id,
        path = `${id}/${this.photoType}Photo/${this.photoType}Photo.`
      return path
    }
  },
  methods: {
    ...mapActions('user', ['updateUserData']),
    ...mapMutations('user', ['setEditUserDialog']),
    resetPhotoType () {
      this.photoType = ''
    },
    async saveUserData () {
      const { currentUser, email, fullName, mobile } = this

      this.$q.loading.show({
        message: 'Updating your data, please stand by...',
        customClass: 'text-h3, text-bold'
      })

      try {
        await this.updateUserData({
          id: currentUser.id,
          email,
          fullName,
          mobile
        })
      } catch (err) {
        this.$q.notify({
          message: `Looks like a problem updating your profile: ${err}`,
          color: 'negative'
        })
      } finally {
        this.$q.loading.hide()
        this.setEditUserDialog(false)
      }
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

    uploadComplete (info) {
      let fileNames = []
      info.files.forEach(file => fileNames.push(file))
      this.photoUpload = false
      this.$q.notify({
        message: `Successfully uploaded your photo: ${fileNames}`,
        color: 'positive'
      })
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
