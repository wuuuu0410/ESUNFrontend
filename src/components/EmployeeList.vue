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
        <div class="searchEmployee">
            <div class="search">
                <label class="searchLabel" for="">員編</label>
                <input class="searchInput" type="number">
            </div>
            <div class="search">
                <label class="searchLabel" for="">姓名</label>
                <input class="searchInput" type="text">
            </div>
            <button>搜尋</button>
        </div>
        <table class="employee">
            <tr>
                <th>員編</th>
                <th>姓名</th>
                <th>信箱</th>
                <th>座位編號</th>
            </tr>
            <tr>
                <td>00001</td>
                <td>黃曉明</td>
                <td>13@mail</td>
                <td>1</td>
            </tr>
        </table>
    </div>
</template>

<style scoped lang="scss">
.body {
    width: 100%;
    height: 80dvh;
    display: flex;
}

.searchEmployee {
    display: flex;
    flex-direction: column;
    margin: 50px auto;
    padding: 0 50px;
    width: 200px;
    height: 300px;
    background-color: #4ebdb3;
    border-radius: 10px;
    .search{
        display: flex;
        width: 100%;
        margin: 30px 0;
        .searchLabel{
            width: 25%;
            font-size: 20px;
            font-weight: 500;
        }
        .searchInput{
            width: 75%;
            border-radius: 10px;
            padding-left: 13px;
            border: none;
            outline: none;
            font-weight: 500;
            font-size: 20px;
        }
    }
}
button{
    width: 88px;
        height: 40px;
        border-radius: 35px;
        border: none;
        cursor: pointer;
        font-size: 16px;
        margin:30px 0 0 50px;
}
.employee {
    margin: 50px auto;
    width: 80%;
    height: 50px;
    border-collapse: collapse;

    th {
        margin: auto;
        padding: 10px 0;
        background-color: #4ebdb3;
        font-size: 20px;
        color: white;
    }

    td {
        padding: 20px 0;
        margin: auto;
        text-align: center;
        font-family: 500;
        font-size: 20px;
        border: solid 1px #4ebdb3;
    }



}
</style>