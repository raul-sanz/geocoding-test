import axios from "axios";
import { AddressData } from "../types/interfaces";

export const saveData = async (data:AddressData)=>{
 return await axios.post('/api/address/create',{...data})
}

export const updateData = async (data:AddressData,id:string)=>{
 return await axios.put(`/api/address/update/${id}`,{...data})
}
export const deleteData = async (id:string)=>{
 return await axios.delete(`/api/address/delete/${id}`)
}