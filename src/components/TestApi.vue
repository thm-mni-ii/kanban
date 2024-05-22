<template>
    <v-btn @click="getAllUsers">Get Users</v-btn>
    </template>
    
    <script>
    export default {
        data(){
            return {
                users: [],
                user: null,
            };
        },
        methods: {
            getAllUsers() {
                fetch('http://localhost:3002/users/')
                    .then(response => response.json())
                    .then(data => {
                        this.user = data;
                        console.log(data);
                    })
                    .catch(error => {
                        console.error(error);
                    });
            }
        }
    }
    </script>