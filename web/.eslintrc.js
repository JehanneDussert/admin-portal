module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'plugin:prettier/recommended',
        '@typescript-eslint/eslint-recommended',
        '@typescript-eslint/recommended',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2021,  // Mise à jour de la version ECMAScript
        sourceType: 'module',
        project: './tsconfig.json',
    },
    plugins: [
        'react',
        '@typescript-eslint',
        'jsx-a11y',
        'import',
        'prettier',
    ],
    rules: {
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
                useTabs: true,
                tabWidth: 4,
            },
        ],
        'react/react-in-jsx-scope': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        'import/resolver': {
            'typescript': {}
        }
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
