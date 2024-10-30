<template>
  <v-dialog v-model="dialog" persistent max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">{{isEdit ? "Bearbeiten" : "Hinzüfugen"}} Zeit</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field v-model="timeName" label="Name" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="timeDescription" label="Beschreibung" required></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="timeStart" label="Anfang" required></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="timeDurationHours" label="Stunden" required type="number"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="timeDurationMinutes" label="Minuten" required type="number"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
        <v-btn color="blue darken-1" text @click="addTrack">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { ref } from 'vue';
import {TimeTrackingService} from "@/lib/timetracking.service";
import {BoardService} from "@/lib/board.service";

export interface AddTimeTrackProps {
  groupId: number;
  boardId: number;
  cardId: number;
  timeTrack?: TimeTrack;
}

export default {
  props: ["card", "groupId", "boardId"],
  setup(props: AddTimeTrackProps, { emit }) {
    const dialog = ref(false);
    const timeName = ref(props.card?.name ?? '');
    const timeDescription = ref('');
    const timeStart = ref(new Date().toISOString().split('T')[0]);
    const timeDurationHours = ref(0);
    const timeDurationMinutes = ref(0);
    const isEdit = Boolean()

    const addTrack = async () => {
      const newTrack = {
        group_id: props.groupId,
        activity_start: timeStart.value,
        activity_duration: Number.parseInt(timeDurationHours.value) * 60 + Number.parseInt(timeDurationMinutes.value),
        title: timeName.value,
        description: timeDescription.value,
      };
      try {
        await (isEdit ? TimeTrackingService.updateTimeTracker : BoardService.trackTime)(props.groupId, props.boardId, props.card.kantask_id, newTrack);
        timeName.value = "";
        timeDescription.value = "";
        timeStart.value = "";
        timeDurationHours.value = "";
        timeDurationMinutes.value = "";
        emit('timetrackAdded');
        dialog.value = false;
      } catch (error) {
        console.error('There was an error!', error);
      }
    };

    const showDialog = () => {
      dialog.value = true;
    };

    return {
      dialog,
      timeName,
      timeDescription,
      timeStart,
      timeDurationHours,
      timeDurationMinutes,
      addTrack,
      showDialog,
      isEdit,
    };
  },
};
</script>
