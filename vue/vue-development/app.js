let list=[
//		{
//			title:"标题一"	
//		},
//		{
//			title:"标题二"	
//		}
	];
new Vue({
	el:".main",
	data:{
		list:list,
		todo:''
	},
	methods:{
		addTodo(ev){//添加任务
			//事件处理函数中的this指向的是，当前这个根实例
			if(!this.todo)return;//如果内容为空不添加
			this.list.push({
				title:this.todo
			});
			this.todo="";
		}
	}
	
});
