<script>
import api from '@/stores/api';
import { mapState, mapActions } from 'pinia';
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            id: null,
            name: null,
            currentPage: 0,
            itemsPerPage: 8,
            isActive: 0,
        };
    },
    created() {
        this.searchEmployee(null, null, true)
    },
    mounted() {

    },
    computed: {
        ...mapState(api, ['employeeList']),
        //分頁
        pages() {
            console.log(this.employeeList)
            const pages = [];
            if (!this.employeeList) {
                return null;
            }
            for (let i = 0; i < this.employeeList.length; i += this.itemsPerPage) {
                pages.push(this.employeeList.slice(i, i + this.itemsPerPage));
            }
            return pages;
        },
        buttons() {
            if (this.employeeList == null) {
                return null
            }
            return Array.from({ length: Math.ceil(this.employeeList.length / this.itemsPerPage) }, (_, index) => index + 1);
        },
    },
    components: {

    },

    methods: {
        ...mapActions(api, ['searchEmployee', 'findSeat']),
        //補足5碼
        formatEmpId(empId) {
            return empId.toString().padStart(5, '0');
        },
        //去除0
        removeLeadingZeros(empId) {
            return parseInt(empId, 10);
        },

        //換頁
        changePage(index) {
            this.currentPage = index;
            window.scrollTo({ top: 10, behavior: 'smooth' });
            this.isActive = index;
        },
        //搜尋時回到第1頁
        search() {
            this.searchEmployee(this.removeLeadingZeros(this.id), this.name, true)
            this.changePage(0)
        },
        //取得座位資訊
        content(id) {
            this.findSeat(id, null, null, 3)
        }
    }
};
</script>

<template>
    <div class="body">
        <div class="searchEmployee">
            <div class="search">
                <label class="searchLabel" for="">員編:</label>
                <input class="searchInput" v-model="this.id" type="text">
            </div>
            <div class="search">
                <label class="searchLabel" for="">姓名:</label>
                <input class="searchInput" v-model="this.name" type="text">
            </div>
            <button @click="this.search">搜尋</button>
        </div>
        <table class="employee">
            <tr>
                <th>員編</th>
                <th>姓名</th>
                <th>信箱</th>
                <th>座位編號</th>
                <th>座位資訊</th>
            </tr>
            <tbody v-for="(page, index) in pages" :key="index" v-show="currentPage === index">
                <tr v-for="(item, itemIndex) in page" :key="itemIndex">
                    <td>{{ formatEmpId(item.emp_id) }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.email }}</td>
                    <td>{{ item.floor_seat_seq }}</td>
                    <td class="icon" v-if="item.floor_seat_seq" @click="content(item.floor_seat_seq)"><i
                            class="fa-solid fa-circle-info"></i></td>
                    <td v-else></td>
                </tr>
            </tbody>
        </table>
    </div>
    <div class="buttonList">
        <button class="buttons" v-for="(button, index) in buttons" :key="index" @click="changePage(index)"
            :class="{ 'active': isActive === index }">{{ button }}</button>
    </div>

</template>

<style scoped lang="scss">
.body {
    width: 100%;
    height: 70dvh;
    display: flex;
}

.searchEmployee {
    display: flex;
    flex-direction: column;
    margin: 50px 0 0 25px;
    padding: 0 50px;
    width: 200px;
    height: 300px;
    background-color: #4ebdb3;
    border-radius: 10px;

    .search {
        display: flex;
        width: 100%;
        margin: 30px 0;

        .searchLabel {
            width: 26%;
            font-size: 20px;
            font-weight: 600;
            color: white;
        }

        .searchInput {
            width: 74%;
            border-radius: 10px;
            padding-left: 13px;
            border: none;
            outline: none;
            font-weight: 500;
            font-size: 20px;
        }
    }
}

button {
    width: 88px;
    height: 40px;
    border-radius: 35px;
    border: none;
    cursor: pointer;
    font-size: 18px;
    font-weight: 600;
    margin: 30px 0 0 50px;
    color: #4ebdb3;
    background-color: white;

    &:hover {
        transform: scale(1.1);
    }
}

.icon {
    cursor: pointer;
}

.employee {
    margin: 50px 25px 0 20px;
    width: 80%;
    height: 50px;
    border-collapse: collapse;

    th {
        margin: auto;
        padding: 10px 0;
        background-color: #4ebdb3;
        font-size: 20px;
        color: white;
        border: solid 1px #4ebdb3;
    }

    td {
        padding: 20px 0;
        margin: auto;
        text-align: center;
        font-weight: 600;
        font-size: 20px;
        border: solid 1px #4ebdb3;
    }
}

.buttonList {
    width: 100%;
    height: 10dvh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.buttons {
    width: 40px;
    height: 40px;
    margin: 0 0.5%;
    font-weight: 700;
    background: #a5a5a5;
    color: #ffffff;
    border-radius: 50%;
    border: none;
}

.buttons:hover {
    transform: scale(1.1);
}

.buttons:active {
    color: #ffffff;
    background: #4ebdb3;
}

.buttons.active {
    background: #4ebdb3;
    color: #ffffff;
}
</style>