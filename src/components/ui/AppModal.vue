<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: 'Action Confirmation',
  },
  message: {
    type: String,
    default: 'Are you sure you want to proceed with this action?',
  },
  badgeText: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'primary', // Opsi: 'primary', 'danger', 'success'
  },
  confirmText: {
    type: String,
    default: 'Yes, Proceed',
  },
  cancelText: {
    type: String,
    default: 'Cancel',
  },
})

defineEmits(['confirm', 'close'])
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="modal-overlay" @click.self="$emit('close')">
        <div class="modal-card">
          <header class="modal-header">
            <span v-if="badgeText" :class="['modal-badge', `badge-${variant}`]">
              {{ badgeText }}
            </span>
            <h3 class="modal-title">{{ title }}</h3>
          </header>

          <div class="modal-body">
            <slot>
              <p class="modal-message">{{ message }}</p>
            </slot>
          </div>

          <footer class="modal-footer">
            <slot name="footer">
              <button class="btn-cancel" @click="$emit('close')">
                {{ cancelText }}
              </button>
              <button :class="['btn-confirm', `btn-${variant}`]" @click="$emit('confirm')">
                {{ confirmText }}
              </button>
            </slot>
          </footer>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: var(--space-4);
}

.modal-card {
  background: white;
  width: 100%;
  max-width: 480px;
  border-radius: var(--space-4);
  padding: var(--space-6);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid var(--border-color);
  animation: scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

@keyframes scaleUp {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-header {
  margin-bottom: var(--space-3);
}

.modal-badge {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 3px 8px;
  border-radius: 4px;
  margin-bottom: var(--space-2);
}

.badge-primary {
  background: rgba(102, 68, 255, 0.1);
  color: var(--primary);
}

.badge-danger {
  background: #fee2e2;
  color: #dc2626;
}

.badge-success {
  background: #dcfce7;
  color: #15803d;
}

.modal-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text-main);
  margin: 0;
}

.modal-body {
  margin-bottom: var(--space-6);
}

.modal-message {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
}

.btn-cancel {
  background: var(--bg-light);
  color: var(--text-muted);
  border: 1px solid var(--border-color);
  padding: var(--space-2) var(--space-4);
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel:hover {
  background: #e2e8f0;
  color: var(--text-main);
}

.btn-confirm {
  color: white;
  border: none;
  padding: var(--space-2) var(--space-5);
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition:
    background-color 0.2s,
    transform 0.15s;
}

.btn-primary {
  background: var(--primary);
}

.btn-primary:hover {
  background: #5032d6;
}

.btn-danger {
  background: #e63946;
}

.btn-danger:hover {
  background: #d62828;
}

.btn-success {
  background: #15803d;
}

.btn-success:hover {
  background: #166534;
}

.btn-confirm:active {
  transform: scale(0.98);
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
