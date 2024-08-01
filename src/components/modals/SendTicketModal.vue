<template>
  <Modal :is-show="step === 'before'" title="1"></Modal>
  <Modal :is-show="step === 'after'" title="2"></Modal>
</template>
<script setup lang="ts">
import Modal from '@/components/modals/Modal.vue'

const props = defineProps<{
  step: 'closed' | 'before' | 'after'
  title: string
}>()
</script>
