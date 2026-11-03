import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import unusedImports from 'eslint-plugin-unused-imports'

/**
 * @type {import('typescript-eslint').Config}
 */
export default [
  {
    ...eslintPluginPrettierRecommended,
    rules: {
      ...eslintPluginPrettierRecommended.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  },
  {
    ignores: [
      '.prettierrc.js',
      '.prettierrc.cjs',
      'postcss.config.js',
      'tailwind.config.js',
      'vite.config.js',
      'eslint.config.mjs',
      'vitest.config*.mjs',
      'vitest.config*.mts',
      'create-index-file.mts',
      '**/dist/*',
      'vite.config.d.ts',
      'postcss.config.mjs',
      'playwright.config.mts',
      'routeTree.gen.ts',
      '**/generated/prisma/*',
    ],
  },
  {
    plugins: {
      'sort-imports': [
        'error',
        {
          ignoreCase: false,
          ignoreDeclarationSort: false,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
          allowSeparatedGroups: false,
          sem,
        },
      ],
    },
  },
  {
    // Checks if some imports are not being used, also auto removes them on fix
    plugins: {
      'unused-imports': unusedImports,
    },
    rules: {
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
    },
  },
  {
    // After the prettier preset above, which turns `curly` off.
    rules: {
      curly: ['error', 'all'],
    },
  },
]
