module.exports = {
  rules: {
    'type-enum': [2, 'always', ['fix', 'feat', 'bug']],
    'header-pattern': [2, 'always', /^(fix|bug|feat)(\(.+\))?: .+/]
  },
};
