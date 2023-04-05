<template>
  <v-row>
    <v-col class="text-center">
      {{ 'TEST' }}
      <v-list>
        <v-list-item
          v-for="item in taskList"
          :key="item.id"
          :title="item.task_name"
          subtitle="..."
        >
          {{ item.task_name }}
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Tasks',
  data: () => ({
    items: [
      {
        title: 'Item #1',
        value: 1,
      },
      {
        title: 'Item #2',
        value: 2,
      },
      {
        title: 'Item #3',
        value: 3,
      },
    ],
  }),
  computed: {
    ...mapGetters({ taskList: 'tasks/list' }),
  },
  created() {
    console.log(`Task component is now CREATED.`)
  },
  mounted() {
    console.log(`Task component is now mounted.`)
    this.fetchTaskList()
  },
  activated() {
    console.log(`Task component is now ACTIVATED.`)
  },
  methods: {
    fetchTaskList() {
      console.log('....abcd...................')
      this.$store.dispatch('tasks/lists')
    },
  },
}
</script>
