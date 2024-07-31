import { defineStore } from 'pinia'
import Swal from 'sweetalert2'
export default defineStore("api", {
    state: () => ({
        employeeList:[]
    }),
    getters: {

    },
    actions: {
        createEmployee(name, mail) {
            let obj = {
                "emp_id": null,
                "name": name,
                "email": mail,
                "floor_seat_seq": null
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
                    console.log('新增結果', data)
                    this.searchEmployee(null , null)
                })
        },
        searchEmployee(id , name) {
            let obj = {
                "emp_id":id,
                "name":name
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
                    console.log('員工列表', data)
                    this.employeeList=data.employeeList
                    console.log(this.employeeList)
                })
        },
    }
})