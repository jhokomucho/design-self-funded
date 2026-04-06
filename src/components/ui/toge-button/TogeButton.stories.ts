import type { Meta, StoryObj } from '@storybook/vue3-vite'

import { uiInstallMarkdown } from '@/lib/storybook-install-docs'

import TogeButton from './TogeButton.vue'

const meta = {
  title: 'Toge UI/Button',
  component: TogeButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: uiInstallMarkdown('toge-button'),
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    tone: {
      control: 'select',
      options: ['neutral', 'success', 'danger'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'icon-small', 'icon-medium', 'icon-large'],
    },
  },
} satisfies Meta<typeof TogeButton>

export default meta

type Story = StoryObj<typeof meta>

// ── Playground ────────────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    variant: 'primary',
    tone: 'neutral',
    size: 'medium',
  },
  render: (args: Story['args']) => ({
    components: { TogeButton },
    setup() {
      return { args }
    },
    template: '<TogeButton v-bind="args">Label</TogeButton>',
  }),
}

// ── Variant × Tone matrix ─────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => ({
    components: { TogeButton },
    template: `
      <div class="flex flex-col gap-6">
        <div v-for="tone in ['neutral', 'success', 'danger']" :key="tone" class="flex flex-col gap-2">
          <p class="text-300 font-medium capitalize text-base">{{ tone }}</p>
          <div class="flex flex-wrap gap-3">
            <TogeButton :tone="tone" variant="primary">Primary</TogeButton>
            <TogeButton :tone="tone" variant="secondary">Secondary</TogeButton>
            <TogeButton :tone="tone" variant="tertiary">Tertiary</TogeButton>
          </div>
        </div>
      </div>
    `,
  }),
}

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  render: () => ({
    components: { TogeButton },
    template: `
      <div class="flex flex-col gap-8">
        <div class="flex flex-wrap items-end gap-6">
          <div v-for="s in [
            { size: 'small',  label: 'Small',  height: '28px' },
            { size: 'medium', label: 'Medium', height: '36px' },
            { size: 'large',  label: 'Large',  height: '44px' },
          ]" :key="s.size" class="flex flex-col items-start gap-2">
            <TogeButton :size="s.size">Label</TogeButton>
            <div class="flex flex-col gap-0.5">
              <span class="text-200 font-medium text-base">{{ s.label }}</span>
              <span class="text-200 text-base">h={{ s.height }}</span>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap items-end gap-6">
          <div v-for="s in [
            { size: 'icon-small',  label: 'Icon small',  dim: '28×28px' },
            { size: 'icon-medium', label: 'Icon medium', dim: '36×36px' },
            { size: 'icon-large',  label: 'Icon large',  dim: '44×44px' },
          ]" :key="s.size" class="flex flex-col items-start gap-2">
            <TogeButton :size="s.size" aria-label="add">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </TogeButton>
            <div class="flex flex-col gap-0.5">
              <span class="text-200 font-medium text-base">{{ s.label }}</span>
              <span class="text-200 text-base">{{ s.dim }}</span>
            </div>
          </div>
        </div>
      </div>
    `,
  }),
}

export const IconSizes: Story = {
  render: () => ({
    components: { TogeButton },
    template: `
      <div class="flex flex-wrap items-end gap-6">
        <div v-for="s in [
          { size: 'icon-small',  label: 'icon-small',  dim: '28×28px' },
          { size: 'icon-medium', label: 'icon-medium', dim: '36×36px' },
          { size: 'icon-large',  label: 'icon-large',  dim: '44×44px' },
        ]" :key="s.size" class="flex flex-col items-start gap-2">
          <TogeButton :size="s.size" aria-label="add">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </TogeButton>
          <div class="flex flex-col gap-0.5">
            <span class="text-200 font-medium text-base">{{ s.label }}</span>
            <span class="text-200 text-base">{{ s.dim }}</span>
          </div>
        </div>
      </div>
    `,
  }),
}

// ── States ────────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  render: () => ({
    components: { TogeButton },
    template: `
      <div class="flex flex-col gap-4">
        <div v-for="tone in ['neutral', 'success', 'danger']" :key="tone" class="flex flex-wrap gap-3">
          <TogeButton :tone="tone" variant="primary" disabled>Primary</TogeButton>
          <TogeButton :tone="tone" variant="secondary" disabled>Secondary</TogeButton>
          <TogeButton :tone="tone" variant="tertiary" disabled>Tertiary</TogeButton>
        </div>
      </div>
    `,
  }),
}

