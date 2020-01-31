<template>
  <q-page padding="padding">
    <q-form class="authentication q-gutter-y-md" ref="forgotPasswordForm" @submit="onSubmit">
      <router-link to="/">
          <q-img alt="Logo" src="/statics/fp-logo.png"></q-img>
      </router-link>
      <h4 class="q-mb-none">Forgot Password</h4>
      <div class="inst q-mb-lg">Please enter your email and we will send you a link to reset your password.</div>
      <q-input
        v-model="email"
        outlined
        autocomplete="email"
        color="primary"
        data-cy="email"
        for="email"
        label="EMAIL"
        lazy-rules="lazy-rules"
        name="email"
        type="email"
        :rules="[val =&gt; !!val || '*Field is required', val =&gt; val.includes('@') &amp;&amp; val.includes('.') || '*Please Provide a valid email']"
      ></q-input>
      <q-btn class="full-width q-mt-md" color="primary" data-cy="submit" label="RESET PASSWORD" :loading="loading" @click="onSubmit">
        <template v-slot:loading>
          <q-spinner-gears></q-spinner-gears>
        </template>
      </q-btn>
    </q-form>
  </q-page>
</template>

<script>
import { QSpinnerGears } from 'quasar'
export default {
  name: 'ForgotPassword',
  data () {
    return {
      email: '',
      loading: false
    }
  },
  methods: {
    onSubmit () {
      this.$refs.forgotPasswordForm.validate()
        .then(async success => {
          this.$q.loading.show({
            message: 'Attempting to reset your password...',
            backgroundColor: 'grey',
            spinner: QSpinnerGears,
            customClass: 'loader'
          })
          if (success) {
            try {
              await this.$fb.auth().sendPasswordResetEmail(this.email)
              this.$q.notify({
                color: 'positive',
                message: 'A reset email was send to the email you registered with to reset your password.'
              })
            } catch (err) {
              this.$q.notify({
                color: 'negative',
                message: `There was an error: ${err}`
              })
            }
          }
          this.$q.loading.hide()
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
.authentication
  margin auto
  max-width 30em
  width 100%
  .q-img
    height 190px
.q-page >>> .q-img__image
  height 184px
  background-size 35% !important
  background-position 50% 100% !important
</style>
