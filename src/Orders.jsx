import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        loadOrders();
    }, [])


    const loadOrders = () => {
        axios.get('https://northwind.vercel.app/api/orders')
            .then(res => {
                setOrders(res.data);
            })
    }

    const deleteOrder = (id) => {
        var result = window.confirm("Want to delete?")
        if (result) {
            axios.delete('https://northwind.vercel.app/api/orders/' + id)
                .then(res => {
                    loadOrders();
                })
        }
    }
    return (
        <div>


            <table class="table-auto">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Customer Id</th>
                        <th>Order Date</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map(order => {
                            return <tr>
                                <td>{order.id}</td>
                                <td>{order.customerId}</td>
                                <td>{order.orderDate}</td>
                                <td><button className='bg-blue-500 p-3 rounded-lg' onClick={() => deleteOrder(order.id)} >Delete</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
