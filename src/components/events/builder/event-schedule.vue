<script lang="ts" setup>
import { Event, Session } from "@/entities/events";

const props = defineProps({
  event: {
    type: Object as PropType<Event>,
    required: true,
  },
});

props.event.sessions[0]

const addSession = () => {
  props.event.sessions.push(
    new Session({ name: "", startTime: "", endTime: "" })
  );
};
</script>

<template>
  <div>
    <h3>Tab 3: Sessions</h3>
    <div v-for="(session, index) in props.event.sessions" :key="index">
      <input v-model="session.name" placeholder="Session Name" />
      <input
        v-model="session.startTime"
        type="datetime-local"
        placeholder="Start Time"
      />
      <input
        v-model="session.endTime"
        type="datetime-local"
        placeholder="End Time"
      />
    </div>
    <button @click="addSession">Add Session</button>
  </div>
</template>
