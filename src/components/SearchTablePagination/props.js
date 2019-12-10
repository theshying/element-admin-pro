const props = {
    // Element UI Table attributes
    height: {
        type: Number | String,
        default: '100%'
    },
    maxHeight: [String, Number],
    size: {
        type: String,
        default: 'mini'
    },
    stripe: {
        type: Boolean,
        default: true
    },
    border: {
        type: Boolean,
        default: true,
    },
    fit: {
        type: Boolean,
        default: true
    },
    showHeader: {
        type: Boolean,
        default: true
    },
    highlightCurrentRow: Boolean,
    currentRowKey: [String, Number],
    rowClassName: [String, Function],
    rowStyle: [String, Function],
    rowKey: [String, Function],
    emptyText: String,
    defaultExpandAll: Boolean,
    expandRowKeys: Array,
    defaultSort: Object,
    tooltipEffect: String,
    showSummary: Boolean,
    sumText: String,
    summaryMethod: Function,
    // custom attributes
    tableStyle: {
        type: String,
        default: "width:100%",
    },
    fetch: {
        type: Function
    },
    url: {
        type: String
    },
    method: {
        type: String,
        default: 'get',
        validator: value => {
            const methodTypes = ['get', 'post', 'put', 'delete'];
            return methodTypes.indexOf(value.toLowerCase()) !== -1;
        }
    },
    headers: {
        type: Object,
        default: () => {
            return {}
        }
    },
    listField: {
        type: String,
        default: 'data.list'
    },
    totalField: {
        type: String,
        default: 'data.total'
    },
    params: {
        type: Object,
        default: () => {
            return {}
        }
    },
    formOptions: {
        type: Object
    },
    autoLoad: {
        type: Boolean,
        default: true
    },
    type: {
        type: String,
        default: 'remote',
        validator(value) {
            const types = ['remote', 'local']
            const validType = types.indexOf(value) !== -1
            if (!validType) {
                throw new Error(`Invalid type of '${value}', please set one type of 'remote' or 'local'.`)
            }
            return validType
        }
    },
    data: {
        type: Array
    },
    dataHandler: {
        type: Function
    },
    columns: {
        type: Array,
        required: true
    },
    showPagination: {
        type: Boolean,
        default: true
    },
    pageSizes: {
        type: Array,
        default: () => {
            return [20, 50, 100]
        }
    },
    paginationLayout: {
        type: String,
        default: 'total, prev, pager, next, jumper, sizes'
    },
    pageIndexKey: {
        type: String,
        default: 'pageIndex'
    },
    pageSizeKey: {
        type: String,
        default: 'pageSize'
    }
}

// Object.keys(formProps).forEach(v => {
//   props.formOptions[v] = formProps[v]
// })

export default props