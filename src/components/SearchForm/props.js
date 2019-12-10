export const formProps = {
    size: {
        type: String,
        default: '',
        validator: sizeValidator
    },
    showResetBtn: {
        type: Boolean,
        default: true
    },
    inline: {
        type: Boolean,
        default: true,
    },
    fuzzy: {
        type: Boolean,
        default: false
    },
    labelWidth: Number,
    itemWidth: Number,
    submitHandler: Function,
    submitLoading: {
        type: Boolean,
        default: false
    },
    submitBtnText: {
        type: String,
        default: '查询'
    },
    resetBtnText: {
        type: String,
        default: '重置'
    },
    resetBtnCallback: Function,
    forms: {
        type: Array,
        required: true
    }
}

function sizeValidator(value) {
    const methodTypes = ['large', 'small', 'mini'];
    const valid = methodTypes.indexOf(value.toLowerCase()) !== -1 || value === ''
    if (!valid) {
        throw new Error(`Size must be one of ['large', 'small', 'mini']`)
    }
    return valid
}
