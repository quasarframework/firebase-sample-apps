<template>
  <q-page padding>
    <h5 class="text-center">{{ getAuthType }}</h5>
    <q-form class="authentication q-gutter-y-md" ref="emailAuthenticationForm" @submit="onSubmit">
      <q-input
        v-model="email"
        name="email"
        outlined="outlined"
        lazy-rules="lazy-rules"
        autocomplete="email"
        color="primary"
        data-cy="email"
        label="EMAIL"
        type="email"
        :rules="[val => !!val || '*Field is required', val => val.includes('@') && val.includes('.') || '*Please Provide a valid email']"
      />
      <q-input
        v-model="password"
        lazy-rules="lazy-rules"
        outlined="outlined"
        autocomplete="current-password new-password"
        color="primary"
        data-cy="password"
        label="PASSWORD"
        :rules="[val =&gt; !!val || '*Field is required']" :type="isPwd ? 'password' : 'text'"
        @keyup.enter="onSubmit(); $event.target.blur()"
      >
        <template v-slot:append>
          <q-icon class="cursor-pointer" :name="isPwd ? 'visibility_off' : 'visibility'" @click="isPwd = !isPwd" />
        </template>
      </q-input>
      <q-input
        v-if="isRegistration"
        lazy-rules="lazy-rules"
        outlined="outlined"
        autocomplete="new-password"
        color="primary"
        data-cy="verifyPassword"
        label="VERIFY PASSWORD"
        v-model="passwordMatch"
        :rules="[val => !!val || '*Field is required', val => val === password || '*Passwords don\'t match']"
        :type="isPwd ? 'password' : 'text'"
        @keyup.enter="onSubmit(); $event.target.blur()"
      >
        <template v-slot:append>
          <q-icon class="cursor-pointer" :name="isPwd ? 'visibility_off' : 'visibility'" @click="isPwd = !isPwd" />
        </template>
      </q-input>
      <q-btn
        class="full-width q-mt-md"
        color="primary"
        data-cy="submit"
        :label="getAuthType"
        @click="onSubmit"
      >
      </q-btn>
      <p class="q-mt-md q-mb-none text-center">
          <router-link class="text-primary" :to="routeAuthentication">
            <span v-if="isRegistration">Need to login?</span>
            <span v-else>Need to create an account?</span>
          </router-link>
      </p>
      <p class="q-ma-sm text-center">
          <router-link class="text-primary" to="forgotPassword">Forgot Password?</router-link>
      </p>
    </q-form>
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
import { QSpinnerGears } from 'quasar'
export default {
  name: 'Auth',
  computed: {
    getAuthType () {
      return this.isRegistration ? 'Register' : 'Login'
    },
    isRegistration () {
      return this.$route.name === 'Register'
    },
    routeAuthentication () {
      return this.isRegistration ? '/auth/login' : '/auth/register'
    }
  },
  data () {
    return {
      email: null,
      isPwd: true,
      password: null,
      passwordMatch: null
    }
  },
  methods: {
    ...mapActions('auth', ['createNewUser', 'loginUser']),
    handleUser () {},
    onSubmit () {
      const { email, password } = this
      this.$refs.emailAuthenticationForm.validate()
        .then(async success => {
          if (success) {
            this.$q.loading.show({
              message: this.isRegistration
                ? 'Registering your account...'
                : 'Authenticating your account...',
              backgroundColor: 'grey',
              spinner: QSpinnerGears,
              customClass: 'loader'
            })
            try {
              if (this.isRegistration) {
                await this.createNewUser({ email, password })
              } else {
                await this.loginUser({ email, password })
              }
              this.$router.push({ path: '/user/profile' })
            } catch (err) {
              console.error(err)
              this.$q.notify({
                message: `An error as occured: ${err}`,
                color: 'negative'
              })
            } finally {
              this.$q.loading.hide()
            }
          }
        })
    }
  }
}
</script>

<style lang="stylus">
.authentication
  margin auto
  max-width 30em
  width 100%
</style>
