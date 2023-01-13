import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, enableProdMode, OnInit, ViewChild } from '@angular/core';
import { User } from '../user';
import { Router } from '@angular/router'
import { Device } from '../device';
import { Measurement } from '../measurement';
import { Subject } from 'rxjs/internal/Subject';
import { LocatorService } from '../locator.service';
import * as Highcharts from 'highcharts'; 
import { WebsocketService } from '../websocket.service';
import { ChatComponentComponent } from '../chat-component/chat-component.component';
import { ChatDirectiveDirective } from '../chat-directive.directive';




@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
   host="http://localhost:8080"
  user:any;
  devices:any;
  chart:any;
  day:any;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  device_search:any;
  device_searched=false;
  url1=this.host+"/user/"
  url13 =this.host+ "/device"
  headers:any
  @ViewChild(ChatDirectiveDirective, {static: true}) chatHost!:ChatDirectiveDirective;
  
  constructor(private httpc:HttpClient,private router:Router,private lt: LocatorService,private ws:WebsocketService,private chat:ChatComponentComponent ) { 
    enableProdMode()
    this.dtOptions = {
   
    pagingType: 'full_numbers',
    pageLength: 5,
    processing: true
    }
    this.headers= new HttpHeaders().set( 'Authorization', `Bearer ${sessionStorage.getItem("token")}`)
    this.headers.set(  'Content-Type','application/json')
   
 
   this.host=lt.getHost();
   this.url1=this.host+"/user/"
   this.url13 =this.host+ "/device"
   console.log("SERVERRRRR",ws);
   //this.makeChat()
  }

        remove_duplicates_devices(){
         
          
          
            var copy_dev=[];
            

           
            if(this.devices.length>=1){

             copy_dev.push(this.devices[0])
                
               
         for(let i=1;i<this.devices.length;i++)
         {    
              var  d=this.devices[i];
             
                    
          
             var inside=false;
             
              for(let k=0;k< copy_dev.length;k++)
              {
                     if(copy_dev[k].id==d.id)
                       inside=true;

              }
              if(!inside)
              copy_dev.push(this.devices[i])
             
             
         }
        }

         
         this.devices=copy_dev;
      
      }
            

  sort(measure:[])
  {
    measure.sort( (a:any,b:any)=>{      
    var t1=a["time"]  ;
   var t2=b["time"]
   if(t1==t2)
    return 0;
    if(t1>t2)
    return 1;
    if(t1<t2)
    return -1;

    return 0;

   } )
      
  }

   make_Chart(devices:any,date:any)
   {

    $("#charts_section").height("600px")




          let i=0;
       
        
        

   
     {

      var dataSet: any[]=[];
      var labels:any=[];
      var  device=this.device_search;
      var name="None"
    // for(let device of devices )
    if(this.device_searched==true)
      {     
            
            var dataValues:any=[ ] 
            var label="kW/h"
            name=device.name

  


         
           i=i+1

          var dev:Device=device;


          var  measurements= dev.measurements

           this.sort(measurements);


          for(let measure of measurements)
          {

            if(measure["date"]==this.day)
            {
              
             dataValues.push(measure["energyConsumption"])
             labels.push(measure["time"])
            }

          }

         

           dataSet.push({data:dataValues,label:label});
        }

        this.chart= Highcharts.chart('container', {
          chart: {
              type: 'spline'
          },
          title: {
            text: 'Energy consumption'
        },

          xAxis: {

              categories: labels,
              title:{
               text: "Hours"
              },
          },
          yAxis: {
              title: {
                  text: 'KW/h'
              }},
            
           series:[{ name:name, data:dataValues,type:'line'} ],

        });
            
            
            
            
            }


             
    }
    

    do_notifications()
    {
     
     var notification=this.ws.getNotification()
     var idUser=sessionStorage.getItem("idUser");
   

      $("#notifis_div").empty();


      if(notification)
      if(notification.length>0)
     for(var notif of notification)
    {    
   

         if(notif["user_id"]==idUser)
         {
          $("#notifis_div").append("<p>"+notif["message"]+"</p>")
       
         }
 
    }
    $("html").css("background-color","grainsboro")

    
    }
    

   do_search()
   {
    this.searchDevice();
   
   }


  change_title()
  {
    var title= document.getElementById("title");
    if(title)
     title.textContent=title.textContent+" "+this.user["name"];

  }

  setDate()
  {
 
    var elem=document.getElementById("date");
    if(elem && elem instanceof HTMLInputElement)
    {

    this.day=elem.value;
  
    this.make_Chart(this.devices,this.day);

    }


  }
  ngOnInit(): void {
  
   var ua= sessionStorage.getItem("type");
   if(ua=="USER")
     {


     var bdy= document.getElementsByTagName("body")[0] 
    
     
   
       console.log("se poate oare?",this.ws);
          
    console.log("este permis accesul");
   
             
      var idUser=sessionStorage.getItem("idUser");
      
        this.ws.connect_first(idUser)
        this.httpc.get(this.url1+idUser,{ headers: this.headers }).subscribe(data=>{
          
          this.user=data;
          this.makeChat()
          console.log("USER:",this.user);

          var chatElem=document.getElementById("chat")
          console.log(chatElem)
          this.change_title();
           this.devices=this.user.devices;
          // console.log("devices before replace",this.devices)
           this.dtTrigger.next("2");
           this. remove_duplicates_devices()
            setInterval(this.do_notifications.bind(this),2000)
            setInterval( this.reSearch.bind(this),5000)


           })


          
        ;
      
    

   }
  else{
    console.log("nu este permis accesul");
    this.router.navigate(["/home"]);
   }

  }

  makeChat()
  {
    
    let viewContainerRef = this.chatHost.viewContainerRef;
     
    var componentRef = viewContainerRef.createComponent<ChatComponentComponent>(ChatComponentComponent)
   var  admin={name:"admin",id:"0"}
     componentRef.instance.set_user(1,this.user,admin)
    

  
  }
  

  searchDevice() {

    var val = document.getElementById("dsearch");
    if (val && val instanceof HTMLInputElement) {
   
 
      this.searchDeviceById(Number(val.value))
    }



  }

  reSearch()
 {
   
  if(this.device_search ) 
    if(this.device_search["id"])
  {
    
    this.searchDeviceById(this.device_search["id"]);
  }


 }





  searchDeviceById(id: number) {
    this.httpc.get(this.url13 + "/" + id,{ headers: this.headers }).subscribe(response => {
      this.device_search = response;
      this.device_searched=true;
      var dname= document.getElementById("devicename");
      if(dname instanceof HTMLParagraphElement)
            dname.textContent=this.device_search["name"]
      
            if(!this.day)
            {
      let date=new Date();
      let day_string=""
      let month_string=""
      if(date.getDate()>10)
      day_string=String(date.getDate())
      else
      day_string="0"+String(date.getDate())

      if(date.getMonth()+1>10)
      month_string=String(date.getMonth()+1)
      else
      month_string="0"+String(date.getMonth()+1)

      let date2=String(date.getFullYear())+"-"+month_string+"-"+day_string;
      // console.log("current found day: ",date2);
       this.day=date2;
            }
      $("#date").val(this.day)
    

      this.make_Chart(this.device_searched,this.day);
      

     // alert("Device: "+ this.device_search.name +" was found");
    },error=>alert("Couldn't find device"))
  }

}