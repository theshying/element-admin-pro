import WeekSales from './WeekSales.vue';
import YearSales from './YearSales.vue';
import MonthSales from './MonthSales.vue';
import MacroMonitoring from './MacroMonitoring.vue';
//TODO::小部件自动加载
// const req = require.context('./', false, /\.vue$/) //eslint-disable-line
// const requireAll = requireContext => {
//     return requireContext.keys().map((key) => {
//         console.log(requireContext())
//     })
// };
// const widgets = requireAll(req);
export default {
    WeekSales,
    YearSales,
    MonthSales,
    MacroMonitoring
}