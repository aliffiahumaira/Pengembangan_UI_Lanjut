<template>
  <div class="dashboard-overview">
    <h2>Welcome back, Organizer</h2>

    <div class="metrics-grid">
      <div class="metric-card">
        <h3>Total Tickets Sold</h3>
        <p class="metric-value">1,245</p>
      </div>
      <div class="metric-card">
        <h3>Page Views</h3>
        <p class="metric-value">8,302</p>
      </div>
      <div class="metric-card">
        <h3>Revenue</h3>
        <p class="metric-value">$12,450</p>
      </div>
    </div>

    <div class="data-table-container">
      <h3>Recent Registrations</h3>
      <table class="data-table">
        <thead>
          <tr>
            <th>Attendee Name</th>
            <th>Event</th>
            <th>Registration Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 5" :key="i">
            <td>John Doe {{ i }}</td>
            <td>Community Gathering {{ i }}</td>
            <td>Oct 1{{ i }}, 2026</td>
            <td><span class="status-badge">Confirmed</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.dashboard-overview h2 {
  margin-bottom: var(--space-6, 24px);
  color: var(--text-main, #1c1948);
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-6, 24px);
  margin-bottom: var(--space-8, 32px);
}

.metric-card {
  background: white;
  padding: var(--space-6, 24px);
  border-radius: var(--space-3, 12px);
  border: 1px solid var(--border-color, #e4e4e7);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.metric-card h3 {
  font-size: 1rem;
  color: var(--text-muted, #666666);
  margin-bottom: var(--space-2, 8px);
}
.metric-value {
  font-size: 2.2rem;
  font-weight: 700;
  color: var(--primary, #6644ff);
  margin: 0;
}

.data-table-container {
  background: white;
  padding: var(--space-6, 24px);
  border-radius: var(--space-3, 12px);
  border: 1px solid var(--border-color, #e4e4e7);
}

.data-table-container h3 {
  margin-bottom: var(--space-4, 16px);
  font-size: 1.2rem;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}
.data-table th,
.data-table td {
  padding: var(--space-3, 12px) var(--space-4, 16px);
  text-align: left;
  border-bottom: 1px solid var(--border-color, #e4e4e7);
}

.data-table th {
  background: var(--bg-gray, #f4f4f5);
  color: var(--text-muted, #666666);
  font-weight: 600;
  font-size: 0.9rem;
}
.data-table td {
  color: var(--text-main, #1c1948);
  font-size: 0.95rem;
}

.status-badge {
  background: rgba(46, 204, 113, 0.1);
  color: #2ecc71;
  padding: var(--space-1, 4px) var(--space-2, 8px);
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
}
</style>
