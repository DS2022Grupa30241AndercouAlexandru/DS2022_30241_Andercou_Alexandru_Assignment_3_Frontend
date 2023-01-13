import { Injectable } from '@angular/core';


import * as protoLoader from '@grpc/proto-loader'

import * as ichat_pb from "../grpc/generated/ichat_pb";


import { ChatService, ChatServiceClient } from '../grpc/generated/ichat_pb_service';
import {grpc} from "@improbable-eng/grpc-web";
import { Request } from '@improbable-eng/grpc-web/dist/typings/invoke';
@Injectable({
  providedIn: 'root'
})

export class GrpcService {
 

  constructor() {

    this.client=new ChatServiceClient(`http://localhost:8050/`) 

      }
    messages:any[]=[]
    typingsClient:any[]=[]
    typingsAdmin:any[]=[]
    notifications:any[]=[]
    grpcClient!:Request;
    client:ChatServiceClient;

   sendNormalMessageToAdmin(from:number,message:string)
   {


    const m=new ichat_pb.Normal2;
   
      m.setFrom(from)
      m.setMessagetosend(message)
      m.setTo(0)
      m.setType("normal")


      var metadata = new grpc.Metadata();
      metadata.set('Content-Type', 'application/grpc')

      this.client.sendMessage(m,metadata,(err,response)=>{
        
        if(err)
        {
          console.log('an error occured',err);
        }else
        {

        }

      })



   }

   sendNormalMessageToUser(to:number,message:string)
   {
     console.log("duh ya uuuu")
    const m=new ichat_pb.Normal2()
      m.setFrom(0)
      m.setTo(to)
      m.setMessagetosend(message)
      m.setType("normal")
    var metadata = new grpc.Metadata();
    metadata.set('Content-Type', 'application/grpc')
    
      this.client.sendMessage(m,metadata,(err,response)=>{
        
        if(err)
        {
          console.log('an error occured',err);
        }else
        {
           console.log("all is buenooooo",response)
        }

      })

   }

   send_initial_notification(to:number)
   {
    const m=new ichat_pb.Normal2()
    m.setFrom(to)
    m.setTo(0)
    m.setMessagetosend("User:"+String(to)+" wants to talk with one of the  admins")
    m.setType("notification")
    var metadata = new grpc.Metadata();
    metadata.set('Content-Type', 'application/grpc')
    
      this.client.sendMessage(m,metadata,(err,response)=>{
        
        if(err)
        {
          console.log('an error occured at initial',err);
        }else
        {
           console.log("all is buenooooo initialy",response)
        }

      })

   }

   wait_for_notification(to:number,callback:any)
  {
    const m=new  ichat_pb.Normal;
    m.setFrom(0)
    m.setTo(to)
   
    var metadata = new grpc.Metadata();
    metadata.set('Content-Type', 'application/grpc')
    var stream=this.client.listNotifications(m,metadata)
    stream.on("data",(response: any)=>
    {

      console.log("streaming for notifications")
      this.notifications.push(response.toObject())
      callback(this.notifications)
   

      })
    
  }






   sendTypingMessageToAdmin(to:number)
   {

    const m=new ichat_pb.Normal2()
   
      m.setFrom(to)
      m.setMessagetosend("")
      m.setTo(0)
      m.setType("typing")
      var metadata = new grpc.Metadata();
      metadata.set('Content-Type', 'application/grpc')
      this.client.sendTypingMessage(m,metadata,(err,response)=>{
        
        if(err)
        {
          console.log('an error occured',err);
        }else
        {

        }

      })
   }
   sendTypingMessageToUser(to:number)
   {

    const m=new ichat_pb.Normal2
   
      m.setFrom(0)
      m.setMessagetosend("")
      m.setTo(to)
      m.setType("typing")
      var metadata = new grpc.Metadata();
      metadata.set('Content-Type', 'application/grpc')

      this.client.sendTypingMessage(m,metadata,(err,response)=>{
        
        if(err)
        {
          console.log('an error occured',err);
        }else
        {

        }

      })
   }


