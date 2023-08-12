var processes;
var resources;
var whichInput=0;
var data;
var alloc=[[]];
var max = [[]];
var available=[];
//testing values
// alloc=[[0,1,0],
// [2,0,0],
// [3,0,2],
// [2,1,1],
// [0,0,2]
// ];

// max=[[7,5,3],
// [3,2,2],
// [9,0,2],
// [2,2,2],
// [4,3,3]
// ];

// available=[
//     3,3,2
// ];



//get number of inputs
$("#initial-submit").submit(function( event ){
    data = $(this).serializeArray();
    event.preventDefault();
    console.log(whichInput);
    if(whichInput === 0)
    {
        processes = data[0].value;
        resources = data[1].value;
        createInputs();
        whichInput=1;
    }
    else
    {
        this.remove();
        console.log('object from show safe');
        showSafeSeq();
    }
});

//create inputs
function createInputs(){
    var form = document.getElementById('initial-submit');
    while (form.hasChildNodes())
    {
        form.removeChild(form.lastChild);
    }
    document.getElementById('col2').classList.remove('col-2');
    document.getElementById('col2').classList.add('col-1');
    document.getElementById('col8').classList.add('col-10');
    
    var tblResposive = document.createElement('div');
    tblResposive.classList.add('table-responsive');

    var mainTable = document.createElement('table');
    mainTable.classList.add('table');

    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.classList.add('border-right');
    th.innerText = 'Process #';
    th.style.width = '100px';

    tr.appendChild(th);
    thead.appendChild(tr);
    mainTable.appendChild(thead);

    var allocTH = document.createElement('th');
    allocTH.classList.add('text-center');
    allocTH.classList.add('border-right');
    allocTH.innerText = 'Allocation';

    tr.appendChild(allocTH);
    thead.appendChild(tr);
    mainTable.appendChild(thead);

    var maxTH = document.createElement('th');
    maxTH.classList.add('text-center');
    maxTH.innerText = 'Maximum';

    tr.appendChild(maxTH);
    thead.appendChild(tr);
    mainTable.appendChild(thead);

    var tbody = document.createElement('tbody');

    var tr = document.createElement('tr');
    var td = document.createElement('td');
    tr.appendChild(td);
    
    var td = document.createElement('td');
    td.classList.add('border-right');
    var innerTable = document.createElement('table');
    innerTable.classList.add('table');
    innerTable.classList.add('remove-border');

    for(j=0;j<resources;j++)
    {
        var innerTH = document.createElement('th');
        innerTH.classList.add('text-center');
        innerTH.innerText = String.fromCharCode(65 + j);
        innerTable.appendChild(innerTH);
    }
    td.appendChild(innerTable);
    tr.appendChild(td);

    var td = document.createElement('td');
    td.classList.add('border-right');
    var innerTable = document.createElement('table');
    innerTable.classList.add('table');
    innerTable.classList.add('remove-border');

    for(j=0;j<resources;j++)
    {
        var innerTH = document.createElement('th');
        innerTH.classList.add('text-center');
        innerTH.innerText = String.fromCharCode(65 + j);
        innerTable.appendChild(innerTH);
    }
    td.appendChild(innerTable);
    tr.appendChild(td);

    tbody.appendChild(tr);



    for (i=0;i<processes;i++)
    {
        // Append a node with a random text

        var tr = document.createElement('tr');
        var td = document.createElement('td');

        td.innerText = 'Process '+ (i);
        tr.appendChild(td);
        
        var innerTDAlloc = document.createElement('td');
        innerTDAlloc.classList.add('border-right');

        var innerInputTableAlloc = document.createElement('table');
        innerInputTableAlloc.classList.add('table');
        innerInputTableAlloc.classList.add('remove-border');

        var innerTDResourse = document.createElement('td');
        innerTDResourse.classList.add('border-right');

        var innerInputTableResourse = document.createElement('table');
        innerInputTableResourse.classList.add('table');
        innerInputTableResourse.classList.add('remove-border');

        for(j=0;j<resources;j++)
        {
            var insideTHAlloc = document.createElement('th');
            var insideInputAlloc = document.createElement('input');
            insideInputAlloc.type = 'number';
            insideInputAlloc.name = 'alloc' + i;
            insideInputAlloc.required = true;
            insideInputAlloc.classList.add('form-control');

            insideTHAlloc.appendChild(insideInputAlloc);


            var insideTHRes = document.createElement('th');
            var insideInputRes = document.createElement('input');
            insideInputRes.type = 'number';
            insideInputRes.name = 'max' + i;
            insideInputRes.required = true;
            insideInputRes.classList.add('form-control');

            insideTHRes.appendChild(insideInputRes);


            innerInputTableAlloc.appendChild(insideTHAlloc);
            innerInputTableResourse.appendChild(insideTHRes);

        }
        
        innerTDAlloc.appendChild(innerInputTableAlloc);
        innerTDResourse.appendChild(innerInputTableResourse);
        tr.appendChild(innerTDAlloc);
        tr.appendChild(innerTDResourse);
        tbody.appendChild(tr);
    }

    mainTable.appendChild(tbody);
    tblResposive.appendChild(mainTable);

    var availableDiv = document.createElement('div');
    availableDiv.classList.add('form-group');
    availableDiv.classList.add('avail-con');

    var p = document.createElement('h4');
    p.innerText='Availble Resources';
    p.classList.add('text-primary');
    p.classList.add('text-center');
    p.classList.add('mt-4');
    availableDiv.appendChild(p);

    let newdiv = document.createElement('div');
    newdiv.classList.add('table-responsive');

    let avaiableTable = document.createElement('table');
    avaiableTable.classList.add('table');
    let avaianleThead = document.createElement('thead');
    let avaiableTbody = document.createElement('tbody');
    let avaiableTR = document.createElement('tr');
    let avaiableTR2 = document.createElement('tr');
    for(j=0;j<resources;j++)
    {
        let th = document.createElement('th');
        th.classList.add('text-center');
        th.classList.add('border-right');
        th.innerText = String.fromCharCode(65 + j);

        let td = document.createElement('td');
        let inp = document.createElement('input');
        inp.type = 'number';
        inp.name = 'avail' + j;
        inp.required = true;
        inp.classList.add('form-control');
        td.appendChild(inp);
        avaiableTR.appendChild(th);
        avaiableTR2.appendChild(td);
    }
    avaianleThead.appendChild(avaiableTR);
    avaiableTbody.appendChild(avaiableTR2);
    avaiableTable.appendChild(avaianleThead);
    avaiableTable.appendChild(avaiableTbody);
    newdiv.appendChild(avaiableTable);

    form.appendChild(tblResposive);
    form.appendChild(availableDiv);
    form.appendChild(newdiv);

    var btn = document.createElement("button");
    btn.type='submit';
    btn.innerText='submit';
    btn.classList.add('btn');
    btn.classList.add('btn-primary');
    form.appendChild(btn);
}


