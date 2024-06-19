<template>
    <v-app>
        <v-container v-if="isStart">
            <v-card v-for="(item, index) in items" :key="index"  class="mb-4"
                :style="{ backgroundColor: getColorFromId(item.group) }" @click="onGroupCardClick(item.group)">
                <v-card-title>
                    GruppeID: {{ item.group }}
                </v-card-title>
            </v-card>
            <div v-if="groupSelected">
                Ausgewählte Gruppe: {{ groupSelected }}
                <ul>
                    <li v-for="member in selectedGroupMembers" :key="member.id">
                        {{ member.first_name }} {{ member.last_name }}
                    </li>
                </ul>
            </div>
        </v-container>
        <router-view v-if="!isStart" </router-view> 
    </v-app>
</template>

<script>

import { getColorFromId } from './colorHelper';

export default {
    data() {
        return {
            items: [],
            mockData: [],
            groupSelected: null,
            selectedGroupMembers: []
        };
    },
    computed: {
        isStart() {
            return this.$route.path === '/';
        }
    },
    created() {
        fetch('/groups.json')
            .then(response => response.json())
            .then(data => {
                this.items = data;
            });

        fetch('/MOCK_DATA.json')
            .then(response => response.json())
            .then(data => {
                this.mockData = data;
            });
    },
    methods: {
        selectGroup(groupId) {
            this.groupSelected = groupId;
            const group = this.items.find(item => item.group === groupId);
            this.selectedGroupMembers = this.mockData.filter(member => group.members.includes(member.id));
        },
        getColorFromId,

        onGroupCardClick(groupId) {
            this.$router.push({ name: 'Boards', params: { groupId: groupId } });
        }
    },
}
</script>

<style scoped></style>