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
        <div class="text-weight-bold text-h4">{{ currentUser.fullName }}</div>
        <div class="user-info q-mt-lg">
            <div class="row justify-between">
              <label class="text-h6 text-body1">Email:</label>
              <p class="text-h6 text-body1 ">{{ currentUser.email }}</p>
            </div>
            <div class="row justify-between">
              <label class="text-body1 text-left">Mobile Number:</label>
              <p class="text-body1 text-right">{{ currentUser.mobile }}</p>
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
import { mapMutations } from 'vuex'
export default {
  name: 'UserSettings',
  components: {
    'user-settings': () => import('./profile/UserSettings.vue')
  },
  data () {
    return {}
  },
  computed: {
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
    ...mapMutations('user', ['setEditUserDialog']),
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
  }
}
</script>
<style lang="stylus">
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
