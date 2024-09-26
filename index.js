// import getClosestTempToZero from './src/tempClosestToZero.js';
import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

const reader = readline.createInterface({ input, output });

try {
    await getClosestTempToZero();
    reader.close();
} catch (err) {
    console.log('Error ', err);
}

async function getClosestTempToZero() {
    const tempCount = await getNumberOfTemps();
    if (tempCount === 0) {
        return;
    }
    
    const temps = await getTempInputs(tempCount);
    let closest = temps[0];

    // Iterate through the array to find the number closest to zero
    for (let i = 0; i < temps.length; i++) {
        if (isNaN(temps[i])) {
            console.log('Invalid input, please enter a number');
            return;
        } 
        if(temps[i] < -273 || temps[i] > 5526) {
            console.log('Invalid input, please enter a number between -273 and 5526');
            return;
        }
        if (temps[i] === 0) {
            return;
        }
        if (temps[i] === closest && temps[i] >= 0) {
            closest = temps[i];
        } else if (Math.abs(temps[i]) < Math.abs(closest)) {
            closest = temps[i];
        }
    }
    console.log(`Closest temperature to zero is: ${closest}`);
}

async function getNumberOfTemps() {
    let tempCount = '';
    tempCount = await reader.question('Enter the number of temperatures in the array: ');

    if (tempCount === null || tempCount === '') {
        console.log('No Input Provided So Closest Number to Zero is: 0');
        return 0;
    } else {
        while (isNaN(tempCount)) {
            console.log('Invalid input, please enter number');
            tempCount = await reader.question("Enter the number of temperatures in the array: ");
        }
        tempCount = parseInt(tempCount);
        while (tempCount < 0) {
            console.log('Invalid input, please enter a positive number');
            tempCount = await reader.question("Enter the number of temperatures in the array: ");
        }
    }

    return tempCount
}

async function getTempInputs(tempCount) {
    let tempInputs = await reader.question(`Enter ${tempCount} temperatures separated by spaces: `);

    // Convert the input string to an array of numbers
    let temps = tempInputs.split(' ').map(Number);
    while (temps.length !== tempCount) {
        console.log('Invalid input, please enter the correct number of elements');
        tempInputs = await reader.question(`Enter ${tempCount} temperatures separated by spaces: `);
        temps = tempInputs.split(' ').map(Number);
    }
    return temps;
}