let fs = require('fs');
let mem = new Array();
inText = fs.readFileSync('first.txt');
inText = inText.toString();
mem = inText.split(/ |\r\n/);
mem.push('exit');
console.log(mem)
let ip = 0;
let loopStack = [];
let loopMap = {};
let error = 0;

console.log('Введите "help" для вывода справки');

function findMatchingEnd(ip) {
    let depth = 1;
    while (depth != 0 && ip < mem.length) {
        ip++;
        if (mem[ip] == 'while==') depth++;
        if (mem[ip] == 'end_of_while') depth--;
    }
    return ip;
}

for (let i = 0; i < mem.length; i++) {
    if (mem[i] == 'while==') {
        loopMap[i] = findMatchingEnd(i);
    }
}

while (mem[ip] != 'exit') {
    switch (mem[ip]) {
        case 'help':
            console.log('потом напишу');
            ip++;
            break;

    case 'input': //ввод
        console.log( 'Введи значение');
        const readline = require('readline-sync');
        const znahc = readline.question('');
        mem[mem[ip+1]] = znach * 1;
        ip+=2;
        break;

    case 'set':     //создание переменной
        mem[mem[ip+1]]= parseInt(mem[ip+2])
        ip+=3
        break;

    case 'output':     //вывод
        console.log(mem[mem[ip+1]]);
        ip+=2
        break;

    case 'add':         //сложение
        mem[mem[ip+3]] = mem[mem[ip+1]] + mem[mem[ip+2]]
        ip+=4
        break;

    case 'sub':         //вычитание
        mem[mem[ip+3]] = mem[mem[ip+1]] - mem[mem[ip+2]]
        ip+=4
        break;

    case 'mul':         //умножение
        mem[mem[ip+3]] = mem[mem[ip+1]] * mem[mem[ip+2]]
        ip+=4
        break;

    case 'dif':         //деление
        if (mem[mem[ip+2]]!=0){
            mem[mem[ip+3]] = Math.floor(mem[mem[ip+1]] / mem[mem[ip+2]])
            ip+=4
        break;

        }
        else{
            mem[mem[ip+3]]='NaN';
            ip+=4;
            break;
        }
        

    case 'difo':          //деление с остатком (float)
        if (mem[mem[ip+2]]!=0){
            mem[mem[ip+3]] = mem[mem[ip+1]] % mem[mem[ip+2]];
            ip+=4;
            
        } 
        break;  

    case 'as':         //присваивание
        mem[mem[ip+1]] = mem[mem[ip+2]] 
        ip+=3
        break;

    case 'if=':         //проверка на равенство a==b
        if (mem[mem[ip+1]]==mem[mem[ip+2]]){
        ip+=3;
    }
        else{ 
            while (mem[ip] != 'els') {
                ip++;}
            }
        break;

    case 'if!=':         //a!=b
        if (mem[mem[ip+1]]!=mem[mem[ip+2]]){
        ip+=3;
    }
        else{ 
            while (mem[ip] != 'els') {
                ip++;}}
        break;
        case 'while==': // начало while цикла
        if (mem[mem[ip + 1]] != mem[mem[ip + 2]]) {
            // Если условие истинное, начинаем цикл
             loopStack.push(ip);
        } else {
            // Если условиел ожное, прыгаем на конец цикла
           ip = loopMap[ip]+1;
        }
        ip += 3;
        break;
        case 'end_of_while':
    // Если условие все еще истинное, возвращаемся в начало цикла
    if (mem[mem[loopStack[loopStack.length - 1] + 1]] != mem[mem[loopStack[loopStack.length - 1] + 2]]) {
        ip = loopStack[loopStack.length - 1];
    } else {
        // Если условие теперь ложно, выходим из цикла и удаляем адрес начала цикла из стека
        loopStack.pop();
        ip++;
    }
    break;
    case 'sqr':
        mem[mem[ip+2]]=mem[mem[ip+1]]**2;
        break;

}
error++
if (error>10000){
    break;
}
}
console.log('vse')