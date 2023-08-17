import {describe, expect, test} from '@jest/globals';
import {AppBuilder} from './rest-app';

describe('AppBuilder', ()  => {
    test('constructor', () => {
        // Note: should be 100% covered via integration tests
        expect(AppBuilder).toBeInstanceOf(Function);
    });
});
