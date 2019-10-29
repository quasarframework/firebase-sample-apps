<template>
  <q-page class="flex flex-center column justify-around">
    <q-btn-group>
      <q-btn color="primary" to="auth/login">Login</q-btn>
      <q-btn color="primary" to="auth/register">Register</q-btn>
    </q-btn-group>
    <img alt="Quasar logo" src="~assets/sample-app-logo.png" height="300px">
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex'
}
</script>
