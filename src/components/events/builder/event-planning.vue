<script lang="ts" setup>
import { Event } from "@/entities/events";

const props = defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true,
  },
});
</script>

<template>
  <div>
    <h3>Tab 2: Planning Information</h3>
    <input
      v-model="props.event.planning.budget"
      type="number"
      placeholder="Budget"
    />
    <input
      v-model="props.event.planning.date"
      type="date"
      placeholder="Planning Date"
    />
  </div>
</template>
