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
    <h3>Tab 1: Basic Information</h3>
    <input v-model="props.event.name" placeholder="Event Name" />
    <input v-model="props.event.startDt" type="date" placeholder="Start Date" />
    <input v-model="props.event.endDt" type="date" placeholder="End Date" />
    <label>
      <input v-model="props.event.campusOn" type="checkbox" /> Campus On
    </label>
    <div v-if="props.event.campusOn">
      <input
        v-model="props.event.campusId"
        type="number"
        placeholder="Campus ID"
      />
    </div>
  </div>
</template>
