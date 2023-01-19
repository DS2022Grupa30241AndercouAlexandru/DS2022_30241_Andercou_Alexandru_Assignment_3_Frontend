import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { delay } from 'rxjs';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { Message } from 'src/grpc/generated/ichat_pb';
import { ChatService, ResponseStream } from 'src/grpc/generated/ichat_pb_service';
import { GrpcService } from '../grpc.service';
import { LocatorService } from '../locator.service';






@Component({
  selector: 'app-chat-component',
  templateUrl: './chat-component.component.html',
  styleUrls: ['./chat-component.component.css']
})

@Injectable({
  providedIn: 'root'
})
export class ChatComponentComponent implements OnInit {


private service:GrpcService;
 messages:any
 times:number=0
 userF:any
 userT:any
 userString:String="default"
 url1=""        
 open=true
 userType:any
 chatboxid:string="chatbox"
 chatid:string="chat"
 userm:string="user_messages"
 typingId:string="typing"
 inputId:string="input"
 iconId:string="iicn"
 titleId:string="chat-title"
 readId:string="someone_watching"
 closeChat=false;
 sentFirstMessage=false;
   constructor() {
    this.messages=[]
    this.service=new GrpcService()
  
   }
  start_typing:any;


  set_user(id_chat:any,user_from:any,user_to:any,tu?:any)
  {
    if(tu)
    this.userType=tu
    else
    this.userType="user"
    this.userF=user_from
    this.userString=this.userF.name
    this.userT=user_to
    this.chatboxid="chatbox_"+String(id_chat)
    this.chatid="chat_"+String(id_chat)
    this.userm="user_messages_"+String(id_chat)
    this.typingId="typing_"+String(id_chat)
    this.inputId="input_"+String(id_chat)
    this.iconId="iicn_"+String(id_chat)
    this.titleId="chat-title_"+String(id_chat)
    this.readId="someone_watching"+String(id_chat)

    var chat= document.getElementById("chatbox")
    if(chat)
      chat.id=this.chatboxid

    var chat= document.getElementById("chat")
     if(chat)
       chat.id=this.chatid
       var chat= document.getElementById("user_messages")
       if(chat)
         chat.id=this.userm
         var chat= document.getElementById("typing")
         if(chat)
           chat.id=this.typingId
           var chat= document.getElementById("input")
           if(chat)
             chat.id=this.inputId
             var chat= document.getElementById("iicn")
             if(chat)
               chat.id=this.iconId
               var chat= document.getElementById("chat-title")
             if(chat)
             {
              chat.id=this.titleId;
              chat.textContent="to user: "+this.userT.name

             }
             var chat= document.getElementById("someone_watching")
             if(chat)
             {
              chat.id=this.readId

             }
           
                
             
             
             if(this.userType=="admin")
            {

              this.service.readMessageAdmin(this.userT.id,this.render_messages.bind(this),this.cancel_streamn.bind(this))
              this.service.readTypingMessageAdmin(this.userT.id,this.do_typings.bind(this),this.cancel_streamn.bind(this))
            } 
            else
            {
              this.service.readMessageClient(this.userF.id,this.render_messages.bind(this),this.cancel_streamn.bind(this))
              this.service.readTypingMessageClient(this.userF.id,this.do_typings.bind(this),this.cancel_streamn.bind(this))
            }
           
           // $("#"+this.inputId).on("keyup",this.stop_typing.bind(this))
              setInterval(()=>{
                var typingSection=document.getElementById(this.typingId)
                 let now=new Date();
                 if(now.getTime()-this.start_typing.getTime()>1000)
                 if(typingSection instanceof HTMLParagraphElement)
                  typingSection.textContent=""
              },100)


              this.start_typing= new Date();


  }
 


 do_typings(typings:any)
{
  var typingSection=document.getElementById(this.typingId)
 
  if(typingSection instanceof HTMLParagraphElement)
for(var m of typings)
  if(m.type=="typing")
  {
  
     typingSection.textContent=this.userT.name+" "+"is typing"
         this.start_typing= new Date();


  }






}








  cancel_streamn(stream:ResponseStream<Message>)
  {
    if(this.closeChat==true)
    stream.cancel()

  }
  
