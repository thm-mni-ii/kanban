<template>
    
    <v-container class="d-flex justify-center my-container" style="background-color:  #80BA27;" w-auto>
        <h1>Meine Boards</h1>
    </v-container>
    <div class="container">
        <div class="left"></div>
        <div class="right"></div>
    </div>
    <v-row class="myRow">
        <v-col cols="3" v-for="board in boards" :key="board.id">
            <!-- <router-link :to="{ name: 'kanban-board', params: { name: board.name }}">
                <v-card>{{ board.name }}</v-card>
            </router-link>-->
        </v-col>
        <v-col cols="3">
            <v-row>
            <v-text-field v-model="boardName" label="Hinzufügen" @keyup.enter="addBoard(boardName)"></v-text-field>    
            <v-btn class="add-board d-flex justify-center align-center" @click="addBoard">
                <v-icon large>mdi-plus</v-icon>
            </v-btn></v-row>
        </v-col>
    </v-row>
    <div></div>
    <v-btn @click="loadBoards">Load Boards</v-btn>
    <v-btn @click="goToApp">Go to App</v-btn>  
</template>

<script>
export default {
    data() {
        return {
            boards: [],
            boardName: '',
        };
    },
    created() {
        this.loadBoards();
    },
    methods: {
        async loadBoards() {
            try {
                const response = await fetch('http://localhost:3000/groups/1/boards/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                this.boards = data;
                console.log(this.boards);
            } catch (error) {
                console.error('There was an error!', error);
            }
        },
        async addBoard() {
            try {
                const response = await fetch('http://localhost:3000/groups/1/boards/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: this.boardName }),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                //console.log(data);
                this.boardName="";
            } catch (error) {
                console.error('There was an error!', error);
            }
        },
        goToApp() {
            console.log('Go to App');
            this.$router.push('/app')
                .then(() => {
                    console.log('Navigated to App');
                })
                .catch((error) => {
                    console.error('There was an error!', error);
                });
        },
    },
}
</script>

<style scoped>
.add-board {
    height: 200px;
    border-radius: 20px;
}

.container {
    display: flex;
    justify-content: space-between;
}

.left,
.right {
    width: 100px;
    /* Oder jede gewünschte Breite */
    height: 100px;
    /* Oder jede gewünschte Höhe */
}

.myRow {
    padding-left: 100px;
    padding-right: 100px;
}
</style>