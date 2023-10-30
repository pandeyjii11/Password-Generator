const password = document.querySelector("[data-password]");
const copyBtn = document.querySelector("[data-copy]");
const copiedMsg = document.querySelector("[data-copiedMsg]");
const passwordLength = document.querySelector("[data-passwordLength]");
const slider = document.querySelector("[data-lenghSlider]");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symnbols = document.querySelector("#symbols");
const checkbox = document.querySelectorAll('input[type=checkbox]');
const strenght = document.querySelector("[data-strength]");
const generate = document.querySelector('.generate');

const symbols = "~`!@#$%^&*()-=_+[}{]':;>.<,?/"

let passwordGenerated = "";
let lenght = 10;
let checkCount = 0;

setIndicator("#ccc");

function hanleSlider() {
    slider.value=lenght;
    passwordLength.innerText=lenght;

    const min=slider.min;
    const max=slider.max;
    slider.style.backgroundSize = ( (lenght-min)*100/(max-min) ) + "% 100%" ;
}

slider.addEventListener('input', () => {
    let value=slider.value;
    // console.log(value);
    lenght=value;
    // console.log("length: "+lenght);
    hanleSlider();
});

hanleSlider();

console.log(strenght.style);

function setIndicator(color) {
    strenght.style.backgroundColor=color;
}

function getRndInteger (min, max) {
    return Math.floor(Math.random()*(max-min)) + min;
}

function getRandomUppercase() {
    return String.fromCharCode(getRndInteger(65, 91));
}

function getRandomLowercase() {
    return String.fromCharCode(getRndInteger(97, 123));
}

function getRandomNumbers() {
    return getRndInteger(0, 10);
}

function getRandomSymbols() {
    return symbols.charAt(getRndInteger(0, symbols.length));
}

function calcStrengt() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    
    if(uppercase.checked) {
        hasUpper=true;
    }
    if(lowercase.checked) {
        hasLower=true;
    }
    if(numbers.checked) {
        hasNum=true;
    }
    if(symbols.checked) {
        hasSym=true;
    }

    if(hasUpper && hasLower && (hasNum || hasSym) && lenght>=8)
    {
        setIndicator("#0f0");
    }
    else if((hasUpper || hasLower) && (hasSym || hasNum) && lenght>=6)
    {
        setTimeout("#ff0");
    }
    else
    {
        setIndicator("#f00");
    }
}

async function copyContent() {
    try {
        await navigator.clipboard.writeText(password.value);
        copiedMsg.innerText="Copied";
    }
    catch(e)
    {
        copiedMsg.innerText="Failed";
    }
    copiedMsg.classList.add("active");
    setTimeout(() => {
        copiedMsg.classList.remove("active");
        copiedMsg.innerText="";
    }, 2000);
}

copyBtn.addEventListener('click', () => {
    if(password.value)
    {
        copyContent();
    }
});

// console.log(checkbox[0].checked);

for(let i=0;i<checkbox.length;i++)
{
    checkbox[i].addEventListener('change', () => {
        checkCount=0;
        for(let j=0;j<checkbox.length;j++)
        {
            if(checkbox[j].checked)
            {
                checkCount++;
            }
        }
        // console.log(checkCount);
    });
}

function shuffle(array) {
    for (let i = array.length -1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i+1));
    let k = array[i];
    array[i] = array[j];
    array[j] = k;
    }

    console.log(array);

    let str="";
    for(let i=0;i<array.length;i++)
    {
        str = str + array[i];
        // console.log(str);
    }

    console.log(str);
    return str;
}

generate.addEventListener('click', () => {
    if(checkCount==0)
    {
        return;
    }

    if(lenght<checkCount)
    {
        lenght=checkCount;
        hanleSlider();
    }

    passwordGenerated="";
    let func=[];
    if(uppercase.checked)
    {
        func.push(getRandomUppercase);
    }
    if(lowercase.checked)
    {
        func.push(getRandomLowercase);
    }
    if(numbers.checked)
    {
        func.push(getRandomNumbers);
    }
    if(symnbols.checked)
    {
        func.push(getRandomSymbols);
    }

    // console.log(func);

    for(let i=0;i<func.length;i++)
    {
        passwordGenerated+=func[i]();
    }
    for(let i=0;i<lenght-func.length;i++)
    {
        let randIdx=getRndInteger(0, func.length);
        passwordGenerated+=func[randIdx]();
    }

    // console.log(passwordGenerated);

    passwordGenerated=shuffle(Array.from(passwordGenerated));

    password.value=passwordGenerated;

    // console.log(passwordGenerated);
    calcStrengt();
})