export const Loading: Story = {
  render: () => ({
    components: { TogeButton },
    template: `
      <div class="flex flex-wrap gap-3">
        <TogeButton variant="primary" tone="neutral" loading>Save</TogeButton>
        <TogeButton variant="secondary" tone="neutral" loading>Save</TogeButton>
        <TogeButton variant="tertiary" tone="neutral" loading>Save</TogeButton>
      </div>
    `,
  }),
}

// ── Fullwidth ─────────────────────────────────────────────────────────────────

export const Fullwidth: Story = {
  render: () => ({
    components: { TogeButton },
    template: `
      <div class="flex flex-col gap-3 w-80">
        <TogeButton fullwidth>Full width primary</TogeButton>
        <TogeButton variant="secondary" fullwidth>Full width secondary</TogeButton>
      </div>
    `,
  }),
}

// ── Dark mode ─────────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => ({
    components: { TogeButton },
    setup() {
      const lightTones = [
        {
          name: 'neutral',
          primary: {
            role: 'bg',
            token: '--neutral → mushroom-100',
            hex: '#e6eaea',
            text: { token: '--on-neutral → mushroom-950', hex: '#262b2b' },
          },
          secondary: { role: 'border', token: '--neutral-border → mushroom-300', hex: '#b8c1c0' },
          tertiary: { role: 'text', token: '--neutral-text → mushroom-700', hex: '#4c5857' },
        },
        {
          name: 'success',
          primary: {
            role: 'bg',
            token: '--brand → kangkong-700',
            hex: '#158039',
            text: { token: '--on-brand → white', hex: '#ffffff' },
          },
          secondary: { role: 'border', token: '--brand → kangkong-700', hex: '#158039' },
          tertiary: { role: 'text', token: '--brand-text → kangkong-800', hex: '#166531' },
        },
        {
          name: 'danger',
          primary: {
            role: 'bg',
            token: '--danger → tomato-600',
            hex: '#da2f38',
            text: { token: '--on-danger → white', hex: '#ffffff' },
          },
          secondary: { role: 'border', token: '--danger → tomato-600', hex: '#da2f38' },
          tertiary: { role: 'text', token: '--danger-text → tomato-700', hex: '#b61f27' },
        },
      ]
      const darkTones = [
        {
          name: 'neutral',
          primary: {
            role: 'bg',
            token: '--neutral → mushroom-300',
            hex: '#b8c1c0',
            text: { token: '--on-neutral → mushroom-950', hex: '#262b2b' },
          },
          secondary: { role: 'border', token: '--neutral-border → mushroom-600', hex: '#5d6c6b' },
          tertiary: { role: 'text', token: '--neutral-text → mushroom-300', hex: '#b8c1c0' },
        },
        {
          name: 'success',
          primary: {
            role: 'bg',
            token: '--brand → kangkong-500',
            hex: '#22c558',
            text: { token: '--on-brand → kangkong-950', hex: '#052e15' },
          },
          secondary: { role: 'border', token: '--brand → kangkong-500', hex: '#22c558' },
          tertiary: { role: 'text', token: '--brand-text → kangkong-300', hex: '#86efa8' },
        },
        {
          name: 'danger',
          primary: {
            role: 'bg',
            token: '--danger → tomato-400',
            hex: '#f6737a',
            text: { token: '--on-danger → tomato-950', hex: '#440b0e' },
          },
          secondary: { role: 'border', token: '--danger → tomato-400', hex: '#f6737a' },
          tertiary: { role: 'text', token: '--danger-text → tomato-300', hex: '#fba6aa' },
        },
      ]
      return { lightTones, darkTones }
    },
    template: `
      <div class="flex gap-0 overflow-hidden rounded-[10px] border border-mushroom-200">

        <!-- Light -->
        <div class="flex flex-1 flex-col gap-6 bg-mushroom-50 p-6">
          <span class="text-200 font-medium tracking-wide text-base uppercase">Light</span>

          <div v-for="tone in lightTones" :key="'light-' + tone.name" class="flex flex-col gap-3">
            <span class="text-200 capitalize text-base">{{ tone.name }}</span>

            <div class="grid grid-cols-3 gap-x-3 gap-y-1">
              <template v-for="variant in ['primary', 'secondary', 'tertiary']" :key="variant">
                <div class="flex flex-col gap-2">
                  <TogeButton :tone="tone.name" :variant="variant">
                    {{ variant.charAt(0).toUpperCase() + variant.slice(1) }}
                  </TogeButton>
                  <div class="flex flex-col gap-0.5 pl-0.5">
                    <div class="flex items-center gap-1.5">
                      <span
                        class="size-2.5 shrink-0 rounded-sm ring-1 ring-black/10"
                        :style="{ background: tone[variant].hex }"
                      ></span>
                      <span class="font-mono text-[10px] text-base">{{ tone[variant].hex }}</span>
                    </div>
                    <span class="font-mono text-[10px] leading-tight text-base">{{ tone[variant].role }}: {{ tone[variant].token }}</span>
                    <template v-if="tone[variant].text">
                      <div class="mt-0.5 flex items-center gap-1.5">
                        <span
                          class="size-2.5 shrink-0 rounded-sm ring-1 ring-black/10"
                          :style="{ background: tone[variant].text.hex }"
                        ></span>
                        <span class="font-mono text-[10px] text-base">{{ tone[variant].text.hex }}</span>
                      </div>
                      <span class="font-mono text-[10px] leading-tight text-base">text: {{ tone[variant].text.token }}</span>
                    </template>
                  </div>
                </div>
              </template>
            </div>

            <div class="flex flex-wrap gap-2">
              <TogeButton :tone="tone.name" variant="primary" disabled>Primary</TogeButton>
              <TogeButton :tone="tone.name" variant="secondary" disabled>Secondary</TogeButton>
              <TogeButton :tone="tone.name" variant="tertiary" disabled>Tertiary</TogeButton>
            </div>
          </div>
        </div>

        <!-- Dark -->
        <div class="dark flex flex-1 flex-col gap-6 bg-mushroom-950 p-6">
          <span class="text-200 font-medium tracking-wide text-base uppercase">Dark</span>

          <div v-for="tone in darkTones" :key="'dark-' + tone.name" class="flex flex-col gap-3">
            <span class="text-200 capitalize text-base">{{ tone.name }}</span>

            <div class="grid grid-cols-3 gap-x-3 gap-y-1">
              <template v-for="variant in ['primary', 'secondary', 'tertiary']" :key="variant">
                <div class="flex flex-col gap-2">
                  <TogeButton :tone="tone.name" :variant="variant">
                    {{ variant.charAt(0).toUpperCase() + variant.slice(1) }}
                  </TogeButton>
                  <div class="flex flex-col gap-0.5 pl-0.5">
                    <div class="flex items-center gap-1.5">
                      <span
                        class="size-2.5 shrink-0 rounded-sm ring-1 ring-white/10"
                        :style="{ background: tone[variant].hex }"
                      ></span>
                      <span class="font-mono text-[10px] text-base">{{ tone[variant].hex }}</span>
                    </div>
                    <span class="font-mono text-[10px] leading-tight text-base">{{ tone[variant].role }}: {{ tone[variant].token }}</span>
                    <template v-if="tone[variant].text">
                      <div class="mt-0.5 flex items-center gap-1.5">
                        <span
                          class="size-2.5 shrink-0 rounded-sm ring-1 ring-white/10"
                          :style="{ background: tone[variant].text.hex }"
                        ></span>
                        <span class="font-mono text-[10px] text-base">{{ tone[variant].text.hex }}</span>
                      </div>
                      <span class="font-mono text-[10px] leading-tight text-base">text: {{ tone[variant].text.token }}</span>
                    </template>
                  </div>
                </div>
              </template>
            </div>

            <div class="flex flex-wrap gap-2">
              <TogeButton :tone="tone.name" variant="primary" disabled>Primary</TogeButton>
              <TogeButton :tone="tone.name" variant="secondary" disabled>Secondary</TogeButton>
              <TogeButton :tone="tone.name" variant="tertiary" disabled>Tertiary</TogeButton>
            </div>
          </div>
        </div>

      </div>
    `,
  }),
}
