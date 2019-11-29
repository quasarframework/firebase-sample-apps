<template>
  <q-page class="column justify-start">
    <div class="row justify-center q-my-xl">
      <img alt="Quasar logo" src="~assets/sample-app-logo.png" height="300px" width="300px">
    </div>
    <div class="q-px-lg">
      <q-btn-group spread style="max-width: 50em; margin: auto">
        <q-btn color="primary" to="auth/login">Login</q-btn>
        <q-btn color="primary" to="auth/register">Register</q-btn>
      </q-btn-group>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
