<script lang="ts" setup>
import { Event } from "@/entities/events";
import eventOverview from "./event-overview.vue";
import eventPlanning from "./event-planning.vue";
import eventSchedule from "./event-schedule.vue";

const eventEdit = {
  id: 12,
  name: "123",
};

const event = ref<Event>(new Event(eventEdit));
const currentTabId = ref(1);

// Xác định các tab khả dụng dựa trên điều kiện
const availableTabs = computed(() => {
  return event.value.campusOn ? [1, 2, 3] : [1, 3];
});

// Chuyển tab và kiểm tra tính hợp lệ
const validateTab = async () => {
  let errors: string[] = [];
  if (currentTabId.value === 1) {
    errors = event.value.validateTab1();
  } else if (currentTabId.value === 2 && event.value.campusOn) {
    errors = event.value.validateTab2();
  } else if (currentTabId.value === 3) {
    errors = event.value.validateTab3();
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return false;
  }
  return true;
};

const goToNextTab = async () => {
  const isValid = await validateTab();
  if (isValid) {
    const nextTabIndex = availableTabs.value.indexOf(currentTabId.value) + 1;
    if (nextTabIndex < availableTabs.value.length) {
      currentTabId.value = availableTabs.value[nextTabIndex];
    }
  }
};

const goToPreviousTab = () => {
  const prevTabIndex = availableTabs.value.indexOf(currentTabId.value) - 1;
  if (prevTabIndex >= 0) {
    currentTabId.value = availableTabs.value[prevTabIndex];
  }
};

const saveEvent = () => {
  console.log(unref(event));
};

// Watch for changes to event dates and sync sessions
watch(
  () => [event.value.startDt, event.value.endDt],
  () => {
    if (event.value.startDt && event.value.endDt) {
      event.value.syncSessionsWithEventDates();
    }
  }
);
</script>

<template>
  <div>
    <div>
      <button
        :disabled="availableTabs.indexOf(currentTabId) === 0"
        @click="goToPreviousTab"
      >
        Previous
      </button>
      <button
        :disabled="
          availableTabs.indexOf(currentTabId) === availableTabs.length - 1
        "
        @click="goToNextTab"
      >
        Next
      </button>
      <button v-if="currentTabId === 3" @click="saveEvent">Save</button>
    </div>

    <div v-if="currentTabId === 1">
      <event-overview :event="event" />
    </div>
    <div v-if="currentTabId === 2 && event.campusOn">
      <event-planning :event="event" />
    </div>
    <div v-if="currentTabId === 3">
      <event-schedule :event="event" />
    </div>
  </div>
</template>
