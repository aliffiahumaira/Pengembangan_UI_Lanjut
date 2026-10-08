<script setup lang="ts">
import { RouterView, RouterLink } from 'vue-router';
</script>

<template>
  <div class="dashboard-layout">
    <aside class="dashboard-rail">
      <div class="rail-brand">
        <router-link to="/">Gatherly Organizer</router-link>
      </div>
      <nav class="rail-nav">
        <router-link to="/dashboard" class="rail-link active">Overview</router-link>
        <a href="#" class="rail-link">My Events</a>
        <a href="#" class="rail-link">Attendees</a>
        <a href="#" class="rail-link">QR Check-in</a>
      </nav>
      <div class="rail-footer">
        <router-link to="/" class="rail-link">&larr; Back to Public</router-link>
      </div>
    </aside>

    <main class="dashboard-pane">
      <header class="pane-header">
        <h1>Dashboard</h1>
        <div class="user-profile">Admin</div>
      </header>
      <div class="pane-content">
        <RouterView />
      </div>
    </main>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: var(--bg-gray, #f4f4f5);
}

.dashboard-rail {
  width: 260px;
  background-color: #1c1948;
  color: white;
  display: flex;
  flex-direction: column;
}

.rail-brand {
  padding: var(--space-6, 24px);
  font-size: 1.2rem;
  font-weight: 700;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.rail-brand a { color: white; text-decoration: none; }

.rail-nav {
  flex: 1;
  padding: var(--space-6, 24px) 0;
  display: flex;
  flex-direction: column;
}

.rail-link {
  padding: var(--space-3, 12px) var(--space-6, 24px);
  text-decoration: none;
  font-weight: 500;
  color: #a0a0b0;
  transition: background 0.25s, color 0.25s;
}

.rail-link:hover, .rail-link.active {
  background-color: rgba(255, 255, 255, 0.05);
  color: white;
  border-left: 4px solid var(--primary, #6644ff);
}

.rail-footer { padding: var(--space-6, 24px); border-top: 1px solid rgba(255, 255, 255, 0.1); }

.dashboard-pane {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.pane-header {
  background: white;
  padding: var(--space-4, 16px) var(--space-8, 32px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-color, #e4e4e7);
}

.pane-header h1 { font-size: 1.5rem; margin: 0; }

.pane-content {
  padding: var(--space-8, 32px);
}
</style>