function formatInput(){
    let swap =0;
    let count=0;
    let temp=[];
    for(i=0;i<(data.length)-resources;i++)
    {
        // console.log(data[i].value);
        temp.push(parseInt(data[i].value));
        count++;
        if(count>=resources)
        {
            count=0;
            if(swap==0)
            {
                alloc.push(temp);
                swap=1;
            }else
            {
                max.push(temp);
                swap=0;
            }
            temp=[];
        }
    }

    max.shift();
    alloc.shift();

    available=data.slice(1).slice(-resources);
    for(i=0;i<available.length;i++)
    {
        available[i]=parseInt(available[i].value);
    }
}


function calculateNeed(){
    let need=[];
    for (i=0;i<processes;i++){
        // #temp list to hold needed values before appending to the need list
        tempList=[];
        for(j=0;j<resources;j++)
        {
            tempList.push(max[i][j]-alloc[i][j]);
        }
        need.push(tempList);
    }
    return need;

}
let finalMax;
var out = ['<u><b>PROCESS EXECUTION:<b><u><br><br>'];
var x = "";
var out1 = ['<br><br><br><u><b>PROCESS EXECUTION INFORMATION ITERATION WISE<b><u><br><br>'];
var y = "";
var k = 1;
function safeSeq()
{
    formatInput();

    //Resources needed for each process
    let need=[];
    need=calculateNeed();

    // #finished processes initialized all to false
    let finished=[];
    finished.length=processes;
    finished.fill(false);

    finalMax = need;
    console.log(alloc);
    console.log(max);
    console.log(need);
    console.log(available);
    

    // #safe seq
    let safe=[];
    console.log(safe);

    // #boolean to check if any process was allocated
    // #if no process is allocated then system is in deadlock or safesequence was found
    var allocated = true;

    while(allocated == true)
    {
        y="";
				y+=k+") Iteration "+k;
				k++; 
        allocated=false;
        for (i=0;i<processes;i++)
        {
            if (finished[i] == false)
            {
                // #boolean run to check if needed resources are less than or equal to available
                let run=true;
                
                y+="<br><ul><li>Process "+i+" :";
                y+="<ul><li>Available : (";
                    
                for(j=0;j<resources;j++)
                {
                    y+=available[j];
                    if(j!=resources-1)
                    {
                        y+=",";
                    } 
                }
                
                y+=")</li><li>Needed : (";
                for(j=0;j<resources;j++)
                {
                    y+=finalMax[i][j];
                    if(j!=resources-1)
                    {
                        y+=",";
                    }                         
                }
                y+=")</li>";
                        
                for(j=0;j<resources;j++)
                {
                    if (need[i][j] > available[j])
                    {
                        run=false;
                        break;
                    }
                }
                if(run==false)
                {
                    y+="<li>NO RESOURCE ALLOCATED</li></ul></li></ul>";            
                }
                else
                {
                		y+="<li>RESOURCE ALLOCATED</li></ul></li></ul>";
                    allocated=true;
                    finished[i]=true;
                    safe.push(i);
                    x="";
                    x+="Process " + i + " ==> Available : (";
                    for(j=0;j<resources;j++)
                    {
                        x+=available[j];
                        if(j!=resources-1)
                        {
                            x+=",";
                        } 
                    }
                    x+=")   &&   Needed : (";
                    for(j=0;j<resources;j++)
                    {
                        x+=finalMax[i][j];
                        if(j!=resources-1)
                        {
                            x+=",";
                        }                         
                    }
                    x+=")<br>";
                    out.push(x);
                    for(j=0;j<resources;j++)
                    {
                        available[j]=available[j]+alloc[i][j];
                    }                        
                }
                
            } 
        }
        out1.push(y);
        console.log(out1);
    }
    if(k>2)
    	out1.pop();
    //out1.push("\n\n");
    console.log(safe);
    console.log(available);

    return safe;
}


