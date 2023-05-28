<template>
  <q-page class="q-ma-lg">
    <div class="page-title-container">
      <h4>Visit schedule</h4>

    </div>

    <div class="form--field custom--option--group" style="align-items: center;">
      <div>
        <q-option-group v-model="dayIdsWithSideEffect"
          :options="allDays.map(x => <OptionGroup>{ value: x.dayId, label: x.displayName })" color="green"
          type="checkbox" />
      </div>

    </div>


    <div v-for="day in workingTimeForDay" :key="day.dayId.toString()" style="display: flex; justify-content: center;">
      <div class="time-section" v-if="day.workingIntervals">
        <div style="margin-right: 10px; min-width: 90px">{{ getDayByDyId(day.dayId.toString())?.fullName }}</div>
        <div>
          <div class="day-time-settings-flex">

            <div class="day-time-settings-interval" v-for="(interval, index) in day.workingIntervals" :key="index">
              <div>
                <q-input dense class="custom-time-input" v-model="interval.startHours" mask="time" rounded outlined>
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer time-icon">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="interval.startHours" color="teal-8">
                          <div class="row items-center justify-end">
                            <!-- <q-btn v-close-popup label="Close" flat></q-btn> -->
                            <q-btn v-close-popup rounded no-caps color="teal-9" label="Close" flat />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="spacer">
                to
              </div>
              <div>
                <q-input dense class="custom-time-input" v-model="interval.endHours" mask="time" rounded outlined>
                  <template v-slot:append>
                    <q-icon name="access_time" class="cursor-pointer">
                      <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="interval.endHours" color="teal-8">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup rounded no-caps color="teal-9" label="Close" flat />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div>
                <q-btn v-if="index === (day.workingIntervals.length - 1)" round color="black" icon="add" size="xs"
                  style="margin-left: 10px;" @click="addInterval(day.dayId.toString())" />
                <q-btn v-if="index > 0" round color="black" icon="remove" size="xs" style="margin-left: 10px;"
                  @click="removeInterval(day.dayId.toString(), index)" />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
    <div style="display: flex; justify-content: center; margin-top: 10px;">
      <q-btn color="generic-color" rounded>
      <q-icon left size="2em" name="upload" />
      <div style="margin-right: 10px;">Save</div>
    </q-btn>
    </div>

  </q-page>
</template>


<script setup lang="ts">
import { DayOfWeek, DayTimeline, OptionGroup, WorkingTimeForDay } from 'src/models/Visits';
import { computed, ref } from 'vue';

const dayIds = ref([] as string[]);
const oldDayIds = ref([] as string[]);

dayIds.value.push('mon');
dayIds.value.push('wed');
dayIds.value.push('fri');

const allDays = ref([] as DayOfWeek[]);
allDays.value.push({ dayId: 'mon', displayName: 'M', fullName: 'Monday' } as unknown as DayOfWeek);
allDays.value.push({ dayId: 'tue', displayName: 'T', fullName: 'Tuesday' } as unknown as DayOfWeek);
allDays.value.push({ dayId: 'wed', displayName: 'W', fullName: 'Wednesday' } as unknown as DayOfWeek);
allDays.value.push({ dayId: 'thu', displayName: 'T', fullName: 'Thursday' } as unknown as DayOfWeek);
allDays.value.push({ dayId: 'fri', displayName: 'F', fullName: 'Friday' } as unknown as DayOfWeek);
allDays.value.push({ dayId: 'sat', displayName: 'S', fullName: 'Saturday' } as unknown as DayOfWeek);
allDays.value.push({ dayId: 'sun', displayName: 'S', fullName: 'Sunday' } as unknown as DayOfWeek);

oldDayIds.value = dayIds.value;

const workingTimeForDay = ref([] as WorkingTimeForDay[]);

const startHour = '15:30';
const endHour = '16:30';


let workingTime = new WorkingTimeForDay('mon' as string);
workingTime.workingIntervals?.push(new DayTimeline(startHour, endHour));
workingTime.workingIntervals?.push(new DayTimeline(startHour, endHour));
workingTime.workingIntervals?.push(new DayTimeline(startHour, endHour));
workingTimeForDay.value.push(workingTime);

workingTime = new WorkingTimeForDay('wed' as unknown as string);
workingTime.workingIntervals?.push(new DayTimeline(startHour, endHour));
workingTime.workingIntervals?.push(new DayTimeline(startHour, endHour));
workingTimeForDay.value.push(workingTime);

workingTime = new WorkingTimeForDay('fri' as unknown as string);
workingTime.workingIntervals?.push(new DayTimeline(startHour, endHour));
workingTimeForDay.value.push(workingTime);

const defaultStartHour = '08:00';
const defaultEndHour = '18:00';

function getDayByDyId(dayId: string) {
  return allDays.value.find(i => i.dayId.toString() === dayId)
}

function addInterval(dayId: string) {
  let day = workingTimeForDay.value.find((d) => d.dayId.toString() === dayId);
  let newInterval = new DayTimeline(defaultStartHour, defaultEndHour);

  // Add the new interval to the day's workingIntervals array
  if (day && day.workingIntervals) {
    day.workingIntervals.push(newInterval);
  }
  console.log(day);
}

function removeInterval(dayId: string, index: number) {
  let day = workingTimeForDay.value.find((d) => d.dayId.toString() === dayId);

  // Remove the interval at the given index from the day's workingIntervals array
  if (day && day.workingIntervals) {
    day.workingIntervals.splice(index, 1);
  }
}

const dayIdsWithSideEffect = computed({
  get() {
    return dayIds.value;
  },
  set(newVal) {
    console.log(oldDayIds.value)
    const changedValue = newVal.length > oldDayIds.value.length ? newVal.find(x => !oldDayIds.value.includes(x)) : oldDayIds.value.find(x => !newVal.includes(x));
    const checked = newVal.length > oldDayIds.value.length;
    handleCheckboxChange(changedValue, checked);
    oldDayIds.value = newVal;
    dayIds.value = newVal;
  }
});


function handleCheckboxChange(value, checked) {
  if (checked) {
    let workingTime = new WorkingTimeForDay(value);
    workingTime.workingIntervals?.push(new DayTimeline(defaultStartHour, defaultEndHour));
    workingTimeForDay.value.push(workingTime);
  }
  else {
    workingTimeForDay.value = workingTimeForDay.value.filter(item => item.dayId.toString() !== value) || [];
  }

  workingTimeForDay.value = workingTimeForDay.value.sort((a, b) => {
    const aIndex = allDays.value.findIndex(day => day.dayId.toString() === a.dayId.toString());
    const bIndex = allDays.value.findIndex(day => day.dayId.toString() === b.dayId.toString());
    return aIndex - bIndex;
  }) || [];
}

</script>
