<script setup lang="ts">
// Stack: Toge v2 (shadcn-vue registry · @toge)
// Screen 5 — Balance Warning Email (30% threshold)
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="mx-auto max-w-lg">
      <!-- Email client chrome -->
      <div class="mb-3 text-xs text-gray-500 space-y-0.5">
        <p><strong>From:</strong> ReadyWage Alerts &lt;alerts@readywage.sprout.ph&gt;</p>
        <p><strong>To:</strong> ana.reyes@techcorp.ph</p>
        <p><strong>Subject:</strong> ⚠️ ReadyWage balance alert — TechCorp Philippines (30% remaining)</p>
      </div>

      <!-- Email body -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">

        <!-- Header -->
        <div class="bg-amber-50 border-b border-amber-200 px-8 py-6">
          <div class="flex items-center gap-3">
            <div class="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <svg class="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
              </svg>
            </div>
            <div>
              <p class="text-xs font-medium text-amber-700 uppercase tracking-wide">Balance Alert</p>
              <p class="text-sm font-semibold text-amber-900 mt-0.5">Your ReadyWage advance pool is running low</p>
            </div>
          </div>
        </div>

        <div class="px-8 py-6 space-y-5">
          <p class="text-sm text-gray-700">Hi Ana,</p>
          <p class="text-sm text-gray-700 leading-relaxed">
            Your ReadyWage advance pool for <strong>TechCorp Philippines</strong> has dropped to
            <strong>30% of your funded amount</strong>. Employees can still request advances,
            but ReadyWage will be automatically paused when the balance reaches 10%.
          </p>

          <!-- Balance summary card -->
          <div class="rounded-lg border border-amber-200 bg-amber-50 p-4 space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-xs font-semibold text-amber-800 uppercase tracking-wide">Current Balance</span>
              <span class="text-sm font-bold text-amber-900 tabular-nums">₱238,000</span>
            </div>
            <div class="h-2 rounded-full bg-amber-100">
              <div class="h-full w-[30%] rounded-full bg-amber-500" role="progressbar" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100" aria-label="Balance at 30% of funded amount" />
            </div>
            <div class="flex justify-between text-xs text-amber-700">
              <span>30% remaining</span>
              <span>Funded: ₱800,000</span>
            </div>
          </div>

          <!-- Top-up instructions -->
          <div class="space-y-2">
            <p class="text-sm font-semibold text-gray-800">How to top up</p>
            <p class="text-sm text-gray-700 leading-relaxed">
              Transfer funds via PESONet from your operating account to restore your advance pool.
            </p>
            <div class="rounded-lg bg-gray-50 border border-gray-200 p-4 space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Netbank account</span>
                <span class="font-mono font-semibold text-gray-800">005-0010-00032-2</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Recommended top-up</span>
                <span class="font-semibold text-gray-800">₱402,000</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Restores balance to</span>
                <span class="text-gray-600">80% (₱640,000)</span>
              </div>
            </div>
          </div>

          <!-- CTA -->
          <div class="text-center pt-1">
            <RouterLink
              to="/employer/dashboard"
              class="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-brand text-white text-sm font-semibold hover:bg-brand/90 transition-colors"
            >
              View Account Dashboard
            </RouterLink>
          </div>

          <hr class="border-gray-100" />

          <p class="text-xs text-gray-500 leading-relaxed">
            Your account <strong>005-0010-00032-2</strong> is earning <strong>1.5% annual interest</strong> on your
            advance pool — ₱15,400 accrued since activation. Questions? Reply to this email or contact your CSM.
          </p>
        </div>

        <!-- Footer -->
        <div class="bg-gray-50 border-t border-gray-100 px-8 py-4 text-center">
          <p class="text-xs text-gray-400">ReadyWage by Sprout Solutions · alerts@readywage.sprout.ph</p>
          <p class="text-xs text-gray-400 mt-0.5">This is an automated alert for TechCorp Philippines.</p>
        </div>
      </div>

      <p class="text-center text-xs text-gray-400 mt-4">
        Email template preview — prototype only
      </p>
    </div>
  </div>
</template>
