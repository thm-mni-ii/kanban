<template>//
  <div class="container mt-5">
    <div class="row">
      <div class="col form-inline">
        <div class="form-group mb-2">
          <input type="text" class="form-control input-sm" v-model="newTask" placeholder="Task name" @keyup.enter="addTask">
        </div>
        <div class="form-group mx-sm-3 mb-2">
          <button type="button"class="btn btn-primary" @click="addTask">Add Task</button>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-md-3">
        <div class="p2 alert alert-primary">
          <h3>Backlog</h3>
          <draggable v-model="arrBacklog" class="list-group kanban-dropzone"group="tasks">
            <template v-slot:item="{ element }">
              <div class="list-group-item">
                {{ element.name }}
              </div>
            </template>
          </draggable>
        </div>
      </div>
      <div class="col-md-3">
        <div class="p2 alert alert-danger">
          <h3>Working On</h3>
          <draggable v-model="arrWorkingOn" class="list-group kanban-dropzone"group="tasks">
            <template v-slot:item="{ element }">
              <div class="list-group-item">
                {{ element.name }}
              </div>
            </template>
          </draggable>
        </div>
      </div>
      <div class="col-md-3">
        <div class="p2 alert alert-warning">
          <h3>In Review</h3>
          <draggable v-model="arrReview" class="list-group kanban-dropzone" group="tasks">
            <template v-slot:item="{ element }">
              <div class="list-group-item">
                {{ element.name }}
              </div>
            </template>
          </draggable>
        </div>
      </div>
      <div class="col-md-3">
        <div class="p2 alert alert-success">
          <h3>Done</h3>
          <draggable v-model="arrDone" class="list-group kanban-dropzone" group="tasks">
            <template v-slot:item="{ element }">
              <div class="list-group-item">
                {{ element.name }}
              </div>
            </template>
          </draggable>
        </div>
      </div>
    </div>

    


  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  data() {
    return {
      newTask: '',
      arrBacklog: [
        { name: 'Task 1' },
        { name: 'Task 2' },
      ],
      arrWorkingOn: [],
      arrReview: [],
      arrDone: [],

    };
  },
  
  dragging: false,

  methods: {
    addTask() {
      if (this.newTask) {
        this.arrBacklog.push({ name: this.newTask });
        this.newTask = '';
      }
    }
  },
}
</script>

<style>
.input-sm {
  width: 200px;
}
.kanban-dropzone{
  min-height: 100px;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 10px;
}
</style>
