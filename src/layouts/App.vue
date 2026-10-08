<script setup>
import { RouterView } from 'vue-router'
import Navbar from '@/components/app/Navbar.vue'
import Breadcrumb from '@/components/app/Breadcrumb.vue'
</script>

<template>
  <div class="app-layout">
    <Navbar />
    <Breadcrumb />
    <main class="main-content">
      <!-- Tag ini WAJIB ada agar rute seperti Home, About, dan Browse bisa muncul -->
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.main-content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem;
}
</style>