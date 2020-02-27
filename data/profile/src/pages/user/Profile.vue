<template lang="pug">
  <q-page v-if="currentUser">
    <div class="background-photo">
        <div class="default-background" v-if="showBackgroundPhoto()">
            <q-img src="https://cdn.quasar.dev/img/material.png" style="height: 200px;"></q-img>
        </div>
        <div class="user-background" v-else="v-else">
            <q-img :src="currentUser.backgroundPhoto" style="height: 200px;"></q-img>
        </div>
    </div>
    <div class="profile-container">
        <div class="profile-photo text-center">
            <div class="default-user-image" v-if="showDefaultPhoto()">
                <q-avatar round="round" color="blue-grey-10" icon="person" font-size="100px" size="120px" text-color="white"></q-avatar>
            </div>
            <div class="user-image column items-center" v-else="v-else">
                <q-avatar class="q-mb-sm shadow-5" size="140px">
                    <q-img :src="currentUser.profilePhoto"></q-img>
                </q-avatar>
            </div>
        </div>
        <div class="text-weight-bold text-h6">{{ getUserData('fullName') }}</div>
        <div class="user-info q-mt-lg">
            <div class="row justify-between">
              <label class="text-h6 text-body1">Email:</label>
              <p class="text-h6 text-body1 ">{{ getUserData('email') }}</p>
            </div>
            <div class="row justify-between">
              <label class="text-body1 text-left">Mobile Number:</label>
              <p class="text-body1 text-right">{{ getUserData('mobile') }}</p>
            </div>
        </div>
    </div>
    <q-btn class="fixed-bottom-right q-ma-md" round="round" color="primary" icon="edit" @click="setEditUserDialog(true); setBlur()"></q-btn>
    <q-dialog v-model="editUserDialog" full-height="full-height" persistent="persistent" @before-hide="setBlur">
        <user-settings></user-settings>
    </q-dialog>
</q-page>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { QSpinnerGears } from 'quasar'
export default {
  name: 'Profile',
  components: {
    'user-settings': () => import('./profile/UserSettings.vue')
  },
  data () {
    return {}
  },
  created () {
    this.$q.loading.show({
      message: 'Loading your user information...',
      backgroundColor: 'grey',
      spinner: QSpinnerGears,
      customClass: 'loader'
    })
  },
  computed: {
    ...mapGetters('user', ['currentUser']),
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
    ...mapMutations('user', ['setEditUserDialog']),
    getUserData (attr) {
      return (this.currentUser[attr]) ? this.currentUser[attr] : 'Please update your profile'
    },
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
    }
  },
  watch: {
    currentUser () {
      this.$q.loading.hide()
    }
  }
}
</script>
<style lang="stylus">
  .background-photo
    cursor pointer
  .profile-container
    position relative
    text-align center
    background rgba(0,0,0,0)
    top -4.6em
  .user-info
    margin 2em auto
    max-width 24em
    position relative
</style>
