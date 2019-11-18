import store from '@/store';

export default function checkPermission(value, operator) {
    if (value == null) {
        return true;
    }
    const {permissions} = store.getters;
    if (typeof value === 'string') {
        return permissions.include(value);
    }
    if (Array.isArray(value)) {
        if (operator === 'and') {
            return value.every(item => {
                permissions.include(item);
            });
        }
        if (operator === 'or') {
            return value.some(item => {
                permissions.include(item);
            });
        }
    }
    console.error('the type of permissions  must be Array or String');
    return false;
}
