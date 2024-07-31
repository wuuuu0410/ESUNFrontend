<script>
import api from '@/stores/api';
import { mapState, mapActions } from 'pinia';
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            name:null,
            mail:null
        };
    },
    created() {

    },
    mounted() {

    },
    computed: {
        
    },
    components: {

    },

    methods: {
        ...mapActions(api, ['createEmployee']),
        //防呆
        verify(){
            if(this.name == null || this.mail == null  ){
                Swal.fire({
                    title: "新增失敗",
                    html: `<p>請輸入姓名和信箱</p>`,
                    showCloseButton: true,
                    showConfirmButton: false,  
                    icon:"error",
                    customClass: {
                        popup: 'swal2-custom-popup', 
                    }
                });
                return
            }
            this.createEmployee(null,this.name,this.mail,null,null,true)
            this.name=null
            this.mail=null
        }
    }
};
</script>

<template>
    <div class="createArea">
        <div class="create">
            <label for="" class="createLabel">員工姓名:</label>
            <input class="createInput" v-model="this.name" type="text">
        </div>

        <div class="create">
            <label for="" class="createLabel">員工信箱:</label>
            <input class="createInput" v-model="this.mail" type="email">
        </div>
        <button @click="this.verify">新增</button>
    </div>
</template>

<style scoped lang="scss">
.createArea {
    height: 400px;
    width: 500px;
    margin: 50px auto;
    display: flex;
    flex-direction: column;
    background-color: #4ebdb3;
    font-size: 24px;
    font-weight: 500;
    padding: 50px 20px;
    border-radius: 10px;

    .create {
        display: flex;
        margin: 50px 0;

        .createLabel {
            width: 25%;
            color: white;
            font-weight: 600;
        }

        .createInput {
            width: 70%;
            border-radius: 10px;
            padding-left: 13px;
            border: none;
            outline: none;
            font-weight: 500;
            font-size: 20px;
        }

    }

    button {
        width: 88px;
        height: 40px;
        border-radius: 35px;
        border: none;
        cursor: pointer;
        font-size: 16px;
        margin:50px 0 0 200px;
    }
}
</style>