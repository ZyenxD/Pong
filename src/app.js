var ppc = 0,ppd = 0;
var speed = 5;
var flag = true;
var HelloWorldLayer = cc.Layer.extend({
    jugador1:null,    
    jugador2:null,
    pelota:null,
    puntuacion1:null,
    puntuacion2:null,
    bouncewall2: function(yep){
        var move = cc.moveTo(speed,Math.floor(Math.random()*800 +0),yep);
        
        return move;
    },
    bouncewall1: function(yep){
        var move = cc.moveTo(speed,Math.floor(Math.random()*800 +0),yep);
        
        return move;
    },
    bounce: function(yep){
        var move = cc.moveTo(speed,0,yep);
        
        return move;
    },
    bounce2:function(yep){
        var move = cc.moveTo(speed,700,yep);
        return move;
    },
    increment:[10,-10],
    ballm:function(){
        var size = cc.winSize;
        var ballcolor = cc.color(50,30,90);
        this.pelota =  new cc.DrawNode();
        this.pelota.drawCircle(cc.p(0,0),5,0,100,false,10,ballcolor);
        this.pelota.setPosition(size.width / 2,size.height / 2);
        this.addChild(this.pelota, 1);
        this.pelota.runAction(this.bounce(this.pelota.getPositionY()));
        
        
    },
    moves:function(key,event){
        game = event.getCurrentTarget();
        cc.log(key.toString());
        if(key.toString() === "87"){
            cc.log("sube");
            if(game.jugador1.getPositionY()!=540){
                game.jugador1.setPositionY(game.jugador1.getPositionY()+game.increment[0]);
                cc.log(game.jugador1.getPositionY());
            }
        }
        else if(key.toString() ==="83"){
            cc.log("baja");
            if(game.jugador1.getPositionY()!=0){
                game.jugador1.setPositionY(game.jugador1.getPositionY()+game.increment[1]);
                cc.log(game.jugador1.getPositionY());
            }
        }
        
        if(key.toString() === "38"){
            cc.log("sube");
            if(game.jugador2.getPositionY()!=540){
                game.jugador2.setPositionY(game.jugador2.getPositionY()+game.increment[0]);
                cc.log(game.jugador2.getPositionY());
            }
        }
        else if(key.toString() ==="40"){
            cc.log("baja");
            if(game.jugador2.getPositionY()!=0){
                game.jugador2.setPositionY(game.jugador2.getPositionY()+game.increment[1]);
                cc.log(game.jugador2.getPositionY());
            }
        }
    },
    col:function(){
        if(  (Math.abs( Math.floor(this.pelota.getPositionX())-this.jugador1.getPositionX()) <=10 ) &&(Math.abs(this.jugador1.getPositionY() - this.pelota.getPositionY()) <=100 )){
            cc.log("in");
            if(flag){
                cc.log("stop");
                this.pelota.stopAllActions();
                flag = false;
            }   this.pelota.setPosition(this.pelota.getPositionX(),this.pelota.getPositionY());
            this.pelota.runAction(this.bounce2(Math.floor(Math.random()*540 +0)));
        } 
        if(  (Math.abs( Math.floor(this.pelota.getPositionX())-this.jugador2.getPositionX()) <=10 ) &&(Math.abs(this.jugador2.getPositionY() - this.pelota.getPositionY()) <=100 )){
             cc.log("in 2");
            if(!flag){
                cc.log("stop 2");
                this.pelota.stopAllActions();
                flag = true;
            }
                this.pelota.setPosition(this.pelota.getPositionX(),this.pelota.getPositionY());
                this.pelota.runAction(this.bounce(Math.floor(Math.random()*540 +0)));
        }
            
    },
    oh_points: function(){
         var size = cc.winSize;
        if(this.pelota.getPositionX()<10){
            ppd++;
            this.removeChild(this.puntuacion2,true);
            this.puntuacion2 = new cc.LabelTTF(ppd.toString(),"Arial",24);
            this.puntuacion2.setPosition(size.width - (size.width * 0.4), size.height - (size.height * 0.10));
            this.addChild(this.puntuacion2,0);
            this.pelota.setVisible(false);
            this.ballm()
            
        }
        if(this.pelota.getPositionX()>900){
            ppc++;
            this.removeChild(this.puntuacion1,true);
            this.puntuacion1 = new cc.LabelTTF(ppc.toString(),"Arial",24);
            this.puntuacion1.setPosition(size.width * 0.4, size.height - (size.height * 0.10));
            this.addChild(this.puntuacion1,0);
            this.ballm();
        }
    },
    inicializar:function(){
        var size = cc.winSize;
        var color = cc.color(100,100,100);
        this.jugador1 =  new cc.DrawNode();
        
        this.jugador1 =  new cc.DrawNode();
        this.jugador1.drawRect(cc.p(0,0),cc.p(20,100),color,3);
        this.jugador1.setPosition(size.width * 0.1,size.height / 2);
        this.addChild(this.jugador1, 1);

        this.jugador2 =  new cc.DrawNode();
        this.jugador2.drawRect(cc.p(0,0),cc.p(20,100),color,3);
        this.jugador2.setPosition(size.width -(size.width * 0.1),size.height / 2);
        this.addChild(this.jugador2, 1);        

        var lineaDivisoria =  new cc.DrawNode();
        lineaDivisoria.drawSegment(cc.p(size.width/2,0),cc.p(size.width/2,size.height),3,color);
        this.addChild(lineaDivisoria,0);
        
        this.puntuacion1 = new cc.LabelTTF(ppc.toString(),"Arial",24);
        this.puntuacion1.setPosition(size.width * 0.4, size.height - (size.height * 0.10));
        this.addChild(this.puntuacion1,0);
        
        this.puntuacion2 = new cc.LabelTTF(ppd.toString(),"Arial",24);
        this.puntuacion2.setPosition(size.width - (size.width * 0.4), size.height - (size.height * 0.10));
        this.addChild(this.puntuacion2,0);
        if(cc.sys.capabilities.hasOwnProperty('keyboard')){
            cc.eventManager.addListener({
                event: cc.EventListener.KEYBOARD,
                onKeyPressed: this.moves
            },this);
        }
        this.ballm();
        this.schedule(this.col,0,Infinity);
        this.schedule(this.oh_points,0,Infinity);
    },
    ctor:function () {
        this._super();
        this.inicializar();
        //this.schedule(this.col,1);


        return true;
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

