#!/usr/bin/env node
const program = require('commander')
import storeTodos from './store/todos'

program
	.version('1.0.0')
	.description('Todo List')

program
	.command('refresh')
	.alias('r')
	.description('refresh data')
	.action(() => {
console.log(storeTodos, 'storedsds')
console.log(storeTodos.isInitialized)
		const tableConfig = {
        head: ['Stadium Name', 'City']
    };
    const stadiums = storeTodos.data;
    let content =  new Array();
    stadiums.map((list, index)=>{
        content.push([list.name, list.city]);
    })
    mainView.generateView(tableConfig, content,'STADIUMS LIST NAME');
	})

program.parse(process.argv)