import React from 'react';

// 高阶组件接收一个组件作为参数，并返回一个新的增强组件。高阶组件可以在不修改原始组件的情况下，添加、修改或封装其功能。
const MakeDateParameter = (WrappedComponent) => {
  // 在这里编写高阶组件的逻辑
  const date = new Date()
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOfWeek = firstDayOfMonth.getDay();
  const adjustedDayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1; // 将星期天(0)转换为6，星期一(1)转换为0，以此类推
  const dayOfMonth = date.getDate() - 1;
  const daysSinceStartOfMonth = adjustedDayOfWeek + dayOfMonth;
  const weekNumber = Math.floor(daysSinceStartOfMonth / 7) + 1;
  const dayOfWeekInWeek = (daysSinceStartOfMonth % 7) + 1;
  // 返回增强后的组件
  const EnhancedComponent = (props) => {
    // 在这里可以对 props 进行操作
    // 执行其他逻辑或渲染其他组件

    // 将新生成的参数作为props传递给生成的增强组件
    return <WrappedComponent {...props} weekNumber={weekNumber} dayOfWeekInWeek={dayOfWeekInWeek} />;
  };

  return EnhancedComponent;
};

export default MakeDateParameter;