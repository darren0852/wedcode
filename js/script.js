/*拖拽*/
// 初始化 Gridstack
const grid = GridStack.init({
  cellHeight: 150,        // 每个单元格高度（像素），默认是 70
  column: 10,            // 网格列数，默认是 12
  margin: 10,            // 每个 widget 之间的间距，单位像素
  animate: true,         // 启用动画效果（例如拖动时的平滑）
  float: true,          // 默认为 false，会自动向上对齐
  disableResize: true,  // 是否禁用 widget 拖动大小调整
  disableDrag: true     // 是否禁用 widget 拖动移动
});

// 添加几个默认元素
grid.load([
  {x: 0, y: 0, w: 2, h: 2, content: '区块 1'},
  {x: 2, y: 0, w: 2, h: 2, content: '区块 2'}
]);

// 用内容渲染 .grid-stack-item-content
document.querySelectorAll('.grid-stack-item').forEach(item => {
  const content = item.getAttribute('gs-content') || item.dataset.gsContent || item.gridstackNode?.content;
  if (content) {
    item.querySelector('.grid-stack-item-content').textContent = content;
  }
});

// 编辑模式开关逻辑
let editMode = false;

document.getElementById('menubutton').addEventListener('click', function () {
  editMode = !editMode;
  grid.enableMove(editMode);
  
});
/*拖拽end*/

/*popup*/ 
const editButton = document.getElementById('editbutton');
const popupBox = document.getElementById('popupBox');

editButton.addEventListener('mouseenter', () => {
  // 获取按钮的位置
  const rect = editButton.getBoundingClientRect();

  // 动态设置 popupBox 的位置
  popupBox.style.position = 'absolute';
  popupBox.style.left = `${rect.left + window.scrollX}px`;
  popupBox.style.top = `${rect.bottom + 15 + window.scrollY}px`;

  // 显示 popupBox
  popupBox.style.display = 'flex';
});

let hideTimer = null;

function setupHideHandler(element) {
  element.addEventListener('mouseleave', () => {
    hideTimer = setTimeout(() => {
      popupBox.style.display = 'none';
    }, 70);
  });

  element.addEventListener('mouseenter', () => {
    clearTimeout(hideTimer);
  });
}

setupHideHandler(editButton);
setupHideHandler(popupBox);

// 滚动时隐藏 popupBox
window.addEventListener('scroll', () => {
  popupBox.style.display = 'none';
});
/*popup end*/ 




