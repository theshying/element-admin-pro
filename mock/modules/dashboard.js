const layout = [
    { "x": 0, "y": 0, "w": 4, "h": 3, "i": 2, "component": "WeekSales" },
    { "x": 4, "y": 0, "w": 4, "h": 3, "i": 3, "component": "MonthSales" },
    { "x": 8, "y": 0, "w": 4, "h": 3, "i": 4, "component": "YearSales" },
    { "x": 0, "y": 3, "w": 8, "h": 3, "i": 5, "component": "MacroMonitoring" },
]
const data = {
    year: {
        prev: 89787,
        current: 54392,
        precent: 80
    },
    month: {
        prev: 23454,
        current: 12343,
        precent: 50
    },
    week: {
        prev: 5098,
        current: 4978,
        precent: 98
    }
}
export default [
    {
        url: '/dashboard/layout',
        type: 'get',
        response: () => {
            return {
                data: layout
            }
        }
    },
    {
        url: 'dashboard/sales',
        type: 'get',
        response: (config) => {
            return {
                data : data[config.query.type]
            }
        }
    }
]