var outputDiv= document.createElement('div');
var output = document.createElement('strong');
var inst;
var counter = 1;
var count = 0;

var container = document.getElementsByClassName('container-fluid')[0];

function print_info()
{
		while(count<out1.length)
		{
			output.innerHTML += out1[count];
		  outputDiv.appendChild(output);
		  count++;
		}
}

output.innerHTML += out[0];
outputDiv.appendChild(output);

function change()
{
    output.innerHTML += out[counter];
    outputDiv.appendChild(output);
    counter++;
    if (counter >= out.length)
    {
        counter = 0;
        clearInterval(inst); // uncomment this if you want to stop refreshing after one cycle
    }
}

function retry()
{
	var refreshButton = document.createElement('button');
  refreshButton.classList.add('btn');
  refreshButton.classList.add('btn-primary');
  refreshButton.classList.add('btn-lg');
  refreshButton.classList.add('btn-block');
  refreshButton.innerText="Retry";
  refreshButton.addEventListener('click',function()
  {
     location.reload();
  });
  container.appendChild(refreshButton);
}

function showSafeSeq(){
    safe=safeSeq();
    //var outputDiv= document.createElement('div');
    outputDiv.classList.add('alert');
    //var output = document.createElement('strong');
    if(safe.length != processes)
    {
        outputDiv.classList.add('alert-danger');
        //output.innerText='No safe sequence Found ! System is in a Dead Lock';
        out.push("Oops ! System is in a Dead Lock as further execution is not possible<br>");
        /*output.innerText=''+out;
        outputDiv.appendChild(output);*/
    }
    else
    {
        //var text = 'Process Execution: \n';
        x="<br><u>Safe Sequence</u> : ";
        for(i=0;i<safe.length;i++)
        {
            x += "P"+safe[i];
            if(i!=safe.length-1)
            	x+=" => ";
        }
        out.push(x);
        //output.innerText = ' '+out;
        outputDiv.classList.add('alert-success');
    }
    inst = setInterval(change, 1000);
    setTimeout(print_info,1000*out.length);
    //inst1 = setInterval(print_info, 1000);
    //outputDiv.appendChild(output);
    container.appendChild(outputDiv);
    setTimeout(retry,1000*(out.length+1));
    
}