  reduce_size()
  {
     if(this.open)
     {
      this.closeChat=true
     
    $("#"+this.chatboxid).animate({height:"50px"},100,()=>{}).animate({width:"50px"},100)
    $("#"+this.iconId).removeClass("fa-close")
    $("#"+this.iconId).addClass("fa-plus")
   
     }else
     {
      $("#"+this.chatboxid).animate({width:"350px"},200,()=>{}).animate({height:"350px"},200)
      $("#"+this.iconId).removeClass("fa-plus")
      $("#"+this.iconId).addClass("fa-close")
     }


     this.open=!this.open
  }
  ngOnInit(): void {

     
  
    this.draged()
  



  }


sendm()
{
   console.log("no problem here")
   if(!this.sentFirstMessage &&  this.userType!="admin")
   {

    this.service.send_initial_notification(this.userF.id);
    this.sentFirstMessage=true;
   }

 
  var inp=document.getElementById(this.inputId)
  
  if(inp && inp instanceof HTMLInputElement)
  {


    //alert("duh ya uuuu"+this.userType)
    if(this.userType=="admin")
       this.service.sendNormalMessageToUser(this.userT.id,inp.value)
      else
      this.service.sendNormalMessageToAdmin(this.userF.id,inp.value)
  

      this.render_messages(this.service.messages)
      var readSection=document.getElementById(this.readId)
      if(readSection instanceof HTMLParagraphElement)
          readSection.textContent=" "

   }
 
  
  
}


render_messages(msg:any)
{


  var elm=document.getElementById(this.userm);
  if(elm)
  {elm.innerHTML=""  
   
}
  console.log("messages in renderer",msg)
for(let m of msg)
{
  if(m.type=="normal")
  {
var dv=document.createElement("div") 
dv.style.display="flex"
dv.style.justifyContent="flex-start"
var p=document.createElement("p") 
   p.innerHTML=m.messagetosend
   p.style.backgroundColor="#294cff"
   p.style.width="max-content"
   p.style.height="max-content"
   p.style.height=p.style.height+50
   p.style.borderRadius="5px"
   p.style.color="white"
   p.style.wordWrap="break-word"
   p.style.whiteSpace="normal"
   dv.appendChild(p)
elm?.appendChild(dv)


var readSection=document.getElementById(this.readId)
    if(readSection instanceof HTMLParagraphElement)
        readSection.textContent=" "

  }
  else
  if(m.type=="read")
  {
    var readSection=document.getElementById(this.readId)
     if(readSection instanceof HTMLParagraphElement)
     { 
      readSection.textContent="Read last message"

     }
  }
  else
  if(m.type=="my")
  {

    var dv=document.createElement("div") 
    dv.style.display="flex"

    var p=document.createElement("p") 
    p.innerHTML=m.messagetosend
    dv.style.justifyContent="flex-end"
    p.style.backgroundColor="#294cff"
    p.style.width="max-content"
    p.style.height="max-content"
    p.style.height=p.style.height+50
    p.style.borderRadius="5px"
    p.style.color="white"

    dv.appendChild(p)
    elm?.appendChild(dv)
  }



  }
 
}



  add_typing()
  {
    var elm=document.getElementById(this.typingId);
    if(elm && elm instanceof HTMLParagraphElement)
    {
      if(this.userType=="user")
      this.service.sendTypingMessageToAdmin(this.userF.id)
      else
      this.service.sendTypingMessageToUser(this.userT.id)
     // elm.textContent="You are typing..."
      
    }
}



  draged()
  {
   
    var chat=document.getElementById(this.chatboxid)
    if(chat)
    chat.addEventListener('dragend',(event)=>{
      if (chat && chat instanceof HTMLElement)
      {
       // alert("does this" +event.clientY+" "+event.clientX)
         this.times++
         chat.style.position="fixed"

         chat.style.top=String(event.clientY)+"px"

         chat.style.left=String(event.clientX)+"px"
        
        // alert("client:"+event.clientY+" "+event.clientX+" "+this.times)
         
        // chat.style.opacity=String(1.0/this.times)
        
      }})

  }

}
