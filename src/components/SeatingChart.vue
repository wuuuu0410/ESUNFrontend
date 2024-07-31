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
    <div class="body">
        <div class="select">
            <select name="" id="">
                <option value="">請選擇員編</option>
                <option value="">請選擇員編</option>
            </select>
            <div class="detail">
                <p>name</p>
                <p>name</p>
            </div>
            <select name="" id="">
                <option value="1">請選擇樓層</option>
                <option value="1">請選擇樓層</option>
            </select>
        </div>
        <div class="seatingChart">
            <div class="seat">
                <span>樓:</span>
                <span>座位</span>
                <span>[編號]</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.body {
    width: 100%;
    height: 80dvh;
    display: flex;

    .select {
        display: flex;
        flex-direction: column;
        margin: 50px 50px;
        padding: 0 50px;
        width: 200px;
        height: 300px;
        background-color: #4ebdb3;
        border-radius: 10px;

        select {
            width: 180px;
            height: 30px;
            font-size: 16px;
            border: none;
            border-radius: 10px;
            margin: 20px 0;
            outline: none;
            padding-left: 13px;
        }

        .detail {
            margin: 20px 0;

            p {
                margin: 10px 0;
            }
        }

    }

    .seatingChart {
        margin: 50px 10px;
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        overflow-y: auto;
        border-radius: 20px;
        border: solid 1px #4ebdb3;

        .seat {
            display: flex;
            width: 200px;
            height: 100px;
            border-radius: 10px;
            margin: 20px 0 0 0;
            border: solid 1px black;
            align-items: center;
            justify-content: center;
            
        }
    }
}
</style>