import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // ── Employer Portal ───────────────────────────────────────────────
    {
      path: '/',
      redirect: '/employer/dashboard',
    },
    {
      path: '/employer/unavailable',
      name: 'account-unavailable',
      component: () => import('@/views/employer/AccountUnavailable.vue'),
      meta: { title: 'Account Unavailable', role: 'employer' },
    },
    {
      path: '/employer/empty',
      name: 'account-empty',
      component: () => import('@/views/employer/AccountEmptyState.vue'),
      meta: { title: 'New Account', role: 'employer' },
    },
    {
      path: '/employer/request-self-funded',
      name: 'request-self-funded',
      component: () => import('@/views/employer/RequestSelfFunded.vue'),
      meta: { title: 'Request Self-Funded', role: 'employer' },
    },
    {
      path: '/employer/request-self-funded/confirm',
      name: 'request-self-funded-confirm',
      component: () => import('@/views/employer/RequestSelfFundedConfirm.vue'),
      meta: { title: 'Request Submitted', role: 'employer' },
    },
    {
      path: '/employer/first-login',
      name: 'first-login',
      component: () => import('@/views/employer/FirstLogin.vue'),
      meta: { title: 'First Login', role: 'employer' },
    },
    {
      path: '/employer/dashboard',
      name: 'account-dashboard',
      component: () => import('@/views/employer/AccountTransactionStudy.vue'),
      meta: { title: 'Dashboard', role: 'employer' },
    },

    // ── Ops Admin ─────────────────────────────────────────────────────
    {
      path: '/ops/configure',
      name: 'source-fund-config',
      component: () => import('@/views/ops/SourceFundConfig.vue'),
      meta: { title: 'Configure Source Fund', role: 'ops' },
    },
    {
      path: '/ops/employers',
      name: 'employer-status-overview',
      component: () => import('@/views/ops/EmployerStatusOverview.vue'),
      meta: { title: 'Employer Status Overview', role: 'ops' },
    },
    {
      path: '/ops/reactivate/:employerId',
      name: 'manual-reactivation',
      component: () => import('@/views/ops/ManualReactivation.vue'),
      meta: { title: 'Manual Reactivation', role: 'ops' },
    },

    // ── Email Templates ───────────────────────────────────────────────
    {
      path: '/email/balance-warning',
      name: 'email-balance-warning',
      component: () => import('@/views/email/BalanceWarningEmail.vue'),
      meta: { title: 'Balance Warning Email', role: 'email' },
    },
    {
      path: '/email/deactivation',
      name: 'email-deactivation',
      component: () => import('@/views/email/DeactivationEmail.vue'),
      meta: { title: 'Deactivation Email', role: 'email' },
    },
  ],
})

export default router
