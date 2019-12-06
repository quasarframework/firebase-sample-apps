<template>
  <q-page class="column justify-start">
    <div class="row justify-center q-my-xl">
      <img alt="Quasar logo" src="/statics/sample-app-logo.png" height="326px" width="300px">
    </div>
    <div class="q-px-lg text-h6 text-center">
      Click here to
      <router-link to="auth/register" class="text-primary">register</router-link>  a new account or to
      <router-link to="auth/login" class="text-primary">login</router-link>.
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
