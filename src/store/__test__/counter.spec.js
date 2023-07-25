import { Store } from '../counter';

describe('counter slice test', () => {
	it('increment test', () => {
		const store = new Store();
		store.increment();
		expect(store.value).toEqual(1);
	});

	it('decrement test', () => {
		const store = new Store();
		store.increment();
		store.increment();
		store.increment();
		store.decrement();
		expect(store.value).toEqual(2);
	});

	it('increment by positive amount test', () => {
		const store = new Store();
		store.incrementByAmount(5);
		expect(store.value).toEqual(5);
	});
});
