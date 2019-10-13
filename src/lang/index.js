import Vue from 'vue';
// 多语言依赖
import VueI18n from 'vue-i18n';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhCNLocale from 'element-ui/lib/locale/lang/zh-CN';
import i18nZhCN from './zh-CN';
import i18nEn from './en-US';

const messages = {
    'zh-CN': {
        ...i18nZhCN,
        ...zhCNLocale
    },
    'en-US': {
        ...i18nEn,
        ...enLocale
    }
};
export function getLanguage() {
    const chooseLanguage = localStorage.getItem('language');
    if (chooseLanguage) { return chooseLanguage; }
    // if has not choose language
    const language = (navigator.language || navigator.browserLanguage).toLowerCase();
    const locales = Object.keys(messages);
    for (const locale of locales) {
        if (language.indexOf(locale) > -1) {
            return locale;
        }
    }
    return 'zh-CN';
}
// 多语言初始化
Vue.use(VueI18n);
const i18n = new VueI18n({
    locale: getLanguage(),
    fallbackLocale: 'zh-CN',
    messages

});

export default i18n;
