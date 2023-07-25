import { makeAutoObservable } from 'mobx';

class Store {
	public value: number;

	constructor() {
		this.value = 0;
		makeAutoObservable(this);
	}
	increment = () => {
		this.value += 1;
	};

	decrement = () => {
		this.value -= 1;
	};
	incrementByAmount = (payload: number) => {
		this.value += payload;
	};
}

export { Store };

const counterStore = new Store();

export default counterStore;
