// TODO: considering @types/jest vs @jest/globals ...
//      https://jestjs.io/docs/getting-started#type-definitions
// ... repetitive & explicit vs "magic"
// Also: VS Code doesn't notice the @types/jest already exists in package.json and barfs
// Ameliorated via code scaffolding!
import {describe, expect, test} from '@jest/globals';

describe('foo', ()  => {
    test('foo', () => {
        expect(1 + 2).toBe(3);
    });
});