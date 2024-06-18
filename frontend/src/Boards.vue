<template>

    <v-container class="d-flex justify-center my-container" style="background-color:  #80BA27;" w-auto>
        <h1>Meine Boards</h1>
    </v-container>
    <div class="d-flex  flex-column align-items-center justify-center" style="max-width: 500px;">
        <v-card v-for="board in boards" :key="board.boardId" class="mb-4"
        @click="goToApp(board)"
        variant="outlined" 
        >
            <v-card-title>
                {{ board.name }}
            </v-card-title>
        </v-card>
        <v-btn 
         @click="dialog = true" 
         class="mt-5" 
         style="width: 500px;"
         color="#5865f2">
            <v-icon left>mdi-plus</v-icon>
            Add Board
        </v-btn>
    </div>
    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
            <v-card-title>
                <span class="headline">New Board</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12">
                            <v-text-field v-model="boardName" label="Board Name" required></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                <v-btn color="blue darken-1" text @click="addBoard">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
    <div>
        <v-switch label="Buttons" v-model="buttonsActivated"
         class="primary"
        ></v-switch>
        <v-btn @click="loadBoards" v-if="buttonsActivated">Load Boards</v-btn>
        <v-btn @click="goToApp" v-if="buttonsActivated">Go to App</v-btn>
        <v-btn @click="home" v-if="buttonsActivated">Home</v-btn>
    </div>
</template>

<script>
export default {
    data() {
        return {
            boards: [],
            boardName: '',
            dialog: false,
            buttonsActivated: false,
        };
    },
    created() {
        this.loadBoards();
    },
    methods: {
        home(){
            this.$router.push('/')
        },
        async showsBoards(){
            console.log(this.boards);
        },
        async loadBoards() {
            try {
                const groupId = this.$route.params.groupId;
                const response = await fetch(`http://localhost:3000/groups/${groupId}/boards/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                this.boards = data;
                console.log(data);
            } catch (error) {
                console.error('There was an error!', error);
            }
        },
        async addBoard() {
            const groupId = this.$route.params.groupId;
            try {
                const response = await fetch(`http://localhost:3000/groups/${groupId}/boards/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: this.boardName }),
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                this.boardName = "";
                this.dialog = false;
                this.loadBoards();
            } catch (error) {
                console.error('There was an error!', error);
            }
        },
        goToApp(board) {
            this.$router.push(`/groups/${this.$route.params.groupId}/boards/${board.board_id}`);
            console.log(board);
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