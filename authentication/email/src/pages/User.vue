<template>
  <q-page class="column" padding>
    <h5 class="text-center">The is the user's page</h5>
    <div class="q-px-lg text-center">
      <q-btn style="width: 100%; max-width:50em; margin: 0 auto" @click="logoutUser()" color="primary" label="Logout" />
    </div>
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
