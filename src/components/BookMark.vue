<script>

export default {
    data() {
        return {
            isActive: "",
        };
    },
    created() {

    },
    mounted() {
        //進入頁面時會直接顯示第一個內頁，也就算是主頁
        this.openTab(this.tabsName[0]);

    },
    computed: {

    },
    components: {

    },
    props: [
        //這邊接收父也就是vue頁面傳來想生成的陣列
        "tabsPresent",
        "tabsName"
    ],

    methods: {
        //哪個內頁被點擊時執行方法 isActive紀錄哪個內頁被點擊會變不同顏色
        openTab(tabName) {
            console.log(tabName)
            var i, tabcontent;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }

            console.log(document.getElementById(tabName))
            document.getElementById(tabName).style.display = "block";
            this.isActive = tabName;
        },
    }
};
</script>

<template>
    <div class="tabArea">
        <!-- 父vue頁面傳來需要幾個內頁，v-for的是頁籤名稱 -->
        <img class="logo" src="../img/玉山logo.png" alt="">
        <div class="tabs">
            <button v-for="(item, index) in this.tabsPresent" class="tablink"
                :class="{ 'active': isActive === tabsName[index] }" @click="openTab(this.tabsName[index])">{{ item
                }}</button>
        </div>
    </div>
    <!-- 同樣父vue頁面傳來需要幾個內頁 v-for插槽出來-->
    <div v-for="(item, index) in this.tabsName" :id="item" class="tabcontent">
        <slot :name="item"></slot>
    </div>
</template>

<style scoped lang="scss">
.tabArea {
    height: 15dvh;
    width: 100%;
    display: flex;
    background-image:url(../img/玉山背景.jpg);
    background-size: 100%;

    .logo {
        width: 12%;
        height: 100%;
        padding: 0 0 0 2%;
    }

    .tabs {
        width: 88%;
        height: 100%;
        padding: 0 10%;
        display: flex;
        align-items: center;
    }

    .tablink {
        height: 50%;
        border: none;
        cursor: pointer;
        padding: 10px 20px;
        margin: 0 5%;
        font-size: 24px;
        font-weight: 700;
        border-radius: 20px;
        color: #4ebdb3;
        background-color: transparent;
        display: flex;
        align-items: center;
        &.active {
            background-color: #4ebdb3;
            color: white;
        }
    }

    /* 頁籤內容 */
    .tabcontent {
        width: 100%;
        display: none;

    }

    /* 顯示選中的頁籤內容 */
    .show {
        display: block;
    }
}
</style>