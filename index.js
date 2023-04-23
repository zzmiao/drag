"use strict"
/**
 * 可拖拽悬浮框
 * 
 * el:被拖拽的元素，如：#dragIcon|.dragIcon
 * 
 * top:初始化悬浮框距离窗口顶部的距离，如100px|10%
 * 
 * left:初始化悬浮框距离窗口左边的距离,如100px|10%
 * 
 * onClick:悬浮框点击触发事件
 **/
class DragIcon {
	static DEFINED_CONFIG = {
		el: '#dragIcon',
		top: '100px',
		left: '100px',
		onClick: () => {

		}
	}

	constructor(options) {
		console.log("[]", options)
		if (Object.prototype.toString.call(options) !== '[object Object]') {
			throw "配置项必须为对象，你传递的是" + Object.prototype.toString.call(options);
		}
		this.config = Object.assign({}, DragIcon.DEFINED_CONFIG, options);
		this.dragElement = document.querySelector(this.config.el);
		this.clientWidth = document.documentElement.clientWidth || window.innerWidth;
		this.clientHeight = document.documentElement.clientHeight || window.innerHeight;
		this.create();
		this.drag();

		this.isDragging = false; // 初始化时未拖拽
	}
	/**
	 * 初始化悬浮框
	 **/
	create() {
		const {
			top,
			left
		} = this.config;
		this.dragElement.style.top = `${top}`;
		this.dragElement.style.left = `${left}`;
	}
	/**
	 * 悬浮框拖拽事件
	 **/
	drag() {
		this.dragElement.addEventListener("mousedown", (e) => {
			e.preventDefault();
			this.isDragging = true; // 拖拽开始
			const rect = this.dragElement.getBoundingClientRect();
			const disX = e.clientX - rect.left;
			const disY = e.clientY - rect.top;

			const onMouseMove = (e) => {
				let moveX = e.clientX - disX;
				let moveY = e.clientY - disY;
				moveX = Math.min(moveX, this.clientWidth - rect.width);
				moveY = Math.min(moveY, this.clientHeight - rect.height);

				moveX = Math.max(0, moveX);
				moveY = Math.max(0, moveY)

				this.dragElement.style.left = `${moveX}px`;
				this.dragElement.style.top = `${moveY}px`;
				this.isDragging = false; // 拖拽结束
			}

			const onMouseUp = () => {
				window.removeEventListener("mousemove", onMouseMove);
				window.removeEventListener("mouseup", onMouseUp);
				this.onClick();
			}

			window.addEventListener("mousemove", onMouseMove);
			window.addEventListener("mouseup", onMouseUp);

		});


	}
	/**
	 * 悬浮框点击事件
	 **/
	onClick() {
		if (this.isDragging) {
			this.config.onClick();
			this.isDragging = false; // 拖拽结束
		}
	}
}


export default DragIcon;