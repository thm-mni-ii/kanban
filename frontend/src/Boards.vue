<template>
    <v-container class="d-flex justify-center my-container" style="background-color:  #80BA27;" w-auto>
        <h1>Meine Boards</h1>
    </v-container>
    <v-row>
        <v-col cols="3" v-for="board in boards" :key="board.id">
            <v-card>{{ board.name }}</v-card>
        </v-col>
        <v-col cols="3">
            <v-btn class="add-board d-flex justify-center align-center" @click="addBoard">
                <v-icon large>mdi-plus</v-icon>
            </v-btn>
        </v-col>
    </v-row>
    <v-btn @click="loadBoards">Load Boards</v-btn>
</template>

<script>
export default {
    data() {
        return {
            boards: [],
        };
    },
    created() {
        this.loadBoards();
    },
    methods: {
        async loadBoards() {
            let response;
            try {
                response = await fetch(`http://localhost:3000/groups/1/boards`, {mode: 'no-cors'});
            } catch (error) {
                console.error('Error fetching data:', error);
                return;
            }

            let responseClone;
            try {
                responseClone = response.clone();
                const data = await response.json();
                this.boards = data;
                console.log(this.boards);
            } catch (rejectionReason) {
                console.log('Error parsing JSON from response:', rejectionReason);
                if (responseClone) {
                    const bodyText = await responseClone.text();
                    console.log('Received the following instead of valid JSON:', bodyText);
                }
            }
        },
        addBoard() {
            // Logik zum Hinzufügen eines neuen Boards
            // Dies ist nur ein Platzhalter, ersetzen Sie ihn durch Ihren tatsächlichen Code zum Hinzufügen eines neuen Boards
            console.log('Add board');
        },
    },
};
</script>

<style scoped>
.add-board {
    height: 200px;
    border-radius: 20px;
}
</style>