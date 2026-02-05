import type { TextlintRuleModule } from '@textlint/types';

const FULL_WIDTH_CHAR =
  '[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF\uFF00-\uFFEF]';

const reporter: TextlintRuleModule = (context) => {
  const { Syntax, RuleError, fixer, report, getSource } = context;

  return {
    [Syntax.Str](node) {
      const text = getSource(node);
      const pattern = new RegExp(
        `(${FULL_WIDTH_CHAR}) (${FULL_WIDTH_CHAR})`,
        'g',
      );
      let match;

      while ((match = pattern.exec(text)) !== null) {
        const spaceIndex = match.index + match[1].length;
        report(
          node,
          new RuleError('Unexpected space between full-width characters', {
            index: spaceIndex,
            fix: fixer.replaceTextRange([spaceIndex, spaceIndex + 1], ''),
          }),
        );
      }
    },
  };
};

export default {
  linter: reporter,
  fixer: reporter,
};
