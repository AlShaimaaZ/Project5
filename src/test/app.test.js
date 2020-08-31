import '@babel/polyfill';
import { handelSubmit } from "../client/js/app";
import { getData } from "../client/js/app";
import { postData } from "../client/js/app";


describe('Test, the function "handelSubmit()" should be a function' , () => {
    test('It should return true', async () => {
        expect(typeof handelSubmit).toBe("function");
    });
});

describe('Test, the function "handelSubmit()" should exist' , () => {
    test('It should return true', async () => {
        expect(handelSubmit).toBeDefined();
    });
});

//Get Function
describe('Test, the function "getData()" should be a function' , () => {
    test('It should return true', async () => {
        expect(typeof getData).toBe("function");
    });
});

describe('Test, the function "getData()" should exist' , () => {
    test('It should return true', async () => {
        expect(getData).toBeDefined();
    });
});

//Post Function
describe('Test, the function "postData()" should be a function' , () => {
    test('It should return true', async () => {
        expect(typeof postData).toBe("function");
    });
});

describe('Test, the function "postData()" should exist' , () => {
    test('It should return true', async () => {
        expect(postData).toBeDefined();
    });
});