## DragIcon
```
基于javascript的可拖拽悬浮按钮
```

##使用案例
```
<div id="dragIcon"></div>
import dragIcon from "DragIcon"
new DragIcon({
	el: '#dragIcon',
	top: '100px',
	left: '100px',
	onClick: () => {
		console.log("我是点击事件")
	}
});
```