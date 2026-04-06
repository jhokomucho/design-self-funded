<script setup lang="ts">
// Stack: Toge v2 (shadcn-vue registry · @toge)
// Screen 6 — ReadyWage Deactivation Email (10% threshold)
</script>

<template>
  <div class="min-h-screen bg-gray-100 py-10 px-4">
    <div class="mx-auto max-w-lg">
      <!-- Email client chrome -->
      <div class="mb-3 text-xs text-gray-500 space-y-0.5">
        <p><strong>From:</strong> ReadyWage Alerts &lt;alerts@readywage.sprout.ph&gt;</p>
        <p><strong>To:</strong> ana.reyes@techcorp.ph</p>
        <p><strong>Subject:</strong> 🚫 ReadyWage paused — TechCorp Philippines (action required)</p>
      </div>

      <!-- Email body -->
      <div class="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">

        <!-- Header — red, urgent -->
        <div class="bg-red-50 border-b border-red-200 px-8 py-6">
          <div class="flex items-center gap-3">
            <div class="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0" aria-hidden="true">
              <svg class="h-4 w-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
            </div>
            <div>
              <p class="text-xs font-medium text-red-700 uppercase tracking-wide">ReadyWage Paused</p>
              <p class="text-sm font-semibold text-red-900 mt-0.5">Employees cannot request advances</p>
            </div>
          </div>
        </div>

        <div class="px-8 py-6 space-y-5">
          <p class="text-sm text-gray-700">Hi Ana,</p>
          <p class="text-sm text-gray-700 leading-relaxed">
            ReadyWage for <strong>TechCorp Philippines</strong> has been automatically paused because your
            advance pool balance dropped to <strong>10% (₱78,000)</strong> of your funded amount.
            No new advance requests can be processed until you top up.
          </p>

          <!-- Balance card — critical state -->
          <div class="rounded-lg border border-red-200 bg-red-50 p-4 space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-xs font-semibold text-red-800 uppercase tracking-wide">Current Balance</span>
              <span class="text-sm font-bold text-red-900 tabular-nums">₱78,000</span>
            </div>
            <div class="h-2 rounded-full bg-red-100">
              <div class="h-full w-[10%] rounded-full bg-red-500" role="progressbar" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100" aria-label="Balance at 10% of funded amount — ReadyWage paused" />
            </div>
            <div class="flex justify-between text-xs text-red-700">
              <span class="font-semibold">ReadyWage: PAUSED</span>
              <span>Funded: ₱800,000</span>
            </div>
          </div>

          <!-- How to restore -->
          <div class="space-y-2">
            <p class="text-sm font-semibold text-gray-800">Restore ReadyWage</p>
            <p class="text-sm text-gray-700 leading-relaxed">
              Transfer funds to your Netbank advance pool account via PESONet.
              ReadyWage will be automatically restored once your balance is confirmed above 10%.
            </p>
            <div class="rounded-lg bg-gray-50 border border-gray-200 p-4 space-y-2">
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Netbank account</span>
                <span class="font-mono font-semibold text-gray-800">005-0010-00032-2</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Minimum top-up to restore</span>
                <span class="font-semibold text-gray-800">₱80,000</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-500">Recommended top-up</span>
                <span class="font-semibold text-gray-800">₱562,000 → 80%</span>
              </div>
            </div>
          </div>

          <!-- If transfer was already sent -->
          <div class="rounded-lg border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600 space-y-1">
            <p class="font-semibold text-gray-800">Already sent a transfer?</p>
            <p>PESONet transfers may take up to 24 hours to settle. If you've already sent funds, contact your CSM with your transaction reference and we'll manually restore ReadyWage.</p>
            <p class="mt-2">
              <a href="mailto:ops@sprout.ph?subject=Manual reactivation request — TechCorp Philippines" class="text-brand underline font-medium">
                ops@sprout.ph
              </a>
            </p>
          </div>

          <!-- CTA -->
          <div class="text-center pt-1">
            <RouterLink
              to="/employer/dashboard"
              class="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-red-600 text-white text-sm font-semibold hover:bg-red-700 transition-colors"
            >
              View Account &amp; Top Up
            </RouterLink>
          </div>

          <hr class="border-gray-100" />

          <p class="text-xs text-gray-500 leading-relaxed">
            Your ReadyWage account continues to earn <strong>1.5% annual interest</strong> — even while paused.
            Questions? Reply to this email or call your CSM directly.
          </p>
        </div>

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
