function navShow(){
	var btn=document.querySelector('#menuBtn');
	var nav=document.querySelector('#nav');
	btn.addEventListener(
		'touchstart',
		function(e){
			if(btn.className == 'menuBtnClos'){
				btn.className = 'menuBtnShow';
				nav.style.display='block';
			}else{
				btn.className = 'menuBtnClos';
				nav.style.display = 'none';
			}
			e.stopPropagation();
		}
	);
	nav.addEventListener(
		'touchstart',
		function(e){
			e.stopPropagation();
		}
	);
	document.addEventListener(
		'touchstart',
		function(){
			if(btn.className == 'menuBtnShow'){
				btn.className ='menuBtnClos';
				nav.style.display = 'none';
			}
		}
	)
}
function navSwipe(){
	var navScroll=document.querySelector('#navScroll');
	var navs=document.querySelector('#navs');
	var startPoint=0;
	var startX=0;
	var minX=navScroll.clientWidth - navs.offsetWidth;
	var step=1;
	var lastX=0;
	var lastDis=0;
	var lastTime=0;
	var lastTimeDis=0;
	navScroll.addEventListener(
		'touchstart',
		function(e){
			startPoint=e.changedTouches[0].pageX;
			startX=cssTransform(navs,'translateX');
			step=1;
			lastX=startX;
			lastDis=-new Date().getTime();
	        lastTime=0;
	        lastTimeDis=0;
		}
	);
	navScroll.addEventListener(
		'touchmove',
		function(e){
			var nowPoint = e.changedTouches[0].pageX;
			var dis = nowPoint - startPoint;
			var left = startX + dis;
			var nowTime=new Date().getTime();
			
			if(left > 0){
				step = 1-left / navScroll.clientWidth; //根据超出长度计算系数大小，超出的越到 系数越小
				left = parseInt(left*step);
			}
			if(left < minX){
				var over=minX-left;//超出值
				step=1-over/navScroll.clientWidth;//根据超出长度计算系数大小，超出的越到 系数越小
				over=parseInt(over*step);
				left=minX-over;
			}
			
			lastDis= -lastX - nowPoint;
			lastTimeDis=0;
			lastX=nowPoint;
	        lastTime=-new Date().getTime();
			cssTransform(navs,'translateX',left);
		}
	);
	navScroll.addEventListener(
		'touchend',
		function(){
			
		}
	);
/*
	缓冲快慢，和我移动的最后一次移动速度有关系
	速度快 缓冲距离就大
	速度慢 缓冲距离就小
	速度 =  距离 /时间
	
	距离 = 上次位置 和移动后位置的差值
	时间 = 上次时间 和 移动后时间的差值
	
*/
}
function scrollPic(){
	var wrap = document.querySelector("#picTab");
	var list = document.querySelector("#picList");
	list.innerHTML += list.innerHTML;
	var lis = document.querySelectorAll("#picList li");
	var css=document.createElement('style');
	var nav = document.querySelectorAll("#picNav span");
	var style = "#picTab{height:"+ lis[0].offsetHeight+"px}";
	var timer = 0;
	style+="#picList{width:"+lis.length+"00%}";
	style+="#picList li{width:"+(1/lis.length*100)+"%}"
	css.innerHTML+= style;
	document.head.appendChild(css);
	var startPoint = 0;
	var startX = 0;
	var now = 0;
	var isMove = true;
	var isFirst = true;
	cssTransform(list,"translateX",0);
	auto();
	wrap.addEventListener(
		"touchstart",
		function(e) {
			clearInterval(timer);
			list.style.transition = "none";
			var translateX = cssTransform(list,"translateX");
			now = Math.round(-translateX / wrap.offsetWidth);
			if(now == 0) {
				now = nav.length;
			}
			if(now == lis.length-1) {
				now = nav.length-1;
			}
			cssTransform(list,"translateX",-now * wrap.offsetWidth);
			startPoint = e.changedTouches[0];
			startX = cssTransform(list,"translateX");
			isMove = true;
			isFirst = true;
		}
	);
	wrap.addEventListener(
		"touchmove",
		function(e) {
			if(!isMove) {
				return;
			}
			var nowPoint = e.changedTouches[0];
			var disX = nowPoint.pageX - startPoint.pageX;
			var disY = nowPoint.pageY - startPoint.pageY;
			if(isFirst) {
				isFirst = false;
				if(Math.abs(disY) > Math.abs(disX)) {
					isMove = false;
				}
			}
			if(isMove) {
				cssTransform(list,"translateX",startX + disX);
			}
		}
	);
	wrap.addEventListener(
		"touchend",
		function(e) {
			var translateX = cssTransform(list,"translateX");
			now = Math.round(-translateX / wrap.offsetWidth);
			tab();
			auto();
		}
	);
	function auto() {
		clearInterval(timer);
		timer = setInterval(
			function() {
				if(now == lis.length-1) {
					now = nav.length-1;
				}
				list.style.transition = "none";
				cssTransform(list,"translateX",-now * wrap.offsetWidth);
				setTimeout(
					function () {
						now++;
						tab();	
					},30
				);
			},2000
		);
	}
	function tab() {
		list.style.transition = ".5s";
		cssTransform(list,"translateX",-now * wrap.offsetWidth);
		for(var i = 0 ; i < nav.length; i++) {
			nav[i].className = "";
		}
		nav[now%nav.length].className = "active";
	}
}
