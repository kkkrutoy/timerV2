$(document).ready(function(){
 
    var timers = [];
    for(var i=0;i<3;i++){
        var newTimer = {timerName:"",doneTime:0,state:0};
        timers.push(newTimer);
    }

    var timerID = setInterval(checkTimer, 1000);
    // Store the timer name in timers array when blur event occur
    $("#timer0 .timername, #timer1 .timername, #timer2 .timername").blur(function(){
        var index = parseInt($(this).attr("index"));
        timers[index].timerName = $(this).Val();
    });

    // Bind the click event to the function button
    $("#timer0start, #timer1start, #timer2start").click(function(){
        var index = parseInt($(this).attr("index"));
        if(timers[index].state == 0 || timers[index].state == 2){   // The timer is not running or paused
		$("#timer" + index + "reset").hide();
            var offset = (parseInt($("#timer" + index + " .hours").val())*3600 + parseInt($("#timer" + index + " .minutes").val())*60 + parseInt($("#timer" + index +" .seconds").val()))*1000;
            if(offset > 0){
                var strTime = new Date();
                var doneTime = new Date(strTime.getTime() + offset);
                timers[index].doneTime = doneTime.getTime();
                $("#timer" + index + " .timerdonetime").html(doneTime.getHours() + ":" + doneTime.getMinutes() + ":" + doneTime.getSeconds());
                $("#timer" + index + "start").html("Stop");
                timers[index].state = 1;
		checkTimer();
                return;
            }
        }else if(timers[index].state == 1){ // The timer is running
            $("#timer" + index +"start").html("Resume");
	    $("#timer" + index + "reset").show();
            timers[index].state = 2;
		checkTimer();
            return;
        }else if(timers[index].state == 3){
	$("#timer" + index + " .timername").val("");
        $("#timer" + index + " .hours").val("0");
        $("#timer" + index + " .minutes").val("00");
        $("#timer" + index + " .seconds").val("00");
        $("#timer" + index + " .timerdonetime").html("");
        $("#timer" + index + "start").html("Start");
        $("#timer" + index).css("background-color","white")
        $("#timer" + index + "reset").hide();
        $("#timer" + index + " .timerdonetime").html("");
        timers[index].timerName = "";
        timers[index].state = 0;
        timers[index].doneTime = -1;
	checkTimer();
	}
    });

    // The reset function
    $(".timerreset").click(function(){
        var index = parseInt($(this).attr("index"));
        $("#timer" + index + " .timername").val("");
        $("#timer" + index + " .hours").val("0");
        $("#timer" + index + " .minutes").val("00");
        $("#timer" + index + " .seconds").val("00");
        $("#timer" + index + " .timerdonetime").html("");
	$("#timer" + index + "start").html("Start");
        $("#timer" + index).css("background-color","white")
        $("#timer" + index + "reset").hide();
        $("#timer" + index + " .timerdonetime").html("");
        timers[index].timerName = "";
        timers[index].state = 0;
        timers[index].doneTime = -1;
	checkTimer();
    });

    // The function need to be called each second
    function checkTimer(){
        for(var j=0;j<3;j++){
            if(timers[j].state == 1){   // If the timer is running
                var hr = parseInt($("#timer" + j + " .hours").val());
                var min = parseInt($("#timer" + j + " .minutes").val());
                var sec = parseInt($("#timer" + j + " .seconds").val());
                var newT = hr*3600 + min*60 + sec - 1;
                if(newT == -1){
                    timers[j].state = 3;
                    $("#timer" + j + "start").html("Done");
                    $("#timer" + j).css("background-color", "red");
                    $("#timer" + j + " .timerdonetime").html("Done");
		
                    return;
                }
                $("#timer" + j + " .hours").val(Math.floor(newT/3600));
                $("#timer" + j + " .minutes").val(Math.floor((newT%3600)/60));
                $("#timer" + j + " .seconds").val(newT%60);
            }

        }
    }


});
