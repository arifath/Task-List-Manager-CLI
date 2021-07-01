#!/usr/bin/env node
const program = require('commander');
const moment = require('moment')
import todosStore from './store/todos';
const mainView  = require('./views/todoList'); 

const userData = {
	email: "arif.fathurrohmann@gmail.com",
		id: "ariffathurrohmann",
	_id: "user",
}

program
	.version('1.0.0')
	.description('Todo List')

program
	.command('show')
	.alias('s')
	.description('show data list')
	.action(async() => {
		await todosStore.initialize();
		const tableConfig = {
        head: ['Id', 'Task', 'Tag', 'Date Create', 'Done']
    };
    const todos = todosStore.data;

    let content =  new Array();
    todos.map((list, index)=>{
        content.push([
					index+1,
					list.text,
					list.tag,
					moment(list.createdAt).format('LLL'),
					!!list.is_complete]);
    })
    mainView.generateView(tableConfig, content,'TASK LIST');
	})

program
	.command('add <task> <tag>')
	.alias('a')
	.description('add data task')
	.action(async(text, tag) => {
		await todosStore.initialize();
    await todosStore.addItem({
      text,
      tag,
      createdAt: new Date(),
    }, userData);
		console.log('data sudah ditambahkan..')
	})

program
	.command('delete <id>')
	.alias('d')
	.description('delete data task')
	.action(async(idx) => {
		await todosStore.initialize();
		await todosStore.deleteItem(todosStore.data[idx-1]._id, userData);
		console.log('data sudah dihapus..')
	})

program
	.command('edit <id> <task> <tag>')
	.alias('e')
	.description('edit data task')
	.action(async(idx, text, tag) => {
		await todosStore.initialize();
		await todosStore.editItem(todosStore.data[idx-1]._id, { text, tag }, userData);
		console.log('data sudah diedit..')
	})

program
	.command('check <id>')
	.alias('c')
	.description('complete data task')
	.action(async(idx) => {
		await todosStore.initialize();
		await todosStore.editItem(
			todosStore.data[idx-1]._id, 
			{ 
				is_complete: !todosStore.data[idx-1].is_complete
			},
			userData
		);
		console.log('data checklist terupdate..')
	})

program
	.command('upload')
	.alias('u')
	.description('upload data task')
	.action(async(idx) => {
		await todosStore.initialize();
    console.log('uploading...');
    try {
      await todosStore.upload();
			console.log('data sudah terupload..')
    } catch (err) {
      console.log('upload failed');
    }
	})

program.parse(process.argv);
