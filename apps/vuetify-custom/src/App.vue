<script setup lang="ts">
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Vuetify Card</v-card-title>
          <v-card-text>Card content text here</v-card-text>
          <v-card-actions>
            <v-btn variant="elevated"color="primary" class="ms-auto">Click me</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <router-view></router-view>
  </v-container>
</template>

<style scoped lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  &:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  &.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
}
</style>
