import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/App.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

const routes = [
  {
    path: '/',
    component: AppLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/Home.vue'),
        meta: { breadcrumb: 'Home' }
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('@/views/About.vue'),
        meta: { breadcrumb: 'About' }
      },
      {
        path: 'browse',
        name: 'browse',
        component: () => import('@/views/Browse.vue'),
        meta: { breadcrumb: 'Browse' },
        redirect: '/browse/events',
        children: [
          {
            path: 'events',
            name: 'events',
            component: () => import('@/views/EventList.vue'),
            meta: { breadcrumb: 'Event List' }
          },
          {
            path: 'events/:id',
            name: 'event-detail',
            component: () => import('@/views/EventDetail.vue'),
            meta: { breadcrumb: 'Event Detail' }
          },
          // MODUL 5: RUTE FORMULIR PENDAFTARAN EVENT
          {
            path: 'events/:id/register',
            name: 'event-registration',
            component: () => import('@/views/EventRegistration.vue'),
            meta: { breadcrumb: 'Event Registration' }
          },
          // MODUL 5: RUTE DOMPET TIKET PESERTA
          {
            path: 'your-events',
            name: 'your-events',
            component: () => import('@/views/YourEvents.vue'),
            meta: { breadcrumb: 'Your Events' }
          },
          // MODUL 5: RUTE DETAIL TANDA TERIMA TIKET
          {
            path: 'your-events/:id',
            name: 'ticket-receipt',
            component: () => import('@/views/TicketReceipt.vue'),
            meta: { breadcrumb: 'Ticket Receipt' }
          },
          {
            path: 'category',
            name: 'category',
            component: () => import('@/views/Category.vue'),
            meta: { breadcrumb: 'Category' }
          }
        ]
      },
      {
        path: 'contact',
        name: 'contact',
        component: () => import('@/views/Contact.vue'),
        meta: { breadcrumb: 'Contact' }
      }
    ]
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'dashboard-overview',
        component: () => import('@/views/Dashboard.vue')
      },
      {
        path: 'events',
        name: 'dashboard-events',
        component: () => import('@/views/EventManagement.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // Mengatur agar setiap perpindahan halaman otomatis kembali ke posisi paling atas
  scrollBehavior() {
    return { top: 0 }
  },
  routes
})

export default router