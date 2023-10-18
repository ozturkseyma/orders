import React, { useEffect, useState } from 'react'
import axios from 'axios'
import dayjs from 'dayjs';

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
        <div className='container mx-auto'>


            <table className="table-fixed w-full">
                <thead>
                    <tr>
                        <th className='border-b border-neutral-600 font-medium p-4 pl-8 pt-0 pb-3 text-neutral-900 text-left'>Id</th>
                        <th className='border-b border-neutral-600 font-medium p-4 pl-8 pt-0 pb-3 text-neutral-900 text-left'>Customer Id</th>
                        <th className='border-b border-neutral-600 font-medium p-4 pl-8 pt-0 pb-3 text-neutral-900 text-left'>Order Date</th>
                        <th className='border-b border-neutral-600 font-medium p-4 pl-8 pt-0 pb-3 text-neutral-900 text-left'>Delete</th>
                    </tr>
                </thead>
                <tbody className='bg-white'>
                    {
                        orders.map(order => {
                            return <tr>
                                <td className='border-b border-slate-300 p-4 pl-8 text-neutral-900'>{order.id}</td>
                                <td className='border-b border-slate-300 p-4 pl-8 text-neutral-900'>{order.customerId}</td>
                                <td className='border-b border-slate-300 p-4 pl-8 text-neutral-900'>{dayjs(new Date(order.orderDate)).format('DD/MM/YYYY')}</td>
                                <td className='border-b border-slate-300 p-4 pl-8 text-neutral-900'><button className='bg-blue-500 p-3 rounded-lg text-white' onClick={() => deleteOrder(order.id)} >Delete</button></td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
