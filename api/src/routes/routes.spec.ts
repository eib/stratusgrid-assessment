import { describe, expect, test } from "@jest/globals";
import { Routes, join } from "./routes";

describe('Routes', () => {
    describe('.SHOWS', () => {
        test('should evaluate to "shows"', () => {
            expect(Routes.SHOWS).toBe("shows");
        });    
    });
    describe('.ROOT', () => {
        test('should evaluate to slash', () => {
            expect(Routes.ROOT).toBe("/");
        });
    });
});

describe('join()', () => {
    test('should not append slash when segment is empty-string', () => {
        expect(join("foo", "")).toBe("foo");
        expect(join("foo/bar", "")).toBe("foo/bar");
    });
    test('should join parts with slash', () => {
        expect(join("foo", "bar")).toBe("foo/bar");
        expect(join("foo/bar", "batz")).toBe("foo/bar/batz");
    });
    test('should not append double-slashes if segment is already trailingly slash-y', () => {
        expect(join("foo", "/")).toBe("foo/");
    });
});
