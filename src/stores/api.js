import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
export default defineStore("api", {
    state: () => ({
        employeeList: [],
        allEmployee: [],
        floorSeat:[],
        allfloor:[],
        seatContent:[]
    }),
    getters: {

    },
    actions: {
        createEmployee(id, name, mail, seat, floor,judge=false) {
            let obj = {
                "emp_id": id,
                "name": name,
                "email": mail,
                "floor_seat_seq": seat
            }
            fetch(`http://localhost:8080/employee/createOrUpdate`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
                .then(res => res.json())
                .then(data => {
                    if(judge){
                        console.log('新增結果', data)
                        this.searchEmployee(null, null,true)
                        this.searchEmployee(null, null,false)
                    }else{
                        this.findSeat(null, floor, null,true)
                        this.searchEmployee(null, null,true)
                    }
                    
                })
        },
        searchEmployee(id, name,judge=false) {
            let obj = {
                "emp_id": id,
                "name": name
            }
            fetch(`http://localhost:8080/employee/search`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
                .then(res => res.json())
                .then(data => {
                    if(judge){
                        console.log('員工列表', data)
                        this.employeeList = data.employeeList
                        console.log(this.employeeList)
                    }else{
                        console.log('所有員工', data)
                        this.allEmployee = data.employeeList
                        console.log(this.allEmployee)
                    }
                    
                })
        },
        findSeat(id, floor, seat,judge) {
            let obj = {
                "floor_seat_seq": id,
                "floor_no": floor,
                "seat_no": seat
            }
            fetch(`http://localhost:8080/seatingChart/search`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(obj)
            })
                .then(res => res.json())
                .then(data => {
                    if(judge==1){
                        console.log('樓層', data)
                        this.floorSeat = data.seatingChartList
                    }
                    if(judge==2){
                        const arr = data.seatingChartList
                        for(let i=0 ; i<arr.length;i++){
                            if(!this.allfloor.includes(arr[i].floor_no))
                            this.allfloor.push(arr[i].floor_no)
                        }
                    }
                    if(judge==3){
                        console.log(data.seatingChartList)
                        this.seatContent=data.seatingChartList[0]
                        Swal.fire({
                            title: "座位資訊",
                            html: `<p><strong>座位編號：</strong>${this.seatContent.floor_seat_seq}</p>
                                    <p><strong>座位樓層：</strong>${this.seatContent.floor_no}</p>
                                    <p><strong>座位號碼：</strong>${this.seatContent.seat_no}</p>
                                    `,
                            showCloseButton: true,
                            showConfirmButton: false,  
                            customClass: {
                                popup: 'swal2-custom-popup', 
                            }
                        });
                    }
                    
                })
        },
        
    }
})