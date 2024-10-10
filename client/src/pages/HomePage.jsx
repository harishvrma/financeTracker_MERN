import React, { useEffect, useState } from 'react'
import { Form, Input, message, Modal, Select, Table } from 'antd'
import {EditOutlined,DeleteOutlined} from '@ant-design/icons'
import Layout from '../components/Layout'
import axios from 'axios'
import Spinner from '../components/Spinner'
import moment from 'moment'

//financetrackerapp-agx7.vercel.app
const HomePage = () => {
    const [showmodal, setshowmodal] = useState(false);
    const [loading,setloading] = useState(false);
    const [alltransaction, setAllTransactions] = useState([])
    const [freq,setfreq] = useState('7')
    const [editable, seteditable] = useState(null)

    const columns=[
        {
            title : 'Date',
            dataIndex:'date',
            render : (text) => <span>{moment(text).format('DD-MM-YYYY')}</span>
        },
        {
            title : 'Amount',
            dataIndex:'amount'
        },
        {
            title : 'Category',
            dataIndex:'category'
        },
        {
            title : 'Type',
            dataIndex:'type'
        },
        {
            title : 'Reference',
            dataIndex:'reference'
        },
        {
            title : 'Description',
            dataIndex:'description'
        },
        {
            title : 'Actions',
            render : (text,record) => (
                <div>
                    <EditOutlined onClick={()=>{
                        seteditable(record)
                        setshowmodal(true)
                    }}/>
                    <DeleteOutlined className='mx-2' onClick={()=>{handledelete(record)}} />
                </div>
            )
        }
    ]
    //Getting all transaction on screen
    const getAllTransactions = async ()=>{
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            setloading(true);
            const res = await axios.post('/api/v1/transactions/get-transaction' , 
                {userid : user._id , freq});
            setloading(false)
            setAllTransactions(res.data);
            console.log(res.data)

            
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(()=>{
        getAllTransactions()
    },[freq])


    //delete handler
    const handledelete = async(record) =>{
        try {
            setloading(true)
            await axios.post('/api/v1/transactions/delete-transaction' , {transactionId:record._id})
            setloading(false);
            message.success('Transaction deleted')
        } catch (error) {
            setloading(false)
            console.log(error);
            message.error('unable to delete')
        }
    }

    //while submitting the values to the table
    const handlesubmit = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            setloading(true);
            if(editable){
                await axios.post('/api/v1/transactions/edit-transaction' , {
                    payload:{
                        ...values,
                        userId:user._id
                    },
                    transactionId : editable._id
                })
            setloading(false)
            message.success('Transaction Updated Successfully')
            }
            else{
                await axios.post('/api/v1/transactions/add-transaction' , {...values ,userid:user._id})
            setloading(false)
            message.success('Transaction Added Successfully')
            }
            setshowmodal(false);
            seteditable(null)
        } catch (error) {
            setloading(false);
            message.error('Failed to add Transaction')
            
        }
    }
    return (
        <Layout>
            {loading && <Spinner/>}
            <div className="filters">
                <div>
                    <h6>Filter</h6>
                    <Select value={freq} onChange={(values)=>setfreq(values)}>
                        <Select.Option value='7'>Last 1 Week</Select.Option>
                        <Select.Option value='30'>Last 1 Month</Select.Option>
                        <Select.Option value='365'>Last 1 Year</Select.Option>
                    </Select>
                </div>
                <div>
                    <button className='btn btn-primary' onClick={() => setshowmodal(true)}>Add New</button>
                </div>
            </div>
            <div className="content">
                <Table columns={columns} dataSource={alltransaction}/>
            </div>
            <Modal title={editable ? 'Edit Transaction' : 'Add-Transaction'}
                open={showmodal}
                onCancel={() => setshowmodal(false)}
                footer={false}
            >
                <Form layout='verical' onFinish={handlesubmit} initialValues={editable}>
                    <Form.Item label="Amount" name="amount">
                        <Input type='text' required='true'/>
                    </Form.Item>
                    <Form.Item label="Type" name="type">
                        <Select>
                            <Select.Option value="income">Income</Select.Option>
                            <Select.Option value="expense">Expense</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Category" name="category">
                        <Select>
                            <Select.Option value="salary">Salary</Select.Option>
                            <Select.Option value="project">Project</Select.Option>
                            <Select.Option value="fuel">Fuel</Select.Option>
                            <Select.Option value="party">Party</Select.Option>
                            <Select.Option value="rent">Rent</Select.Option>
                            <Select.Option value="food">Foods</Select.Option>
                            <Select.Option value = "fee">Fee</Select.Option>
                        <Select.Option value = "tax">Taxes</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Date" name="date">
                        <Input type='date' />
                    </Form.Item>
                    <Form.Item label="Reference" name="reference" >
                        <Input type='text' />
                    </Form.Item>
                    <Form.Item label="Description" name="description" >
                        <Input type='text' />
                    </Form.Item>
                    <div className="d-flex">
                        <button type='submit' className='btn btn-primary'>ADD</button>
                    </div>
                </Form>

            </Modal>
        </Layout>
    )
}

export default HomePage