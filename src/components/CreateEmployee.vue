<script>

export default {
    data() {
        return {

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

    }
};
</script>

<template>
    <div class="createArea">
        <div class="create">
            <label for="" class="createLabel">員工姓名:</label>
            <input class="createInput" type="text">
        </div>

        <div class="create">
            <label for="" class="createLabel">員工信箱:</label>
            <input class="createInput" type="email">
        </div>
        <button>新增</button>
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