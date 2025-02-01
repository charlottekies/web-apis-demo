module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["next", "next/core-web-vitals"],
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    "react/no-unescaped-entities": "off"
  }
};
