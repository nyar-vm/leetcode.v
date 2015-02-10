import { describe, expect, it } from 'vitest';

import { jsonToMatlab, jsonToWolfram, parseMatlabSurface, parseWolframSurface } from '../src/adapters/shared/sxo-json.ts';

describe('sxo-json marshalling', () => {
    it('round-trips Wolfram scalars and lists', () => {
        expect(jsonToWolfram(null)).toBe('Null');
        expect(parseWolframSurface('Null')).toBe(null);
        expect(parseWolframSurface('{0, 1}')).toEqual([0, 1]);
        expect(parseWolframSurface(jsonToWolfram([3, 3]))).toEqual([3, 3]);
    });

    it('round-trips MATLAB scalars and lists', () => {
        expect(jsonToMatlab(null)).toBe('[]');
        expect(parseMatlabSurface('[]')).toBe(null);
        expect(parseMatlabSurface('[0, 1]')).toEqual([0, 1]);
        expect(parseMatlabSurface(jsonToMatlab([-1, 2]))).toEqual([-1, 2]);
    });

    it('serializes strings', () => {
        expect(parseWolframSurface(jsonToWolfram('ab'))).toBe('ab');
        expect(parseMatlabSurface(jsonToMatlab('ab'))).toBe('ab');
    });
});