   sendStopTypingMessageToAdmin(to:number)
   {

    const m=new ichat_pb.Normal2()
   
      m.setFrom(to)
      m.setMessagetosend("")
      m.setTo(0)
      m.setType("stop_typing")
      var metadata = new grpc.Metadata();
      metadata.set('Content-Type', 'application/grpc')
      this.client.sendTypingMessage(m,metadata,(err,response)=>{
        
        if(err)
        {
          console.log('an error occured',err);
        }else
        {

        }

      })
   }
   sendStopTypingMessageToUser(to:number)
   {

    const m=new ichat_pb.Normal2
   
      m.setFrom(0)
      m.setMessagetosend("")
      m.setTo(to)
      m.setType("stop_typing")
      var metadata = new grpc.Metadata();
      metadata.set('Content-Type', 'application/grpc')

      this.client.sendTypingMessage(m,metadata,(err,response)=>{
        
        if(err)
        {
          console.log('an error occured',err);
        }else
        {

        }

      })
   }


   readMessageClient(from:number,callback:any,callableToEnd:any)
   {

    const m=new  ichat_pb.Normal;
   
      m.setFrom(0)
      m.setTo(from)
      var metadata = new grpc.Metadata();
      metadata.set('Content-Type', 'application/grpc')
      var stream=this.client.listMessages(m,metadata)
      stream.on("data",(response: any)=>
      {
        console.log("streaming")
        this.messages.push(response.toObject())
        callback(this.messages)
        callableToEnd(stream)
      
        let last_m=response.toObject()
        if(last_m.type=="normal")
        {
        const m2=new  ichat_pb.Normal2;
   
         m2.setFrom(from)
         m2.setTo(0)
         m2.setMessagetosend("read last message")
         m2.setType("read")

        this.client.sendMessage(m2 ,metadata,(err,response)=>{
        
          if(err)
          {
            console.log('an error occured',err);
          }else
          {
             console.log("all is buenooooo when reading",response)
          }})
        }


      })
      stream.on("end",()=>console.log("end of chat"))
      
      


   
   }












   readMessageAdmin(from:number,callback:any,callableToEnd:any)
   {
    const m=new  ichat_pb.Normal;
      this.messages=[]
      m.setFrom(from)
      console.log("you try to send to",from)
      m.setTo(0)
      var metadata = new grpc.Metadata();
      metadata.set('Content-Type', 'application/grpc')
      var stream=this.client.listMessages(m,metadata)
      console.log("is streamed")
      stream.on("data",(response: any)=>
      {
        console.log("streaming as admin",response.toObject())
        this.messages.push(response.toObject())
        callback(this.messages)
        callableToEnd(stream)

        let last_m=response.toObject()
        if(last_m.type=="normal")
        {
        const m2=new  ichat_pb.Normal2;
   
        m2.setFrom(0)
        m2.setTo(from)
        m2.setMessagetosend("read last message")
        m2.setType("read")

       this.client.sendMessage(m2 ,metadata,(err,response)=>{
       
         if(err)
         {
           console.log('an error occured',err);
         }else
         {
            console.log("all is buenooooo when reading",response)
         }})
        }

      })
      stream.on("end",()=>console.log("end of chat"))
     
   
   }



   readTypingMessageClient(from:number,callback:any,callableToEnd:any)
   {

    const m=new  ichat_pb.Normal;
   
      m.setFrom(0)
      m.setTo(from)
      var metadata = new grpc.Metadata();
      metadata.set('Content-Type', 'application/grpc')
      let stream=this.client.readTypingMessages(m,metadata)
      stream.on("data",(response: any)=>
      {
        console.log("typing streaming as aadmin ")
        this.typingsClient.push(response.toObject())
        callback(this.typingsClient)
        callableToEnd(stream)
        this.typingsClient=[]
    

      })
      stream.on("end",()=>console.log("end of chat"))
      
      


   
   }












   readTypingMessageAdmin(from:number,callback:any,callableToEnd:any)
   {
    const m=new  ichat_pb.Normal;
      this.messages=[]
      m.setFrom(from)
      console.log("you try to send to",from)
      m.setTo(0)
      var metadata = new grpc.Metadata();
      metadata.set('Content-Type', 'application/grpc')
      var stream=this.client.readTypingMessages(m,metadata)
      console.log("is streamed")
      stream.on("data",(response: any)=>
      {
        console.log(" typing streaming as admin",response.toObject())
        this.typingsAdmin.push(response.toObject())
        callback(this.typingsAdmin)
        callableToEnd(stream)
        this.typingsAdmin=[]
        let last_m=response.toObject()
       


      })
      stream.on("end",()=>console.log("end of chat"))
     
   
   }




















}
