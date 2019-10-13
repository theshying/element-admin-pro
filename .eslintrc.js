// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
      parser: 'babel-eslint'
  },
  env: {
      browser: true,
      es6: true
  },
  // required to lint *.vue files
  plugins: [
      'vue',
      'html'
  ],
  // 定义全局变量，一般用于测试文件中
  // globals: {
  //     jest: true,
  //     describe: true,
  //     it: true,
  //     expect: true,
  //     before: true,
  //     after: true
  // },
  // add your custom rules here
  'rules': {
      // 强制数组方括号中使用一致的空格
      'array-bracket-spacing': [2, 'never'],

      // 强制箭头函数的箭头前后使用一致的空格
      'arrow-spacing': [2, {'before': true, 'after': true}],

      // 强制把变量的使用限制在其定义的作用域范围内
      'block-scoped-var': 2,

      // 强制在代码块中使用一致的大括号风格
      'brace-style': [2, '1tbs', {'allowSingleLine': true}],

      // 强制使用骆驼拼写法命名约定
      'camelcase': [2, {'properties': 'never'}],

      // 要求或禁止末尾逗号
      'comma-dangle': [2, 'only-multiline'],

      // 强制在逗号前后使用一致的空格
      'comma-spacing': [2, {'before': false, 'after': true}],

      // 强制使用一致的逗号风格
      'comma-style': [2, 'last'],

      // 强制在计算的属性的方括号中使用一致的空格
      'computed-property-spacing': [2, 'never'],

      // 强制所有控制语句使用一致的括号风格
      'curly': [1, 'all'],

      // 要求 Switch 语句中有 Default 分支
      'default-case': 1,

      // 强制在点号之前和之后一致的换行
      'dot-location': [2, 'property'],

      // 强制尽可能地使用点号
      'dot-notation': 1,

      // 要求使用 === 和 !==
      'eqeqeq': [2, 'smart'],

      // 函数的声明和调用之间不能有空格
      'func-call-spacing': [2, 'never'],

      // 强制 generator 函数中 * 号周围使用一致的空格
      'generator-star-spacing': [2, {'before': false, 'after': true}],

      // 强制使用一致的缩进
      'indent': [2, 4, {'SwitchCase': 1}],

      // 强制在 JSX 属性中一致地使用双引号或单引号
      'jsx-quotes': [2, 'prefer-single'],

      // 强制在对象字面量的属性中键和值之间使用一致的间距
      'key-spacing': [2, {'beforeColon': false, 'afterColon': true, 'mode': 'strict'}],

      // 强制在关键字前后使用一致的空格
      'keyword-spacing': [2, {'before': true, 'after': true, 'overrides': {}}],

      // 强制最大行数.强制文件的最大行数，以提高可维护性和降低复杂度
      'max-lines': [1, {'max': 2000, 'skipBlankLines': true, 'skipComments': false}],

      // 强制回调函数最大嵌套深度
      'max-nested-callbacks': [1, {'max': 10}],

      // 要求调用无参构造函数时有圆括号
      'new-parens': 2,

      // 禁用 alert、confirm 和 prompt
      'no-alert': 1,

      // 禁用 Array 构造函数
      'no-array-constructor': 2,

      // 不允许在 case 子句中使用词法声明 该规则禁止词法声明 (let、const、function 和 class) 出现在 case或default 子句中
      'no-case-declarations': 2,

      // 禁止修改类声明的变量
      'no-class-assign': 2,

      // 禁止条件表达式中出现赋值操作符
      'no-cond-assign': [2, 'except-parens'],

      //禁用 console
      'no-console': 1,

      // 禁止修改 const 声明的变量
      'no-const-assign': 2,

      // 禁用 debugger
      'no-debugger': 1,

      // 禁止 function 定义中出现重名参数
      'no-dupe-args': 2,

      // 禁止类成员中出现重复的名称
      'no-dupe-class-members': 2,

      // 禁止对象字面量中出现重复的 key
      'no-dupe-keys': 2,

      // 禁止出现重复的 case 标签
      'no-duplicate-case': 2,

      // 禁止重复引用模块
      'no-duplicate-imports': [2, {'includeExports': true}],

      // 禁止 if 语句中 return 语句之后有 else 块
      'no-else-return': 1,

      // 禁止出现空语句块
      'no-empty': 1,

      // 禁止出现空函数
      'no-empty-function': 1,

      // 禁止使用空解构模式 eg:var {} = foo;(error) var {a = {}} = foo;(correct)
      'no-empty-pattern': 2,

      // 禁用 eval()
      'no-eval': 1,

      // 禁止对 catch 子句的参数重新赋值
      'no-ex-assign': 2,

      // 禁止扩展原生类型
      'no-extend-native': 1,

      // 禁止不必要的 .bind() 调用
      'no-extra-bind': 2,

      // 禁止不必要的分号 eg function(){};
      'no-extra-semi': 2,

      // 禁止数字字面量中使用前导和末尾小数点 eg:var num = 2.;
      'no-floating-decimal': 2,

      // 禁止对本地对象对象或只读全局变量的赋值
      'no-global-assign': 2,

      // 禁止使用类似 eval() 的方法 此规则目的在于消除使用setTimeout()、setInterval() 或 execScript() 时隐式的 eval()
      'no-implied-eval': 1,

      // 禁止 if 作为唯一的语句出现在 else 语句中 else {if(){}} error
      'no-lonely-if': 2,

      // 禁用魔术数字 魔术数字是在代码中多次出现的没有明确含义的数字。它最好由命名常量取代
      'no-magic-numbers': [1, { 'ignore': [-1, 0, 1, 2]}],

      //禁止混合使用不同的操作符
      'no-mixed-operators': [1, {'allowSamePrecedence': false}],

      // 禁止空格和 tab 的混合缩进
      'no-mixed-spaces-and-tabs': 2,

      // 禁止使用多个空格
      'no-multi-spaces': [2, { 'exceptions': { 'Property': false } }],

      // 禁止出现多行空行
      'no-multiple-empty-lines': [2, {'max': 2}],

      // 禁止对 function 的参数进行重新赋值
      'no-param-reassign': 2,

      // 禁止多次声明同一变量
      'no-redeclare': 2,

      // 禁止在 return 语句中使用赋值语句
      'no-return-assign': [2, 'always'],

      // 禁止使用 javascript: url
      'no-script-url': 1,

      // 禁用逗号操作符
      'no-sequences': 1,

      // 禁止将标识符定义为受限的名字
      'no-shadow-restricted-names': 2,

      // 禁止在构造函数中，在调用 super() 之前使用 this 或 super
      'no-this-before-super': 1,

      // 禁用行尾空格
      'no-trailing-spaces': [2, { 'skipBlankLines': false }],

      // 禁止在return、throw、continue 和 break 语句之后出现不可达代码
      'no-unreachable': 1,

      // disallow negating the left operand of relational operators
      'no-unsafe-negation': 2,

      // 禁止出现未使用过的变量
      'no-unused-vars': [1, {'vars': 'all', 'args': 'after-used'}],

      // 禁止在变量定义之前使用它们
      'no-use-before-define': [2, {'functions': false, 'classes': false}],

      // 禁止属性前有空白
      'no-whitespace-before-property': 2,

      // 禁用 with 语句
      'no-with': 2,

      // 强制在大括号中使用一致的空格
      'object-curly-spacing': [2, 'never'],

      // 强制将对象的属性放在不同的行上
      'object-property-newline': [2, {'allowMultiplePropertiesPerLine': true}],

      // 要求或禁止对象字面量中方法和属性使用简写语法
      'object-shorthand': [1, 'always'],

      // 要求或禁止块内填充
      'padded-blocks': [2, 'never'],

      // 要求使用 const 声明那些声明后不再被修改的变量
      'prefer-const': 1,

      // 要求对象字面量属性名称用引号括起来
      'quote-props': [2, 'as-needed'],

      // 强制使用一致的反勾号、双引号或单引号
      'quotes': [2, 'single', {'avoidEscape': true}],

      // 要求 generator 函数内有 yield
      'require-yield': 2,

      // enforce spacing between rest and spread operators and their expressions
      'rest-spread-spacing': [2, 'never'],

      // require or disallow semicolons instead of ASI
      'semi': [2, 'always'],

      // 强制分号之前和之后使用一致的空格
      'semi-spacing': [2, {'before': false, 'after': true}],

      // 强制在块之前使用一致的空格
      'space-before-blocks': [2, 'always'],

      // 强制在 function的左括号之前使用一致的空格
      'space-before-function-paren': [2, {'anonymous': 'never', 'named': 'never', 'asyncArrow': 'always'}],

      // 强制在圆括号内使用一致的空格
      'space-in-parens': [2, 'never'],

      // 要求操作符周围有空格
      'space-infix-ops': 2,

      // 强制在一元操作符前后使用一致的空格
      'space-unary-ops': [2, { 'words': true, 'nonwords': false }],

      // 要求或禁止模板字符串中的嵌入表达式周围空格的使用
      'template-curly-spacing': [2, 'never'],

      // 要求调用 isNaN()检查 NaN
      'use-isnan': 2,

      // 要求 IIFE 使用括号括起来
      'wrap-iife': [2, 'outside'],

      // 要求或者禁止Yoda条件
      'yoda': [2, 'never', {'exceptRange': false, 'onlyEquality': false}]
  }
}
