import { describe, it, expect } from 'vitest';
import { TextlintKernel } from '@textlint/kernel';
import textPlugin from '@textlint/textlint-plugin-text';
import rule from './index';

async function fix(text: string): Promise<string> {
  const kernel = new TextlintKernel();
  const result = await kernel.fixText(text, {
    ext: '.txt',
    filePath: 'test.txt',
    plugins: [{ pluginId: 'text', plugin: textPlugin }],
    rules: [{ ruleId: 'no-space-between-full-width', rule, options: true }],
  });
  return result.output;
}

describe('textlint-rule-no-space-between-full-width', () => {
  it('removes space between full-width characters', async () => {
    expect(await fix('コア リポジトリ')).toBe('コアリポジトリ');
    expect(await fix('日本語 テキスト')).toBe('日本語テキスト');
    expect(await fix('ひらがな カタカナ')).toBe('ひらがなカタカナ');
  });

  it('removes multiple spaces', async () => {
    expect(await fix('コア リポジトリ コンポーネント')).toBe(
      'コアリポジトリコンポーネント',
    );
  });

  it('does not remove space between half-width characters', async () => {
    expect(await fix('Hello World')).toBe('Hello World');
    expect(await fix('OpenTelemetry Collector')).toBe(
      'OpenTelemetry Collector',
    );
  });

  it('does not remove space between half-width and full-width', async () => {
    expect(await fix('Meta の')).toBe('Meta の');
    expect(await fix('Collector コンポーネント')).toBe(
      'Collector コンポーネント',
    );
  });

  it('keeps text without spaces unchanged', async () => {
    expect(await fix('コアリポジトリ')).toBe('コアリポジトリ');
    expect(await fix('日本語テキスト')).toBe('日本語テキスト');
  });
});
