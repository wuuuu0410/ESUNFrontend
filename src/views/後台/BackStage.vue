<script>
import BookMark from '@/components/BookMark.vue';
import CreateEmployee from '@/components/CreateEmployee.vue';
import EmployeeList from '@/components/EmployeeList.vue';
import SeatingChart from '@/components/SeatingChart.vue';
export default {
    data() {
        return {
            //這個頁面vue想要幾個內頁
            tabsArray: {
                buttonName: ["新增員工", "員工列表","座位表"],
                tabsNumber: ['tab1', 'tab2', 'tab3']
            }
        };
    },
    created() {

    },
    mounted() {

    },
    computed: {

    },
    components: {
        //放入頁籤
        BookMark,
        //頁籤內頁
        CreateEmployee,
        EmployeeList,
        SeatingChart
    },

    methods: {


    }
};
</script>

<template>
    <!-- this.tabsArray.buttomName是頁籤的名字陣列 可以往上拉到data看詳細內容 -->
    <!-- 這邊透過父傳子 父是這個vue傳想要幾個內頁給BookMark BookMark會v-for傳過去的這個陣列並生成插槽 -->
    <BookMark :tabsPresent="this.tabsArray.buttonName"
    :tabsName="this.tabsArray.tabsNumber">
    <!-- 子BookMark會v-for我們所需要的插槽數量出來 -->
    <!-- 下面template接收插槽並放入你所想要顯示的內頁資料 -->
        <template v-slot:tab1>
            <CreateEmployee/>
        </template>
        <template v-slot:tab2>
            <EmployeeList/>
        </template>
        <template v-slot:tab3>
            <SeatingChart/>
        </template>

    </BookMark>


</template>

<style scoped lang="scss">

</style>