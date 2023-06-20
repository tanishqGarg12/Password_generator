const inputSlider = document.querySelector("[data-lengthSlider]")
const lengthDisplay = document.querySelector("[data-lengthNumber]")
const passwordDisplay = document.querySelector("[data-passwordDisplay]")
const copyBtn = document.querySelector("[data-copy]")
const copyMsg = document.querySelector("[data-copyMsg]")
const uppercaseCheck = document.querySelector("#uppercase")
const lowercaseCheck = document.querySelector("#lowercase")
const numbersCheck = document.querySelector("#numbers")
const symbolsCheck = document.querySelector("#symbols")
const generateBtn = document.querySelector(".generateButton")
const allcheckbox = document.querySelector("input[type=checkbox]")
const indicator = document.querySelector("[data-indicator]")
const symbols= '!@#$%^&_/`~<>;:<>?/'

let password = ""
let passwordlength =10
let checkcount = 1

handleslider()
setIndicator("#ccc")
//set password length

function handleslider(){
    inputSlider.value= passwordlength
    lengthDisplay.innerText = passwordlength
}

function setIndicator(color){
    indicator.style.backgroundColor = color;
    indicator.style.boxShadow= `0px 0px 12px 1px ${color}`;
}

function getRndInteger(min,max){
    return Math.floor(Math.random()* (max-min))+min;
}

function generateRandomNumber(){
    return getRndInteger(0,9)
}
function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,123))
}
function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,91))
}
// function generateUpperCase(){
//     return String.fromCharCode(getRndInteger(65,91))
// }
function generatesymbols(){
    const randNum =  getRndInteger(0, symbols.length)
    return symbols.charAt(randNum)
}



function shufflePassword(array)
{
    //fisher yates method
    for(i=array.length-1;i>0;i--)
    {
        const j=Math.floor(Math.random() * (i+1));
        const temp=array[i];
        array[i]=array[j];
        array[j]=temp;
    }
    let str="";
    array.forEach((el)=>(str += el));
    return str;
}


function calcstrength(){
    let hasUpper = false
    let hasLower = false
    let hasNum = false
    let hasSym = false

    if(uppercaseCheck.checked) hasUpper = true
    if(lowercaseCheck.checked) hasLower = true
    if(numbersCheck.checked) hasNum = true
    if(symbolsCheck.checked) hasSym = true

    if(hasUpper && hasLower && (hasNum|| hasSym) && passwordlength<=5){
        setIndicator("#0f0")
    }
    else if((hasLower|| hasUpper) &&
    (hasNum||hasSym )&&
    passwordlength>=15){
        setIndicator("red")
    }
    else{
        setIndicator("yellow")
    }

}

async function copyContent(){
    try {
        await navigator.clipboard.writeText(passwordDisplay.value);
        // the aboce functions returns promiseso thatss why in async
        copyMsg.innerText="copied";
        
    } catch (e) {
        copyMsg.innerText="failed";

        
    }

    copyMsg.classList.add("active")

    setTimeout(()=>
    {
        copyMsg.classList.remove("active")
    },2000)

    
}

function handleCheckBoxChange(){
    checkcount=0
    allcheckbox.forEach((checkbox) => {
        if (checkbox.checked) {
            checkcount++

            
        }
        
    });

    if (passwordlength< checkcount) {
        passwordlength=checkcount;
        handleslider()
        
    }
}

// allcheckbox.forEach(checkbox{
//     checkbox.addEventListener('change',handleCheckBoxChange)
    
// });

inputSlider.addEventListener('input', (e)=>{
    passwordlength= e.target.value;
    handleslider()
})

copyBtn.addEventListener('click', ()=>{
    if (passwordDisplay.value) 
    {
        copyContent()
        
    }
})

generateBtn.addEventListener('click' , ()=>{
    if(checkcount==0) return;

    if (passwordlength<checkcount) {
        passwordlength =  checkcount;
        handleslider();
        
    }


// lets start journey for new password
    console.log("strting the journey")
// remove old password
    password = "";

// lets put the stuff metioned in checkbxes

// if (uppercaseCheck.checked) {
//     password += generateUpperCase()
    
// }
// if (lowercaseCheck.checked) {
//     password += lowercaseCheck()
    
// }
// if (numbersCheck.checked) {
//     password += numbersCheck()
    
// }
// if (symbolsCheck.checked) {
//     password += symbolsCheck()
    
// }

    let funarr =[];

    if (uppercaseCheck.checked) {
    
        funarr.push(generateUpperCase);
    }
    if (lowercaseCheck.checked) {
        funarr.push(generateLowerCase);
        // password += lowercaseCheck()
        
    }
    if (numbersCheck.checked) {
        funarr.push(generateRandomNumber);
        // password += numbersCheck()
        
    }
    if (symbolsCheck.checked) {
        // password += symbolsCheck()
        funarr.push(generatesymbols);
        
    }

    // compulsory addition

    for(let i=0; i<funarr.length; i++){
        password += funarr[i]();
    }
    console.log("compulsory addiion done")

    // remaing addition

    for(let i=0; i<passwordlength-funarr.length; i++){
        // password += funarr[i]();
        let randidx = getRndInteger(0, funarr.length)
        password += funarr[randidx]();
    }
    console.log("remaining addiion done");

// console.log("remaining addition done");
//shuffle password
    password=shufflePassword(Array.from(password));
    console.log("shuffling done");

    //show in ui
    passwordDisplay.value=password;
    console.log("UI addition done");

    //calculate strength
    calcstrength();
});