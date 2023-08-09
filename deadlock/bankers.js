$(document).ready(function() {

	var toolTipArray=[-1,-1,-1];

	var pieData = [
	{
		value: 0,
		color:"#F7464A",
		highlight: "#FF5A5E",
		label: "P0",


	},
	{
		value: 2,
		color: "#46BFBD",
		highlight: "#5AD3D1",
		label: "P1",

	},
	{
		value: 3,
		color: "#FDB45C",
		highlight: "#FFC870",
		label: "P2"
	},
	{
		value: 2,
		color: "#9c27b0",
		highlight: "#771e86",
		label: "P3"
	},
	{
		value: 0,
		color: "#4D5360",
		highlight: "#616774",
		label: "P4"
	},

	{
		value: 3,
		color: "#fcfcfc",
		highlight: "#ffffff",
		label: "Free"
	}


	];


	var pieData2 = [
	{
		value: 1,
		color:"#F7464A",
		highlight: "#FF5A5E",
		label: "P0",

	},
	{
		value: 0,
		color: "#46BFBD",
		highlight: "#5AD3D1",
		label: "P1"
	},
	{
		value: 0,
		color: "#FDB45C",
		highlight: "#FFC870",
		label: "P2"
	},
	{
		value: 1,
		color: "#9c27b0",
		highlight: "#771e86",
		label: "P3"
	},
	{
		value: 0,
		color: "#4D5360",
		highlight: "#616774",
		label: "P4"
	},

	{
		value: 3,
		color: "#fcfcfc",
		highlight: "#ffffff",
		label: "Free"
	}


	];


	var pieData3 = [
	{
		value: 0,
		color:"#F7464A",
		highlight: "#FF5A5E",
		label: "P0",

	},
	{
		value: 0,
		color: "#46BFBD",
		highlight: "#5AD3D1",
		label: "P1"
	},
	{
		value: 2,
		color: "#FDB45C",
		highlight: "#FFC870",
		label: "P2"
	},
	{
		value: 1,
		color: "#9c27b0",
		highlight: "#771e86",
		label: "P3"
	},
	{
		value: 2,
		color: "#4D5360",
		highlight: "#616774",
		label: "P4"
	},

	{
		value: 2,
		color: "#fcfcfc",
		highlight: "#ffffff",
		label: "Free"
	}


	];

	var pieChart1 = document.getElementById("chart-area").getContext("2d");
	var pieChart2 = document.getElementById("chart-area2").getContext("2d");
	var pieChart3 = document.getElementById("chart-area3").getContext("2d");

	var myPie = new Chart(pieChart1).Pie(pieData, {
		responsive:true,
	
    onAnimationComplete: function()
    {
    	var toolIndex=toolTipArray[0];

    	console.log("tool:"+toolIndex);
    	if(toolIndex!=-1 )
    	{
	    	this.showTooltip([this.segments[toolIndex]], true);
        }
    },



	});


	var myPie2 = new Chart(pieChart2).Pie(pieData2, {
		responsive:true,

    onAnimationComplete: function()
    {
    	var toolIndex=toolTipArray[1];

    	console.log("tool:"+toolIndex);
    	if(toolIndex!=-1 )
    	{
	    	this.showTooltip([this.segments[toolIndex]], true);
        }
    },

	});


	var myPie3 = new Chart(pieChart3).Pie(pieData3, {
		responsive:true,

    onAnimationComplete: function()
    {
    	var toolIndex=toolTipArray[2];

    	console.log("tool:"+toolIndex);
    	if(toolIndex!=-1 )
    	{
	    	this.showTooltip([this.segments[toolIndex]], true);
        }
    },

	});





	window.onload = function(){
		

	};







	// there are three resources, A B C
	var resourceAmount=3;

	var processAmount=5;

	var processArray=[];

	var safeOrder=[]

	var safePathFound=true;

	//keeps track of if too many resources have been allocated
	var overLoad=false;


	var safeOrderIndex=0;
	
	var GUIrunning=false;

	//updatePieCharts();

	var resourceA;
	var resourceB;
	var resourceC;


	var resourceAmountA=10;
	var resourceAmountB=5;
	var resourceAmountC=7;

	initializeValues();


	run();

	findSafePath();

	function process(allocA, allocB, allocC, maxA, maxB, maxC, index)
	{

		this.allocA=allocA;
		this.allocB=allocB;
		this.allocC=allocC;
		this.maxA=maxA;
		this.maxB=maxB;
		this.maxC=maxC;

		this.processIndex=index;


		this.update =function(newAllocA, newAllocB, newAllocC, newMaxA, newMaxB, newMaxC)
		{
			this.allocA=newAllocA;
			this.allocB=newAllocB;
			this.allocC=newAllocC;
			this.maxA=newMaxA;
			this.maxB=newMaxB;
			this.maxC=newMaxC;

		}

		this.canRun = function()
		{
			if(this.maxA<= resourceA.getFree() + this.allocA 
				&& this.maxB<= resourceB.getFree() + this.allocB 
				&& this.maxC<= resourceC.getFree() + this.allocC )
			{
				return true;
			}
			else
			{
				return false;
			}
		}

		this.getRidOf = function()
		{
			resourceA.sub(this.allocA);
			resourceB.sub(this.allocB);
			resourceC.sub(this.allocC);

			this.allocA=0
			this.allocB=0
			this.allocC=0
			this.maxA=0
			this.maxB=0
			this.maxC=0
		}

		this.runProcess = function()
		{
			$("#row_"+(this.processIndex+1)).addClass("table-row-selected");

			var number= this.processIndex;

			createAlert($("#p"+number+"_alloc_A"), "Running P"+number+", allocating maximum values");

			setTimeout(function(){

				$("#p"+number+"_alloc_A").val(processArray[number].maxA);
				$("#p"+number+"_alloc_B").val(processArray[number].maxB);
				$("#p"+number+"_alloc_C").val(processArray[number].maxC);


				run();

				setTimeout(function(){

					createAlert($("#p"+number+"_alloc_A"), "P"+number+" finished, releasing all resources");

					toolTipArray=[-1,-1,-1];

					$("#p"+number+"_alloc_A").val(0);
					$("#p"+number+"_alloc_B").val(0);
					$("#p"+number+"_alloc_C").val(0);
					setTimeout(function(){$("#row_"+(number+1)).removeClass("table-row-selected")},1750);			 	
					console.log("num is:"+number);
					run();
				}, 6000);

			}, 750);

		}

		this.printProcess = function()
		{
			console.log(this.allocA+" "+this.allocB+" "+this.allocC+" "+this.maxA+" "+this.maxB+" "+this.maxC)
		}

	}

	function resource(name, resourceAmount )
	{
		this.name=name;
		this.resourceAmount=resourceAmount;

		this.resourcesUsed=0;



		this.update =  function(newResourceAmount )
		{
			this.resourceAmount=newResourceAmount;
			this.resourcesUsed=0;
		}

		this.getFree = function()
		{
			var free=this.resourceAmount-this.resourcesUsed;


			if(free>0)
			{
				return free;
			}

			else 
			{
				return 0;
			}
		}

		this.add= function( allocatedAmount)
		{
			this.resourcesUsed+= allocatedAmount;
			console.log("added: "+allocatedAmount+"   have:"+this.resourcesUsed);
		}

		this.sub = function (allocatedAmount)
		{
			this.resourcesUsed-= allocatedAmount;
		}

		this.getPercent = function()
		{
			return Math.round( (this.resourcesUsed/this.resourceAmount)*100);
		}

		this.canAdd= function( allocAmount)
		{

			if(this.resourcesUsed+allocAmount > this.resourceAmount)
			{
				return false;
			}

			else
			{
				return true;
			}
		}
	}

	function initializeValues()
	{
		processArray=[];
		resourceA= new resource("A", resourceAmountA);
		resourceB= new resource("B", resourceAmountB);
		resourceC= new resource("C", resourceAmountC);

		for(var i=0; i<processAmount;i++)
		{
			processArray[i]=new process(0,0,0,0,0,0, i);

		}

	}



	function findSafePath() {
		loadValues();

		if(overLoad==false)
		{
			var path="";
			var completed=[];
			safeOrder=[];
			safePathFound=false;

			for(var i=0; i<processAmount;i++)
			{
				completed[i]=false;
			}


			var completedAmount=0;

			var found=false;
			var stalled=false;

			while(completedAmount<processArray.length&&stalled==false)
			{
				stalled=true;
				for(var i=0; i<processAmount;i++)
				{	
					if(processArray[i].canRun())
					{
						if(completed[i]==false)
						{
							if(completedAmount==0)
							{
								path="Safe Path:  <span id='p_"+completedAmount+"'>p"+i+"</span>";
							}
							else
							{
								path+="  <span class='glyphicon glyphicon-arrow-right'></span>  <span id='p_"+completedAmount+"'>p"+i+"</span>";
							}
							completed[i]=true;
							safeOrder[safeOrder.length]=i;
							completedAmount++;
							processArray[i].getRidOf();
							stalled=false;
						}
						
						
					}
					else
					{
						completed[i]=false;
					}	

				}
			}

			if(completedAmount<processArray.length)
			{
				path="no safe path";
			}
			else
			{
				safePathFound=true;
			}

			$("#safe_path").html(path);
			console.log(path);

			run();
		}
		else
		{
			$("#safe_path").html("no safe path");
		}
	}

	function safePathGUI()
	{
		safeOrderIndex=0;
		GUIrunning=true;

		$("button, input").attr("disabled",true);

		nextGUI();
	}

	function nextGUI()
	{	
		if(safeOrderIndex<safeOrder.length)
		{
			runProcess(safeOrder[safeOrderIndex]);
			$("#p_"+safeOrderIndex).addClass("equation-line-selected");
			safeOrderIndex++;
			setTimeout( function(){ 
				$("#p_"+(safeOrderIndex-1)).removeClass("equation-line-selected");
				setTimeout( function(){ nextGUI();},1000);
			},12500);
		}
		else
		{
			$("button, input").attr("disabled",false);
			GUIrunning=false;
			if(safePathFound==false)
			{
				alert("no safe path");
			}
		}
	}

	//loads the values from the table
	function loadValues(){

		overLoad=false;

		resourceA.update(resourceAmountA);
		resourceB.update(resourceAmountB);
		resourceC.update(resourceAmountC);



		for(var i=0; i<processAmount;i++)
		{
			var allocA= Number($("#p"+i+"_alloc_A").val());
			var allocB= Number($("#p"+i+"_alloc_B").val());
			var allocC= Number($("#p"+i+"_alloc_C").val());
			var maxA= Number($("#p"+i+"_max_A").val());
			var maxB= Number($("#p"+i+"_max_B").val());
			var maxC= Number($("#p"+i+"_max_C").val());

			processArray[i].update(allocA, allocB, allocC, maxA, maxB, maxC);
			processArray[i].printProcess();

			if(resourceA.canAdd(allocA) )
			{
				resourceA.add(allocA);
			}
			else
			{
				overLoad=true;

				$(".alloc_A").addClass("table-row-selected");
				setTimeout(function(){
					$(".alloc_A").removeClass("table-row-selected");
				},1750);


				createAlert($("#p"+i+"_alloc_A"),"Resource A has too much allocated, cannot exceed "+resourceAmountA );
				break;
			}

			if(resourceB.canAdd(allocB) )
			{
				resourceB.add(allocB);
			}
			else
			{
				overLoad=true;

				$(".alloc_B").addClass("table-row-selected");
				setTimeout(function(){
					$(".alloc_B").removeClass("table-row-selected");
				},1750);

				createAlert($("#p"+i+"_alloc_B"),"Resource B has too much allocated, cannot exceed "+resourceAmountB );
				break;
			}

			if(resourceC.canAdd(allocC) )
			{
				resourceC.add(allocC);
			}
			else
			{
				overLoad=true;

				$(".alloc_C").addClass("table-row-selected");
				setTimeout(function(){
					$(".alloc_C").removeClass("table-row-selected");
				},1750);

				createAlert($("#p"+i+"_alloc_C"),"Resource C has too much allocated, cannot exceed "+resourceAmountC );
				break;
			}

			
			
		}
	};
	

	function updatePieCharts()
	{
		if(overLoad==false)
		{
			for(var i=0; i<processAmount;i++)
			{
				myPie.segments[i].value = processArray[i].allocA;
				myPie2.segments[i].value = processArray[i].allocB;
				myPie3.segments[i].value = processArray[i].allocC;
			}

			myPie.segments[5].value = resourceA.getFree();
			myPie2.segments[5].value = resourceB.getFree();
			myPie3.segments[5].value = resourceC.getFree();

			
			$("#resA_percent").html( resourceA.getFree()+"&nbsp;available, "+resourceA.getPercent()+"%&nbsp;used");
			$("#resB_percent").html( resourceB.getFree()+"&nbsp;available, "+resourceB.getPercent()+"%&nbsp;used");
			$("#resC_percent").html( resourceC.getFree()+"&nbsp;available, "+resourceC.getPercent()+"%&nbsp;used");

			myPie.update();
			myPie2.update();
			myPie3.update();
		}
	}

	function runProcess(index)
	{

		if(processArray[index].canRun())
		{
			toolTipArray= [index,index,index];
			processArray[index].runProcess();
		}
		else
		{

			$("#p"+index+"_max_A").addClass("table-row-selected");
			$("#p"+index+"_max_B").addClass("table-row-selected");
			$("#p"+index+"_max_C").addClass("table-row-selected");

			setTimeout(function(){
				$("#p"+index+"_max_A").removeClass("table-row-selected");
				$("#p"+index+"_max_B").removeClass("table-row-selected");
				$("#p"+index+"_max_C").removeClass("table-row-selected");
			},1750);
			createAlert($("#p"+index+"_max_A"), "Can't run P"+index +" because max values are too high");
		}

	}

	
	function run()
	{
		loadValues();
		updatePieCharts();

		if(GUIrunning==false)
		{
			if(resourceA.getFree()<=0)
			{
				$('#subtract_A').attr("disabled",true);
			}
			else
			{
				$('#subtract_A').attr("disabled",false);
			}
			
			if(resourceB.getFree()<=0)
			{
				$('#subtract_B').attr("disabled",true);
			}
			else
			{
				$('#subtract_B').attr("disabled",false);
			}
			
			if(resourceC.getFree()<=0)
			{
				$('#subtract_C').attr("disabled",true);
			}
			else
			{
				$('#subtract_C').attr("disabled",false);
			}
		}




	}

	function createAlert (div, text)
	{
		var el= document.createElement('div');
		$(el).css("position","absolute")
		.css("z-index", 9)
		.addClass("alert")
		.addClass ( "alert-danger")
		.addClass ( "alert-dismissible")
		.attr("role","alert")
		.html(' <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+text+'</div>')
		$(div).parent().append(el);
		$(el).delay(5000).fadeOut(1000,function(){$(el).remove()});
	}


/*
****************************************************************
					All the click event listeners
****************************************************************
*/


//when you input a value into the table
$('td input').on('input propertychange paste', function(){

	var letter=$(this).attr("letter");
	var process= $(this).parent().parent().attr("proccess");

	if($(this).hasClass("max"))
	{
		var alloc=$("#p"+process+"_alloc_"+letter)
		var allocValue=Number(alloc.val());

		if($(this).val()<allocValue)
		{
			$(alloc).addClass("table-row-selected");
			setTimeout(function(){
				$(alloc).removeClass("table-row-selected");
			},1750);
			createAlert( alloc, 'Lowering allocated value to new maximum for Resource '+letter);
			alloc.val($(this).val());

			
		}

		findSafePath();

	}

	else
	{
		var max=$("#p"+process+"_max_"+letter)
		var maxValue= Number(max.val());

		if($(this).val()>maxValue)
		{
			

			$(max).addClass("table-row-selected");
			setTimeout(function(){
				$(max).removeClass("table-row-selected");
			},1750);
			createAlert( $(max), 'P'+process+' has a maximum value of '+maxValue+' for Resource '+letter);
			$(this).val(maxValue);
		}
		else
		{
			if(letter=="A")
			{
				toolTipArray=[process,-1,-1];
			}
			else if(letter=="B")
			{
				toolTipArray=[-1, process,-1];
			}
			else if(letter=="C")
			{
				toolTipArray=[-1,-1,process];	
			}

			setTimeout(function(){toolTipArray=[-1,-1,-1]; }, 1800);
			findSafePath();
		}
	}
	
});


$('.run_button').click(function(){

	var val= Number($(this).val());

	runProcess(val);

});


$('#subtract_A').click(function(){

	if(resourceAmountA>=1)
	{
		resourceAmountA-= 1;
		resourceAmountA=parseFloat(resourceAmountA.toPrecision(12));
	}

	

	$('#enter_A').val(resourceAmountA);


	findSafePath();
});

$('#add_A').click(function(){


	resourceAmountA+= 1;
	resourceAmountA=parseFloat(resourceAmountA.toPrecision(12));
	
	$('#enter_A').val(resourceAmountA);

	findSafePath();
	
});


$('#enter_A').on('input propertychange paste', function(){

	if(isNaN($(this).val())==false && $(this).val()>=0 )
	{
		resourceAmountA= Number($(this).val());
	}

	findSafePath();
});

$('#subtract_B').click(function(){

	if(resourceAmountB>=1)
	{
		resourceAmountB-= 1;
		resourceAmountB=parseFloat(resourceAmountB.toPrecision(12));
	}

	$('#enter_B').val(resourceAmountB);
	findSafePath();

});

$('#add_B').click(function(){


	resourceAmountB+= 1;
	resourceAmountB=parseFloat(resourceAmountB.toPrecision(12));
	

	$('#enter_B').val(resourceAmountB);
	findSafePath();

});


$('#enter_B').on('input propertychange paste', function(){

	if(isNaN($(this).val())==false && $(this).val()>=0 )
	{
		resourceAmountB= Number($(this).val());
	}

	findSafePath();
});

$('#subtract_C').click(function(){

	if(resourceAmountC>=1)
	{
		resourceAmountC-= 1;
		resourceAmountC=parseFloat(resourceAmountC.toPrecision(12));
	}

	
	$('#enter_C').val(resourceAmountC);
	findSafePath();
});

$('#add_C').click(function(){


	resourceAmountC+= 1;
	resourceAmountC=parseFloat(resourceAmountC.toPrecision(12));
	

	findSafePath();
	$('#enter_C').val(resourceAmountC);
});


$('#safe_button').click(function(){
	
	safePathGUI();
});




$('#enter_C').on('input propertychange paste', function(){

	if(isNaN($(this).val())==false && $(this).val()>=0 )
	{
		resourceAmountC= Number($(this).val());
	}

	findSafePath();
});


$( window ).resize(function() {

});





});