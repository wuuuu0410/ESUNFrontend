<script>
import api from '@/stores/api';
import { mapState, mapActions } from 'pinia';
import Swal from 'sweetalert2';
export default {
    data() {
        return {
            id: null,
            name: null,
            mail: null,
            seat: null,
            value: null,
            floor: 1,
            selectedIndex: null,
            selectSeat: null

        };
    },
    created() {
        this.searchEmployee(null, null, false),
            this.findSeat(null, 1, null, 1)
        this.findSeat(null, null, null, 2)
    },
    mounted() {

    },
    computed: {
        ...mapState(api, ['allEmployee', 'floorSeat', 'allfloor']),
    },
    components: {

    },

    methods: {
        ...mapActions(api, ['searchEmployee', 'findSeat', 'createEmployee']),
        //補足5碼
        formatEmpId(empId) {
            if (empId == null) {
                return
            }
            return empId.toString().padStart(5, '0');
        },
        //取得選擇員工的資料
        selectEmployee(index) {
            this.id = this.allEmployee[index].emp_id,
                this.name = this.allEmployee[index].name,
                this.mail = this.allEmployee[index].email
            this.seat = this.allEmployee[index].floor_seat_seq
        },
        //座位顏色變換
        color(item, index) {
            if (this.selectedIndex === index) {
                return 'selected';
            } else if (item === null) {
                return 'white';
            } else {
                return 'red';
            }
        },
        //點擊空位變為綠色 點擊有人座位可看座位員工資訊
        click(id, index) {
            const information = this.floorSeat[index];
            if (this.floorSeat[index].emp_id === null) {
                this.selectedIndex = id;
                this.selectSeat = id;
            } else {
                Swal.fire({
                    title: "座位資訊",
                    html: `<p><strong>員工編號：</strong>${this.formatEmpId(information.emp_id)}</p>
                                <p><strong>員工姓名：</strong>${information.name}</p>
                                <p><strong>員工信箱：</strong>${information.email}</p>
                                <p><strong>座位編號：</strong>${information.floor_seat_seq}</p>
                                <p><strong>座位樓層：</strong>${information.floor_no}</p>
                                <p><strong>座位號碼：</strong>${information.seat_no}</p>
                                `,
                    showCloseButton: true,
                    showConfirmButton: false,
                    customClass: {
                        popup: 'swal2-custom-popup',
                    }
                });
            }
        },
        //防呆
        verify() {
            if (this.id == null || this.name == null) {
                Swal.fire({
                    title: "選擇失敗",
                    html: `<p>請選擇員工</p>`,
                    showCloseButton: true,
                    showConfirmButton: false,
                    icon: "error",
                    customClass: {
                        popup: 'swal2-custom-popup',
                    }
                });
                return
            }
            if (this.selectSeat == null) {
                Swal.fire({
                    title: "選擇失敗",
                    html: `<p>請選擇座位</p>`,
                    showCloseButton: true,
                    showConfirmButton: false,
                    icon: "error",
                    customClass: {
                        popup: 'swal2-custom-popup',
                    }
                });
                return
            }
            this.createEmployee(this.id, this.name, this.mail, this.selectSeat, this.floor, false)
            this.selectedIndex = null
            Swal.fire({
                title: "選擇成功",
                icon: "success"
            }).then(() => {
                this.selectEmployee(this.value);
                console.log('seat', this.seat)
            });

        }
    }
};
</script>

<template>
    <div class="body">
        <div class="select">
            <p>請選擇員編:</p>
            <select name="" id="" v-model="this.value" @change="selectEmployee(this.value)">
                <option :value=index v-for="(item, index) in this.allEmployee">{{ formatEmpId(item.emp_id) }}</option>
            </select>
            <div class="detail">
                <p>員工編號:{{ formatEmpId(this.id) }}</p>
                <p>員工姓名:{{ this.name }}</p>
                <p>{{ this.seat ? '已有座位' : '無座位' }}</p>
            </div>
            <p>請選擇樓層:</p>
            <select name="" id="" v-model="this.floor" @change="this.findSeat(null, this.floor, null, true)">
                <option :value=item v-for="(item, index) in this.allfloor">{{ item }}</option>
            </select>
            <button class="confirm" @click="this.verify">{{ this.seat ? '確認更換座位' : '確認選擇座位' }}</button>
        </div>
        <div class="seatingChart">
            <div class="seat" v-for="(item, index) in this.floorSeat" :key="index"
                :class="color(item.emp_id, item.floor_seat_seq)" @click="click(item.floor_seat_seq, index)">
                <p>{{ item.floor_no }}樓:座位{{ item.seat_no }}<br>{{ item.emp_id ? '[員編:' + this.formatEmpId(item.emp_id)
                    + ']' : '空位' }}</p>
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
        margin: 50px 20px 50px 30px;
        padding: 10px 50px;
        width: 250px;
        height: 400px;
        background-color: #4ebdb3;
        border-radius: 10px;
        color: white;

        select {
            width: 180px;
            height: 30px;
            font-size: 16px;
            border: none;
            border-radius: 10px;

            outline: none;
            padding-left: 13px;
        }

        .detail {
            margin: 20px 0;
        }

    }

    .seatingChart {
        margin: 50px 30px 50px 0px;
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-evenly;
        overflow-y: auto;
        border-radius: 20px;
        border: solid 1px #4ebdb3;

        &::-webkit-scrollbar {
            width: 10px;

        }

        &::-webkit-scrollbar-button {
            background: transparent;
            height: 10px;
        }

        &::-webkit-scrollbar-thumb {
            background: #4ebdb3;
            border-radius: 15px;

        }

        &::-webkit-scrollbar-track {
            background: transparent;
            border-radius: 15px;
        }

        .seat {
            display: flex;
            width: 250px;
            height: 100px;
            border-radius: 10px;
            margin: 20px 0 0 0;
            // border: solid 1px black;
            align-items: center;
            justify-content: center;
            text-align: center;
        }
    }

    .confirm {
        width: 150px;
        height: 40px;
        border-radius: 20px;
        border: none;
        cursor: pointer;
        font-size: 20px;
        font-weight: 600;
        margin: 30px 0;
        color: #4ebdb3;
        background-color: white;

        &:hover {
            transform: scale(1.1);
        }
    }

    p {
        margin: 10px 5px;
        font-weight: 600;
        font-size: 20px;
    }

    .white {
        background-color: gainsboro;
        cursor: pointer;
    }

    .red {
        background-color: rgb(255, 103, 103);
        cursor: pointer;
    }

    .selected {
        background-color: rgb(140, 245, 140);
    }
}
</style>