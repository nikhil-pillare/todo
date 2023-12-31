

import { ADDTODO, CLEARCOMPLETED,DELETEITEM,EDITSTATUS, EDITITEM } from "./actionTypes"


export const adddata=(data)=>(dispatch)=>{
    dispatch({type:ADDTODO,payload:data})
}


export const editstatus=(comp,data)=>(dispatch)=>{
    data.todos.forEach((item)=>{
        if(item.task==comp){
        item.status=!item.status
        }
    })
    dispatch({type:EDITSTATUS,payload:data.todos})
}


export const clearcomleteddata=(data)=>(dispatch)=>{
    let datafil=data.todos.filter((item)=>{
        if(item.status){
            return false
        }
        return true
    })

    dispatch({type:CLEARCOMPLETED,payload:datafil})
}

export const deleteitem=(com,data)=>(dispatch)=>{
    console.log(com,data)
    let datafil=data.todos.filter((item)=>{
        if(item.task==com){
            return false
            }
            return true
    })

    dispatch({type:DELETEITEM,payload:datafil})
}


export const edititem=(item,obj,data)=>(dispatch)=>{
    console.log(obj)
    data.todos.forEach((el)=>{
       
        if(el.task==item.task){
            el.task=obj.task
           
        }
    })
    console.log(data)
    dispatch({type:EDITITEM,payload:data.todos})
   
}
