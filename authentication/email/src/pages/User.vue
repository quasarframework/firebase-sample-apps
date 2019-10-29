<template>
  <q-page class="column" padding>
    <h5>The is the user's page</h5>
    <q-btn @click="logoutUser()" color="primary" label="Logout" />
  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'UserPage',
  methods: {
    ...mapActions('auth', ['logoutUser'])
  }
}
</script>
