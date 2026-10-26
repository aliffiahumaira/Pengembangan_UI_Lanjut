import { ref, computed, watch } from 'vue'

const STORAGE_KEY_EVENTS = 'gatherly_events'
const STORAGE_KEY_REGISTRATIONS = 'gatherly_user_registrations'

// Sample default events jika localStorage masih kosong
const defaultEvents = [
  {
    id: 1,
    title: 'Vue.js 3 Masterclass: Building Scalable Apps',
    cat: 'Workshop',
    date: 'Oct 25, 2026 • 10:00 AM',
    loc: 'Online (Zoom)',
    quota: 45,
    price: 'Free',
    desc: 'Deep dive into Vue 3 Composition API, Pinia, and advanced architecture strategies for large-scale enterprise web applications.',
    done: false
  },
  {
    id: 2,
    title: 'Design System & Component Library Summit',
    cat: 'Seminar',
    date: 'Nov 02, 2026 • 01:00 PM',
    loc: 'Tech Center, Jakarta',
    quota: 120,
    price: 'Free',
    desc: 'Learn how leading tech companies scale UI design systems and build accessible component libraries with Figma and Vue.',
    done: false
  },
  {
    id: 3,
    title: 'Frontend Developer Meetup Jakarta 2026',
    cat: 'Meetup',
    date: 'Nov 15, 2026 • 06:30 PM',
    loc: 'CoWorking Hub, Kuningan',
    quota: 80,
    price: 'Free',
    desc: 'Network with local web developers, discuss the latest web standards, tools, and share real-world project experiences.',
    done: false
  }
]

// INITIALIZE STATE DARI LOCAL STORAGE
const loadStoredEvents = () => {
  const saved = localStorage.getItem(STORAGE_KEY_EVENTS)
  return saved ? JSON.parse(saved) : defaultEvents
}

const loadStoredRegistrations = () => {
  const saved = localStorage.getItem(STORAGE_KEY_REGISTRATIONS)
  return saved ? JSON.parse(saved) : []
}

const events = ref(loadStoredEvents())
const userRegistrations = ref(loadStoredRegistrations())

// WATCHERS UNTUK MENSINKRONKAN DENGAN LOCAL STORAGE
watch(
  events,
  (newEvents) => {
    localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(newEvents))
  },
  { deep: true }
)

watch(
  userRegistrations,
  (newRegs) => {
    localStorage.setItem(STORAGE_KEY_REGISTRATIONS, JSON.stringify(newRegs))
  },
  { deep: true }
)

export function useEvents() {
  const totalEvents = computed(() => events.value.length)
  const activeEvents = computed(() => events.value.filter((e) => !e.done))
  const completedEvents = computed(() => events.value.filter((e) => e.done))

  const createEvent = (eventData) => {
    const newEvent = {
      id: Date.now(),
      title: eventData.title,
      date: eventData.date,
      loc: eventData.loc,
      cat: eventData.cat,
      quota: Number(eventData.quota) || 100,
      price: eventData.price || 'Free',
      desc: eventData.desc,
      done: false
    }
    events.value.unshift(newEvent)
    return newEvent
  }

  const completeEvent = (id) => {
    const target = events.value.find((e) => e.id === Number(id))
    if (target) {
      target.done = true
    }
  }

  // PEMBERSIHAN BERANTAI: HAPUS EVENT & PENDAFTARAN TERHUBUNG
  const deleteEvent = (id) => {
    const targetId = Number(id)
    const index = events.value.findIndex((e) => e.id === targetId)
    if (index !== -1) {
      events.value.splice(index, 1)
      // Hapus tiket registrasi peserta yang terhubung dengan event ini
      userRegistrations.value = userRegistrations.value.filter(
        (r) => r.eventId !== targetId
      )
    }
  }

  const getEventById = (id) => {
    return events.value.find((e) => e.id === Number(id))
  }

  const clearAllEvents = () => {
    events.value = []
    userRegistrations.value = []
    localStorage.removeItem(STORAGE_KEY_EVENTS)
    localStorage.removeItem(STORAGE_KEY_REGISTRATIONS)
  }

  // ==================== MODUL 5: REGISTRATION LOGIC ====================

  // CEK PASTI APABILA USER SUDAH TERDAFTAR DI EVENT TERSEBUT
  const isUserRegistered = (eventId) => {
    return userRegistrations.value.some((r) => r.eventId === Number(eventId))
  }

  // MENDAFTARKAN PESERTA KE EVENT
  const registerAttendee = (eventId, formData) => {
    const targetId = Number(eventId)
    const ev = getEventById(targetId)

    if (!ev || ev.quota <= 0 || isUserRegistered(targetId)) {
      return null
    }

    // Kurangi kuota 1
    ev.quota -= 1

    // Generate kode unik pemesanan GTH-XXXX
    const bookingCode = 'GTH-' + Math.floor(1000 + Math.random() * 9000)

    const record = {
      id: Date.now(),
      eventId: ev.id,
      eventTitle: ev.title,
      eventCat: ev.cat,
      eventDate: ev.date,
      eventLoc: ev.loc,
      bookingCode,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      dob: formData.dob,
      reason: formData.reason,
      registeredAt: new Date().toISOString()
    }

    userRegistrations.value.unshift(record)
    return record
  }

  // MEMBATALKAN REGISTRASI PESERTA
  const cancelRegistration = (eventId) => {
    const targetId = Number(eventId)
    const regIndex = userRegistrations.value.findIndex(
      (r) => r.eventId === targetId
    )

    if (regIndex !== -1) {
      userRegistrations.value.splice(regIndex, 1)
      const ev = getEventById(targetId)
      if (ev) {
        ev.quota += 1 // Kembalikan kuota seat
      }
    }
  }

  return {
    events,
    userRegistrations,
    totalEvents,
    activeEvents,
    completedEvents,
    createEvent,
    completeEvent,
    deleteEvent,
    getEventById,
    clearAllEvents,
    isUserRegistered,
    registerAttendee,
    cancelRegistration
  }
}